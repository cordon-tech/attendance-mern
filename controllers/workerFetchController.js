// const mongoose = require('mongoose');

// // Fetch all workers from workerMaster
// exports.getAllWorkers = async (req, res) => {
//   try {
//     const data = await mongoose.connection.collection('ams').findOne({}, { projection: { workerMaster: 1 } });
//     const workers = data?.workerMaster ? Object.values(data.workerMaster) : []; // Convert to array
//     res.status(200).json(workers);
//   } catch (error) {
//     console.error('Error fetching workers:', error);
//     res.status(500).json({ message: 'Failed to fetch workers' });
//   }
// };
const mongoose = require('mongoose');

// Fetch all workers from workerMaster
exports.getAllWorkers = async (req, res) => {
  try {
    const data = await mongoose.connection.collection('ams').findOne({}, { projection: { workerMaster: 1 } });
    const workers = data?.workerMaster ? Object.values(data.workerMaster) : []; // Convert to array
 
    // Add full URL to images (adjust base URL as per your server's setup)
 const baseUrl = 'http://localhost:5000/uploads/';
 workers.forEach((worker) => {
   worker.adharFront = worker.adharFront ? `${baseUrl}${worker.adharFront}` : null;
   worker.adharBack = worker.adharBack ? `${baseUrl}${worker.adharBack}` : null;
   worker.bankPhoto = worker.bankPhoto ? `${baseUrl}${worker.bankPhoto}` : null;
 });


    res.status(200).json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Failed to fetch workers' });
  }
};
// Update worker details
exports.updateWorker = async (req, res) => {
  const { workerId, updatedData } = req.body;

  try {
    // Update the specific worker inside the workerMaster object
    const result = await mongoose.connection.collection('ams').updateOne(
      { [`workerMaster.${workerId}`]: { $exists: true } }, // Find the worker by ID
      { $set: { [`workerMaster.${workerId}`]: updatedData } } // Update the specific worker
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Worker not found or no changes detected' });
    }

    res.status(200).json({ message: 'Worker updated successfully' });
  } catch (error) {
    console.error('Error updating worker:', error);
    res.status(500).json({ message: 'Failed to update worker' });
  }
};




// Delete worker
exports.deleteWorker = async (req, res) => {
  const { workerId } = req.params;
  try {
    const updateResult = await mongoose.connection.collection('ams').updateOne(
      {},
      { $unset: { [`workerMaster.${workerId}`]: "" } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    console.error('Error deleting worker:', error);
    res.status(500).json({ message: 'Failed to delete worker' });
  }
};