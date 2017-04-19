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
	value text,
	
	CONSTRAINT pk_data_id PRIMARY KEY(entity_id, instance_id, name)
);

DROP FUNCTION IF EXISTS setting_get(a_code text);

CREATE FUNCTION setting_get(a_code text) RETURNS text AS $$	
BEGIN
	RETURN (SELECT value FROM setting WHERE (lower(btrim(a_code)) = key));
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS save(a_data jsonb);

CREATE FUNCTION save(a_data jsonb) RETURNS TABLE(success smallint, message text, saved_id int) AS $$	
DECLARE
	l_entity_id int;
	l_entity_code text;	
	l_instance_id int;
	l_json jsonb;
	l_rec record;
	l_objfield_prefix text;
BEGIN		
	IF (NOT (a_data ?& array['id', 'entity'])) THEN		
		RETURN QUERY SELECT 0::smallint, 'json has to contain "id" and "entity" fields'::text, -1;
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


	l_objfield_prefix := setting_get('objfield_prefix');
	FOR l_rec IN  SELECT * FROM jsonb_each(l_json)
	LOOP
		IF (position(l_objfield_prefix in l_rec.key) = 1) THEN
			SELECT INTO l_rec.value t.saved_id FROM save(l_rec.value) AS t;		
		END IF;	
		
		INSERT INTO data(entity_id, instance_id, name, value) 
			VALUES(l_entity_id, l_instance_id, l_rec.key, l_rec.value)
				ON CONFLICT (entity_id, instance_id, name) DO UPDATE SET value = l_rec.value;		
	END LOOP;
		
	RETURN QUERY SELECT 1::smallint, ''::text, l_instance_id;
	RETURN;
END;
$$ LANGUAGE plpgsql;

INSERT INTO setting VALUES('objfield_prefix', '*');

SELECT * FROM save('{"id":"0", "entity": "repeat_mode", "title": "None"}');
SELECT * FROM save('{"id":"1", "entity": "repeat_mode", "title": "Daily"}');
SELECT * FROM save('{"id":"2", "entity": "repeat_mode", "title": "Weekly"}');
SELECT * FROM save('{"id":"3", "entity": "repeat_mode", "title": "Monthly"}');
SELECT * FROM save('{"id":"4", "entity": "repeat_mode", "title": "Yearly"}');

SELECT 'DONE'::text AS result







 


