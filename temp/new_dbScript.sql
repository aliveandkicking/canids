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

DROP TABLE IF EXISTS data_types CASCADE;

DROP TABLE IF EXISTS data CASCADE;

CREATE TABLE data (
	entity_id serial,
	instance_id int,
	name text,
	value jsonb,
	
	CONSTRAINT pk_data_id PRIMARY KEY(entity_id, instance_id, name)
);

DROP FUNCTION IF EXISTS setting_get(a_code text);

CREATE FUNCTION setting_get(a_code text) RETURNS text AS $$	
BEGIN
	RETURN (SELECT value FROM setting WHERE (lower(btrim(a_code)) = key));
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS save(a_data jsonb);

CREATE FUNCTION save(a_data jsonb) RETURNS TABLE(success smallint, message text, saved_entity_id int, saved_id int) AS $$	
DECLARE
	l_entity_id int;
	l_entity_code text;	
	l_instance_id int;
	l_json jsonb;
	l_rec record;
	l_objfield_prefix text;
BEGIN		
	IF (NOT (a_data ?& array['id', 'entity'])) THEN		
		RETURN QUERY SELECT 0::smallint, 'json has to contain "id" and "entity" fields'::text, -1, -1;
		RETURN;	
	END IF;
	
	l_json := a_data;	
	l_instance_id := (l_json ->> 'id')::int;
	SELECT INTO l_json l_json - 'id';
	l_entity_code := l_json ->> 'entity';
	SELECT INTO l_json l_json - 'entity';

	SELECT INTO l_entity_id id FROM entity WHERE (l_entity_code = code);

	IF (l_entity_id IS NULL) THEN
		INSERT INTO entity(code) VALUES(l_entity_code);
		SELECT INTO l_entity_id id FROM entity WHERE (l_entity_code = code);
	END IF;	

	IF (l_instance_id IS NULL) THEN
		l_instance_id := (SELECT coalesce(max(instance_id), 0) + 1 FROM data WHERE entity_id = l_entity_id);		
	END IF;	

	l_objfield_prefix := setting_get('objfield_prefix');
	FOR l_rec IN  SELECT * FROM jsonb_each(l_json)
	LOOP
		IF (position(l_objfield_prefix in l_rec.key) = 1) THEN
			SELECT INTO l_rec.value jsonb_build_object('entity', t.saved_entity_id, 'id', t.saved_id)
				FROM save(l_rec.value) AS t;	
		END IF;	
		
		INSERT INTO data(entity_id, instance_id, name, value) 
			VALUES(l_entity_id, l_instance_id, l_rec.key, l_rec.value)
				ON CONFLICT (entity_id, instance_id, name) DO UPDATE SET value = l_rec.value;		
	END LOOP;
		
	RETURN QUERY SELECT 1::smallint, ''::text, l_entity_id, l_instance_id;
	RETURN;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS entity_getid(a_entity_code text);

CREATE FUNCTION entity_getid(a_entity_code text) RETURNS int AS $$	
BEGIN	
	RETURN (SELECT id FROM entity WHERE (a_entity_code = code));
END;$$ 
LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS load_object(a_entity_id int, id int, a_objfield_prefix text);

CREATE FUNCTION load_object(a_entity_id int, a_id int, a_objfield_prefix text) RETURNS jsonb AS $$	
DECLARE	
	l_rec record;	
	l_result jsonb;
	l_subentity text;
BEGIN	
	RAISE NOTICE 'load_object: % %', a_entity_id, a_id;

	l_result := '{}'::jsonb;
	FOR l_rec IN SELECT * FROM data WHERE (entity_id = a_entity_id) AND (instance_id = a_id)
	LOOP
		RAISE NOTICE 'record: %', l_rec;
		
		IF (position(a_objfield_prefix in l_rec.name) = 1) THEN
			l_result := l_result || jsonb_build_object(l_rec.name,
				load_object((l_rec.value ->> 'entity')::int , (l_rec.value ->> 'id')::int, a_objfield_prefix)); 		
		ELSE
			l_result := l_result || jsonb_build_object(l_rec.name, l_rec.value);			
		END IF;	
	END LOOP;	

	RAISE NOTICE 'res obj: %', l_result;
	RETURN l_result;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS load_object(a_entity_code text, id int, a_objfield_prefix text);

CREATE FUNCTION load_object(a_entity_code text, a_id int, a_objfield_prefix text) RETURNS jsonb AS $$	
DECLARE	
	l_entity_id int;		
BEGIN		
	l_entity_id := entity_getid(a_entity_code);
	IF (l_entity_id IS NULL) THEN
		RETURN NULL;
	END IF;
	
	RAISE NOTICE 'args % %', l_entity_id, a_id;

	RAISE NOTICE 'result %', load_object(l_entity_id, a_id, a_objfield_prefix);
 
	RETURN load_object(l_entity_id, a_id, a_objfield_prefix);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS load(a_entity_code text, ids jsonb);

CREATE FUNCTION load(a_entity_code text, ids jsonb) RETURNS TABLE(data jsonb) AS $$	
DECLARE
	l_entity_id int;	
	l_idrec record;
	l_objfield_prefix text;
	l_json jsonb;
BEGIN
	SELECT INTO l_entity_id entity_getid(a_entity_code);
	IF (l_entity_id IS NULL) THEN
		RETURN;
	END IF;		

	l_objfield_prefix := setting_get('objfield_prefix');
	FOR l_idrec IN select * from jsonb_array_elements_text(ids)
	LOOP
		l_json := load_object(l_entity_id, l_idrec.value::int, l_objfield_prefix);

		l_json := l_json || jsonb_build_object('entity', a_entity_code);
		l_json := l_json || jsonb_build_object('id', l_idrec.value::int);

		RETURN QUERY SELECT l_json AS data;		
	END LOOP;	
END;
$$ LANGUAGE plpgsql;

INSERT INTO setting VALUES('objfield_prefix', '*');

SELECT * FROM save('{"id":"0", "entity": "repeat_mode", "title": "None"}');
SELECT * FROM save('{"id":"1", "entity": "repeat_mode", "title": "Daily"}');
SELECT * FROM save('{"id":"2", "entity": "repeat_mode", "title": "Weekly"}');
SELECT * FROM save('{"id":"3", "entity": "repeat_mode", "title": "Monthly"}');
SELECT * FROM save('{"id":"4", "entity": "repeat_mode", "title": "Yearly"}');

SELECT 'DONE'::text AS result







 


