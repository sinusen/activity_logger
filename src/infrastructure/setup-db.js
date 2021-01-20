const pool = require("./db-clientpool");

const createDummyTables = async () => {
  const client = await pool.connect();

  const query = {
    text: `BEGIN;
    CREATE TABLE 
        dw.machines_list
    (
    pk serial,
    machine_name character varying COLLATE pg_catalog."default",
    machine_location character varying COLLATE pg_catalog."default",
    CONSTRAINT machines_list_pkey PRIMARY KEY (pk)
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
