const express = require("express");
const controllers = require("../controllers/controllers");

const router = express.Router();

router.get("/area-and-machines", controllers.responseMachinesRequest);
router.get("/operators", controllers.responseOperatorsRequest);
router.post("/submit-form-data", controllers.postActivityLog);

module.exports = router;
