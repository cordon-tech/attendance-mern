// const mongoose = require('mongoose');

// const AMS_ID = new mongoose.Types.ObjectId(process.env._id);

// // Fetch contractor data by contractorId
// exports.getContractorById = async (req, res) => {
//   try {
//     const { contractorId } = req.params;

//     // Access the AMS collection
//     const amsCollection = mongoose.connection.collection('ams');

//     // Find the main document in AMS
//     const amsDoc = await amsCollection.findOne({ _id: AMS_ID });

//     if (!amsDoc || !amsDoc.contractorMaster) {
//       return res.status(404).json({ message: 'Contractor master not found' });
//     }

//     // Check if the contractor ID exists in contractorMaster
//     const contractorData = amsDoc.contractorMaster[contractorId];
//     if (!contractorData) {
//       return res.status(404).json({ message: 'Contractor not found' });
//     }

//     res.status(200).json(contractorData);
//   } catch (error) {
//     console.error('Error fetching contractor data:', error.message);
//     res.status(500).json({ message: 'Error fetching contractor data', error: error.message });
//   }
// };
const mongoose = require('mongoose');
const AMS_ID = new mongoose.Types.ObjectId(process.env._id);
// Fetch contractor data by contractorId
exports.getContractorById = async (req, res) => {
  try {
    const { contractorId } = req.params;
    // Access the AMS collection
    const amsCollection = mongoose.connection.collection('ams');
    // Find the main document in AMS
    const amsDoc = await amsCollection.findOne({ _id: AMS_ID });
    if (!amsDoc || !amsDoc.contractorMaster) {
      return res.status(404).json({ message: 'Contractor master not found' });
    }
    // Check if the contractor ID exists in contractorMaster
    const contractorData = amsDoc.contractorMaster[contractorId];
    if (!contractorData) {
      return res.status(404).json({ message: 'Contractor not found' });
    }
    res.status(200).json(contractorData);
  } catch (error) {
    console.error('Error fetching contractor data:', error.message);
    res.status(500).json({ message: 'Error fetching contractor data', error: error.message });
  }
};