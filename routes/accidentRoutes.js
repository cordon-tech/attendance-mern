
const express = require("express");
const { saveAccidentData, fetchWorkerDetails } = require("../controllers/accidentController");

const router = express.Router();

// Route to save accident data
router.post("/", saveAccidentData);

// Route to fetch worker details by WorkerID
router.get("/:WorkerID", fetchWorkerDetails);

module.exports = router;
