DROP TABLE IF EXISTS setting CASCADE;

CREATE TABLE setting (
	key text,
	value text,
	
	CONSTRAINT pk_settings_id PRIMARY KEY(key, value)
);

DROP TABLE IF EXISTS entity CASCADE;

CREATE TABLE entity (
	id serial,
	code text,
	
	CONSTRAINT pk_entity_id PRIMARY KEY(code)
);

DROP TABLE IF EXISTS data CASCADE;

CREATE TABLE data (
	entity_id serial,
	instance_id int,
	name text,
	value jsonb,
	
	CONSTRAINT pk_data_id PRIMARY KEY(entity_id, instance_id, name)
);

DROP FUNCTION IF EXISTS setting_get();

CREATE FUNCTION setting_get() RETURNS jsonb AS $$	
DECLARE
	l_rec record;
	l_result jsonb;
BEGIN
	l_result := '{}'::jsonb;
	FOR l_rec IN SELECT * FROM setting
	LOOP
		l_result := l_result || jsonb_build_object(l_rec.key, l_rec.value);
	END LOOP;
	RAISE NOTICE  'json :%', l_result;
	RETURN l_result; 
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS is_json_object(a_data jsonb);

CREATE FUNCTION is_json_object(a_data jsonb) RETURNS smallint AS $$	
BEGIN	
	IF ((position('{' in a_data::text) = 1) AND (position('}' in a_data::text) = length(a_data::text))) THEN
		RETURN 1::smallint;
	ELSE
		RETURN 0::smallint;
	END IF;
END;$$ 
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS is_json_array(a_data jsonb);

CREATE FUNCTION is_json_array(a_data jsonb) RETURNS smallint AS $$	
BEGIN	
	IF ((position('[' in a_data::text) = 1) AND (position(']' in a_data::text) = length(a_data::text))) THEN
		RETURN 1::smallint;
	ELSE
		RETURN 0::smallint;
	END IF;
END;$$ 
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS entity_getid(a_entity_code text);

CREATE FUNCTION entity_getid(a_entity_code text) RETURNS int AS $$	
BEGIN	
	RETURN (SELECT id FROM entity WHERE (a_entity_code = code));
END;$$ 
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS save(a_data jsonb);

CREATE FUNCTION save(a_data jsonb) RETURNS TABLE(success smallint, message text, saved_entity_id int, saved_id int) AS $$	
DECLARE
	l_entity_id int;
	l_entity_code text;	
	l_instance_id int;
	l_json jsonb;
	l_rec record;
	l_obj_field_prefix text;
	l_settings jsonb;
	l_array jsonb;
	l_array_iter_rec record;
BEGIN	
	l_settings := setting_get();
	RAISE NOTICE  'settings :%', l_settings;

	IF (NOT (a_data ?& array[l_settings ->> 'id_fieldname', l_settings ->> 'entity_fieldname'])) THEN		
		RETURN QUERY SELECT 0::smallint, 'json has to contain "id" and "entity" fields'::text, -1, -1;
		RETURN;	
	END IF;
	
	l_json := a_data;	
	l_instance_id := (l_json ->> 'id')::int;
	l_json := l_json - 'id';
	l_entity_code := l_json ->> 'entity';
	l_json := l_json - 'entity';
	
	l_entity_id := entity_getid(l_entity_code);
	-- check if new entity
	IF (l_entity_id IS NULL) THEN
		INSERT INTO entity(code) VALUES(l_entity_code);
		l_entity_id := entity_getid(l_entity_code);
	END IF;	

	-- check if new instance
	IF (l_instance_id IS NULL) THEN
		l_instance_id := (SELECT coalesce(max(instance_id), 0) + 1 FROM data WHERE entity_id = l_entity_id);		
	END IF;	

	l_obj_field_prefix := l_settings ->> 'obj_field_prefix';

	FOR l_rec IN SELECT * FROM jsonb_each(l_json)
	LOOP
		IF (is_json_object(l_rec.value)) THEN
			SELECT INTO l_rec.value 
				jsonb_build_object('entity', t.saved_entity_id, 'id', t.saved_id)
					FROM save(l_rec.value) AS t;
					
		ELSEIF	(is_json_array(l_rec.value)) THEN
			l_array := '[]'::jsonb;
			FOR l_array_iter_rec IN SELECT jsonb_array_elements(l_rec.value)
			LOOP
				IF (is_json_object(l_rec.value)) THEN
				
				-- ELSEIF biktop
					-- l_array := l_array || 
				END IF;
			END LOOP;			
		
			l_rec.value := l_array;					
		END IF;	
		
		INSERT INTO data(entity_id, instance_id, name, value) 
			VALUES(l_entity_id, l_instance_id, l_rec.key, l_rec.value)
				ON CONFLICT (entity_id, instance_id, name) DO UPDATE SET value = l_rec.value;		
	END LOOP;
		
	RETURN QUERY SELECT 1::smallint, ''::text, l_entity_id, l_instance_id;
	RETURN;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS load_object(a_entity_id int, a_id int, a_settings jsonb);

-- biktop check time without a_obj_field_prefix
CREATE FUNCTION load_object(a_entity_id int, a_id int, a_settings jsonb) RETURNS jsonb AS $$ 
DECLARE	
	l_rec record;	
	l_result jsonb;
	l_subentity text;
	l_obj_prefix text;
	l_array_prefix text;
BEGIN	
	IF ((a_entity_id IS NULL) OR (a_id IS NULL)) THEN
		RETURN NULL;
	END IF;

	l_result := '{}'::jsonb;

	l_obj_prefix := a_settings ->> 'obj_field_prefix';	
	l_array_prefix := a_settings ->> 'array_field_prefix';
	
	FOR l_rec IN SELECT * FROM data WHERE (entity_id = a_entity_id) AND (instance_id = a_id)
	LOOP	
		-- IF (position(l_obj_prefix in l_rec.name) = 1) THEN
		IF (is_json_object(l_rec.value)) THEN
			l_result := l_result || jsonb_build_object(l_rec.name,
				load_object((l_rec.value ->> 'entity')::int, (l_rec.value ->> 'id')::int, a_settings));
		ELSEIF (is_json_array(l_rec.value)) THEN
			
		
		ElSE
			l_result := l_result || jsonb_build_object(l_rec.name, l_rec.value);			
		END IF;	
	END LOOP;

	RETURN l_result;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS load(a_entity_code text, ids jsonb);

CREATE FUNCTION load(a_entity_code text, ids jsonb) RETURNS TABLE(data jsonb) AS $$	
DECLARE
	l_entity_id int;	
	l_idrec record;
	l_obj_field_prefix text;
	l_json jsonb;
	l_settings jsonb;
BEGIN
	l_entity_id := entity_getid(a_entity_code);
	IF (l_entity_id IS NULL) THEN
		RETURN;
	END IF;		

	l_settings := setting_get();
	FOR l_idrec IN select * from jsonb_array_elements_text(ids)
	LOOP
		l_json := load_object(l_entity_id, l_idrec.value::int, l_settings);
		l_json := l_json || jsonb_build_object('entity', a_entity_code);
		l_json := l_json || jsonb_build_object('id', l_idrec.value::int);
		RETURN QUERY SELECT l_json AS data;		
	END LOOP;	
END;
$$ LANGUAGE plpgsql;

-- DML --

INSERT INTO setting VALUES('obj_field_prefix', 'object.');
INSERT INTO setting VALUES('array_field_prefix', 'array.');
INSERT INTO setting VALUES('entity_fieldname', 'entity');
INSERT INTO setting VALUES('id_fieldname', 'id');

SELECT save('{"id":"0", "entity": "repeat_mode", "title": "None"}');
SELECT save('{"id":"1", "entity": "repeat_mode", "title": "Daily"}');
SELECT save('{"id":"2", "entity": "repeat_mode", "title": "Weekly"}');
SELECT save('{"id":"3", "entity": "repeat_mode", "title": "Monthly"}');
SELECT save('{"id":"4", "entity": "repeat_mode", "title": "Yearly"}');

SELECT 'DONE'::text AS result


--SELECT is_json_object(value::jsonb), is_json_array(value::jsonb), value from jsonb_each('{"id":0,"entity":"{Friend}","name":"Norris Nixon","sub1":{"id":1,"entity":"Friend","name":"Hilda Phelps"},"sub2":{"id":2,"entity":"Friend","name":"Watkins Key"}, "arr": [1,2,3]}')

-- SELECT is_json_object(value::jsonb), value from json_array_elements('[{"id":0,"entity":"Friend","name":"Norris Nixon"},{"id":1,"entity":"Friend","name":"Hilda Phelps"},{"id":2,"entity":"Friend","name":"Watkins Key"}, {}]')

-- SELECT '{"id":0,"entity":"Friend","name":"Norris Nixon"}'::jsonb->>'name'









 


