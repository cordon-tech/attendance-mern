// const Ams = require('../models/ContractorMasterModel');

// // Get all contractors from contractorMaster map
// exports.getAllContractors = async (req, res) => {
//   try {
//     const amsDoc = await Ams.findOne(); // Fetch AMS document from the 'ams' collection
//     console.log("AMS Document:", amsDoc); // Log to check if we are fetching the AMS document

//     if (!amsDoc || !amsDoc.contractorMaster) {
//       console.log("No contractors found"); // Log if no contractors are found
//       return res.status(404).json({ message: 'No contractors found' });
//     }

//     // Extract contractors, map entries to array
//     const contractors = Array.from(amsDoc.contractorMaster.entries()).map(([contractorId, contractorData]) => ({
//       contractorId,
//       ...contractorData.toObject(),
//     }));

//     console.log("Contractors Fetched:", contractors); // Log fetched contractor data

//     // Respond with contractor data (excluding documents for now)
//     res.json(contractors);
//   } catch (error) {
//     console.error('Error fetching contractor data:', error); // Log any errors
//     res.status(500).json({ message: 'Error fetching contractor data' });
//   }
// };










const Ams = require('../models/ContractorMasterModel');

// Get all contractors
// Get all contractors
exports.getAllContractors = async (req, res) => {
  try {
    console.log("Fetching contractors from Ams collection...");
    
    const amsDoc = await Ams.findOne();
    console.log("Fetched Ams document:", amsDoc);

    if (!amsDoc) {
      console.log("Ams document not found.");
      return res.status(404).json({ message: 'Ams document not found' });
    }

    if (!amsDoc.contractorMaster) {
      console.log("No contractorMaster data found in Ams document.");
      return res.status(404).json({ message: 'No contractors found' });
    }

    // Log contractorMaster data to see its structure
    console.log("contractorMaster data:", amsDoc.contractorMaster);

    // Convert contractorMaster object to an array of contractors
    const contractors = Object.entries(amsDoc.contractorMaster).map(([contractorId, contractorData]) => ({
      contractorId,
      ...contractorData,
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
