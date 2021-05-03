const express = require("express");
const controllers = require("../controllers/controllers");

const router = express.Router();

router.get("/machines_groups_areas", controllers.responseMachinesRequest);
router.get("/operators", controllers.responseOperatorsRequest);
router.get("/activity-logs", controllers.getActivityLogs);
router.post("/submit-form-data", controllers.postActivityLog);
router.post("/edit-data", controllers.editActivityLog);
router.post("/delete-data", controllers.deleteActivityLog);

module.exports = router;
