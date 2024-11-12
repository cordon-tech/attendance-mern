// backend/routes/damageRoutes.js
const express = require("express");
const { getContractorNames, getDamagesByContractorAndMonth,getWorkerDesignations } = require("../controllers/DamageOrLossMasterController");
const router = express.Router();

// Route to fetch contractor names
router.get("/contractors", getContractorNames);

// Route to fetch damage records for a specific contractor and month
router.get("/damage", getDamagesByContractorAndMonth);


router.get("/worker-designations", getWorkerDesignations);

module.exports = router;
