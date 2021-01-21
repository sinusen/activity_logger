//game-store.js - Store, retrieve and update game records in PostgreSQL database

const pool = require("./db-clientpool");

const retrieveMachinesTable = async () => {
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
        data: null,
      };
    }
    return {
      error: false,
      noData: false,
      data: res.rows,
    };
  } catch (err) {
    console.error(err);
    return {
      error: true,
      noData: null,
      data: null,
    };
  } finally {
    client.release();
  }
};

const retrieveOperatorsTable = async () => {
  const client = await pool.connect();

  const query = {
    text: `SELECT
              first_name||' '||last_name as name,
              machine_operator,
              area
            FROM
              dw.operator
            ORDER BY
              area;`,
  };

  try {
    const res = await client.query(query);
    if (res.rowCount == 0) {
      return {
        error: false,
        noData: true,
        data: null,
      };
    }
    return {
      error: false,
      noData: false,
      data: res.rows,
    };
  } catch (err) {
    console.error(err);
    return {
      error: true,
      noData: null,
      data: null,
    };
  } finally {
    client.release();
  }
};

module.exports = { retrieveMachinesTable, retrieveOperatorsTable };
