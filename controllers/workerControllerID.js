// const mongoose = require('mongoose');
// // Fetch worker by worker ID
// exports.getWorkerById = async (req, res) => {
//   const { workerId } = req.params;
//   const db = mongoose.connection.db;
//   const workerCollection = db.collection('ams');
//   try {
//     const workerData = await workerCollection.findOne({ [`workerMaster.${workerId}`]: { $exists: true } });
//     if (workerData && workerData.workerMaster[workerId]) {
//       res.status(200).json(workerData.workerMaster[workerId]);
//     } else {
//       res.status(404).json({ message: 'Worker not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching worker data', error: error.message });
//   }
// };
// // Fetch all workers under a specific contractor
// exports.getWorkersByContractor = async (req, res) => {
//   const { contractorName } = req.params;
//   const db = mongoose.connection.db;
//   const workerCollection = db.collection('ams');
//   try {
//     const workers = [];
//     const data = await workerCollection.findOne({ 'workerMaster': { $exists: true } });
//     if (data && data.workerMaster) {
//       for (const [workerId, worker] of Object.entries(data.workerMaster)) {
//         if (worker.contractorName === contractorName) {
//           workers.push({ workerId, ...worker });
//         }
//       }
//       res.status(200).json(workers);
//     } else {
//       res.status(404).json({ message: 'No workers found for this contractor' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching workers by contractor', error: error.message });
//   }
// };
// // Fetch all contractor names
// exports.getAllContractors = async (req, res) => {
//     const db = mongoose.connection.db;
//     const workerCollection = db.collection('ams');
//     try {
//       const contractors = [];
//       const data = await workerCollection.findOne({ 'contractorMaster': { $exists: true } });
//       if (data && data.contractorMaster) {
//         for (const contractor of Object.values(data.contractorMaster)) {
//           contractors.push(contractor.contractorName);
//         }
//         res.status(200).json(contractors);
//       } else {
//         res.status(404).json({ message: 'No contractors found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching contractors', error: error.message });
//     }
//   };
// const mongoose = require('mongoose');
// const AMS = mongoose.connection.collection("ams");
// // Get worker details by worker ID
// exports.getWorkerById = async (req, res) => {
//     const db = mongoose.connection.db;
//     const workerCollection = db.collection('ams');
//     const workerId = req.params.workerId;
//     try {
//         const workerData = await workerCollection.findOne({ [`workerMaster.${workerId}`]: { $exists: true } });
//         if (workerData) {
//             const worker = workerData.workerMaster[workerId];
//             const qrCodeData = workerData.qrCodeMaster?.[workerId] || {};
//             worker.qrCodeJson = qrCodeData;
//             res.json(worker);
//         } else {
//             res.status(404).json({ message: 'Worker not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching worker data', error });
//     }
// };
// exports.getAllContractors = async (req, res) => {
//     try {
//         // Fetch contractorMaster data with only the fields needed
//         const amsData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });
//         if (!amsData || !amsData.contractorMaster) {
//             return res.status(404).json({ message: "No contractors found." });
//         }
//         // Map through contractorMaster and collect contractor names
//         const contractors = Object.values(amsData.contractorMaster).map(contractor => ({
//             contractorName: contractor.contractorName,
//             address: contractor.address
//         }));
//         res.json(contractors);
//     } catch (error) {
//         console.error("Error fetching contractor names:", error);
//         res.status(500).json({ message: "Failed to fetch contractor names", error });
//     }
// };
// exports.getWorkersByContractor = async (req, res) => {
//     const db = mongoose.connection.db;
//     const contractorName = req.params.contractorName;
//     const workerCollection = db.collection('ams');
//     try {
//         const workersData = await workerCollection.findOne({ workerMaster: { $exists: true } });
//         const workers = [];
//         if (workersData && workersData.workerMaster) {
//             for (const workerId in workersData.workerMaster) {
//                 const worker = workersData.workerMaster[workerId];
//                 if (worker.contractorName === contractorName) {
//                     const qrCodeData = workersData.qrCodeMaster?.[workerId] || {};
//                     worker.qrCodeJson = qrCodeData;
//                     worker.workerId = workerId;  // Include workerId in the worker data
//                     workers.push(worker);
//                 }
//             }
//         }
//         res.json(workers); // Return all workers that match the contractor
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching workers by contractor', error });
//     }
// };
/////zoya///////
// const mongoose = require('mongoose');
// // Helper function to get the 'ams' collection
// const getAmsCollection = () => mongoose.connection.collection("ams");
// // Get worker details by worker ID
// exports.getWorkerById = async (req, res) => {
//     const db = mongoose.connection.db;
//     const workerCollection = db.collection('ams');
//     const workerId = req.params.workerId;
//     try {
//         const workerData = await workerCollection.findOne({ [`workerMaster.${workerId}`]: { $exists: true } });
//         if (workerData) {
//             const worker = workerData.workerMaster[workerId];
//             const qrCodeData = workerData.qrCodeMaster?.[workerId] || {};
//             worker.qrCodeJson = qrCodeData; // Append QR code data if available
//             res.json(worker);
//         } else {
//             res.status(404).json({ message: 'Worker not found' });
//         }
//     } catch (error) {
//         console.error("Error fetching worker data:", error);
//         res.status(500).json({ message: 'Error fetching worker data', error });
//     }
// };
// // Get all contractor names
// exports.getAllContractors = async (req, res) => {
//     try {
//         const amsCollection = getAmsCollection();
//         const amsData = await amsCollection.findOne({}, { projection: { contractorMaster: 1 } });
//         if (!amsData || !amsData.contractorMaster) {
//             return res.status(404).json({ message: "No contractors found." });
//         }
//         // Extract contractor names and addresses
//         const contractors = Object.values(amsData.contractorMaster).map(contractor => ({
//             contractorName: contractor.contractorName,
//             address: contractor.address
//         }));
//         res.json(contractors);
//     } catch (error) {
//         console.error("Error fetching contractor names:", error);
//         res.status(500).json({ message: "Failed to fetch contractor names", error });
//     }
// };
// // Get workers by contractor name
// exports.getWorkersByContractor = async (req, res) => {
//     const contractorName = req.params.contractorName;
//     const workerCollection = getAmsCollection();
//     try {
//         const workersData = await workerCollection.findOne({ workerMaster: { $exists: true } });
//         const workers = [];
//         if (workersData && workersData.workerMaster) {
//             for (const workerId in workersData.workerMaster) {
//                 const worker = workersData.workerMaster[workerId];
//                 // Match workers with the specified contractor name
//                 if (worker.contractorName === contractorName) {
//                     const qrCodeData = workersData.qrCodeMaster?.[workerId] || {};
//                     worker.qrCodeJson = qrCodeData; // Append QR code data if available
//                     worker.workerId = workerId; // Include workerId in the response
//                     workers.push(worker);
//                 }
//             }
//         }
//         // Respond with matching workers or an empty array if no matches found
//         res.json(workers);
//     } catch (error) {
//         console.error("Error fetching workers by contractor:", error);
//         res.status(500).json({ message: 'Error fetching workers by contractor', error });
//     }
// };
const mongoose = require('mongoose');
// Helper function to get the 'ams' collection
const getAmsCollection = () => mongoose.connection.collection("ams");
// Get worker details by worker ID
exports.getWorkerById = async (req, res) => {
    const db = mongoose.connection.db;
    const workerCollection = db.collection('ams');
    const workerId = req.params.workerId;
    try {
        const workerData = await workerCollection.findOne({ [`workerMaster.${workerId}`]: { $exists: true } });
        if (workerData) {
            const worker = workerData.workerMaster[workerId];
            const qrCodeData = workerData.qrCodeMaster?.[workerId] || {};
            worker.qrCodeJson = qrCodeData; // Append QR code data if available
            res.json(worker);
        } else {
            res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        console.error("Error fetching worker data:", error);
        res.status(500).json({ message: 'Error fetching worker data', error });
    }
};
// Get all contractor names
exports.getContractorNames = async (req, res) => {
    try {
        const amsData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });
        if (!amsData || !amsData.contractorMaster) {
            return res.status(404).json({ message: "No contractors found." });
        }
        const contractors = Object.values(amsData.contractorMaster);
        const contractorNames = contractors.map(contractor => contractor.contractorName);
        const addresses = contractors.map(contractor => contractor.address);
        res.json({ contractorNames, addresses });
    } catch (error) {
        console.error("Error fetching contractor names:", error);
        res.status(500).json({ message: "Failed to fetch contractor names", error });
    }
};
exports.getWorkersByContractor = async (req, res) => {
    const contractorName = req.params.contractorName;
    const workerCollection = getAmsCollection();
    try {
        const workersData = await workerCollection.findOne({ workerMaster: { $exists: true } });
        const workers = [];
        if (workersData && workersData.workerMaster) {
            for (const workerId in workersData.workerMaster) {
                const worker = workersData.workerMaster[workerId];
                // Match workers with the specified contractor name
                if (worker.contractorName === contractorName) {
                    const qrCodeData = workersData.qrCodeMaster?.[workerId] || {};
                    worker.qrCodeJson = qrCodeData; // Append QR code data if available
                    worker.workerId = workerId; // Include workerId in the response
                    workers.push(worker);
                }
            }
        }
        // Respond with matching workers or an empty array if no matches found
        res.json(workers);
    } catch (error) {
        console.error("Error fetching workers by contractor:", error);
        res.status(500).json({ message: 'Error fetching workers by contractor', error });
    }
};