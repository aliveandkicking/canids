------------------------------------- entity -------------------------------------

DROP TABLE IF EXISTS entity CASCADE;

CREATE TABLE entity (
	id serial,
	code text,
	
	CONSTRAINT pk_entity_id PRIMARY KEY(code)
);

CREATE UNIQUE INDEX ON entity(code);

------------------------------------- data -------------------------------------

DROP TABLE IF EXISTS data CASCADE;

CREATE TABLE data (
	entity_id serial,
	instance_id int,
	name text,
	value jsonb,
	
	CONSTRAINT pk_data_id PRIMARY KEY(entity_id, instance_id, name)
);

-- CREATE UNIQUE INDEX ON data(entity_id, instance_id, name);

------------------------------------- _is_json_object -------------------------------------

DROP FUNCTION IF EXISTS _is_json_object(a_data jsonb);

CREATE FUNCTION _is_json_object(a_data jsonb) RETURNS boolean AS $$	
BEGIN	
	RETURN (position('{' in a_data::text) = 1) AND 
		(position('}' in a_data::text) = length(a_data::text));
END;$$ 
LANGUAGE plpgsql;

-------------------------------------  _is_json_array -------------------------------------

DROP FUNCTION IF EXISTS _is_json_array(a_data jsonb);

CREATE FUNCTION _is_json_array(a_data jsonb) RETURNS boolean AS $$	
BEGIN	
	RETURN (position('[' in a_data::text) = 1) AND 
		(position(']' in a_data::text) = length(a_data::text));
END;$$ 
LANGUAGE plpgsql;

------------------------------------- _save_value -------------------------------------

DROP FUNCTION IF EXISTS _save_value(a_data jsonb);

CREATE FUNCTION _save_value(a_data jsonb) RETURNS jsonb AS $$	
BEGIN	
	IF (_is_json_object(a_data)) THEN
		RETURN _save_as_object(a_data);
	ELSEIF (_is_json_array(a_data)) THEN
		RETURN _save_as_array(a_data);
	END IF;
	RETURN a_data;
END;$$
LANGUAGE plpgsql;

------------------------------------- _save_as_array -------------------------------------

DROP FUNCTION IF EXISTS _save_as_array(a_data jsonb);

CREATE FUNCTION _save_as_array(a_data jsonb) RETURNS jsonb AS $$	
DECLARE
	l_rec record;
	l_result_array jsonb; 
BEGIN	
	l_result_array := '[]'::jsonb;
	FOR l_rec IN SELECT * FROM jsonb_array_elements(a_data)
	LOOP
		l_result_array := l_result_array || _save_value(l_rec.value);
	END LOOP;
	RETURN l_result_array;
END;$$ 
LANGUAGE plpgsql;

------------------------------------- _extract_required_values -------------------------------------

DROP FUNCTION IF EXISTS _extract_required_values(a_data jsonb);

CREATE FUNCTION _extract_required_values(a_data jsonb) RETURNS TABLE(entity_id int, instance_id int, new_json jsonb) AS $$	
DECLARE
	l_instance_id int;
	l_entity_id int;
	l_entity_code text;
BEGIN
	l_instance_id := (a_data ->> 'id')::int;
	a_data := a_data - 'id';
	l_entity_code := a_data ->> 'entity';
	a_data := a_data - 'entity';

	SELECT INTO l_entity_id id FROM entity WHERE (l_entity_code = code);	
	IF (l_entity_id IS NULL) THEN -- check if new entity
		INSERT INTO entity(code) VALUES(l_entity_code);
		SELECT INTO l_entity_id id FROM entity WHERE (l_entity_code = code);		
	END IF;

	IF (l_instance_id IS NULL) THEN
		SELECT INTO l_instance_id (coalesce(max(d.instance_id), 0) + 1) FROM data d WHERE (d.entity_id = l_entity_id);	
	END IF;

	RETURN QUERY SELECT l_entity_id, l_instance_id, a_data;
END;
$$ LANGUAGE plpgsql;

------------------------------------- _save_as_object -------------------------------------

DROP FUNCTION IF EXISTS _save_as_object(a_data jsonb, a_only_valid boolean);

CREATE FUNCTION _save_as_object(a_data jsonb, a_only_valid boolean default false) RETURNS jsonb AS $$
DECLARE
	l_rec record;
	l_instance_id int;
	l_entity_id int;
BEGIN
	IF (NOT (a_data ?& array['id', 'entity'])) THEN
		RAISE NOTICE 'Object % does not have "id" or "entity" field', a_data::text;
		IF (a_only_valid) THEN
			RETURN NULL;
		END IF;
		RETURN a_data;
	END IF;

	SELECT INTO l_entity_id, l_instance_id, a_data v.* FROM _extract_required_values(a_data) AS v;

	FOR l_rec IN SELECT * FROM jsonb_each(a_data) 
	LOOP
		l_rec.value := _save_value(l_rec.value);
		INSERT INTO data(entity_id, instance_id, name, value) 
			VALUES(l_entity_id, l_instance_id, l_rec.key, l_rec.value)
				ON CONFLICT (entity_id, instance_id, name) DO UPDATE SET value = l_rec.value;
	END LOOP;
	RETURN ('{"entity_id":' || l_entity_id || ', "instance_id":' || l_instance_id || '}')::jsonb; 
END;$$ 
LANGUAGE plpgsql;

------------------------------------- save -------------------------------------

DROP FUNCTION IF EXISTS save(a_data jsonb);

CREATE FUNCTION save(a_data jsonb) RETURNS TABLE(success smallint, message text, saved_id int) AS $$
DECLARE
	l_saved_obj jsonb;
BEGIN
	l_saved_obj := _save_as_object(a_data, true);
	IF (l_saved_obj IS NULL) THEN
		RETURN QUERY SELECT 0::smallint, 'json has to contain "id" and "entity" fields'::text, -1;
		RETURN;
	END IF;		
	RETURN QUERY SELECT 1::smallint, ''::text, (l_saved_obj ->> 'instance_id')::int;
END;
$$ LANGUAGE plpgsql;

------------------------------------- _load_value -------------------------------------

DROP FUNCTION IF EXISTS _load_value(a_data jsonb);

CREATE FUNCTION _load_value(a_data jsonb) RETURNS jsonb AS $$
BEGIN	
	IF (_is_json_object(a_data)) THEN
		RETURN _load_as_object(a_data);
	ELSEIF (_is_json_array(a_data)) THEN
		RETURN _load_as_array(a_data);
	END IF;
	RETURN a_data;
END;$$
LANGUAGE plpgsql;

------------------------------------- _load_as_array -------------------------------------

DROP FUNCTION IF EXISTS _load_as_array(a_data jsonb);

CREATE FUNCTION _load_as_array(a_data jsonb) RETURNS jsonb AS $$
DECLARE
	l_rec record;
	l_result_array jsonb;
BEGIN
	l_result_array := '[]'::jsonb;
	FOR l_rec IN SELECT * FROM jsonb_array_elements(a_data)
	LOOP
		l_result_array := l_result_array || _load_value(l_rec.value);
	END LOOP;
	RETURN l_result_array;
END;$$ 
LANGUAGE plpgsql;

------------------------------------- _load_as_object -------------------------------------


DROP FUNCTION IF EXISTS _load_as_object(a_data jsonb, a_only_valid boolean);

CREATE FUNCTION _load_as_object(a_data jsonb, a_only_valid boolean default false) RETURNS jsonb AS $$
DECLARE
	l_rec record;
	l_instance_id int;
	l_entity_id int;
	l_entity text;
	l_result_obj jsonb;
BEGIN
	IF (NOT (a_data ?& array['instance_id', 'entity_id'])) THEN
		RAISE NOTICE 'Object % does not have "instance_id" or "entity_id" field', a_data::text;
		IF (a_only_valid) THEN
			RETURN NULL;
		END IF;
		RETURN a_data;
	END IF;

	SELECT INTO l_entity_id, l_instance_id (a_data ->> 'entity_id')::int, (a_data ->> 'instance_id')::int;

	SELECT INTO l_entity code FROM entity WHERE (id = l_entity_id);
	IF (l_entity IS NULL) THEN
		IF (a_only_valid) THEN
			RETURN NULL;
		END IF;
		RETURN a_data;
	END IF;

	IF (SELECT (COUNT(instance_id) < 1) FROM data WHERE (entity_id = l_entity_id) AND (instance_id = l_instance_id)) THEN
		RETURN NULL;
	END IF;	 

	l_result_obj := jsonb_build_object('entity', l_entity, 'id', l_instance_id);
	FOR l_rec IN SELECT name, value FROM data WHERE (entity_id = l_entity_id) AND (instance_id = l_instance_id)
	LOOP
		l_result_obj := l_result_obj || jsonb_build_object(l_rec.name, _load_value(l_rec.value));		
	END LOOP;
	RETURN l_result_obj;
END;$$
LANGUAGE plpgsql;

------------------------------------- load -------------------------------------

DROP FUNCTION IF EXISTS load(a_entity_id int, a_ids jsonb);

CREATE FUNCTION load(a_entity_id int, a_ids jsonb) RETURNS TABLE(data jsonb) AS $$	
DECLARE
	l_rec record;
	l_json jsonb;
	i int;
BEGIN	
	RAISE notice '%', a_ids;
	IF ((a_ids ->> 0) = '*') THEN
		a_ids := '[]'::jsonb;
		FOR l_rec IN SELECT instance_id FROM data 
				WHERE (entity_id = a_entity_id) 
				GROUP BY instance_id 
				ORDER BY instance_id	
		LOOP
			a_ids := a_ids || jsonb_build_array(l_rec.instance_id);
		END LOOP;	
	END IF;

RAISE notice '2: %', a_ids;

	FOR i IN 0..(jsonb_array_length(a_ids) - 1)
	LOOP		
		l_json := _load_as_object(jsonb_build_object('entity_id', a_entity_id, 'instance_id', a_ids -> i), true);
		IF (NOT l_json IS NULL) THEN
			RAISE notice '3 %', l_json;
			RETURN QUERY SELECT l_json AS data;
		END IF;
	END LOOP;	
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS load(a_entity_code text, ids jsonb);

CREATE FUNCTION load(a_entity_code text, a_ids jsonb) RETURNS TABLE(data jsonb) AS $$	
DECLARE
	l_entity_id int;
BEGIN
	SELECT INTO l_entity_id id FROM entity WHERE (code = a_entity_code);
	IF (l_entity_id IS NULL) THEN
		RETURN;
	END IF;
	RETURN QUERY SELECT load(l_entity_id, a_ids);	
END;
$$ LANGUAGE plpgsql;

------------------------------------- DML -------------------------------------

SELECT save('{"id":"0", "entity": "repeat_mode", "title": "None"}');
SELECT save('{"id":"1", "entity": "repeat_mode", "title": "Daily"}');
SELECT save('{"id":"2", "entity": "repeat_mode", "title": "Weekly"}');
SELECT save('{"id":"3", "entity": "repeat_mode", "title": "Monthly"}');
SELECT save('{"id":"4", "entity": "repeat_mode", "title": "Yearly"}');

SELECT 'DONE'::text AS result


--SELECT is_json_object(value::jsonb), is_json_array(value::jsonb), value from jsonb_each('{"id":0,"entity":"{Friend}","name":"Norris Nixon","sub1":{"id":1,"entity":"Friend","name":"Hilda Phelps"},"sub2":{"id":2,"entity":"Friend","name":"Watkins Key"}, "arr": [1,2,3]}')

-- SELECT is_json_object(value::jsonb), value from json_array_elements('[{"id":0,"entity":"Friend","name":"Norris Nixon"},{"id":1,"entity":"Friend","name":"Hilda Phelps"},{"id":2,"entity":"Friend","name":"Watkins Key"}, {}]')

-- SELECT '{"id":0,"entity":"Friend","name":"Norris Nixon"}'::jsonb->>'name'









 


