// const mongoose = require('mongoose');

// exports.saveDamageData = async (req, res) => {
//   try {
//     const { workerID, workerName, particularsOfDamage, dateOfDamage, showedCause, personInPresence, amountOfDeduction, numOfInstallments, remarks } = req.body;

//     // Fetch contractor name directly from workerMaster in the ams collection
//     const db = mongoose.connection.db;
//     const workerData = await db.collection('ams').findOne({ [`workerMaster.${workerID}`]: { $exists: true } });

//     if (!workerData) {
//       return res.status(404).json({ message: 'Worker ID not found in workerMaster' });
//     }

//     const contractorName = workerData.workerMaster[workerID].contractorName;

//     // Construct the path for storing damage data: damageMaster -> contractorName -> dateOfDamage -> workerID
//     const damagePath = {
//       [`damageMaster.${contractorName}.${dateOfDamage}.${workerID}`]: {
//         workerID,
//         workerName,
//         particularsOfDamage,
//         dateOfDamage,
//         showedCause,
//         personInPresence,
//         amountOfDeduction,
//         numOfInstallments,
//         remarks,
//       },
//     };

//     // Update the database with the damage data
//     await db.collection('ams').updateOne({}, { $set: damagePath }, { upsert: true });

//     res.status(201).json({ message: 'Damage data saved successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving damage data', error: error.message });
//   }
// };

// // This is to fetch worker name based on workerID
// exports.fetchWorkerName = async (req, res) => {
//   try {
//     const { workerID } = req.params;

//     // Fetch worker data from the workerMaster collection
//     const db = mongoose.connection.db;
//     const workerData = await db.collection('ams').findOne({ [`workerMaster.${workerID}`]: { $exists: true } });

//     if (!workerData) {
//       return res.status(404).json({ message: 'Worker ID not found in workerMaster' });
//     }

//     // Extract the worker's name (firstName) from the workerMaster collection
//     const workerName = workerData.workerMaster[workerID].firstName;  // Make sure 'firstName' exists

//     res.status(200).json({ workerName });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching worker name', error: error.message });
//   }
// };


const mongoose = require("mongoose");
const { storage } = require("../config/firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const path = require("path");

const uploadImageToFirebase = async (file, workerID, dateOfDamage) => {
    const extension = path.extname(file.originalname).toLowerCase(); // Get the file extension
    const validExtensions = ['.png', '.jpg', '.jpeg']; // Define valid image extensions

    if (!validExtensions.includes(extension)) {
        throw new Error("Invalid file type. Only PNG and JPG/JPEG are allowed.");
    }

    const filePath = `damage/${workerID}/${dateOfDamage}/${file.originalname}`;
    const storageRef = ref(storage, filePath);

    try {
        // Include the contentType in the metadata
        const metadata = {
            contentType: `image/${extension === '.jpg' ? 'jpeg' : 'png'}`,
        };

        await uploadBytes(storageRef, file.buffer, metadata); // Upload with metadata
        const downloadURL = await getDownloadURL(storageRef); // Get the download URL
        return downloadURL;
    } catch (error) {
        throw new Error(`Failed to upload image: ${file.originalname}, Error: ${error.message}`);
    }
};

exports.saveDamageData = async (req, res) => {
    try {
        const {
            workerID,
            workerName,
            particularsOfDamage,
            dateOfDamage,
            showedCause,
            personInPresence,
            amountOfDeduction,
            numOfInstallments,
            remarks,
        } = req.body;

        const db = mongoose.connection.db;
        const workerData = await db.collection("ams").findOne({ [`workerMaster.${workerID}`]: { $exists: true } });

        if (!workerData) {
            return res.status(404).json({ message: "Worker ID not found in workerMaster" });
        }

        const contractorName = workerData.workerMaster[workerID].contractorName;

        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const imageUrl = await uploadImageToFirebase(file, workerID, dateOfDamage);
                imageUrls.push(imageUrl);
            }
        }

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
                imageUrls,
            },
        };

        await db.collection("ams").updateOne({}, { $set: damagePath }, { upsert: true });
        res.status(201).json({ message: "Damage data saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving damage data", error: error.message });
    }
};

exports.fetchWorkerName = async (req, res) => {
  try {
    const { workerID } = req.params;

    // Fetch worker data from the workerMaster collection
    const db = mongoose.connection.db;
    const workerData = await db.collection('ams').findOne({ [`workerMaster.${workerID}`]: { $exists: true } });

    if (!workerData) {
      return res.status(404).json({ message: 'Worker ID not found in workerMaster' });
    }

    // Extract the worker's name (firstName) from the workerMaster collection
    const workerName = workerData.workerMaster[workerID].firstName;  // Make sure 'firstName' exists

    res.status(200).json({ workerName });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching worker name', error: error.message });
  }
};