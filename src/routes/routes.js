const express = require("express");
const controllers = require("../controllers/controllers");

const router = express.Router();

router.get("/area-and-machines", controllers.responseMachinesRequest);
router.get("/operators", controllers.responseOperatorsRequest);

module.exports = router;
