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
    PRIMARY KEY (id),
    UNIQUE(machine_name,machine_location)
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    INSERT INTO 
        dw.machines_list (machine_name,machine_location) 
    VALUES 
        ('dummy machine1','dummy area1'),
        ('dummy machine2','dummy area1'),
        ('dummy machine3', 'dummy area2'),
        ('dummy machine4','dummy area3'),
        ('dummy machine5','dummy area2');
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
