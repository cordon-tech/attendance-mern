const express = require("express");
const router = express.Router();
const contractorMasterController = require("../controllers/contractorMasterController");

router.get("/", contractorMasterController.getContractors);
router.put("/:contractorId", contractorMasterController.updateContractor);
router.delete("/:contractorId", contractorMasterController.deleteContractor);

module.exports = router;



