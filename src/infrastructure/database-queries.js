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
              first_name||' '||last_name as name,
              initials
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
          WHERE
            a.status = 'current'
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
            dw.activity_log (epoch_ms,machine_id,operator_id,activity,created_at)
          VALUES
            ('${epochMilliSeconds}','${machineId}','${operatorId}','${activity}',${Date.now()});`,
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

const editActivityLog = async ({
  epochMilliSeconds,
  machineId,
  operatorId,
  activity,
  pk,
}) => {
  const client = await pool.connect();

  const query = {
    text: `BEGIN;
          UPDATE
            dw.activity_log
          SET
            status = 'obsolete',
            updated_at = ${Date.now()}
          WHERE
            pk = ${pk};
          INSERT INTO
            dw.activity_log (epoch_ms,machine_id,operator_id,activity,created_at,previous_record)
          VALUES
            ('${epochMilliSeconds}','${machineId}','${operatorId}','${activity}',${Date.now()},${pk});
          COMMIT;`,
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

const deleteActivityLog = async ({ pk }) => {
  const client = await pool.connect();

  const query = {
    text: `UPDATE
            dw.activity_log
          SET
            status = 'obsolete',
            updated_at = ${Date.now()}
          WHERE
            pk = ${pk};`,
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
  editActivityLog,
  deleteActivityLog,
};
