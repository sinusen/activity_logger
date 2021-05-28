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
    logError(err, "retirive machines");
    return {
      error: true,
      noData: null,
      data: null,
    };
  } finally {
    try {
      client.release();
    } catch (error) {
      logError(error, "client release");
    }
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
    logError(err, "retrieve operators");
    return {
      error: true,
      noData: null,
      data: null,
    };
  } finally {
    try {
      client.release();
    } catch (error) {
      logError(error, "client release");
    }
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
    const res = await client.query(query);
    return {
      error: false,
      noData: false,
      data: res.rows,
    };
  } catch (err) {
    logError(err, "retrieve activity");
    return {
      error: true,
      noData: null,
      data: null,
    };
  } finally {
    try {
      client.release();
    } catch (error) {
      logError(error, "client release");
    }
  }
};

const populateActivityLog = async ({
  epochMilliSeconds,
  machineId,
  operatorId,
  activity,
}) => {
  try {
    const client = await pool.connect();

    const query = {
      text: `INSERT INTO
            dw.activity_log (epoch_ms,machine_id,operator_id,activity,created_at)
          VALUES
            ('${epochMilliSeconds}','${machineId}','${operatorId}','${activity}',${Date.now()});`,
    };

    const res = await client.query(query);
    if (res.rowCount == 0) {
      return true;
    }
    return false;
  } catch (err) {
    logError(err, "populate activity");
    return true;
  } finally {
    try {
      client.release();
    } catch (error) {
      logError(error, "client release");
    }
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
    const res = await client.query(query);
    if (res.rowCount == 0) {
      return true;
    }
    return false;
  } catch (err) {
    logError(err, "edit activity");
    return true;
  } finally {
    try {
      client.release();
    } catch (error) {
      logError(error, "client release");
    }
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
    const res = await client.query(query);
    if (res.rowCount == 0) {
      return true;
    }
    return false;
  } catch (err) {
    logError(err, "delete activity");
    return true;
  } finally {
    try {
      client.release();
    } catch (error) {
      logError(error, "client release");
    }
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
