//game-store.js - Store, retrieve and update game records in PostgreSQL database

const pool = require("./db-clientpool");

const retrieveTable = async () => {
  const client = await pool.connect();

  const query = {
    text: `SELECT
            machine_name,machine_location
          FROM 
            dw.machines_list;`,
  };

  try {
    const res = await client.query(query);
    if (res.rowCount == 0) {
      return {
        error: false,
        noData: true,
        machinesList: null,
      };
    }
    return {
      error: false,
      noData: false,
      machinesList: res.rows,
    };
  } catch (err) {
    console.error(err);
    return {
      error: true,
      noData: null,
      machinesList: null,
    };
  } finally {
    client.release();
  }
};

module.exports = { retrieveTable };
