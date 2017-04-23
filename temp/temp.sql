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
			l_subentity := trim(leading a_objfield_prefix from l_rec.name);
			l_result := l_result || jsonb_build_object(l_subentity,
				load_object(l_subentity, a_id, a_objfield_prefix)); 		
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
BEGIN
	SELECT INTO l_entity_id entity_getid(a_entity_code);
	IF (l_entity_id IS NULL) THEN
		RETURN;
	END IF;		

	l_objfield_prefix := setting_get('objfield_prefix');
	FOR l_idrec IN select * from jsonb_array_elements_text(ids)
	LOOP
		RETURN QUERY SELECT load_object(l_entity_id, l_idrec.value::int, l_objfield_prefix) AS data;		
	END LOOP;	
END;
$$ LANGUAGE plpgsql;


SELECT * FROM save('{"id":"0","entity":"person","firstName":"Иван!!","lastName":"Иванов","*addr":{"id":"0","entity":"addr","streetAddress":"Московское ш., 101, кв.101","city":"Ленинград","postalCode":101101},"phoneNumbers":["812 123-1234","916 123-4567"]}');

SELECT data FROM load('repeat_mode', '[1,2,3]');
