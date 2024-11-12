// backend/controllers/fineController.js
const mongoose = require("mongoose");
const AMS = mongoose.connection.collection("ams");

// Fetch contractor names and addresses from contractorMaster
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



const getFinesByContractorAndMonth = async (req, res) => {
    const { contractorName, month } = req.query;

    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        // console.log("Contractor Name:", contractorName);
        // console.log("Month:", month);
        // console.log("Start Date:", startDate);
        // console.log("End Date:", endDate);

        // Retrieve the entire fineMaster structure
        const contractorData = await AMS.findOne(
            { "fineMaster": { $exists: true } },
            { projection: { fineMaster: 1 } }
        );

        if (!contractorData || !contractorData.fineMaster) {
            return res.json({ message: "No data found for the selected month." });
        }

        const fines = [];

        // Iterate over each fineId in fineMaster to find records matching the contractor and month
        for (const fineId in contractorData.fineMaster) {
            const fineRecord = contractorData.fineMaster[fineId];

            // Check if contractor name matches and dateOfOffence falls within the selected month
            if (
                fineRecord.contractorName === contractorName &&
                fineRecord.dateOfOffence &&
                new Date(fineRecord.dateOfOffence) >= startDate &&
                new Date(fineRecord.dateOfOffence) < endDate
            ) {
                fines.push({ fineId, ...fineRecord });
            }
        }

        // Send results or "No data found" message if no matching records
        res.json(fines.length ? fines : { message: "No data found for the selected month." });
    } catch (error) {
        console.error("Failed to fetch fine data:", error);
        res.status(500).json({ message: "Failed to fetch fine data", error });
    }
};

module.exports = { getContractorNames, getFinesByContractorAndMonth };
