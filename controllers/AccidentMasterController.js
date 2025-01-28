// backend/controllers/accidentController.js


const mongoose = require("mongoose");
// const Accident = mongoose.connection.collection("ams"); // Directly access 'ams' collection
const AMS = mongoose.connection.collection("ams");

const getContractorNames = async (req, res) => {
    try {
        // Fetch the document containing contractorMaster
        const amsData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });

        // Check if contractorMaster exists
        if (!amsData || !amsData.contractorMaster) {
            return res.status(404).json({ message: "No contractors found." });
        }

        // Extract contractor names and addresses
        const contractors = Object.values(amsData.contractorMaster);
        const contractorNames = contractors.map(contractor => contractor.contractorName);
        const addresses = contractors.map(contractor => contractor.address);

        // Send both contractor names and addresses in a single JSON object
        res.json({ contractorNames, addresses });
    } catch (error) {
        console.error("Error fetching contractor names:", error);
        res.status(500).json({ message: "Failed to fetch contractor names", error });
    }
};

// // Fetch filtered accident records based on contractor name and month
// const getAccidentsByContractorAndMonth = async (req, res) => {
//     const { contractorName, month } = req.query;

//     try {
//         const startDate = new Date(`${month}-01`);
//         const endDate = new Date(startDate);
//         endDate.setMonth(endDate.getMonth() + 1);

//         // Find the specific contractor data within accidentMaster
//         const contractorData = await AMS.findOne({
//             [`accidentMaster.${contractorName}`]: { $exists: true }
//         }, { projection: { [`accidentMaster.${contractorName}`]: 1 } });

//         // Check if contractor data exists
//         if (!contractorData || !contractorData.accidentMaster[contractorName]) {
//             return res.json({ message: "No data found for the selected month." });
//         }

//         const accidents = [];
//         const contractorRecords = contractorData.accidentMaster[contractorName];

//         // Loop through each date entry and filter based on the specified month
//         Object.keys(contractorRecords).forEach((dateKey) => {
//             const recordDate = new Date(dateKey);
//             if (recordDate >= startDate && recordDate < endDate) {
//                 const workers = contractorRecords[dateKey];
                
//                 // Loop through each workerId under the date and gather accident details
//                 Object.keys(workers).forEach((workerId) => {
//                     const accidentData = workers[workerId];
//                     accidents.push({
//                         workerId,
//                         dateAccident: accidentData.dateAccident,
//                         dateReport: accidentData.dateReport,
//                         dateReturn: accidentData.dateReturn,
//                         daysAbsent: accidentData.daysAbsent,
//                         nameInjured: accidentData.nameInjured,
//                         natureAccident: accidentData.natureAccident,
//                     });
//                 });
//             }
//         });

//         // Return data or message if no accidents found for the selected month
//         if (accidents.length === 0) {
//             res.json({ message: "No data found for the selected month." });
//         } else {
//             res.json(accidents);
//         }
//     } catch (error) {
//         console.error("Failed to fetch accident data:", error);
//         res.status(500).json({ message: "Failed to fetch accident data", error });
//     }
// };


const getAccidentsByContractorAndMonth = async (req, res) => {
    const { contractorName, month } = req.query;

    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        // Find the specific contractor data within accidentMaster
        const contractorData = await AMS.findOne({
            [`accidentMaster.${contractorName}`]: { $exists: true }
        }, { projection: { [`accidentMaster.${contractorName}`]: 1 } });

        // Check if contractor data exists
        if (!contractorData || !contractorData.accidentMaster[contractorName]) {
            return res.json({ message: "No data found for the selected month." });
        }

        const accidents = [];
        const contractorRecords = contractorData.accidentMaster[contractorName];

        // Loop through each date entry and filter based on the specified month
        Object.keys(contractorRecords).forEach((dateKey) => {
            const recordDate = new Date(dateKey);
            if (recordDate >= startDate && recordDate < endDate) {
                const workers = contractorRecords[dateKey];
                
                // Loop through each workerId under the date and gather accident details
                Object.keys(workers).forEach((workerId) => {
                    const accidentData = workers[workerId];
                    accidents.push({
                        workerId,
                        dateAccident: accidentData.dateAccident,
                        dateReport: accidentData.dateReport,
                        dateReturn: accidentData.dateReturn,
                        daysAbsent: accidentData.daysAbsent,
                        nameInjured: accidentData.nameInjured,
                        natureAccident: accidentData.natureAccident,
                        photoURL: accidentData.photoURL, // Add photoURL field
                    });
                });
            }
        });

        // Return data or message if no accidents found for the selected month
        if (accidents.length === 0) {
            res.json({ message: "No data found for the selected month." });
        } else {
            res.json(accidents);
        }
    } catch (error) {
        console.error("Failed to fetch accident data:", error);
        res.status(500).json({ message: "Failed to fetch accident data", error });
    }
};


module.exports = { getContractorNames , getAccidentsByContractorAndMonth };
