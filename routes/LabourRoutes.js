
// const express = require('express');
// const router = express.Router();
// const {
//   getLabourRates,
//   addLabourRate,
//   getNextLabourId,
//   exportLabourRates,
//   updateLabourRate,
// } = require('../controllers/labourController');

// // Route to get all labour rates
// router.get('/get', getLabourRates);

// // Route to add a new labour rate
// router.post('/add', addLabourRate);

// // Route to get the next available labour ID
// router.get('/next-id', getNextLabourId);

// // Route to export labour rates as Excel
// router.get('/export', exportLabourRates);

// // Route to update labour rate
// router.put('/:labourId', updateLabourRate);


// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  getLabourRates,
  addLabourRate,
  getNextLabourId,
  exportLabourRates,
  updateLabourRate,
  deleteLabourRate
} = require('../controllers/labourController');

// Route to get all labour rates
router.get('/get', getLabourRates);

// Route to add a new labour rate
router.post('/add', addLabourRate);

// Route to get the next available labour ID
router.get('/next-id', getNextLabourId);

// Route to export labour rates as Excel
router.get('/export', exportLabourRates);

// Route to update labour rate
router.put('/:labourId', updateLabourRate);

// Route to delete a labour rate
router.delete('/:labourId', deleteLabourRate);



module.exports = router;