const pool = require("./db-clientpool");

const createDummyTables = async () => {
  const client = await pool.connect();

  const query = {
    text: `BEGIN;
    CREATE TABLE IF NOT EXISTS 
        dw.machines_list
    (
    id serial,
    machine_name character varying COLLATE pg_catalog."default",
    machine_location character varying COLLATE pg_catalog."default",
    machine_group character varying COLLATE pg_catalog."default",
    activity_count smallint,
    updated_at bigint,
    PRIMARY KEY (id),
    UNIQUE(machine_name,machine_group,machine_location)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    INSERT INTO 
        dw.machines_list (machine_name,machine_group,machine_location) 
    VALUES 
        ('dummy machine1','dummy group1','dummy area1'),
        ('dummy machine2','dummy group1','dummy area1'),
        ('dummy machine3', 'dummy group2','dummy area2'),
        ('dummy machine4','dummy group3','dummy area3'),
        ('dummy machine5','dummy group2','dummy area2');
    CREATE TABLE IF NOT EXISTS 
        dw.operator
    (
        id serial,
        first_name character varying COLLATE pg_catalog."default" NOT NULL,
        last_name character varying COLLATE pg_catalog."default" NOT NULL,
        machine_operator character varying COLLATE pg_catalog."default",
        area character varying[] COLLATE pg_catalog."default",
        PRIMARY KEY (id),
        UNIQUE (first_name,last_name)
    )
    WITH (
      OIDS = FALSE
    )
    TABLESPACE pg_default;
    INSERT INTO 
        dw.operator (first_name,last_name,machine_operator,area) 
    VALUES 
        ('first1','last1','fl1',ARRAY['dummy_department1','dummy_department3']),
        ('first2','last2','fl2',ARRAY['dummy_department2']),
        ('first3','last3','fl3',ARRAY['dummy_department2','dummy_department3']),
        ('first4','last4','fl4',ARRAY['dummy_department1','dummy_department3']);
    CREATE TABLE IF NOT EXISTS
        dw.activity_log
    (
        pk serial,
        epoch_ms bigint,
        machine_id smallint,
        operator_id smallint,
        activity character varying,
        PRIMARY KEY (pk),
        FOREIGN KEY (machine_id) REFERENCES dw.machines_list(id),
        FOREIGN KEY (operator_id) REFERENCES dw.operator(id),
        UNIQUE (epoch_ms,machine_id,operator_id)
    )
    WITH (
      OIDS = FALSE
    )
    TABLESPACE pg_default;
    CREATE FUNCTION dw.activity_log_insert_trigger()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
    AS $BODY$

    DECLARE 
      activity_count_holder integer;
      id_holder integer;

    BEGIN

    SELECT coalesce(activity_count,0),id INTO activity_count_holder,id_holder from dw.machines_list WHERE id = NEW.machine_id;

    IF found AND NEW.machine_id IS NOT NULL THEN
      UPDATE dw.machines_list
      SET activity_count = activity_count_holder+1,updated_at = ROUND(extract(epoch from now()))
      WHERE id = NEW.machine_id;
    END IF;

    RETURN NEW;
    END$BODY$;
    CREATE TRIGGER activity_log_event_trigger
      AFTER INSERT
      ON dw.activity_log
      FOR EACH ROW
      EXECUTE PROCEDURE dw.activity_log_insert_trigger();
    COMMIT;`,
  };
  try {
    const res = await client.query(query);
    console.log("DB setup successful");
  } catch (err) {
    console.error("DB setup error");
    console.error(err);
  } finally {
    client.release();
  }
  return;
};

createDummyTables();
