const Ams = require('../models/contractorModel');

const registerContractor = async (req, res) => {
    try {
        // Log the incoming data for debugging
        console.log('Incoming body:', req.body);
        console.log('Incoming files:', req.files);

        // Create a new contractor object from the request body
        const newContractor = req.body;

        // Initialize documents field if it doesn't exist
        newContractor.documents = newContractor.documents || {};

        // Process uploaded files
        req.files.forEach(file => {
            if (file.fieldname === 'aadharCardFront') {
                newContractor.documents.aadharFront = file.path;
            }
            if (file.fieldname === 'aadharCardBack') {
                newContractor.documents.aadharBack = file.path;
            }
            if (file.fieldname === 'esicCodeLetter') {
                newContractor.documents.esicCodeLetter = file.path;
            }
            if (file.fieldname === 'ptecPtrcCode') {
                newContractor.documents.ptecPtrcCode = file.path;
            }
            if (file.fieldname === 'mlwfCodeLetter') {
                newContractor.documents.mlwfCodeLetter = file.path;
            }
            if (file.fieldname === 'bocwLicense') {
                newContractor.documents.bocwLicense = file.path;
            }
            if (file.fieldname === 'labourLicense') {
                newContractor.documents.labourLicense = file.path;
            }
            if (file.fieldname === 'wcPolicy') {
                newContractor.documents.wcPolicy = file.path;
            }
            if (file.fieldname === 'shopActLicense') {
                newContractor.documents.shopActLicense = file.path;
            }
            if (file.fieldname === 'providentFundCode') {
                newContractor.documents.providentFundCode = file.path;
            }
        });

        // Find the AMS document or create a new one if not found
        let amsDoc = await Ams.findOne();
        if (!amsDoc) {
            amsDoc = new Ams({
                contractorMaster: new Map() // Initialize contractorMaster as a Map
            });
        } else {
            // Ensure contractorMaster is a Map if it exists
            if (!(amsDoc.contractorMaster instanceof Map)) {
                amsDoc.contractorMaster = new Map();
            }
        }

        // Generate contractorId based on the current highest contractorId or start from 30001
        let lastContractorId = 30000; // Default to 30000 if no contractors exist
        const contractorIds = Array.from(amsDoc.contractorMaster.keys());
        if (contractorIds.length > 0) {
            lastContractorId = Math.max(...contractorIds.map(id => parseInt(id, 10)));
        }

        // Assign the new contractorId
        const newContractorId = (lastContractorId + 1).toString(); // Generate the next contractorId
        newContractor.contractorId = newContractorId;

        // Log the final contractor data to be saved
        console.log('New Contractor Data:', newContractor);

        // Add the new contractor to the contractorMaster object using contractorId as the key
        amsDoc.contractorMaster.set(newContractorId, newContractor); // Use .set() for Maps to avoid replacing

        // Save the updated AMS document
        await amsDoc.save();

        res.status(201).json({
            message: 'Contractor registered successfully',
            data: newContractor
        });
    } catch (error) {
        console.error('Error registering contractor:', error);
        res.status(500).json({ error: error.message || 'Server Error' });
    }
};

module.exports = { registerContractor };
