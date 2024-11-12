const Ams = require('../models/ContractorMasterModel');

// Fetch contractor data by contractorId
exports.getContractorById = async (req, res) => {
  try {
    const { id } = req.params;
    const amsDoc = await Ams.findOne();
    
    if (!amsDoc || !amsDoc.contractorMaster.has(id)) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    const contractorData = amsDoc.contractorMaster.get(id);
    res.json(contractorData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contractor data' });
  }
};
