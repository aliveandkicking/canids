DROP TABLE IF EXISTS task CASCADE;

CREATE TABLE task (
	id serial,
	name varchar,
	repeat_rule_id int,
	
	CONSTRAINT pk_task_id PRIMARY KEY(id)
);

DROP TABLE IF EXISTS repeat_mode CASCADE;

CREATE TABLE repeat_mode (
	id serial,
	title text,	
	
	CONSTRAINT pk_repeat_mode_id PRIMARY KEY(id)
);


DROP TABLE IF EXISTS repeat_rule CASCADE;

CREATE TABLE repeat_rule (
	id serial,
	mode_id int,
	start_date varchar(10),
	end_date varchar(10),
	never_end smallint,	
	
	CONSTRAINT pk_repeat_rule_id PRIMARY KEY(id)
);

DROP TABLE IF EXISTS repeat_rule_detail CASCADE;

CREATE TABLE repeat_rule_detail (
	repeat_rule_id int,
	mode_id int,
	name text,	
	value text,
	
	CONSTRAINT pk_repeat_rule_detail_id PRIMARY KEY(repeat_rule_id, mode_id)
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

-- DATA

INSERT INTO repeat_mode VALUES(0, 'None');
INSERT INTO repeat_mode VALUES(1, 'Daily');
INSERT INTO repeat_mode VALUES(2, 'Weekly');
INSERT INTO repeat_mode VALUES(3, 'Monthly');
INSERT INTO repeat_mode VALUES(4, 'Yearly');

SELECT 'DONE'::text AS result 







 


