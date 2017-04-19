DROP FUNCTION IF EXISTS load(a_entity text, ids jsonb);

CREATE FUNCTION load(a_entity text, ids jsonb) RETURNS TABLE(data json) AS $$	
DECLARE
	l_entity_id int;
	l_instance_id: int;
	l_rec record;
BEGIN
	SELECT INTO l_entity_id id FROM entity WHERE (l_entity_code = code);

	IF (l_entity_id IS NULL) THEN
		RETURN;
	END IF;		
	
	l_objfield_prefix := setting_get('objfield_prefix');
	FOR l_rec IN  SELECT * FROM data WHERE (entity_id = l_entity_id) AND (instance_id = )
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
-- 
-- 
-- BEGIN		
-- 	IF (NOT (a_data ?& array['id', 'entity'])) THEN
-- 		RAISE NOTICE 'save(%)', 'fail';
-- 		RETURN QUERY SELECT 0::smallint, 'json has to contain "id" and "entity" fields'::text, -1;
-- 		RETURN;	
-- 	END IF;
-- 	
-- 	l_json := a_data;	
-- 	l_instance_id := (l_json ->> 'id')::int;
-- 	SELECT INTO l_json l_json - 'id';
-- 	l_entity_code := l_json ->> 'entity';
-- 	SELECT INTO l_json l_json - 'entity';
-- 
-- 	SELECT INTO l_entity_id id FROM entity WHERE (l_entity_code = code);
-- 
-- 	IF (l_entity_id IS NULL) THEN
-- 		INSERT INTO entity(code) VALUES(l_entity_code);
-- 		SELECT INTO l_entity_id id FROM entity WHERE (l_entity_code = code);
-- 	END IF;	
-- 
-- 
-- 	l_objfield_prefix := setting_get('objfield_prefix');
-- 	FOR l_rec IN  SELECT * FROM jsonb_each(l_json)
-- 	LOOP
-- 		IF (position(l_objfield_prefix in l_rec.key) = 1) THEN
-- 			SELECT INTO l_rec.value t.saved_id FROM save(l_rec.value) AS t;		
-- 		END IF;	
-- 		
-- 		INSERT INTO data(entity_id, instance_id, name, value) 
-- 			VALUES(l_entity_id, l_instance_id, l_rec.key, l_rec.value)
-- 				ON CONFLICT (entity_id, instance_id, name) DO UPDATE SET value = l_rec.value;		
-- 	END LOOP;
-- 		
-- 	RETURN QUERY SELECT 1::smallint, ''::text, l_instance_id;
-- 	RETURN;
-- END;
-- $$ LANGUAGE plpgsql;