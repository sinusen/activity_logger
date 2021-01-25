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

const postActivityLog = async function (req, res, next) {
  console.log(req.body);
  const error = await dbQueries.populateActivityLog(req.body);

  if (error) {
    res.send({ error: true, message: "Error uploading activity data" });
    return;
  }
  res.send({ error: false, message: "Activity data successfully uploaded" });
};

module.exports = {
  responseMachinesRequest,
  responseOperatorsRequest,
  postActivityLog,
};
