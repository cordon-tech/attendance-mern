
// const express = require('express');
// const { saveDamageData, fetchWorkerName } = require('../controllers/damageController');

// const router = express.Router();

// router.post('/', saveDamageData); // This matches '/api/damage' in server.js

// router.get('/worker/:workerID', fetchWorkerName);

// module.exports = router;


const express = require("express");
const multer = require("multer");
const { saveDamageData, fetchWorkerName } = require("../controllers/damageController");

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for direct upload to Firebase
const upload = multer({ storage });

console.log({ saveDamageData, fetchWorkerName }); // Debugging: Check imported functions

router.post("/", upload.array("damageImages"), saveDamageData);
router.get("/worker/:workerID", fetchWorkerName);

module.exports = router;
