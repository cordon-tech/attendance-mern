
const mongoose = require('mongoose');

// Define the ObjectId to target your specific document
const AMS_ID = new mongoose.Types.ObjectId(process.env._id);

// Predefined Paid Leave Dates with messages
const predefinedPaidLeaves = {
    '26-01': 'January 26 is Republic Day in India',
    '15-08': 'August 15 is Independence Day in India'
};

// Helper to format the date as 'dd-mm-yyyy'
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
};

// Controller function to create a paid leave entry
exports.createPaidLeave = async (req, res) => {
    const { leaveDay, leaveValue } = req.body;

    const formattedLeaveDay = formatDate(leaveDay); // Format date to 'dd-mm-yyyy'
    const [day, month] = formattedLeaveDay.split('-'); // Extract day and month for predefined check
    const formattedDate = `${day}-${month}`;

    // Check if the date is one of the predefined paid leaves
    if (predefinedPaidLeaves[formattedDate]) {
        return res.status(400).json({
            message: `${predefinedPaidLeaves[formattedDate]} is already a declared paid leave.`
        });
    }

    try {
        const db = mongoose.connection.collection('ams');
        
        // Find the existing document by ObjectId
        const amsDocument = await db.findOne({ _id: AMS_ID });
        
        // Generate new ID for the entry
        let lastId = 'PL00';
        if (amsDocument && amsDocument.paidLeaveDays) {
            lastId = Object.keys(amsDocument.paidLeaveDays).pop();
        }
        const newId = `PL${(parseInt(lastId.substring(2)) + 1).toString().padStart(2, '0')}`;

        // Prepare the new entry
        const newEntry = {
            paidLeaveDay: formattedLeaveDay,
            plValue: leaveValue
        };

        // Store the new entry under `paidLeaveDays`
        await db.updateOne(
            { _id: AMS_ID },
            { $set: { [`paidLeaveDays.${newId}`]: newEntry } },
            { upsert: true }
        );

        res.status(201).json({ message: 'Paid Leave submitted successfully.' });
    } catch (error) {
        console.error('Error creating paid leave entry:', error);
        res.status(500).json({ message: 'Failed to create paid leave entry.', error: error.message });
    }
};
