const express = require("express");
const { getPolicies, updatePolicy, deletePolicy } = require("../controllers/PolicyMasterController");
const router = express.Router();
// router.post("/policies", addPolicy);
router.get("/policies", getPolicies);
router.put("/policies/:policyId", updatePolicy); // Update route
router.delete("/policies/:policyId", deletePolicy);

module.exports = router;
