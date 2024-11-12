// backend/controllers/advanceController.js
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
        const contractorNames = contractors.map(contractor => contractor.contractorName);
        const addresses = contractors.map(contractor => contractor.address);
        res.json({ contractorNames, addresses });
    } catch (error) {
        console.error("Error fetching contractor names:", error);
        res.status(500).json({ message: "Failed to fetch contractor names", error });
    }
};
// Fetch filtered advance records based on contractor name and month
const getAdvancesByContractorAndMonth = async (req, res) => {
    const { contractorName, month } = req.query;
    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        // Fetch both advanceMaster for the specified contractor
        const contractorData = await AMS.findOne(
            {
                [`advanceMaster.${contractorName}`]: { $exists: true }
            },
            { projection: { [`advanceMaster.${contractorName}`]: 1 } }
        );
        if (!contractorData || !contractorData.advanceMaster[contractorName]) {
            return res.json({ message: "No data found for the selected month." });
        }
        const advances = [];
        const contractorRecords = contractorData.advanceMaster[contractorName];
        // Loop through each date entry and filter based on the specified month
        for (const dateKey of Object.keys(contractorRecords)) {
            const recordDate = new Date(dateKey);
            if (recordDate >= startDate && recordDate < endDate) {
                const workers = contractorRecords[dateKey];
                // Loop through each workerId under the date and gather advance details
                for (const workerId of Object.keys(workers)) {
                    const advanceData = workers[workerId];
                    advances.push({
                        workerId,
                        nameOfWorkman: advanceData.nameOfWorkman,
                        fatherHusbandName: advanceData.fatherHusbandName,
                        dateOfAdvance: advanceData.dateOfAdvance,
                        gender: advanceData.gender,
                        designationOfEmployment: advanceData.designationOfEmployment,
                        wagesPeriods: advanceData.wagesPeriods,
                        advanceAmount: advanceData.advanceAmount,
                        advancePurpose: advanceData.advancePurpose,
                        instalmentNumber: advanceData.instalmentNumber,
                        dateOfInstalment: advanceData.dateOfInstalment,
                        dateOfLastInstalment: advanceData.dateOfLastInstalment,
                        remarks: advanceData.remarks,
                    });
                }
            }
        }
        if (advances.length === 0) {
            res.json({ message: "No data found for the selected month." });
        } else {
            res.json(advances);
        }
    } catch (error) {
        console.error("Failed to fetch advance data:", error);
        res.status(500).json({ message: "Failed to fetch advance data", error });
    }
};
module.exports = { getContractorNames, getAdvancesByContractorAndMonth };