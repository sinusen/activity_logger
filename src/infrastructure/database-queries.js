//game-store.js - Store, retrieve and update game records in PostgreSQL database

const pool = require("./db-clientpool");

const retrieveMachinesTable = async () => {
  const client = await pool.connect();

  const query = {
    text: `SELECT
            id,machine_name,machine_group,machine_location
          FROM 
            dw.machines_list
          ORDER BY
            machine_location,machine_group,machine_name;`,
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
              id,
              first_name||' '||last_name as name
            FROM
              dw.people
            WHERE
              area::text[] && ARRAY['Team Leader','Manager','Maintenance']
            ORDER BY
              area,first_name;`,
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

const retrieveActivityTable = async () => {
  const client = await pool.connect();

  const query = {
    text: `SELECT
            pk,epoch_ms,machine_name,initials,activity
          FROM 
            dw.activity_log a
          LEFT JOIN dw.machines_list b ON a.machine_id = b.id
          LEFT JOIN dw.people c ON a.operator_id = c.id
          ORDER BY
            epoch_ms DESC;`,
  };

  try {
    const res = await client.query(query);
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

const populateActivityLog = async ({
  epochMilliSeconds,
  machineId,
  operatorId,
  activity,
}) => {
  const client = await pool.connect();

  const query = {
    text: `INSERT INTO
            dw.activity_log (epoch_ms,machine_id,operator_id,activity)
          VALUES
            ('${epochMilliSeconds}','${machineId}','${operatorId}','${activity}');`,
  };

  try {
    const res = await client.query(query);
    console.log(res);
    if (res.rowCount == 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err.detail);
    return true;
  } finally {
    client.release();
  }
};

module.exports = {
  retrieveMachinesTable,
  retrieveOperatorsTable,
  retrieveActivityTable,
  populateActivityLog,
};
