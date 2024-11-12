const mongoose = require('mongoose');

exports.saveDamageData = async (req, res) => {
  try {
    const { workerID, workerName, particularsOfDamage, dateOfDamage, showedCause, personInPresence, amountOfDeduction, numOfInstallments, remarks } = req.body;

    // Fetch contractor name directly from workerMaster in the ams collection
    const db = mongoose.connection.db;
    const workerData = await db.collection('ams').findOne({ [`workerMaster.${workerID}`]: { $exists: true } });

    if (!workerData) {
      return res.status(404).json({ message: 'Worker ID not found in workerMaster' });
    }

    const contractorName = workerData.workerMaster[workerID].contractorName;

    // Construct the path for storing damage data: damageMaster -> contractorName -> dateOfDamage -> workerID
    const damagePath = {
      [`damageMaster.${contractorName}.${dateOfDamage}.${workerID}`]: {
        workerID,
        workerName,
        particularsOfDamage,
        dateOfDamage,
        showedCause,
        personInPresence,
        amountOfDeduction,
        numOfInstallments,
        remarks,
      },
    };

    // Update the database with the damage data
    await db.collection('ams').updateOne({}, { $set: damagePath }, { upsert: true });

    res.status(201).json({ message: 'Damage data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving damage data', error: error.message });
  }
};
