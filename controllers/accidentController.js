const mongoose = require('mongoose');

exports.saveAccidentData = async (req, res) => {
  try {
    const { WorkerID, nameInjured, dateAccident, dateReport, natureAccident, dateReturn, daysAbsent } = req.body;

    // Fetch contractor name directly from workerMaster in the ams collection
    const db = mongoose.connection.db;
    const workerData = await db.collection('ams').findOne({ [`workerMaster.${WorkerID}`]: { $exists: true } });

    if (!workerData) {
      return res.status(404).json({ message: 'Worker ID not found in workerMaster' });
    }

    const contractorName = workerData.workerMaster[WorkerID].contractorName;

    // Construct the path for storing accident data: accidentMaster -> contractorName -> dateAccident -> WorkerID
    const accidentPath = {
      [`accidentMaster.${contractorName}.${dateAccident}.${WorkerID}`]: {
        WorkerID,
        nameInjured,
        dateAccident,
        dateReport,
        natureAccident,
        dateReturn,
        daysAbsent,
      },
    };

    // Update the database with the accident data
    await db.collection('ams').updateOne({}, { $set: accidentPath }, { upsert: true });

    res.status(201).json({ message: 'Accident data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving accident data', error: error.message });
  }
};
