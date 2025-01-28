// // backend/controllers/advanceController.js
// const mongoose = require("mongoose");
// const AMS = mongoose.connection.collection("ams"); // Access the 'ams' collection

// // Save advance data, using contractorName from workerMaster based on workerId
// const saveAdvanceData = async (req, res) => {
//     const {
//         workerId,
//         dateOfAdvance,
//         nameOfWorkman,
//         wagesPeriods,
//         wagesPayable,
//         advanceAmount,
//         advancePurpose,
//         instalmentNumber,
//         dateOfInstallment,
//         instalmentAmount,
//         remarks
//     } = req.body;

//     try {
//         // Format the date to store as a key in YYYY-MM-DD format
//         const dateKey = new Date(dateOfAdvance).toISOString().split("T")[0];

//         // Fetch contractorName from workerMaster based on workerId
//         const amsData = await AMS.findOne({}, { projection: { workerMaster: 1 } });
//         const contractorName = amsData?.workerMaster?.[workerId]?.contractorName;

//         if (!contractorName) {
//             return res.status(404).json({ message: "Contractor not found for the provided workerId." });
//         }

//         // Structure for storing advance data under contractorName -> date -> workerId
//         const workerData = {
//             wagesPayable,
//             advanceAmount,
//             advancePurpose,
//             dateOfAdvance: dateKey,
//             dateOfInstallment,
//             instalmentAmount,
//             instalmentNumber,
//             nameOfWorkman,
//             remarks,
//             wagesPeriods,
//             workerId
//         };

//         // Store data under advanceMaster schema in ams collection
//         const result = await AMS.updateOne(
//             { [`advanceMaster.${contractorName}.${dateKey}.${workerId}`]: { $exists: false } },
//             { $set: { [`advanceMaster.${contractorName}.${dateKey}.${workerId}`]: workerData } },
//             { upsert: true }
//         );

//         res.status(200).json({ message: "Advance data saved successfully", result });
//     } catch (error) {
//         console.error("Failed to save advance data:", error);
//         res.status(500).json({ message: "Failed to save advance data", error });
//     }
// };

// module.exports = { saveAdvanceData };


// backend/controllers/advanceController.js
const mongoose = require("mongoose");
const AMS = mongoose.connection.collection("ams"); // Access the 'ams' collection

// Save advance data, using contractorName from workerMaster based on workerId
const saveAdvanceData = async (req, res) => {
    const {
        workerId,
        dateOfAdvance,
        nameOfWorkman,
        wagesPeriods,
        WagesPayable,
        advanceAmount,
        advancePurpose,
        instalmentNumber,
        dateOfInstallment,
        instalmentAmount,
        remarks
    } = req.body;

    try {
        // Format the date to store as a key in YYYY-MM-DD format
        const dateKey = new Date(dateOfAdvance).toISOString().split("T")[0];

        // Fetch contractorName from workerMaster based on workerId
        const amsData = await AMS.findOne({}, { projection: { workerMaster: 1 } });
        const contractorName = amsData?.workerMaster?.[workerId]?.contractorName;

        if (!contractorName) {
            return res.status(404).json({ message: "Contractor not found for the provided workerId." });
        }

        // Structure for storing advance data under contractorName -> date -> workerId
        const workerData = {
          WagesPayable,
            advanceAmount,
            advancePurpose,
            dateOfAdvance: dateKey,
            dateOfInstallment,
            instalmentAmount,
            instalmentNumber,
            nameOfWorkman,
            remarks,
            wagesPeriods,
            workerId
        };

        // Update the specific path in advanceMaster under the ams collection
        const result = await AMS.updateOne(
            { _id: amsData._id }, // Ensure we are updating the existing document
            { $set: { [`advanceMaster.${contractorName}.${dateKey}.${workerId}`]: workerData } },
            { upsert: true }
        );

        res.status(200).json({ message: "Advance data saved successfully", result });
    } catch (error) {
        console.error("Failed to save advance data:", error);
        res.status(500).json({ message: "Failed to save advance data", error });
    }
};


// Fetch Worker Details (New Logic)
const fetchWorkerDetails = async (req, res) => {
    try {
      const { WorkerID } = req.params;
  
      // Access the database
      const db = mongoose.connection.db;
  
      // Query the workerMaster for the given WorkerID
      const workerData = await db
        .collection("ams")
        .findOne({ [`workerMaster.${WorkerID}`]: { $exists: true } });
  
      // If worker not found, return 404
      if (!workerData) {
        return res
          .status(404)
          .json({ message: "Worker ID not found in workerMaster" });
      }
  
      // Extract worker details
      const worker = workerData.workerMaster[WorkerID];
  
      // Concatenate full name
      const fullName = [worker.firstName, worker.middleName, worker.lastName]
        .filter(Boolean) // Filter out null/undefined values
        .join(" ");
  
      // Return the full name and other relevant details
      res.status(200).json({
        fullName,
        contractorName: worker.contractorName,
        otherDetails: worker,
      });
    } catch (error) {
      console.error("Error fetching worker details:", error);
      res.status(500).json({ message: "Error fetching worker details", error: error.message });
    }
  };
  
module.exports = { saveAdvanceData , fetchWorkerDetails};
