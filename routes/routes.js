const express = require("express");
const controllers = require("../controllers/controllers");

const router = express.Router();

router.get("/machines", controllers.responseMachinesRequest);

module.exports = router;
