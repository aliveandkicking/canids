-- Search "/*" to navigate through sections

-- postgis has to be already installed
CREATE EXTENSION IF NOT EXISTS postgis;

/* DDL PART */

DROP TABLE IF EXISTS database_info;

CREATE TABLE database_info(
	code varchar(255) NOT NULL,
	value text,	
		
	CONSTRAINT pk_database_info_version PRIMARY KEY(code)
);

-- Table: track_cover_cache

DROP TABLE IF EXISTS track_cover_cache;

CREATE TABLE track_cover_cache(
	id serial NOT NULL,
	track varchar(255) NOT NULL,
	url text NOT NULL,
	date_modified timestamp,	

	CONSTRAINT pk_track_cover_cache_id PRIMARY KEY(id)        
);

CREATE UNIQUE INDEX track_cover_cache_track_idx ON track_cover_cache(track);

-- Table: STATION_GENRE

DROP TABLE IF EXISTS station_genre CASCADE;

CREATE TABLE station_genre(
	id serial NOT NULL,
	name varchar(100) NOT NULL,

	CONSTRAINT pk_station_genre_id PRIMARY KEY(id)
);

CLUSTER station_genre USING pk_station_genre_id;

-- Table: STATION

DROP TABLE IF EXISTS station CASCADE;

CREATE TABLE station (
	id serial, --internal id
	staging_id int NOT NULL UNIQUE, -- external id
	code varchar(255) NOT NULL,
	title varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	description text,
	url text,
	logo_url text,
	stream_id int,
	stream_url text,	
	banner_url text,
	gateway_url text,	
	genre_id int,
	active smallint NOT NULL DEFAULT 0,
	enabled smallint NOT NULL DEFAULT 1,
	comment text,
	
	CONSTRAINT pk_station_id PRIMARY KEY(id)
);

-- CLUSTER station USING pk_station_id; -- there is no point in this

-- station_extra_data

DROP TABLE IF EXISTS station_extra_data CASCADE;

CREATE TABLE station_extra_data(
	station_id integer,
	data_code varchar(255),
	data_value text,	
	
	CONSTRAINT pk_station_extra_data PRIMARY KEY (station_id, data_code)	
);

-- station_now_playing

DROP TABLE IF EXISTS station_now_playing;

CREATE TABLE station_now_playing (
	station_id int, 		
	artist text,
	title text,
	album text,
	label text,
		
	CONSTRAINT pk_station_now_playing_station_id PRIMARY KEY(station_id)
);

-- Table: user_data

DROP TABLE IF EXISTS user_data CASCADE;

CREATE TABLE user_data(
	id serial NOT NULL,
	username varchar(20),
	password text NOT NULL,		
	email text NOT NULL CHECK((POSITION('.' IN email) > 3) AND (POSITION('@' IN email) > 1)),		
	gender CHAR(1) CHECK((gender = 'm') OR (gender = 'f')),
	birth_date date,
	first_name varchar(255),
	last_name varchar(255),
	registration_date timestamp, 
	email_verified smallint,
	email_verification_complete_date timestamp,	
	
	CONSTRAINT pk_user PRIMARY KEY (id)	
);
-- Table: user_extra_data

DROP TABLE IF EXISTS user_extra_data CASCADE;

CREATE TABLE user_extra_data(
	user_id integer,
	data_code varchar(255),
	data_value text,	
	
	CONSTRAINT pk_user_extra_data PRIMARY KEY (user_id, data_code)	
);

CREATE UNIQUE INDEX ON user_extra_data(user_id, data_code); 

-- Table: user_search

DROP TABLE IF EXISTS user_search;

CREATE TABLE user_search(
	user_id integer,
	search_phrase text,
	count integer,
	last_search timestamp,	
	
	CONSTRAINT pk_user_search PRIMARY KEY (user_id, search_phrase)	
);

CREATE UNIQUE INDEX ON user_search(user_id, search_phrase);     

-- Table: user_log

DROP TABLE IF EXISTS user_log;

CREATE TABLE user_log(
	id serial NOT NULL,
	user_id int,	
	session_id int, 
	date_added timestamp,
	log_type varchar(32), 
	message text,
	
	CONSTRAINT pk_user_log PRIMARY KEY (id)	
);

CREATE UNIQUE INDEX ON user_log(id);  

-- Table: STATION_NEARBY

DROP TABLE IF EXISTS station_nearby;

CREATE TABLE station_nearby(
	id serial NOT NULL,
	latitude decimal(15, 12) NULL,
	longitude decimal(15, 12) NULL,
	station_id int NOT NULL,
	user_id int,

	CONSTRAINT pk_station_nearby_id PRIMARY KEY (id),
	
	CONSTRAINT fk_station_nearby_station  
		FOREIGN KEY (station_id) REFERENCES station(id)
);

CLUSTER station_nearby USING pk_station_nearby_id;

-- Table: USER_FAVORITE

DROP TABLE IF EXISTS user_favorite;

CREATE TABLE user_favorite (
	user_id INT NOT NULL,
	station_id INT NOT NULL,	

	CONSTRAINT pk_user_favorite PRIMARY KEY (user_id, station_id),
	
	CONSTRAINT fk_user_favorite_station 
		FOREIGN KEY (station_id) REFERENCES station(id)
);

-- Table: STATION_RATING

DROP TABLE IF EXISTS station_rating;    

CREATE TABLE station_rating(	
	station_id INT NOT NULL,
	rate_value INT NOT NULL,
	CONSTRAINT pk_station_rating_id PRIMARY KEY (station_id),	
	CONSTRAINT fk_station_rating_station FOREIGN KEY (station_id) REFERENCES station(id)
);

CREATE UNIQUE INDEX station_id_idx ON station_rating(station_id);

-- Table: user_RATING_LOG

DROP TABLE IF EXISTS user_rating_log; 

CREATE TABLE user_rating_log(	
	user_id INT NOT NULL,
	station_id INT NOT NULL,
	rate_value INT NOT NULL,		
	CONSTRAINT pk_user_rating_log PRIMARY KEY(user_id, station_id),    
	CONSTRAINT fk_user_rating_log_station FOREIGN KEY (station_id) REFERENCES station(id)
);

CREATE UNIQUE INDEX user_rating_id_idx ON user_rating_log(user_id, station_id);

-- Table: user_recent_station

DROP TABLE IF EXISTS user_recent_station;

CREATE TABLE user_recent_station(	
	user_id INT NOT NULL,
	station_id INT NOT NULL,
	date_modified timestamp,

	CONSTRAINT pk_user_recent_station_id PRIMARY KEY (user_id, station_id),
	
	CONSTRAINT fk_user_recent_station_station 
		FOREIGN KEY (station_id) REFERENCES station(id)
);

CREATE INDEX user_recent_station_id_idx ON user_recent_station(user_id);

-- Table: USER_EMAIL_VERIFICATION_HASH

DROP TABLE IF EXISTS user_email_verification_hash;

CREATE TABLE user_email_verification_hash(
	id serial NOT NULL,
	email text NOT NULL CHECK((POSITION('.' IN email) > 3) AND (POSITION('@' IN email) > 1)),
	hash varchar(32) NOT NULL UNIQUE,--md5 string	
	expiration_date timestamp NOT NULL,	

	CONSTRAINT pk_user_email_verification_hash PRIMARY KEY(id)        
);

CREATE UNIQUE INDEX user_email_verification_hash_idx ON user_email_verification_hash(hash);

-- Table: USER_PASSWORD_RESET_HASH

DROP TABLE IF EXISTS user_password_reset_hash;

CREATE TABLE user_password_reset_hash(
	id serial NOT NULL,
	email text NOT NULL CHECK((POSITION('.' IN email) > 3) AND (POSITION('@' IN email) > 1)),
	hash varchar(32) NOT NULL UNIQUE,--md5 string	
	expiration_date timestamp NOT NULL,	

	CONSTRAINT pk_user_password_reset_hash PRIMARY KEY(id)        
);

CREATE UNIQUE INDEX user_password_reset_hash_idx ON user_password_reset_hash(email);

-- Table: USA_CITY_LOCATION

DROP TABLE IF EXISTS usa_city_location CASCADE;

CREATE TABLE usa_city_location (	
	id serial NOT NULL,
	city_name varchar(200) NOT NULL,
	state_code varchar(2) NOT NULL,		
	latitude decimal(15, 12) NULL,
	longitude decimal(15, 12) NULL,
	population int,

	CONSTRAINT u_location UNIQUE (city_name, state_code),	

	CONSTRAINT pk_city_location_id PRIMARY KEY (id)
);

CLUSTER usa_city_location USING u_location;

-- Table: STATION_TO_CITY

DROP TABLE IF EXISTS station_to_city;

CREATE TABLE station_to_city (		
	station_id int REFERENCES station(id),
	city_id int REFERENCES usa_city_location(id),		

	CONSTRAINT pk_station_to_city PRIMARY KEY (station_id, city_id)
);

CLUSTER station_to_city USING pk_station_to_city;

-- Table: USER_ALARM

DROP TABLE IF EXISTS user_alarm CASCADE;

CREATE TABLE user_alarm(
	alarm_id serial NOT NULL,
	user_id int NOT NULL,
	station_id int NOT NULL,	
	alarm_name varchar(25),
	alarm_time int, -- in seconds
	repeat int[],
	active smallint,
	last_played timestamp,			

	CONSTRAINT pk_user_alarm_id PRIMARY KEY(alarm_id),

	CONSTRAINT fk_user_alarm 
		FOREIGN KEY (station_id) REFERENCES station(id) 
);

CREATE UNIQUE INDEX user_alarm_id_idx ON user_alarm(alarm_id);

-- Table: USER_ALARM_DEVICE_TOKEN

DROP TABLE IF EXISTS user_alarm_device_token;

CREATE TABLE user_alarm_device_token(
	alarm_id int NOT NULL,	
	device_token text NOT NULL,			

	CONSTRAINT pk_user_alarm_device_token PRIMARY KEY(alarm_id, device_token),
	
	CONSTRAINT fk_user_alarm_device_token 
		FOREIGN KEY (alarm_id) REFERENCES user_alarm(alarm_id)      
);

-- Table: STATION_LINKS

DROP TYPE IF EXISTS link_type_enum CASCADE;

CREATE TYPE link_type_enum AS ENUM ('news', 'podcasts', 'linklist');

DROP TABLE IF EXISTS station_links;

CREATE TABLE station_links(
	id serial NOT NULL,
	station_id int NOT NULL,
	link_type link_type_enum,
	link_title varchar(100) NOT NULL,
	link_url text,

	CONSTRAINT pk_station_links_id PRIMARY KEY(id)
);

-- Table: setting

DROP TABLE IF EXISTS setting;

CREATE TABLE setting(
	name varchar(255),
	value text,

	CONSTRAINT pk_setting_id PRIMARY KEY(name)
);

CREATE UNIQUE INDEX setting_name_idx ON setting(name);



/* ****************************************************************************************************************** */
/* **************************************************** PROCEDURES PART ********************************************* */
/* ****************************************************************************************************************** */


-- sgf_alarms_get

DROP FUNCTION IF EXISTS sgf_alarms_get();

CREATE FUNCTION sgf_alarms_get() RETURNS TABLE(
	alarm_id int,
	station_id int,	
	alarm_name varchar(25),
	alarm_time int, 
	repeat varchar(14) -- 7 digits + 6 commas	
	) AS $$
DECLARE 
	l_seconds int;
	l_rec record;	
	l_seconds_before_alarm int; 
BEGIN
	RETURN QUERY SELECT t.alarm_id, t.station_id, t.alarm_name, t.alarm_time, ARRAY_TO_STRING(t.repeat, ',')::varchar(32) repeat 
		     FROM user_alarm AS t WHERE (active = 1); 
END;
$$ LANGUAGE plpgsql;

-- sgf_alarm_lastplayed_set

DROP FUNCTION IF EXISTS sgf_alarm_lastplayed_set(a_alarm_id int, a_last_played varchar(19));

CREATE FUNCTION sgf_alarm_lastplayed_set(a_alarm_id int, a_last_played varchar(19)) RETURNS VOID AS $$
BEGIN
	UPDATE user_alarm SET last_played = (SELECT TIMESTAMP a_last_played);	   
END;
$$ LANGUAGE plpgsql;

-- sgf_alarm_devicetokens_get

DROP FUNCTION IF EXISTS sgf_alarm_devicetokens_get(a_alarm_id int);

CREATE FUNCTION sgf_alarm_devicetokens_get(a_alarm_id int) RETURNS TABLE(device_token text) AS $$
BEGIN
	RETURN QUERY SELECT t.device_token FROM user_alarm_device_token as t WHERE (alarm_id = a_alarm_id);   
END;
$$ LANGUAGE plpgsql;

-- sgf_user_station_recent_add --

DROP FUNCTION IF EXISTS sgf_user_station_recent_add(a_user_id INT, a_station_id INT);
 
CREATE FUNCTION sgf_user_station_recent_add(a_user_id INT, a_station_id INT) RETURNS VOID AS $$ 
BEGIN	
	IF (NOT EXISTS( SELECT * FROM user_recent_station 
			WHERE (user_id = a_user_id) AND (station_id = a_station_id))) THEN
			
		INSERT INTO user_recent_station(user_id, station_id, date_modified) SELECT a_user_id, a_station_id, current_timestamp;
	ELSE
		UPDATE user_recent_station SET date_modified = current_timestamp WHERE (user_id = a_user_id) AND (station_id = a_station_id); 
	END IF;
END;
$$ LANGUAGE plpgsql;

-- sgf_station_nearby_add --

CREATE OR REPLACE FUNCTION sgf_station_nearby_add(a_user_id INT, a_station_id INT, a_lat FLOAT, a_lng FLOAT) RETURNS VOID AS $$
DECLARE 
	l_id INTEGER;	
BEGIN
	SELECT INTO l_id id FROM station_nearby WHERE (user_id = a_user_id);

	IF (l_id IS NULL) THEN
		INSERT INTO station_nearby(latitude, longitude, station_id, user_id) SELECT a_lat, a_lng, a_station_id, a_user_id;
	ELSE
		UPDATE station_nearby 
			SET latitude = a_lat, longitude = a_lng, station_id = a_station_id WHERE id = l_id;
	END IF;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_search_add --

CREATE OR REPLACE FUNCTION sgf_user_search_add(a_user_id integer, a_search_phrase text) RETURNS VOID AS $$
BEGIN
	INSERT INTO user_search(user_id, search_phrase, count, last_search) SELECT a_user_id, a_search_phrase, 1, CURRENT_TIMESTAMP
		ON CONFLICT (user_id, search_phrase) DO UPDATE SET count = user_search.count + 1, last_search = CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- sgf_station_details_get --

DROP FUNCTION IF EXISTS sgf_station_details_get(a_id INT, a_user_id INT);

CREATE FUNCTION sgf_station_details_get(a_id INT, a_user_id INT) RETURNS TABLE(		
	code character varying(255),
	title character varying(255),
	description text,	
	id int,
	stream_url text,	
	banner_url text,
	gateway_url text,
	genre_id int,	
	user_rate_value int,
	user_has_rate_value int,	
	is_in_favorites int,
	logo_is_generic smallint       
	) AS $$
BEGIN	
	RETURN QUERY SELECT 
		s.code, s.title, s.description, s.id, s.stream_url, s.banner_url, s.gateway_url, s.genre_id,  
		COALESCE(crl.rate_value, 0) AS user_rate_value, 
		CASE WHEN crl.rate_value IS NULL THEN 0 
		     ELSE 1 
		END as user_has_rate_value,				
		CASE WHEN f.station_id IS NULL THEN 0 
		     ELSE 1 
		END as is_in_favorites, 
		CASE WHEN (LENGTH(BTRIM(s.logo_url)) = 0) THEN 1 
		     ELSE 0 
		END::smallint as logo_is_generic		
		FROM station s 		
		LEFT JOIN user_favorite f 
		  ON (f.station_id = s.id) AND (f.user_id = a_user_id) 
		LEFT JOIN user_rating_log crl 
		  ON (crl.station_id = s.id) AND (crl.user_id = a_user_id) 
		WHERE (s.id IN (SELECT sgf_getactivestations())) AND (s.id = a_id);		
END;
$$ LANGUAGE plpgsql;

-- sgf_trackcover_add --

DROP FUNCTION IF EXISTS sgf_trackcover_add(a_track VARCHAR(255), a_url TEXT);

CREATE FUNCTION sgf_trackcover_add(a_track VARCHAR(255), a_url TEXT) RETURNS VOID AS $$ 
DECLARE 
	l_id int; 
BEGIN 
	SELECT INTO l_id id FROM track_cover_cache WHERE (LOWER(BTRIM(track)) = LOWER(BTRIM(a_track)));

	IF (l_id IS NULL) THEN
		INSERT INTO track_cover_cache(track, url, date_modified) SELECT LOWER(BTRIM(a_track)), a_url, current_timestamp;
	ELSE 
		UPDATE track_cover_cache SET url = a_url, date_modified = current_timestamp WHERE track = a_track;
	END IF;
END;
$$ LANGUAGE plpgsql;

-- sgf_trackcover_get --

DROP FUNCTION IF EXISTS sgf_trackcover_get(a_track varchar(255));

CREATE FUNCTION sgf_trackcover_get(a_track varchar(255)) RETURNS TABLE(url TEXT) AS $$
DECLARE
	l_url text;
BEGIN
	-- Search and drop old cached data (for 60 days)
	DELETE FROM track_cover_cache WHERE  current_date > (date_modified + INTERVAL '60 days');
	-- Selecting required url		
	SELECT INTO l_url tcc.url FROM track_cover_cache AS tcc WHERE (LOWER(BTRIM(track)) = LOWER(BTRIM(a_track)));
	RETURN QUERY SELECT l_url; --to avoid null result
END;
$$ LANGUAGE plpgsql;

-- sgf_station_nearby_get --

DROP FUNCTION IF EXISTS sgf_station_nearby_get(a_lat FLOAT, a_lng FLOAT);

CREATE FUNCTION sgf_station_nearby_get(a_lat FLOAT, a_lng FLOAT) RETURNS TABLE(
	id INT, 	
	title CHARACTER VARYING(255),	 
	description TEXT,
	genre_id INT	
	) AS $$
DECLARE
	l_rec RECORD;
	l_id_array INTEGER[];

BEGIN
	l_id_array := '{-1}'; -- cannot be empty as it will be used in IN(...) statement
        
	FOR l_rec IN
		SELECT s.id, sn.latitude, sn.longitude 
		FROM station_nearby sn
		JOIN station s ON (s.id = sn.station_id)
		WHERE (s.id IN (SELECT sgf_getactivestations()))		
	LOOP
		IF ( ST_Distance(
			  ST_Point(A_LNG, A_LAT)::geography,
			  ST_Point(L_REC.LONGITUDE, L_REC.LATITUDE)::geography) < 
			(5 * 1000) ) THEN -- not further than 5 km

			l_id_array := l_id_array || l_rec.id;
		END IF;
	END LOOP;

	RETURN QUERY EXECUTE
		CONCAT(' SELECT
			s.id, s.title, s.description, s.genre_id 
		FROM station s	    
		LEFT JOIN station_rating sr 
			ON (sr.station_id = s.id)
		WHERE (s.id IN( ', ARRAY_TO_STRING(l_id_array, ','), '))   
		ORDER BY sr.rate_value DESC');
			
END;
$$ LANGUAGE plpgsql;

-- sgf_station_rate -- 

DROP FUNCTION IF EXISTS sgf_station_rate(a_user_id INT, a_station_id int, a_rate int);

CREATE FUNCTION sgf_station_rate(a_user_id INT, a_station_id int, a_rate int) RETURNS VOID AS $$
DECLARE 
	l_log_id int;
	l_user_rate_value int;
	l_station_id int;	
BEGIN
	SELECT rate_value INTO l_user_rate_value FROM user_rating_log 
		WHERE (station_id = a_station_id) AND (user_id = a_user_id);

	IF (a_rate = l_user_rate_value)  THEN 
		RETURN;
	END IF;  	

	SELECT station_id INTO l_station_id FROM station_rating WHERE (station_id = a_station_id);

	IF (l_station_id IS NULL) THEN
		INSERT INTO station_rating(station_id, rate_value) SELECT a_station_id, a_rate;
	ELSE
		UPDATE station_rating SET rate_value = rate_value + a_rate -  COALESCE(l_user_rate_value, 0) 
			WHERE (station_id = a_station_id);
	END IF;

	IF (l_user_rate_value IS NULL) THEN
		INSERT INTO user_rating_log(user_id, station_id, rate_value) 
			VALUES (a_user_id, a_station_id, a_rate);
	ELSE
		UPDATE user_rating_log SET rate_value = a_rate WHERE (station_id = a_station_id) AND (user_id = a_user_id);
	END IF;
END;
$$ LANGUAGE plpgsql;

-- sgf_city_locations_loadfromfile --

CREATE OR REPLACE FUNCTION sgf_city_locations_loadfromfile(a_filename CHAR(1000)) RETURNS VOID AS $$  
DECLARE
	l_rec RECORD;
	l_population INT;
	l_id INT;	
BEGIN
	DROP TABLE IF EXISTS file_data;
	
	CREATE TEMPORARY TABLE file_data(		
		city_name VARCHAR(200),
		state_code VARCHAR(2),
		latitude DECIMAL(15, 12),
		longitude DECIMAL(15, 12),
		population INT
	);

	EXECUTE CONCAT('COPY FILE_DATA FROM ''', a_filename, ''' WITH CSV HEADER');

	FOR l_rec IN
		SELECT * FROM file_data WHERE 
			(NOT (city_name IS NULL)) AND (NOT (state_code IS NULL)) AND (NOT (latitude IS NULL)) AND (NOT (longitude IS NULL))
	LOOP
		SELECT p.id, p.population INTO l_id, l_population FROM usa_city_location AS p  
			WHERE (P.city_name = l_rec.city_name) AND (p.state_code = l_rec.state_code);

		IF (l_id IS NULL) THEN				
			INSERT INTO usa_city_location(city_name, state_code, latitude, longitude, population) 
				VALUES(l_rec.city_name, l_rec.state_code, l_rec.latitude, l_rec.longitude, l_rec.population);		

		ELSE 
			/*If there are multiple cities with the same name and , we take the one with bigger population*/
			IF (l_rec.population > l_population) THEN		
				UPDATE usa_city_location 
					SET latitude = l_rec.latitude, longitude = l_rec.longitude, population = l_rec.population
						WHERE (id = l_id);
			END IF;
		END IF;
	END LOOP;

	DROP TABLE file_data;	
END;
$$ LANGUAGE plpgsql;

-- sgf_genres_get --

CREATE OR REPLACE FUNCTION sgf_genres_get() RETURNS TABLE(
	id INT, 
	name CHARACTER VARYING(255),
	number_of_stations INT
	) AS $$
BEGIN
	RETURN QUERY 
		SELECT g.id, g.name, COALESCE(s.count, 0)::INT AS number_of_stations
		FROM station_genre g	
		    
		LEFT JOIN
		(SELECT s.genre_id AS genre_id, 
			COUNT(s.id) AS count			
				FROM station s					    		
				WHERE (s.id IN (SELECT sgf_getactivestations())) AND (s.genre_id > 0)		
				GROUP BY s.genre_id) AS s
			ON (s.genre_id = g.id)	
		
		WHERE (COALESCE(s.count, 0) > 0)				
		ORDER BY g.name ASC;	
END;
$$ LANGUAGE plpgsql;

  -- sgf_favorite_add --

CREATE OR REPLACE FUNCTION sgf_favorite_add(a_user_id INT, a_station_id INT) RETURNS VOID AS $$
DECLARE 
	l_user_id TEXT;
BEGIN
	-- checking for existence(just to be safe)
	SELECT INTO l_user_id user_id FROM user_favorite WHERE (station_id = a_station_id) AND (user_id = a_user_id);

	IF (l_user_id IS NULL) THEN 
		INSERT INTO user_favorite(user_id, station_id) SELECT a_user_id, a_station_id; 
	END IF;  
END;
$$ LANGUAGE plpgsql;

  -- sgf_favorite_delete --

CREATE OR REPLACE FUNCTION sgf_favorite_delete(a_user_id INT, a_station_id INT) RETURNS VOID AS $$
BEGIN
	DELETE FROM user_favorite WHERE (user_id = a_user_id) AND (station_id = a_station_id);	
END;
$$ LANGUAGE plpgsql;

-- SGF_LOGIN --

DROP FUNCTION IF EXISTS sgf_login(varchar(20), text);

CREATE OR REPLACE FUNCTION public.sgf_login(
    IN a_email character varying,
    IN a_password text)
  RETURNS TABLE(user_id integer, message text) AS
$BODY$
DECLARE 
	l_user_id int;
	l_message text;
BEGIN	
	-- checking username for existence
	SELECT INTO l_user_id id FROM user_data WHERE (LOWER(email) = LOWER(a_email));

	IF (l_user_id IS NULL) THEN 
		l_user_id := -1;
		l_message := concat('Email "', a_email, '" was not found');
	ELSE
		SELECT INTO l_user_id id FROM user_data WHERE (LOWER(email) = LOWER(a_email)) AND (password = a_password);
		IF (l_user_id IS NULL) THEN 
			l_user_id := -1;
			l_message := 'Password is incorrect';
		ELSE
			l_message := 'Success';
		END IF;  
		 
	END IF;

	RETURN QUERY SELECT l_user_id, l_message;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;
ALTER FUNCTION public.sgf_login(character varying, text)
  OWNER TO postgres;

-- sgf_email_checkifexists

DROP FUNCTION IF EXISTS sgf_email_checkifexists(a_email text);

CREATE FUNCTION sgf_email_checkifexists(a_email text) RETURNS TABLE(success smallint, info text) AS $$
DECLARE 
	l_id int;
BEGIN	
	a_email := LOWER(BTRIM(a_email));
	-- checking email for existence
	SELECT INTO l_id id FROM user_data WHERE (LOWER(email) = a_email);

	IF (l_id IS NOT NULL) THEN 
		RETURN QUERY SELECT 1::smallint, CONCAT('Email address "', a_email, '" already exists')::text;
		RETURN;
	END IF;			

	RETURN QUERY SELECT 0::smallint, 'Email address does not exist'::text;
END;
$$ LANGUAGE plpgsql;

-- sgf_email_checkformat

DROP FUNCTION IF EXISTS sgf_email_checkformat(character varying);

CREATE OR REPLACE FUNCTION sgf_email_checkformat(IN a_email character varying)
  RETURNS TABLE(success smallint, info text) AS $$
BEGIN	
	a_email := LOWER(BTRIM(a_email));
	-- checking email format
	IF (POSITION('.' IN a_email) < 3) OR (POSITION('@' IN a_email) < 2) OR (LENGTH(a_email) < 3) THEN 
		RETURN QUERY SELECT 0::smallint, 'Email address is invalid'::text;
		RETURN;
	END IF;

	RETURN QUERY SELECT 1::smallint, ''::text;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_register --

DROP FUNCTION IF EXISTS sgf_user_register(character varying(20), text, text,
	character(1), date, character varying(255), character varying(255));

CREATE OR REPLACE FUNCTION sgf_user_register(a_username character varying(20),  a_password text, 
	a_email text, a_gender character(1), a_birth_date date,
	a_first_name character varying(255), a_last_name character varying(255)) RETURNS TABLE(message text) AS $$
DECLARE 
	l_id int;
	l_message text;
	l_success smallint;
BEGIN	
	-- checking email
	SELECT INTO l_success, l_message c.success, c.info FROM sgf_email_checkforregistration(a_email) c; 
	
	IF l_success <> 1 THEN
		RETURN QUERY SELECT l_message::text;
		RETURN;
	END IF;

	-- checking gender info
	a_gender := LOWER(BTRIM(a_gender));
	IF (NOT ((a_gender = 'm') OR (a_gender = 'f') OR (a_gender = 'o'))) THEN 
		RETURN QUERY SELECT'Gender information is invalid'::text;
		RETURN;
	END IF;

	INSERT INTO user_data(username, password, email, gender, birth_date, first_name, 
				last_name, registration_date, email_verified, email_verification_complete_date)
		SELECT a_username, a_password, a_email, a_gender, a_birth_date, 
			a_first_name, a_last_name, current_timestamp, 0, null;				

	RETURN QUERY SELECT ''::text;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_email_verificationhash_add

CREATE OR REPLACE FUNCTION sgf_user_email_verificationhash_add(a_email text, a_hash varchar(32)) RETURNS VOID AS $$
DECLARE
	l_id int;
BEGIN
	SELECT INTO l_id id FROM user_email_verification_hash WHERE (email = a_email);	

	IF (l_id IS NULL) THEN		
		INSERT INTO user_email_verification_hash(email, hash, expiration_date) 
			VALUES(a_email, a_hash, CURRENT_TIMESTAMP + INTERVAL '1 day');
	END IF;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_password_addresethash

DROP FUNCTION IF EXISTS sgf_user_password_addresethash(a_email text, a_hash varchar(32)) ;

CREATE FUNCTION sgf_user_password_addresethash(a_email text, a_hash varchar(32)) RETURNS VOID AS $$
BEGIN
	DELETE FROM user_password_reset_hash WHERE (email = a_email);		
	INSERT INTO user_password_reset_hash(email, hash, expiration_date) VALUES(a_email, a_hash, CURRENT_TIMESTAMP + INTERVAL '1 day');
END;
$$ LANGUAGE plpgsql;

-- sgf_user_email_clearexpiredverificationhash

CREATE OR REPLACE FUNCTION sgf_user_email_clearexpiredverificationhash() RETURNS VOID AS $$
BEGIN	
	DELETE FROM user_email_verification_hash WHERE expiration_date < CURRENT_TIMESTAMP;	
END;
$$ LANGUAGE plpgsql;

-- sgf_user_email_verify

CREATE OR REPLACE FUNCTION sgf_user_email_verify(a_hash varchar(32)) RETURNS TABLE(message text) AS $$
DECLARE
	l_id int;
	l_email text;	
BEGIN	
	PERFORM sgf_user_email_clearexpiredverificationhash();-- clearing expired hashes

	-- checking hash for existence
	SELECT INTO l_id, l_email id, email FROM user_email_verification_hash WHERE (hash = a_hash);	
	IF ((l_id IS NULL) OR (l_email IS NULL)) THEN
		RETURN QUERY SELECT 'Varification hash was not found'::text;			
		RETURN;
	END IF;

	-- checking email for existence
	SELECT INTO l_id id FROM user_data WHERE (LOWER(email) = LOWER(l_email));
	IF (l_id IS NULL) THEN 
		RETURN QUERY SELECT concat('Email "', l_email, '" was not found')::text;
		RETURN;
	END IF;

	UPDATE user_data SET email_verified = 1, email_verification_complete_date = current_timestamp 
		WHERE id = l_id;
	
	RETURN QUERY SELECT ''::text;	
END;
$$ LANGUAGE plpgsql;

-- sgf_username_verify

DROP FUNCTION IF EXISTS sgf_username_verify(character varying);

CREATE FUNCTION sgf_username_verify(IN a_username character varying)
  RETURNS TABLE(success smallint, info text) AS $$
DECLARE
	l_id int;
	l_success smallint;
	l_username character varying;	
BEGIN	
	l_success := 0;
	l_username := LOWER(BTRIM(a_username));
	
	-- checking username length
	IF l_username = '' THEN
		RETURN QUERY SELECT l_success, 'Username is to short'::text;
		RETURN;
	ELSEIF LENGTH(l_username) > 20 THEN
		RETURN QUERY SELECT l_success, concat('Username "', a_username, '" is to long, more then 20 chars')::text;
		RETURN;
	END IF;

	-- checking for alpha numeric
	IF substring(a_username, '^[A-Za-z0-9_]+$') IS NULL THEN
		RETURN QUERY SELECT l_success, 'Username is incorrect'::text;
		RETURN;
	END IF;
	
	-- checking username for existence
	SELECT INTO l_id id FROM user_data WHERE (LOWER(username) = l_username);

	IF (l_id IS NOT NULL) THEN 
		RETURN QUERY SELECT l_success, concat('User "', a_username, '" already exists')::text;
	ELSE
		l_success := 1;
		RETURN QUERY SELECT l_success, ''::text;
	END IF;	
	RETURN;
END;
$$ LANGUAGE plpgsql;

-- sgf_email_checkforregistration

DROP FUNCTION IF EXISTS sgf_email_checkforregistration(character varying);

CREATE OR REPLACE FUNCTION sgf_email_checkforregistration(IN a_email character varying)
  RETURNS TABLE(success smallint, info text) AS $$
DECLARE 
	l_message text;
	l_success smallint;
BEGIN	
	-- checking email format 
	SELECT INTO l_success, l_message f.success, f.info FROM sgf_email_checkformat(a_email) f;
	
	IF l_success <> 1 THEN
		RETURN QUERY SELECT l_success, l_message::text;
		RETURN;
	END IF;

	-- checking email for existence, 1 - exist
	SELECT INTO l_success, l_message e.success, e.info FROM sgf_email_checkifexists(a_email) e;

	IF l_success <> 0 THEN
		l_success := 0;  -- in this case we must return 0 if email exist
		RETURN QUERY SELECT l_success, l_message::text;
		RETURN;
	END IF;

	RETURN QUERY SELECT 1::smallint, ''::text;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_password_clearexpiredhash

CREATE OR REPLACE FUNCTION sgf_user_password_clearexpiredhash() RETURNS VOID AS $$
BEGIN	
	DELETE FROM user_password_reset_hash WHERE expiration_date < current_timestamp;	
END;
$$ LANGUAGE plpgsql;

-- sgf_user_password_change --

DROP FUNCTION IF EXISTS sgf_user_password_change(a_hash character varying(32), a_password text);

CREATE OR REPLACE FUNCTION sgf_user_password_change(a_hash character varying(32), a_password text) RETURNS TABLE(success smallint, info text) AS $$
DECLARE 
	l_id int;	
BEGIN	
	PERFORM sgf_user_password_clearexpiredhash();-- clearing expired hash	
	
	-- checking email
	SELECT INTO l_id ud.id FROM user_password_reset_hash AS uprh
		LEFT JOIN user_data AS ud
		ON (uprh.email = ud.email)
		WHERE (uprh.hash = a_hash); 
	
	IF (l_id IS NULL) THEN 
		RETURN QUERY SELECT 0::smallint, 'Link has expired'::text;		
	ELSE
		UPDATE user_data SET password = a_password WHERE id = l_id; 
		RETURN QUERY SELECT 1::smallint, 'Password was successfully changed'::text;		
	END IF;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_info_get

DROP FUNCTION IF EXISTS sgf_user_info_get(integer);

CREATE OR REPLACE FUNCTION sgf_user_info_get(user_id integer)
  RETURNS TABLE(username character varying, password text, email text,
		gender character, birth_date int,
		first_name character varying, last_name character varying) AS $$
BEGIN
	RETURN QUERY SELECT
		u.username, u.password, u.email, u.gender, EXTRACT(YEAR FROM u.birth_date):: int, u.first_name, u.last_name
		FROM user_data u WHERE (user_id = id);
END;
$$ LANGUAGE plpgsql;

-- sgf_email_modify

DROP FUNCTION IF EXISTS sgf_email_modify(int, character varying);

CREATE FUNCTION sgf_email_modify(IN a_id int, IN a_email character varying)
  RETURNS TABLE(success smallint, info text) AS $$
DECLARE 
	l_message text;
	l_success smallint; 
BEGIN 
	SELECT INTO l_success, l_message f.success, f.info FROM sgf_email_checkforregistration(a_email) f;

	IF l_success <> 1 THEN
		RETURN QUERY SELECT l_success, l_message::text;
		RETURN;
	END IF;
	
	UPDATE user_data SET email = a_email WHERE id = a_id;
	RETURN QUERY SELECT 1::smallint, ''::text;
END;
$$ LANGUAGE plpgsql;

-- sgf_password_modify

DROP FUNCTION IF EXISTS sgf_password_modify(integer, text);

CREATE OR REPLACE FUNCTION sgf_password_modify(IN a_id integer,  IN a_password text)
  RETURNS void AS $$
BEGIN 
	UPDATE user_data SET password = a_password WHERE id = a_id;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_info_modify

DROP FUNCTION IF EXISTS sgf_user_info_modify(integer, character, date, character varying, character varying);

CREATE OR REPLACE FUNCTION sgf_user_info_modify(
    IN a_id integer,
    IN a_gender character,
    IN a_birth_date date,
    IN a_first_name character varying,
    IN a_last_name character varying)
  RETURNS void AS $$
BEGIN 
	UPDATE user_data
		SET gender = a_gender, birth_date = a_birth_date, first_name = a_first_name, last_name = a_last_name WHERE id = a_id;
END;
$$ LANGUAGE plpgsql;

-- sgf_username_modify

DROP FUNCTION IF EXISTS sgf_username_modify(int, character varying);

CREATE FUNCTION sgf_username_modify(IN a_id int, IN a_username character varying)
  RETURNS TABLE(success smallint, info text) AS $$
DECLARE 
	l_message text;
	l_success smallint; 
BEGIN 
	SELECT INTO l_success, l_message f.success, f.info FROM sgf_username_verify(a_username) f;

	IF l_success <> 1 THEN
		RETURN QUERY SELECT l_success, l_message::text;
		RETURN;
	END IF;
	
	UPDATE user_data SET username = a_username WHERE id = a_id;
	RETURN QUERY SELECT 1::smallint, ''::text;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_log_add

DROP FUNCTION IF EXISTS sgf_user_log_add(a_user_id int, a_date_added timestamp, a_session_id int, a_log_type varchar(32), a_message text);

CREATE FUNCTION sgf_user_log_add(
	a_user_id int, 
	a_date_added timestamp, 
	a_session_id int, 
	a_log_type varchar(32), 
	a_message text) RETURNS void AS $$
BEGIN 
	INSERT INTO user_log (user_id, session_id, date_added, log_type, message) 
		SELECT a_user_id, a_session_id, a_date_added, a_log_type, a_message; 	
END;
$$ LANGUAGE plpgsql;

-- sgf_station_setenabled

DROP FUNCTION IF EXISTS sgf_station_setenabled(a_id int, a_enabled smallint, a_comment text);

CREATE FUNCTION sgf_station_setenabled(a_id int, a_enabled smallint, a_comment text) RETURNS void AS $$
BEGIN 
	UPDATE station SET 
		enabled = a_enabled, 
		active = (active * a_enabled), 
		comment = a_comment
	WHERE id = a_id;
END;
$$ LANGUAGE plpgsql;

-- sgf_station_links_get

DROP FUNCTION IF EXISTS sgf_station_links_get(a_id integer);

CREATE OR REPLACE FUNCTION public.sgf_station_links_get(a_id integer)
  RETURNS TABLE(id integer, link_type link_type_enum, link_title character varying, link_url text) AS $$
BEGIN
	RETURN QUERY 
        SELECT sl.id, sl.link_type, sl.link_title, sl.link_url
        FROM station_links sl
        WHERE sl.station_id = a_id;
END;
$$ 
LANGUAGE plpgsql;

-- sgf_station_info_get

DROP FUNCTION IF EXISTS sgf_station_info_get(a_station_id integer, a_user_id integer, a_lat FLOAT, a_lng FLOAT);

CREATE OR REPLACE FUNCTION sgf_station_info_get(
    IN a_station_id integer,
    IN a_user_id integer, 
    IN a_lat FLOAT, 
    IN a_lng FLOAT)
  RETURNS TABLE(
    id integer, 
    title character varying, 
    description text,     
    genre_id integer,
    user_rate_value integer,
    user_has_rate_value integer,    
    is_in_favorites integer,
    city_name character varying) AS $$   
DECLARE
	l_rec RECORD;
	l_city_name character varying;
	l_current_distance float;
	l_result_distance float;
BEGIN
    l_city_name := '';

	FOR l_rec IN
		SELECT ucl.city_name, ucl.latitude, ucl.longitude
		FROM station_to_city stc 
			LEFT JOIN usa_city_location ucl ON (stc.city_id = ucl.id)
		WHERE (stc.station_id = a_station_id)
	LOOP
        l_current_distance := ST_DISTANCE( ST_POINT(a_lng, a_lat)::geography, 
            ST_POINT(l_rec.longitude, l_rec.latitude)::geography);
            
	    IF (l_city_name = '') THEN
            l_result_distance := l_current_distance;
            l_city_name := l_rec.city_name;
        ELSE     
            IF (l_current_distance < l_result_distance) THEN
                l_result_distance := l_current_distance;
                l_city_name := l_rec.city_name;
            END IF;
        END IF;    
	END LOOP;

	RETURN QUERY 
        SELECT 
            s.id, s.title, s.description, s.genre_id,
            COALESCE(crl.rate_value, 0) AS user_rate_value, 
		CASE WHEN crl.rate_value IS NULL THEN 0 
		     ELSE 1 
		END AS user_has_rate_value,				
		CASE WHEN f.station_id IS NULL THEN 0 
		     ELSE 1 
		END AS is_in_favorites,
		l_city_name AS city_name 
		FROM station s 		
		LEFT JOIN user_favorite f 
		  ON (f.station_id = s.id) AND (f.user_id = a_user_id) 
		LEFT JOIN user_rating_log crl 
		  ON (crl.station_id = s.id) AND (crl.user_id = a_user_id) 
		WHERE (s.id = a_station_id);		
END;
$$
LANGUAGE plpgsql;

-- sgf_user_extradata_add

DROP FUNCTION IF EXISTS sgf_user_extradata_add(a_user_id integer, a_data_code varchar(255), a_data_value text);

CREATE FUNCTION sgf_user_extradata_add(a_user_id integer, a_data_code varchar(255), a_data_value text) RETURNS VOID AS $$
BEGIN
	INSERT INTO user_extra_data(user_id, data_code, data_value) VALUES(a_user_id, a_data_code, a_data_value) 
		ON CONFLICT (user_id, data_code) DO UPDATE SET data_value = a_data_value; 
END;
$$ LANGUAGE plpgsql;

-- sgf_user_extradata_get

DROP FUNCTION IF EXISTS sgf_user_extradata_get(a_user_id integer, a_data_code varchar(255));

CREATE FUNCTION sgf_user_extradata_get(a_user_id integer, a_data_code varchar(255)) RETURNS TABLE(value text) AS $$
BEGIN
	RETURN QUERY SELECT data_value FROM user_extra_data WHERE (user_id = a_user_id) AND (data_code = a_data_code); 
END;
$$ LANGUAGE plpgsql;

-- sgf_setting_add

DROP FUNCTION IF EXISTS sgf_setting_add(a_name varchar(255), a_value text);

CREATE FUNCTION sgf_setting_add(a_name varchar(255),a_value text) RETURNS VOID AS $$	
BEGIN
	INSERT INTO setting(name, value) VALUES(a_name, a_value)	 
		ON CONFLICT (name) DO UPDATE SET value = a_value; 
END;
$$ LANGUAGE plpgsql;

-- sgf_setting_get

DROP FUNCTION IF EXISTS sgf_setting_get(a_name varchar(255));

CREATE FUNCTION sgf_setting_get(a_name varchar(255)) RETURNS TABLE(value text) AS $$
BEGIN
	RETURN QUERY SELECT COALESCE((SELECT s.value FROM setting AS s WHERE (name = a_name)), '')::text; 
END;
$$ LANGUAGE plpgsql;

-- sgf_user_search_getrecent

DROP FUNCTION IF EXISTS sgf_user_search_getrecent(a_id integer);

CREATE FUNCTION sgf_user_search_getrecent(a_user_id integer) RETURNS TABLE(name text) AS $$
BEGIN
	RETURN QUERY SELECT us.search_phrase AS name FROM user_search us WHERE (a_user_id = user_id) ORDER BY last_search DESC LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- sgf_user_getstartupinfo

DROP FUNCTION IF EXISTS sgf_user_getstartupinfo(varchar(20), text);

CREATE OR REPLACE FUNCTION sgf_user_getstartupinfo(a_username varchar(20), a_password text) RETURNS TABLE(
	user_id int, 
	message text,
	last_played_station_id int
	) AS $$
DECLARE 
	l_user_id int;
	l_message text;
	l_last_played_station_id int;
BEGIN	
	l_last_played_station_id := -1;
	
	-- trying to login
	SELECT lif.user_id, lif.message INTO l_user_id, l_message FROM sgf_login(a_username, a_password) AS lif;

	IF (COALESCE(l_user_id, -1) > 0) THEN
		SELECT CAST(COALESCE(value, '-1') AS integer) 
			INTO l_last_played_station_id FROM sgf_user_extradata_get(l_user_id, 'last_played_station');

	END IF;

	RETURN QUERY SELECT l_user_id, l_message, l_last_played_station_id;
END;
$$ LANGUAGE plpgsql;

-- sgf_feedback_get

DROP FUNCTION IF EXISTS sgf_feedback_get();

CREATE OR REPLACE FUNCTION sgf_feedback_get() RETURNS TABLE(
	user_id int,
	user_email varchar(255),
	date_added varchar(32), 
	rate smallint,
	look_and_feel smallint,
	navigation smallint,
	features smallint,
	usability smallint,
	content smallint,
	so_far_so_good smallint,
	missing_features smallint,
	confusing smallint,
	found_bugs smallint,	
	visually_unappealing smallint,
	description text
	) AS $$
BEGIN 
	RETURN QUERY SELECT 
		ued.user_id, 
		ud.email::varchar(255),
		btrim((ued.data_value::json -> 'addedDate')::varchar(32), '"')::varchar(32) AS added_date,
		(ued.data_value::json -> 'rate')::text::smallint AS rate,
		(ued.data_value::json -> 'lookAndFeel')::text::smallint AS look_and_feel,
		(ued.data_value::json -> 'navigation')::text::smallint AS navigation,
		(ued.data_value::json -> 'features')::text::smallint AS features,
		(ued.data_value::json -> 'usability')::text::smallint AS usability,
		(ued.data_value::json -> 'content')::text::smallint AS content,
		(ued.data_value::json -> 'soFarSoGood')::text::smallint AS so_far_so_good,
		(ued.data_value::json -> 'missingFeatures')::text::smallint AS missing_features,
		(ued.data_value::json -> 'confusing')::text::smallint AS confusing,
		(ued.data_value::json -> 'foundBugs')::text::smallint AS found_bugs,
		(ued.data_value::json -> 'visuallyUnappealing')::text::smallint AS visually_unappealing,
		btrim((ued.data_value::json -> 'description')::text, '"')::text  AS description
	FROM user_extra_data AS ued 
	LEFT JOIN user_data AS ud ON (ud.id = ued.user_id)
	WHERE ued.data_code LIKE 'user_feedback_%';
END;
$$ LANGUAGE plpgsql;

-- sgf_station_getdetailedlist

DROP FUNCTION IF EXISTS sgf_station_getdetailedlist();

CREATE FUNCTION sgf_station_getdetailedlist() RETURNS TABLE(		
	id int,
	staging_id int,
	code character varying(255),
	title character varying(255),
	description text,		
	genre_id int,
	genre_name text,
	cities text,	
	stream_url text,	
	banner_url text,
	gateway_url text,			
	logo_is_generic smallint,
	active smallint       
	) AS $$

BEGIN
	RETURN QUERY SELECT 
		s.id, s.staging_id, s.code, s.title, s.description, s.genre_id, sg.name::text, mn.cities, 
		s.stream_url, s.banner_url, s.gateway_url,   
		CASE WHEN (LENGTH(BTRIM(s.logo_url)) = 0) THEN 1 
		     ELSE 0 
		END::smallint as logo_is_generic, 
		CASE WHEN (act.id IS NULL) THEN 0
		     ELSE 1 
		END::smallint as active	
						
		FROM station s 			

		LEFT JOIN station_genre AS sg 
			ON (sg.id = s.genre_id)

		LEFT JOIN (SELECT stc.station_id, 
					CONCAT('(', count(stc.city_id), ') ', string_agg(ucl.city_name::text, ', ')) AS cities 
				FROM station_to_city AS stc
				LEFT JOIN usa_city_location AS ucl ON (ucl.id = stc.city_id)
				GROUP BY stc.station_id) AS mn --market_name
			ON (mn.station_id = s.id)

		LEFT JOIN (SELECT * FROM sgf_getactivestations()) AS act ON (act.id = s.id);			
END;
$$ LANGUAGE plpgsql;

-- sgf_station_extradata_add

DROP FUNCTION IF EXISTS sgf_station_extradata_add(a_station_id integer, a_data_code varchar(255), a_data_value text);

CREATE FUNCTION sgf_station_extradata_add(a_station_id integer, a_data_code varchar(255), a_data_value text) RETURNS VOID AS $$
BEGIN
	INSERT INTO station_extra_data(station_id, data_code, data_value) VALUES(a_station_id, a_data_code, a_data_value) 
		ON CONFLICT (station_id, data_code) DO UPDATE SET data_value = a_data_value; 
END;
$$ LANGUAGE plpgsql;

-- sgf_station_extradata_get

DROP FUNCTION IF EXISTS sgf_station_extradata_get(a_user_id integer, a_data_code varchar(255));

CREATE FUNCTION sgf_station_extradata_get(a_station_id integer, a_data_code varchar(255)) RETURNS TABLE(value text) AS $$
DECLARE
	l_result text;
BEGIN
	SELECT INTO l_result data_value FROM station_extra_data WHERE (station_id = a_station_id) AND (data_code = a_data_code); 
	RETURN QUERY SELECT COALESCE(l_result, '');
END;
$$ LANGUAGE plpgsql;

-- sgf_station_extradata_delete

DROP FUNCTION IF EXISTS sgf_station_extradata_delete(a_station_id integer, a_data_code varchar(255));

CREATE FUNCTION sgf_station_extradata_delete(a_station_id integer, a_data_code varchar(255)) RETURNS VOID AS $$
BEGIN
	DELETE FROM station_extra_data WHERE (station_id = a_station_id) AND (data_code = a_data_code); 
END;
$$ LANGUAGE plpgsql;

-- sgf_username_getbyemail

DROP FUNCTION IF EXISTS sgf_username_getbyemail(varchar);

CREATE OR REPLACE FUNCTION sgf_username_getbyemail(a_email varchar) RETURNS TABLE(username varchar) AS $$
DECLARE
	l_username character varying;
	l_first_name character varying;
BEGIN
	SELECT INTO l_username, l_first_name u.username, first_name FROM user_data u 
		WHERE (a_email = email);
	IF BTRIM(l_first_name) <> '' THEN	
		RETURN QUERY SELECT l_first_name; 
	ELSE
		RETURN QUERY SELECT l_username;	
	END IF;	
END;
$$ LANGUAGE plpgsql;

-- sgf_databaseinfo_set

DROP FUNCTION IF EXISTS sgf_databaseinfo_set(a_code varchar(255), a_value text);

CREATE FUNCTION sgf_databaseinfo_set(a_code varchar(255), a_value text) RETURNS void AS $$
BEGIN
	INSERT INTO database_info(code, value) VALUES(a_code, a_value) 
		ON CONFLICT (code) DO UPDATE SET value = a_value; 
END;
$$ LANGUAGE plpgsql;

-- sgf_databaseinfo_get

DROP FUNCTION IF EXISTS sgf_databaseinfo_get(a_code varchar(255));

CREATE FUNCTION sgf_databaseinfo_get(a_code varchar(255)) RETURNS TABLE(value text) AS $$
BEGIN
	RETURN QUERY SELECT COALESCE((SELECT dbi.value FROM database_info AS dbi WHERE code = a_code), '')::text;	
END;
$$ LANGUAGE plpgsql;

-- sgf_status

DROP FUNCTION IF EXISTS sgf_status();

CREATE FUNCTION sgf_status() RETURNS TABLE(tool varchar(255), status smallint) AS $$
DECLARE
	l_interval int;	
	l_last_run varchar;	
BEGIN
	--last_station_update

	SELECT INTO l_interval 
		CASE 
		  WHEN (value IS NULL) THEN 1440 --1440 default
		  ELSE value::int
		END
		FROM sgf_setting_get('station_update_interval');
	
	SELECT INTO l_last_run btrim(value) FROM sgf_databaseinfo_get('last_station_update');
	
	IF (length(l_last_run) <> 19) THEN  -- 19 for yyyy-mm-dd hh:nn:ss 
		l_last_run := '1999-01-01 01:01:01';
	END IF;

	RETURN QUERY SELECT 'station_data_refresher'::varchar(255), 		 
		CASE 
			WHEN (current_timestamp > to_timestamp(l_last_run, 'yyyy-mm-dd hh24:mi:ss') + 
				(l_interval || ' minutes')::interval) THEN 0
			ELSE 1
		END::smallint;
			

	--last_station_stream_validation

	SELECT INTO l_interval 
		CASE 
		  WHEN (value IS NULL) THEN 1440 --1440 default
		  ELSE value::int
		END
		FROM sgf_setting_get('station_stream_url_validation_interval');
	
	SELECT INTO l_last_run btrim(value) FROM sgf_databaseinfo_get('last_station_stream_validation');
	
	IF (length(l_last_run) <> 19) THEN  -- 19 for yyyy-mm-dd hh:nn:ss 
		l_last_run := '1999-01-01 01:01:01';
	END IF;

	RETURN QUERY SELECT 'station_stream_validator'::varchar(255), 		 
		CASE 
			WHEN (current_timestamp > to_timestamp(l_last_run, 'yyyy-mm-dd hh24:mi:ss') + 
				(l_interval || ' minutes')::interval) THEN 0
			ELSE 1
		END::smallint;	

		
	RETURN QUERY SELECT 'is_running'::varchar(255), 1::smallint;				
END;
$$ LANGUAGE plpgsql;

--sgf_getactivestations

DROP FUNCTION IF EXISTS sgf_getactivestations();

CREATE FUNCTION sgf_getactivestations() RETURNS TABLE(id integer) AS $$
BEGIN
	RETURN QUERY SELECT s.id
			FROM station AS s
			WHERE (s.active = 1) AND (s.enabled = 1)	
			ORDER BY s.id; 	
END;
$$ LANGUAGE plpgsql;

-- sgf_station_nowplaying_set

DROP TYPE IF EXISTS now_playing_info CASCADE;

CREATE TYPE now_playing_info AS (
	stream_id int, 		
	artist text,
	title text,
	album text,
	label text
);

DROP FUNCTION IF EXISTS sgf_station_nowplaying_set(a_value now_playing_info[]);

CREATE FUNCTION sgf_station_nowplaying_set(a_value now_playing_info[]) RETURNS void AS $$
DECLARE
	l_record RECORD;
BEGIN
	DELETE FROM station_now_playing;
	FOR l_record IN SELECT v.*, s.id AS station_id FROM unnest(a_value) AS v 
		LEFT JOIN station AS s ON (s.stream_id = v.stream_id) LOOP
			IF (COALESCE(l_record.station_id, -1) > 0) THEN				
				EXECUTE 'INSERT INTO station_now_playing(station_id, artist, title, album, label) VALUES(' || 
					l_record.station_id || ', ' || 
					quote_literal(btrim(l_record.artist)) || ', ' || 
					quote_literal(btrim(l_record.title)) || ', ' || 
					quote_literal(btrim(l_record.album)) || ', ' || 
					quote_literal(btrim(l_record.label)) || 
					') ON CONFLICT(station_id) DO NOTHING; ' ;
			END IF;
	END LOOP;
	
	EXECUTE sgf_databaseinfo_set('last_station_now_playing_update', to_char(current_timestamp, 'yyyy-mm-dd hh24:mi:ss'));	
END;
$$ LANGUAGE plpgsql;

-- sgf_station_nowplaying_search

DROP FUNCTION IF EXISTS sgf_station_nowplaying_search(a_phrase text);

CREATE FUNCTION sgf_station_nowplaying_search(a_phrase text) RETURNS TABLE(
	station_id int, 		
	artist text,
	title text,
	album text,
	label text
	) AS $$
BEGIN
	RETURN QUERY SELECT * FROM station_now_playing AS snp 
		WHERE 
		  (BTRIM(LOWER(snp.artist)) LIKE a_phrase) OR
		  (BTRIM(LOWER(snp.title)) LIKE a_phrase) OR
		  (BTRIM(LOWER(snp.album)) LIKE a_phrase) OR
		  (BTRIM(LOWER(snp.label)) LIKE a_phrase);
			
END;
$$ LANGUAGE plpgsql;

-- sgf_station_nowplaying_search

DROP FUNCTION IF EXISTS sgf_station_nowplaying_isactual();

CREATE FUNCTION sgf_station_nowplaying_isactual() RETURNS TABLE(success smallint) AS $$
DECLARE 
	l_last_update text;
	l_lifetime text;
	
BEGIN
	SELECT INTO l_last_update value FROM sgf_databaseinfo_get('last_station_now_playing_update');	
	SELECT INTO l_lifetime value FROM sgf_setting_get('station_now_playing_lifetime');	

	RETURN QUERY SELECT 
		CASE 
		  WHEN (current_timestamp > to_timestamp(l_last_update, 'yyyy-mm-dd hh24:mi:ss') + 
		       (l_lifetime || ' seconds')::interval) THEN 0::smallint
		  ELSE 1::smallint
		END;
			
END;
$$ LANGUAGE plpgsql;

-- sgf_station_local_get

DROP FUNCTION IF EXISTS sgf_station_local_get(a_lat FLOAT, a_lng FLOAT);

CREATE FUNCTION sgf_station_local_get(a_lat FLOAT, a_lng FLOAT) RETURNS TABLE(
	id INT,	
	title CHARACTER VARYING(255),	 
	description TEXT,
	genre_id INT,
	stream_is_valid smallint	
	) AS $$
DECLARE 	
        l_rec RECORD;
	l_id_array INTEGER[];
	l_distance text;	
BEGIN 
	SELECT INTO l_distance value FROM sgf_setting_get('local_station_distance_in_miles');
	
	IF (length(l_distance) < 1) THEN
		l_distance := 50;		
	END IF;	
	
	FOR l_rec IN
		SELECT stc.station_id, ucl.latitude, ucl.longitude FROM station_to_city stc 
			LEFT JOIN usa_city_location ucl ON (stc.city_id = ucl.id)
	LOOP
		IF ( ST_Distance(
			  ST_Point(A_LNG, A_LAT)::geography, 
			  ST_Point(L_REC.LONGITUDE, L_REC.LATITUDE)::geography) < 
				(to_number(l_distance, '99999') * 1.609344 * 1000) ) THEN -- 1.609344 km in 1 mile
			l_id_array := l_id_array || l_rec.station_id;
		END IF;
	END LOOP;

	IF (array_length(l_id_array, 1) > 0) THEN
		RETURN QUERY EXECUTE
			' SELECT  s.id, s.title, s.description, s.genre_id, 
				CASE 
				  WHEN (sed.data_value IS NULL) THEN 1 
				  ELSE 0 
				END::smallint AS stream_is_valid					
			FROM station s		
			LEFT JOIN station_rating sr 
			  ON (sr.station_id = s.id)
			LEFT JOIN station_extra_data AS sed 
			  ON (sed.station_id = s.id) AND (sed.data_code = ''stream_is_invalid'')			
			WHERE (s.id IN (SELECT sgf_getactivestations())) AND (s.id IN(' || ARRAY_TO_STRING(l_id_array, ',') || '))
			ORDER BY sr.rate_value DESC, stream_is_valid DESC; ';
	END IF;		
END;
$$ LANGUAGE plpgsql;

-- sgf_user_station_recent_get --

DROP FUNCTION IF EXISTS sgf_user_station_recent_get(a_user_id INT);

CREATE FUNCTION sgf_user_station_recent_get(a_user_id INT) RETURNS TABLE(
	id INT, 
	title CHARACTER VARYING(100), 
	description TEXT, 		
	genre_id INT,
	stream_is_valid smallint
	) AS $$
BEGIN
	RETURN QUERY
		SELECT s.id, s.title, s.description, s.genre_id, 
			CASE 
			  WHEN (sed.data_value IS NULL) THEN 1 
			  ELSE 0 
			END::smallint AS stream_is_valid
		FROM station s
		JOIN user_recent_station crs 
		  ON (crs.station_id = s.id)
		LEFT JOIN station_extra_data AS sed
		  ON (sed.station_id = s.id) AND (sed.data_code = 'stream_is_invalid')			
		WHERE (s.id IN (SELECT sgf_getactivestations()))
		AND (crs.user_id = a_user_id)
		ORDER BY crs.date_modified DESC
		LIMIT 25;
END;
$$ LANGUAGE plpgsql;

--sgf_favorites_get --

DROP FUNCTION IF EXISTS sgf_favorite_get(a_user_id INT);

CREATE FUNCTION sgf_favorite_get(a_user_id INT) RETURNS TABLE(
	id INT, 
	title CHARACTER VARYING(255),
	description TEXT,
	genre_id INT,
	stream_is_valid smallint	
	) AS $$
BEGIN
	RETURN QUERY 
		SELECT s.id, s.title, s.description, s.genre_id, 
			CASE 
			  WHEN (sed.data_value IS NULL) THEN 1 
			  ELSE 0 
			END::smallint AS stream_is_valid  
		FROM user_favorite f 
		LEFT JOIN station s 
		  ON (s.id = f.station_id)
		LEFT JOIN station_extra_data AS sed
		  ON (sed.station_id = s.id) AND (sed.data_code = 'stream_is_invalid')
		WHERE (f.user_id = a_user_id) AND (s.id IN (SELECT sgf_getactivestations()))
		ORDER BY s.title;
END;
$$ LANGUAGE plpgsql;

--sgf_station_getbygenre

DROP FUNCTION IF EXISTS sgf_station_getbygenre(a_genre_id INT);

CREATE FUNCTION sgf_station_getbygenre(a_genre_id INT) RETURNS TABLE(
	id INT, 
	title CHARACTER VARYING(255),
	description TEXT,
	genre_id INT,
	stream_is_valid smallint
	) AS $$
BEGIN
	RETURN QUERY 
		SELECT s.id, s.title, s.description, s.genre_id, 1::smallint
                FROM station s
                LEFT JOIN station_rating sr 
                  ON (sr.station_id = s.id)
                LEFT JOIN station_extra_data AS sed
		  ON (sed.station_id = s.id) AND (sed.data_code = 'stream_is_invalid') 
		WHERE (s.id IN (SELECT sgf_getactivestations())) AND (s.genre_id = a_genre_id) AND (sed.data_value IS NULL)
		ORDER BY sr.rate_value DESC;
END;
$$ LANGUAGE plpgsql;

-- sgf_search_result_get

DROP FUNCTION IF EXISTS sgf_search_result_get(a_phrase TEXT); 

CREATE OR REPLACE FUNCTION sgf_search_result_get(a_phrase TEXT) RETURNS TABLE(
	id int,
	genre_id int,	
	title character varying(255),
	description text,
	now_playing_artist text,
	now_playing_title text,
	stream_is_valid smallint
	) AS $$
DECLARE
	l_phrase TEXT;
BEGIN	
	l_phrase := concat('%', btrim(lower(regexp_replace(a_phrase, '\s+', ' ', 'g'))), '%');	

	RETURN QUERY SELECT 
			s.id, s.genre_id, s.title, s.description, np.artist, np.title, 1::smallint
			FROM station s 
			JOIN station_genre sg 
			  ON (sg.id = s.genre_id) 			
			  
			LEFT JOIN (SELECT stc.station_id, COUNT(usl.id) as lcount 
				     FROM station_to_city stc 
				   LEFT JOIN usa_city_location usl 
				     ON (stc.city_id = usl.id) AND (btrim(lower(usl.city_name)) LIKE l_phrase) 
				   GROUP BY stc.station_id) AS mn --market name
			  ON (mn.station_id = s.id)
			LEFT JOIN (SELECT * FROM sgf_station_nowplaying_search(l_phrase)) AS np --now playing
			  ON (np.station_id = s.id)
			LEFT JOIN station_extra_data AS sed
			  ON (sed.station_id = s.id) AND (sed.data_code = 'stream_is_invalid') 			  
			WHERE (s.id IN (SELECT sgf_getactivestations())) AND (sed.data_value IS NULL) AND
			  (		  
			  (BTRIM(LOWER(s.title)) like l_phrase) OR
			  (BTRIM(LOWER(s.description)) like l_phrase) OR 
			  (BTRIM(LOWER(s.code)) like l_phrase) OR 
			  (BTRIM(LOWER(s.name)) like l_phrase) OR 
			  (BTRIM(LOWER(s.url)) like l_phrase) OR 		  
			  (BTRIM(LOWER(sg.name)) like l_phrase)	OR 
			  (mn.lcount > 0) OR
			  (NOT (np.station_id IS NULL))
			  )
			ORDER BY s.id; --title;	
END;
$$ LANGUAGE plpgsql;

--sgf_station_getfulllist

DROP FUNCTION IF EXISTS sgf_station_getfulllist();

CREATE FUNCTION sgf_station_getfulllist() RETURNS TABLE(
	id INT, 
	title CHARACTER VARYING(255),
	description TEXT,
	genre_id INT,
	stream_is_valid smallint
	) AS $$
BEGIN
	RETURN QUERY 
		SELECT s.id, s.title, s.description, s.genre_id, 1::smallint
                FROM station AS s                
                LEFT JOIN station_extra_data AS sed
		  ON (sed.station_id = s.id) AND (sed.data_code = 'stream_is_invalid') 
		WHERE (s.id IN (SELECT sgf_getactivestations())) AND (sed.data_value IS NULL)
		ORDER BY s.title ASC;
END;
$$ LANGUAGE plpgsql;

-- sgf_station_rated_in_radius_get --

DROP FUNCTION IF EXISTS sgf_station_rated_in_radius_get(a_lat FLOAT, a_lng FLOAT, a_radius INT);

CREATE FUNCTION sgf_station_rated_in_radius_get(a_lat FLOAT, a_lng FLOAT, a_radius INT) RETURNS INTEGER[]  AS $$
DECLARE
	l_rec RECORD;
	l_id_array INTEGER[];
BEGIN
	l_id_array := '{}';     

	FOR l_rec IN
		SELECT stc.station_id, ucl.latitude, ucl.longitude
		FROM station_to_city stc 
		LEFT JOIN usa_city_location ucl ON (stc.city_id = ucl.id)
		LEFT JOIN station s ON (s.id = stc.station_id)
		INNER JOIN station_rating sr ON (sr.station_id = stc.station_id) AND (sr.rate_value > 0)
		WHERE (s.id IN (SELECT sgf_getactivestations()))
	LOOP
		IF ( ST_DISTANCE(
			  ST_POINT(a_lng, a_lat)::geography,
			  ST_POINT(l_rec.longitude, l_rec.latitude)::geography) < (a_radius * 1000) ) THEN
			IF ( (l_rec.station_id = ANY(l_id_array)) IS FALSE ) THEN -- we do not need duplicates			  
				l_id_array := l_id_array || l_rec.station_id;
			END IF;
		END IF;
	END LOOP;
	
	RETURN l_id_array;
END;
$$ LANGUAGE plpgsql;

-- sgf_station_getpopular --

DROP FUNCTION IF EXISTS sgf_station_getpopular(a_lat FLOAT, a_lng FLOAT);

CREATE FUNCTION sgf_station_getpopular(a_lat FLOAT, a_lng FLOAT) RETURNS TABLE(
	id INT, 	
	title CHARACTER VARYING(255),	 
	description TEXT, 
	genre_id INT, 	
	rate_value INTEGER,
	stream_is_valid smallint
	) AS $$
DECLARE
	l_id_array INTEGER[];
	l_number_of_popupal INT;
	l_sql_where_section TEXT;	
BEGIN
	l_number_of_popupal = 10;
	
	l_id_array := sgf_station_rated_in_radius_get(a_lat, a_lng, 10);

	IF ( COALESCE(ARRAY_LENGTH(l_id_array, 1), 0) < l_number_of_popupal ) THEN
		l_id_array := sgf_station_rated_in_radius_get(a_lat, a_lng, 250);
	END IF;

	IF ( COALESCE(ARRAY_LENGTH(l_id_array, 1), 0) < l_number_of_popupal ) THEN
		l_sql_where_section := 'WHERE (s.id IN (SELECT sgf_getactivestations())) ';
	ELSE
		l_sql_where_section := CONCAT('WHERE (s.id IN( ', ARRAY_TO_STRING(l_id_array, ','), ') ' );		
	END IF;	
	
	RETURN QUERY EXECUTE
		  'SELECT s.id, s.title, s.description, s.genre_id, sr.rate_value, 1::smallint
		FROM station s	    
		INNER JOIN station_rating sr 
			ON (sr.station_id = s.id) AND (sr.rate_value > 0) 
		LEFT JOIN station_extra_data AS sed
		  ON (sed.station_id = s.id) AND (sed.data_code = ''stream_is_invalid'') ' ||
		l_sql_where_section || ' AND (sed.data_value IS NULL)
		ORDER BY sr.rate_value DESC
		LIMIT ' || l_number_of_popupal || '; ';
	
END;
$$ LANGUAGE plpgsql;



/* ****************************************************************************************************************** */
/* **************************************************** DML PART **************************************************** */
/* ****************************************************************************************************************** */



SET DATESTYLE = "ISO, YMD";

-- CITY_LOCATIONS DATA

SELECT sgf_city_locations_loadfromfile('c:\StreamGateServer\USA_CITY_LOCATION.CSV');

-- setting

INSERT INTO setting(name, value) VALUES ('player_logo_rotation_interval', 15); --15 sec
INSERT INTO setting(name, value) VALUES ('station_update_interval', 1440); --1 day
INSERT INTO setting(name, value) VALUES ('station_stream_url_validation_interval', 1440); --1 day
INSERT INTO setting(name, value) VALUES ('auth_token', '274377B4-8C4F-48D5-B8B8-89D31A9FE2AB');
INSERT INTO setting(name, value) VALUES ('station_now_playing_lifetime', '15'); --15 seconds

INSERT INTO database_info(code, value) VALUES ('database_version', '1.0');


-- THE END --
SELECT 'completed'::CHAR(10) AS RESULT;
-------------