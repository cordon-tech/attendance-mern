


// const multer = require("multer");
// const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// const { storage } = require("../config/firebase");
// const mongoose = require("mongoose");

// const upload = multer().single("photo"); // Multer middleware for file uploads
// exports.saveAccidentData = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error("File upload error:", err);
//       return res.status(400).json({ message: "Error uploading file.", error: err.message });
//     }

//     const { WorkerID, nameInjured, dateAccident, dateReport, natureAccident, dateReturn, daysAbsent } = req.body;
//     const photo = req.file;

//     if (!WorkerID || !dateAccident) {
//       return res.status(400).json({ message: "WorkerID and dateAccident are required." });
//     }

//     try {
//       const accidentDate = new Date(dateAccident);
//       const year = accidentDate.getFullYear();
//       const month = String(accidentDate.getMonth() + 1).padStart(2, '0');
//       const day = String(accidentDate.getDate()).padStart(2, '0');
//       const datePath = `${year}-${month}-${day}`;

//       console.log("Uploading photo to Firebase..."); // Log before upload
//       const photoRef = ref(storage, `accidentPhotos/${WorkerID}/${datePath}/${photo.originalname}`);
//       await uploadBytes(photoRef, photo.buffer);
//       const photoURL = await getDownloadURL(photoRef);

//       console.log("Fetching worker details from database...");
//       const db = mongoose.connection.db;
//       const workerData = await db.collection("ams").findOne({
//         [`workerMaster.${WorkerID}`]: { $exists: true },
//       });

//       if (!workerData) {
//         return res.status(404).json({ message: "WorkerID not found in workerMaster." });
//       }

//       const contractorName = workerData.workerMaster[WorkerID]?.contractorName;

//       const accidentPath = {
//         [`accidentMaster.${contractorName}.${dateAccident}.${WorkerID}`]: {
//           WorkerID,
//           nameInjured,
//           dateAccident,
//           dateReport,
//           natureAccident,
//           dateReturn,
//           daysAbsent,
//           photoURL,
//         },
//       };

//       console.log("Updating accident data in database...");
//       await db.collection("ams").updateOne({}, { $set: accidentPath }, { upsert: true });

//       res.status(201).json({ message: "Accident data saved successfully." });
//     } catch (error) {
//       console.error("Error saving accident data:", error);
//       res.status(500).json({ message: "Error saving accident data.", error: error.message });
//     }
//   });
// };

// // Fetch Worker Details
// exports.fetchWorkerDetails = async (req, res) => {
//   try {
//     const { WorkerID } = req.params;

//     const db = mongoose.connection.db;
//     const workerData = await db.collection("ams").findOne({
//       [`workerMaster.${WorkerID}`]: { $exists: true },
//     });

//     if (!workerData) {
//       return res.status(404).json({ message: "WorkerID not found in workerMaster." });
//     }

//     const worker = workerData.workerMaster[WorkerID];
//     const fullName = [worker.firstName, worker.middleName, worker.lastName].filter(Boolean).join(" ");

//     res.status(200).json({ fullName });
//   } catch (error) {
//     console.error("Error fetching worker details:", error);
//     res.status(500).json({ message: "Error fetching worker details.", error: error.message });
//   }
// };

//WORKING CODE
// const multer = require("multer");
// const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// const { storage } = require("../config/firebase");
// const mongoose = require("mongoose");

// const upload = multer().single("photo"); // Multer middleware for file uploads

// exports.saveAccidentData = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error("File upload error:", err);
//       return res.status(400).json({ message: "Error uploading file.", error: err.message });
//     }

//     console.log("Request body:", req.body); // Log the request body
//     console.log("Uploaded file:", req.file); // Log the file details

//     const { WorkerID, nameInjured, dateAccident, dateReport, natureAccident, dateReturn, daysAbsent } = req.body;
//     const photo = req.file;

//     if (!WorkerID || !dateAccident) {
//       return res.status(400).json({ message: "WorkerID and dateAccident are required." });
//     }

//     try {
//       const accidentDate = new Date(dateAccident);
//       const year = accidentDate.getFullYear();
//       const month = String(accidentDate.getMonth() + 1).padStart(2, "0");
//       const day = String(accidentDate.getDate()).padStart(2, "0");
//       const datePath = `${year}-${month}-${day}`;

//       console.log("Uploading photo to Firebase...");
//       const photoRef = ref(storage, `accidentPhotos/${WorkerID}/${datePath}/${photo.originalname}`);
//       await uploadBytes(photoRef, photo.buffer);
//       const photoURL = await getDownloadURL(photoRef);

//       console.log("Fetching worker details from MongoDB...");
//       const db = mongoose.connection.db;
//       const workerData = await db.collection("ams").findOne({
//         [`workerMaster.${WorkerID}`]: { $exists: true },
//       });

//       if (!workerData) {
//         console.error("WorkerID not found in workerMaster.");
//         return res.status(404).json({ message: "WorkerID not found in workerMaster." });
//       }

//       const contractorName = workerData.workerMaster[WorkerID]?.contractorName;

//       const accidentPath = {
//         [`accidentMaster.${contractorName}.${dateAccident}.${WorkerID}`]: {
//           WorkerID,
//           nameInjured,
//           dateAccident,
//           dateReport,
//           natureAccident,
//           dateReturn,
//           daysAbsent,
//           photoURL,
//         },
//       };

//       console.log("Updating accident data in MongoDB...");
//       await db.collection("ams").updateOne({}, { $set: accidentPath }, { upsert: true });

//       res.status(201).json({ message: "Accident data saved successfully.", photoURL });
//     } catch (error) {
//       console.error("Error saving accident data:", error); // Log the error
//       res.status(500).json({ message: "Error saving accident data.", error: error.message });
//     }
//   });
// };

// // Fetch Worker Details
// exports.fetchWorkerDetails = async (req, res) => {
//   try {
//     const { WorkerID } = req.params;

//     const db = mongoose.connection.db;
//     const workerData = await db.collection("ams").findOne({
//       [`workerMaster.${WorkerID}`]: { $exists: true },
//     });

//     if (!workerData) {
//       return res.status(404).json({ message: "WorkerID not found in workerMaster." });
//     }

//     const worker = workerData.workerMaster[WorkerID];
//     const fullName = [worker.firstName, worker.middleName, worker.lastName].filter(Boolean).join(" ");

//     res.status(200).json({ fullName });
//   } catch (error) {
//     console.error("Error fetching worker details:", error);
//     res.status(500).json({ message: "Error fetching worker details.", error: error.message });
//   }
// };




const multer = require("multer");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../config/firebase");
const mongoose = require("mongoose");

const upload = multer().single("photo"); // Multer middleware for file uploads

exports.saveAccidentData = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ message: "Error uploading file.", error: err.message });
    }

    console.log("Request body:", req.body); // Log the request body
    console.log("Uploaded file:", req.file); // Log the file details

    const { WorkerID, nameInjured, dateAccident, dateReport, natureAccident, dateReturn, daysAbsent } = req.body;
    const photo = req.file;

    if (!WorkerID || !dateAccident) {
      return res.status(400).json({ message: "WorkerID and dateAccident are required." });
    }

    try {
      const accidentDate = new Date(dateAccident);
      const year = accidentDate.getFullYear();
      const month = String(accidentDate.getMonth() + 1).padStart(2, "0");
      const day = String(accidentDate.getDate()).padStart(2, "0");
      const datePath = `${year}-${month}-${day}`;

      console.log("Uploading photo to Firebase...");

      // Set the MIME type to the photo's type (e.g., image/jpeg, image/png)
      const metadata = {
        contentType: photo.mimetype, // Ensure the correct MIME type is set
      };

      const photoRef = ref(storage, `accidentPhotos/${WorkerID}/${datePath}/${photo.originalname}`);
      await uploadBytes(photoRef, photo.buffer, metadata);  // Upload with metadata
      const photoURL = await getDownloadURL(photoRef);  // Get the image URL

      console.log("Fetching worker details from MongoDB...");
      const db = mongoose.connection.db;
      const workerData = await db.collection("ams").findOne({
        [`workerMaster.${WorkerID}`]: { $exists: true },
      });

      if (!workerData) {
        console.error("WorkerID not found in workerMaster.");
        return res.status(404).json({ message: "WorkerID not found in workerMaster." });
      }

      const contractorName = workerData.workerMaster[WorkerID]?.contractorName;

      const accidentPath = {
        [`accidentMaster.${contractorName}.${dateAccident}.${WorkerID}`]: {
          WorkerID,
          nameInjured,
          dateAccident,
          dateReport,
          natureAccident,
          dateReturn,
          daysAbsent,
          photoURL,
        },
      };

      console.log("Updating accident data in MongoDB...");
      await db.collection("ams").updateOne({}, { $set: accidentPath }, { upsert: true });

      res.status(201).json({ message: "Accident data saved successfully.", photoURL });  // Send the photo URL back to the client
    } catch (error) {
      console.error("Error saving accident data:", error); // Log the error
      res.status(500).json({ message: "Error saving accident data.", error: error.message });
    }
  });
};

// Fetch Worker Details
exports.fetchWorkerDetails = async (req, res) => {
  try {
    const { WorkerID } = req.params;

    const db = mongoose.connection.db;
    const workerData = await db.collection("ams").findOne({
      [`workerMaster.${WorkerID}`]: { $exists: true },
    });

    if (!workerData) {
      return res.status(404).json({ message: "WorkerID not found in workerMaster." });
    }

    const worker = workerData.workerMaster[WorkerID];
    const fullName = [worker.firstName, worker.middleName, worker.lastName].filter(Boolean).join(" ");

    res.status(200).json({ fullName });
  } catch (error) {
    console.error("Error fetching worker details:", error);
    res.status(500).json({ message: "Error fetching worker details.", error: error.message });
  }
};
