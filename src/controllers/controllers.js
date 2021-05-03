const dbQueries = require("../infrastructure/database-queries");

async function analyzeRetrieveResponse(dbFunction) {
  const { error, noData, data } = await dbFunction();
  if (error || noData) {
    return {
      serverError: true,
      data: null,
    };
  }
  return {
    serverError: false,
    data: data,
  };
}

const responseMachinesRequest = async function (req, res, next) {
  res
    .status(200)
    .json(await analyzeRetrieveResponse(dbQueries.retrieveMachinesTable));
};

const responseOperatorsRequest = async function (req, res, next) {
  res
    .status(200)
    .json(await analyzeRetrieveResponse(dbQueries.retrieveOperatorsTable));
};

const getActivityLogs = async function (req, res, next) {
  res
    .status(200)
    .json(await analyzeRetrieveResponse(dbQueries.retrieveActivityTable));
};

const postActivityLog = async function (req, res, next) {
  console.log(req.body);
  const error = await dbQueries.populateActivityLog(req.body);

  if (error) {
    res.send({ error: true, message: "Error uploading activity data" });
    return;
  }
  res.send({ error: false, message: "Activity data successfully uploaded" });
};

const editActivityLog = async function (req, res, next) {
  const error = await dbQueries.editActivityLog(req.body);

  if (error) {
    res.send({ error: true, message: "Error uploading activity data" });
    return;
  }
  res.send({ error: false, message: "Activity data successfully updated" });
};

const deleteActivityLog = async function (req, res, next) {
  const error = await dbQueries.deleteActivityLog(req.body);

  if (error) {
    res.send({ error: true, message: "Error deleting activity data" });
    return;
  }
  res.send({ error: false, message: "Activity data successfully deleted" });
};

module.exports = {
  responseMachinesRequest,
  responseOperatorsRequest,
  getActivityLogs,
  postActivityLog,
  editActivityLog,
  deleteActivityLog,
};
