const express = require("express");
const { getContractorNames, getAdvancesByContractorAndMonth } = require("../controllers/advanceMasterController");
const router = express.Router();

// Route to fetch contractor names
router.get("/contractors", getContractorNames);

// Route to fetch advance data by contractor and month
router.get("/advances", getAdvancesByContractorAndMonth);

module.exports = router;
