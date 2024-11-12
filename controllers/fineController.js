



const Fine = require('../models/Fine'); // Import the Fine model

// Function to generate a new fine ID
async function generateFineId() {
    try {
        // Fetch the fine document that contains fineMaster
        const fineDoc = await Fine.findOne();

        // If no fines exist, return the first ID
        if (!fineDoc || !fineDoc.fineMaster || fineDoc.fineMaster.size === 0) {
            return 'FF01'; // Return 'FF01' if no fines exist
        }

        // Get fine IDs as an array from the fineMaster Map
        const fineEntries = Array.from(fineDoc.fineMaster.keys());
        const lastFineId = fineEntries.reduce((max, id) => {
            const num = parseInt(id.slice(2), 10); // Extract the numeric part
            return num > max ? num : max; // Get the highest number
        }, 0);

        // Increment the numeric part for the new ID
        const newFineNumber = lastFineId + 1;

        // Format the new fine ID as 'FF' followed by a two-digit number
        const newFineId = `FF${String(newFineNumber).padStart(2, '0')}`;

        return newFineId;
    } catch (error) {
        throw new Error("Could not generate fine ID: " + error.message);
    }
}

exports.createFine = async (req, res) => {
    try {
        const fineId = await generateFineId(); // Get the new fine ID

        // Destructure the fields from the request body
        const {
            employeeId,
            employeeName,
            fatherHusbandName,
            contractorName,
            designationNatureOfEmployment,
            actOmission,
            dateOfOffence,
            showedCause,
            explanationPerson,
            wagesPeriod,
            fineAmount,
            remarks
        } = req.body;

        // Create the new fine entry
        const newFine = {
            fineId,
            employeeId,
            employeeName,
            fatherHusbandName,
            contractorName,
            designationNatureOfEmployment,
            actOmission,
            dateOfOffence,
            showedCause,
            explanationPerson,
            wagesPeriod,
            fineAmount,
            remarks
        };

        // Fetch or create a new Fine document
        let fineDoc = await Fine.findOne();
        if (!fineDoc) {
            fineDoc = new Fine(); // Create a new document if it doesn't exist
        }

        // Ensure that fineMaster exists
        if (!fineDoc.fineMaster) {
            fineDoc.fineMaster = new Map(); // Initialize fineMaster as a Map
        }

        // Add the new fine to the fineMaster map
        fineDoc.fineMaster.set(fineId, newFine);

        // Save the updated document
        await fineDoc.save();

        // Respond with the created fine
        res.status(201).json({ fineId, ...newFine });
    } catch (error) {
        console.error('Error creating fine:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
