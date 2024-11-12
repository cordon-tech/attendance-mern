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
    res.status(200).json(workers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Failed to fetch workers' });
  }
};
