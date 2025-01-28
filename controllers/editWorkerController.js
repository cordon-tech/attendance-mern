
// const mongoose = require('mongoose');

// const getWorkerDetails = async (req, res) => {
//   const { workerId } = req.params;

//   try {
//     // Adjusting the query to fit the structure: ams -> workerMaster -> workerId
//     const editWorkerData = await mongoose.connection.db
//       .collection('ams')
//       .findOne(
//         { [`workerMaster.${workerId}`]: { $exists: true } },
//         { projection: { [`workerMaster.${workerId}.firstName`]: 1, [`workerMaster.${workerId}.lastName`]: 1, [`workerMaster.${workerId}.contractorName`]: 1 } }
//       );

//     if (editWorkerData && editWorkerData.workerMaster[workerId]) {
//       const worker = editWorkerData.workerMaster[workerId];
//       res.json({
//         firstName: worker.firstName,
//         lastName: worker.lastName,
//         contractorName: worker.contractorName,
//       });
//     } else {
//       res.status(404).json({ message: 'Worker not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching worker details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { getWorkerDetails };
const mongoose = require('mongoose');

const getWorkerDetails = async (req, res) => {
  const { workerId } = req.params;

  try {
    // Query the database for the worker details
    const editWorkerData = await mongoose.connection.db
      .collection('ams')
      .findOne(
        { [`workerMaster.${workerId}`]: { $exists: true } }, // Adjust query to find worker by ID
        {
          projection: {
            [`workerMaster.${workerId}.firstName`]: 1,
            [`workerMaster.${workerId}.lastName`]: 1,
            [`workerMaster.${workerId}.contractorName`]: 1,
          },
        }
      );

    // Validate and extract worker data
    if (editWorkerData && editWorkerData.workerMaster?.[workerId]) {
      const { firstName, lastName, contractorName } = editWorkerData.workerMaster[workerId];
      return res.status(200).json({
        firstName,
        lastName,
        contractorName,
      });
    } else {
      return res.status(404).json({ message: 'Worker not found' });
    }
  } catch (error) {
    console.error('Error fetching worker details:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getWorkerDetails };
