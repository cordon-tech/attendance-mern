const Ams = require('../models/ContractorMasterModel');

// Get all contractors
exports.getAllContractors = async (req, res) => {
  try {
    console.log("Fetching contractors from Ams collection...");
    
    const amsDoc = await Ams.findOne();
    console.log("Fetched Ams document:", amsDoc);

    if (!amsDoc || !amsDoc.contractorMaster) {
      console.log("No contractorMaster data found in Ams document.");
      return res.status(404).json({ message: 'No contractors found' });
    }

    // Convert contractorMaster Map to an array
    const contractors = Object.keys(amsDoc.contractorMaster).map(contractorId => ({
      contractorId,
      ...amsDoc.contractorMaster[contractorId]
    }));

    console.log("Formatted contractors array:", contractors);
    res.json(contractors);
  } catch (error) {
    console.error("Error fetching contractor data:", error);
    res.status(500).json({ message: 'Error fetching contractor data', error: error.message });
  }
};

// Update contractor
exports.updateContractor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const amsDoc = await Ams.findOne();
    if (!amsDoc || !amsDoc.contractorMaster.has(id)) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    // Update the contractor data in the Map
    amsDoc.contractorMaster.set(id, updatedData);
    await amsDoc.save();

    res.json({ message: 'Contractor updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contractor data' });
  }
};

// Delete contractor
exports.deleteContractor = async (req, res) => {
  try {
    const { id } = req.params;
    
    const amsDoc = await Ams.findOne();
    if (!amsDoc || !amsDoc.contractorMaster.has(id)) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    // Delete the contractor from the Map
    amsDoc.contractorMaster.delete(id);
    await amsDoc.save();

    res.json({ message: 'Contractor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contractor data' });
  }
};
