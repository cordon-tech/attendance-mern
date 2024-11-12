// backend/routes/fineRoutes.js
const express = require("express");
const { getContractorNames, getFinesByContractorAndMonth } = require("../controllers/FineMasterController");
const router = express.Router();

router.get("/contractors", getContractorNames);
router.get("/fines", getFinesByContractorAndMonth);

module.exports = router;
