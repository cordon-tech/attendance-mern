



// // backend/controllers/damageController.js
// const mongoose = require("mongoose");
// const AMS = mongoose.connection.collection("ams"); // Access the 'ams' collection

// // Fetch all unique contractor names and addresses from contractorMaster in the ams collection
// const getContractorNames = async (req, res) => {
//     try {
//         const amsData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });

//         if (!amsData || !amsData.contractorMaster) {
//             return res.status(404).json({ message: "No contractors found." });
//         }

//         const contractors = Object.values(amsData.contractorMaster);
//         const contractorNames = contractors.map(contractor => contractor.contractorName);
//         const addresses = contractors.map(contractor => contractor.address);

//         res.json({ contractorNames, addresses });
//     } catch (error) {
//         console.error("Error fetching contractor names:", error);
//         res.status(500).json({ message: "Failed to fetch contractor names", error });
//     }
// };


// const getWorkerDesignations = async (req, res) => {
//     try {
//         // Fetch worker data from workerMaster in the ams collection
//         const amsData = await AMS.findOne({}, { projection: { workerMaster: 1 } });

//         if (!amsData || !amsData.workerMaster) {
//             return res.status(404).json({ message: "No workers found." });
//         }

//         // Map each worker to their ID and designation
//         const workers = Object.entries(amsData.workerMaster).map(([workerId, workerData]) => ({
//             workerId,
//             designation: workerData.designation || "N/A"
//         }));

//         res.json({ workers });
//     } catch (error) {
//         console.error("Error fetching worker designations:", error);
//         res.status(500).json({ message: "Failed to fetch worker designations", error });
//     }
// };

// const getDamagesByContractorAndMonth = async (req, res) => {
//     const { contractorName, month } = req.query;

//     try {
//         const startDate = new Date(`${month}-01`);
//         const endDate = new Date(startDate);
//         endDate.setMonth(endDate.getMonth() + 1);

//         // Fetch both damageMaster for the specified contractor and workerMaster data
//         const contractorData = await AMS.findOne(
//             {
//                 [`damageMaster.${contractorName}`]: { $exists: true }
//             },
//             { projection: { [`damageMaster.${contractorName}`]: 1, workerMaster: 1 } }
//         );

//         if (!contractorData || !contractorData.damageMaster[contractorName]) {
//             return res.json({ message: "No data found for the selected month." });
//         }

//         const damages = [];
//         const contractorRecords = contractorData.damageMaster[contractorName];

//         // Loop through each date entry and filter based on the specified month
//         for (const dateKey of Object.keys(contractorRecords)) {
//             const recordDate = new Date(dateKey);
//             if (recordDate >= startDate && recordDate < endDate) {
//                 const workers = contractorRecords[dateKey];

//                 // Loop through each workerId under the date and gather damage details
//                 for (const workerId of Object.keys(workers)) {
//                     const damageData = workers[workerId];

//                     // Retrieve the worker's designation from workerMaster
//                     const workerDesignation = contractorData.workerMaster[workerId]?.designation || "N/A";

//                     damages.push({
//                         workerId,
//                         image: damageData.image || "N/A",
//                         nameOfWorkmen: damageData.workerName,
//                         designation: workerDesignation, // Use the fetched designation here
//                         particulars: damageData.particularsOfDamage,
//                         dateOfDamage: damageData.dateOfDamage,
//                         showCause: damageData.showedCause,
//                         personPresent: damageData.personInPresence,
//                         deductionAmount: damageData.amountOfDeduction,
//                         installments: damageData.numOfInstallments,
//                         remarks: damageData.remarks,
//                     });
//                 }
//             }
//         }

//         if (damages.length === 0) {
//             res.json({ message: "No data found for the selected month." });
//         } else {
//             res.json(damages);
//         }
//     } catch (error) {
//         console.error("Failed to fetch damage data:", error);
//         res.status(500).json({ message: "Failed to fetch damage data", error });
//     }
// };

// module.exports = { getContractorNames, getDamagesByContractorAndMonth,getWorkerDesignations };



const mongoose = require("mongoose");
const AMS = mongoose.connection.collection("ams"); // Access the 'ams' collection

// Fetch all unique contractor names and addresses from contractorMaster in the ams collection
const getContractorNames = async (req, res) => {
    try {
        const amsData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });

        if (!amsData || !amsData.contractorMaster) {
            return res.status(404).json({ message: "No contractors found." });
        }

        const contractors = Object.values(amsData.contractorMaster);
        const contractorNames = contractors.map((contractor) => contractor.contractorName);
        const addresses = contractors.map((contractor) => contractor.address);

        res.json({ contractorNames, addresses });
    } catch (error) {
        console.error("Error fetching contractor names:", error);
        res.status(500).json({ message: "Failed to fetch contractor names", error });
    }
};

// Fetch all worker designations from the workerMaster in the ams collection
const getWorkerDesignations = async (req, res) => {
    try {
        const amsData = await AMS.findOne({}, { projection: { workerMaster: 1 } });

        if (!amsData || !amsData.workerMaster) {
            return res.status(404).json({ message: "No workers found." });
        }

        const workers = Object.entries(amsData.workerMaster).map(([workerId, workerData]) => ({
            workerId,
            designation: workerData.designation || "N/A",
        }));

        res.json({ workers });
    } catch (error) {
        console.error("Error fetching worker designations:", error);
        res.status(500).json({ message: "Failed to fetch worker designations", error });
    }
};

const getDamagesByContractorAndMonth = async (req, res) => {
    const { contractorName, month } = req.query;

    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        const contractorData = await AMS.findOne(
            {
                [`damageMaster.${contractorName}`]: { $exists: true }
            },
            { projection: { [`damageMaster.${contractorName}`]: 1, workerMaster: 1 } }
        );

        if (!contractorData || !contractorData.damageMaster[contractorName]) {
            return res.json({ message: "No data found for the selected month." });
        }

        const damages = [];
        const contractorRecords = contractorData.damageMaster[contractorName];

        for (const dateKey of Object.keys(contractorRecords)) {
            const recordDate = new Date(dateKey);
            if (recordDate >= startDate && recordDate < endDate) {
                const workers = contractorRecords[dateKey];

                for (const workerId of Object.keys(workers)) {
                    const damageData = workers[workerId];
                    const workerDesignation = contractorData.workerMaster[workerId]?.designation || "N/A";

                    damages.push({
                        workerId,
                        imageUrls: damageData.imageUrls || [], // Include image URLs
                        nameOfWorkmen: damageData.workerName,
                        designation: workerDesignation,
                        particulars: damageData.particularsOfDamage,
                        dateOfDamage: damageData.dateOfDamage,
                        showCause: damageData.showedCause,
                        personPresent: damageData.personInPresence,
                        deductionAmount: damageData.amountOfDeduction,
                        installments: damageData.numOfInstallments,
                        remarks: damageData.remarks,
                    });
                }
            }
        }

        if (damages.length === 0) {
            res.json({ message: "No data found for the selected month." });
        } else {
            res.json(damages);
        }
    } catch (error) {
        console.error("Failed to fetch damage data:", error);
        res.status(500).json({ message: "Failed to fetch damage data", error });
    }
};


module.exports = { getContractorNames, getDamagesByContractorAndMonth, getWorkerDesignations };
