const express = require("express");
const controllers = require("../controllers/controllers");

const router = express.Router();

router.get("/area-and-machines", controllers.responseMachinesRequest);
router.get("/operators", controllers.responseOperatorsRequest);
router.get("/activity-logs", controllers.getActivityLogs);
router.post("/submit-form-data", controllers.postActivityLog);

module.exports = router;
