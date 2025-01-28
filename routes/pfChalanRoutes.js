const express = require('express');
const router = express.Router();
const { getAllPFChalan, createOrUpdatePFChalan ,getContractors} = require('../controllers/pfChalanController');

router.get('/', getAllPFChalan);
router.post('/', createOrUpdatePFChalan);
router.get('/contractors', getContractors);

module.exports = router;
