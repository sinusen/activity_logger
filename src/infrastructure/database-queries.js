//game-store.js - Store, retrieve and update game records in PostgreSQL database

const pool = require("./db-clientpool");
const { logError } = require("../utils/loggers.js");

const retrieveMachinesTable = async () => {
  const query = {
    text: `SELECT
            id,machine_name,machine_group,machine_location
          FROM 
            dw.machines_list
          ORDER BY
            machine_location,machine_group,machine_name;`,
  };
  try {
    const client = await pool.connect();
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
      logError(err, "Retirive machines - query error");
      return {
        error: true,
        noData: null,
        data: null,
      };
    } finally {
      client.release();
    }
  } catch (err) {
    logError(err, "Retirive machines - database connection error");
    return {
      error: true,
      noData: null,
      data: null,
    };
  }
};

const retrieveOperatorsTable = async () => {
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
    const client = await pool.connect();
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
      logError(err, "Retrieve operators - database query error");
      return {
        error: true,
        noData: null,
        data: null,
      };
    } finally {
      client.release();
    }
  } catch (err) {
    logError(err, "Retrieve operators - database connection error");
    return {
      error: true,
      noData: null,
      data: null,
    };
  }
};

const retrieveActivityTable = async () => {
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
    const client = await pool.connect();
    try {
      const res = await client.query(query);
      return {
        error: false,
        noData: false,
        data: res.rows,
      };
    } catch (err) {
      logError(err, "Retrieve activity - database query error");
      return {
        error: true,
        noData: null,
        data: null,
      };
    } finally {
      client.release();
    }
  } catch (err) {
    logError(err, "Retrieve activity - database connection error");
    return {
      error: true,
      noData: null,
      data: null,
    };
  }
};

const populateActivityLog = async ({
  epochMilliSeconds,
  machineId,
  operatorId,
  activity,
}) => {
  const query = {
    text: `INSERT INTO
          dw.activity_log (epoch_ms,machine_id,operator_id,activity,created_at)
          VALUES
          ('${epochMilliSeconds}','${machineId}','${operatorId}','${activity}',${Date.now()});`,
  };
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(query);
      if (res.rowCount == 0) {
        return true;
      }
      return false;
    } catch (err) {
      logError(err, "Populate activity - database query error");
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    logError(err, "Populate activity - database connection error");
    return true;
  }
};

const editActivityLog = async ({
  epochMilliSeconds,
  machineId,
  operatorId,
  activity,
  pk,
}) => {
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
    const client = await pool.connect();
    try {
      const res = await client.query(query);
      if (res.rowCount == 0) {
        return true;
      }
      return false;
    } catch (err) {
      logError(err, "Edit activity - database query error");
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    logError(err, "Edit activity - database connection error");
    return true;
  }
};

const deleteActivityLog = async ({ pk }) => {
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
    const client = await pool.connect();
    try {
      const res = await client.query(query);
      if (res.rowCount == 0) {
        return true;
      }
      return false;
    } catch (err) {
      logError(err, "Delete activity - database query error");
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    logError(err, "Delete activity - database connection error");
    return true;
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
