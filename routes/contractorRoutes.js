// const express = require('express');
// const router = express.Router();
// const { registerContractor } = require('../controllers/contractorController');

// // POST route to register a contractor
// router.post('/register', registerContractor);

// module.exports = router;





const express = require('express');
const router = express.Router();
const { registerContractor } = require('../controllers/contractorController');
const upload = require('../controllers/contractorController').upload; // Import multer upload

// POST route to register a contractor with image uploads
router.post('/register', upload.fields([
  { name: 'aadharCardFront' }, 
  { name: 'aadharCardBack' }, 
  { name: 'bocwLicense' }, 
  { name: 'esicCodeLetter' }, 
  { name: 'labourLicense' }, 
  { name: 'mlwfCodeLetter' }, 
  { name: 'providentFundCode' }, 
  { name: 'ptecPtrcCode' }, 
  { name: 'shopActLicense' },
  { name: 'wcPolicy' }
]), registerContractor);

module.exports = router;
