const { retrieveTable } = require("../infrastructure/database-queries");

async function analyzeRetrieveResponse() {
  const { error, noData, machinesList } = await retrieveTable();
  if (error || noData) {
    return {
      serverError: true,
      data: null,
    };
  }
  return {
    serverError: false,
    data: machinesList,
  };
}

const responseMachinesRequest = async function (req, res, next) {
  res.status(200).json(await analyzeRetrieveResponse());
};

module.exports = { responseMachinesRequest };
