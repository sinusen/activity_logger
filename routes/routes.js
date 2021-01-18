const express = require("express");
const controllers = require("../controllers/controllers");

const router = express.Router();

router.get("/area-and-machines", controllers.responseMachinesRequest);

module.exports = router;
