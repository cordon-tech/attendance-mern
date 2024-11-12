
// // overtimeController.js
// const mongoose = require('mongoose');
// const Overtime = require('../models/overtimeModel');
// const { v4: uuidv4 } = require('uuid'); // Use UUID for unique keys

// // Create a new overtime entry
// exports.createOvertime = async (req, res) => {
//   try {
//     const newOvertimeData = req.body;
//     const overtimeId = uuidv4(); // Generate a unique ID for each entry

//     // Use findOneAndUpdate to add the new entry as an object with a unique key
//     const result = await Overtime.findOneAndUpdate(
//       {}, // Empty filter to ensure we have a single document in `ams`
//       { [`overtimeMaster.${overtimeId}`]: newOvertimeData },
//       { upsert: true, new: true }
//     );

//     res.status(201).json({ message: 'Overtime entry created successfully!', overtime: result.overtimeMaster });
//   } catch (error) {
//     console.error('Error creating overtime entry:', error);
//     res.status(500).json({ message: 'Failed to create overtime entry', error: error.message });
//   }
// };

// // Remaining methods for fetching overtime entries
// exports.getAllOvertimeEntries = async (req, res) => {
//   try {
//     const overtimeEntries = await Overtime.findOne({ _id: 'overtimeMaster' });
//     res.status(200).json(overtimeEntries ? overtimeEntries.overtimeMaster : []);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch overtime entries', error: error.message });
//   }
// };

// exports.getOvertimeById = async (req, res) => {
//   try {
//     const overtimeEntry = await Overtime.findOne(
//       { _id: 'overtimeMaster', 'overtimeMaster._id': mongoose.Types.ObjectId(req.params.id) },
//       { 'overtimeMaster.$': 1 }
//     );

//     if (!overtimeEntry) {
//       return res.status(404).json({ message: 'Overtime entry not found' });
//     }
//     res.status(200).json(overtimeEntry.overtimeMaster[0]);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch overtime entry', error: error.message });
//   }
// };


// overtimeController.js
const mongoose = require('mongoose');
const Overtime = require('../models/overtimeModel');
const { v4: uuidv4 } = require('uuid'); // Generate a unique ID for each entry

// Create a new overtime entry

// // Create a new overtime entry
// exports.createOvertime = async (req, res) => {
//   try {
//     const { employeeId, dateOfOvertime, ...overtimeData } = req.body;

//     // Access `ams` collection to retrieve contractorName
//     const amsCollection = mongoose.connection.collection('ams');
    
//     const amsDocument = await amsCollection.findOne({
//       [`workerMaster.${employeeId}.contractorName`]: { $exists: true }
//     });

//     if (!amsDocument || !amsDocument.workerMaster[employeeId]?.contractorName) {
//       return res.status(404).json({ message: 'Worker or contractorName not found' });
//     }

//     const contractorName = amsDocument.workerMaster[employeeId].contractorName;
//     const formattedDate = new Date(dateOfOvertime).toISOString().split('T')[0];

//     // Store the entry in `overtimeMaster`
//     const result = await amsCollection.updateOne(
//       {}, // Find the single document in the `ams` collection
//       {
//         $set: {
//           [`overtimeMaster.${contractorName}.${formattedDate}.${employeeId}`]: overtimeData
//         }
//       },
//       { upsert: true }
//     );

//     // Ensure a clear response with consistent data
//     res.status(201).json({
//       message: 'Overtime entry created successfully!',
//       contractorName,
//       dateOfOvertime: formattedDate,
//       employeeId,
//       overtimeData,
//     });
//   } catch (error) {
//     console.error('Error creating overtime entry:', error);
//     res.status(500).json({ message: 'Failed to create overtime entry', error: error.message });
//   }
// };
// Create a new overtime entry
exports.createOvertime = async (req, res) => {
  try {
    const { employeeId, dateOfOvertime, ...overtimeData } = req.body;

    // Access `ams` collection to retrieve contractorName based on `workerId`
    const amsCollection = mongoose.connection.collection('ams');
    
    // Use `workerId` in `workerMaster` to match `employeeId` from the request
    const amsDocument = await amsCollection.findOne({
      [`workerMaster.${employeeId}.contractorName`]: { $exists: true }
    });

    if (!amsDocument || !amsDocument.workerMaster[employeeId]?.contractorName) {
      return res.status(404).json({ message: 'Worker or contractorName not found' });
    }

    const contractorName = amsDocument.workerMaster[employeeId].contractorName;
    const formattedDate = new Date(dateOfOvertime).toISOString().split('T')[0];

    // Store the entry in `overtimeMaster -> contractorName -> dateOfOvertime -> employeeId`
    const result = await amsCollection.updateOne(
      {}, // Target the main `ams` document
      {
        $set: {
          [`overtimeMaster.${contractorName}.${formattedDate}.${employeeId}`]: overtimeData
        }
      },
      { upsert: true }
    );

    // Return a clear response
    res.status(201).json({
      message: 'Overtime entry created successfully!',
      contractorName,
      dateOfOvertime: formattedDate,
      employeeId,
      overtimeData
    });
  } catch (error) {
    console.error('Error creating overtime entry:', error);
    res.status(500).json({ message: 'Failed to create overtime entry', error: error.message });
  }
};

// Remaining methods for fetching overtime entries
exports.getAllOvertimeEntries = async (req, res) => {
  try {
    const overtimeEntries = await Overtime.findOne({ _id: 'overtimeMaster' });
    res.status(200).json(overtimeEntries ? overtimeEntries.overtimeMaster : []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch overtime entries', error: error.message });
  }
};

exports.getOvertimeById = async (req, res) => {
  try {
    const overtimeEntry = await Overtime.findOne(
      { _id: 'overtimeMaster', 'overtimeMaster._id': mongoose.Types.ObjectId(req.params.id) },
      { 'overtimeMaster.$': 1 }
    );

    if (!overtimeEntry) {
      return res.status(404).json({ message: 'Overtime entry not found' });
    }
    res.status(200).json(overtimeEntry.overtimeMaster[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch overtime entry', error: error.message });
  }
};
