DROP TABLE IF EXISTS task CASCADE;

CREATE TABLE task (
	id serial,
	data varchar(65000),
	
	CONSTRAINT pk_task_id PRIMARY KEY(id)
);

DROP FUNCTION IF EXISTS task_add(a_data varchar(255));

CREATE FUNCTION task_add(a_data varchar(255)) RETURNS VOID AS $$	
DECLARE
	l_max_id int;	
BEGIN
	SELECT INTO l_max_id MAX(id) FROM task;
	INSERT INTO task(id, data) VALUES(COAlESCE(l_max_id, 0) + 1, a_data)	 
		ON CONFLICT (id) DO UPDATE SET data = a_data; 
END;
$$ LANGUAGE plpgsql;

