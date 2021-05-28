const logData = (log, action) => {
  console.log(
    `${Math.round(Date.now() / 1000)} ${action} ${JSON.stringify(log)}`
  );
};

const logError = (error, action) => {
  console.error(
    `${Math.round(Date.now() / 1000)} ${action} ${JSON.stringify(error)}`
  );
};

module.exports = {
  logData,
  logError,
};
