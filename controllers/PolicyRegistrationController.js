// backend/controllers/policyFormController.js
const AMS = require("../models/PolicyRegistartionModel");

// Helper function to generate the next policy ID
const generatePolicyId = async () => {
    const amsData = await AMS.findOne();
    if (!amsData || !amsData.policyForm) {
        return "PF01";
    }

    const policyIds = Array.from(amsData.policyForm.keys());
    if (policyIds.length === 0) {
        return "PF01";
    }

    const lastPolicyId = policyIds.sort().pop(); // Get the highest policy ID
    const lastIdNumber = parseInt(lastPolicyId.slice(2), 10); // Remove 'PF' and parse the number
    const newIdNumber = lastIdNumber + 1;
    return `PF${newIdNumber.toString().padStart(2, "0")}`; // Pad with zeros to maintain two digits
};

// Add a new policy entry to policyForm in the AMS collection
exports.addPolicy = async (req, res) => {
    try {
        const policyId = await generatePolicyId();
        const policyData = req.body;

        // Save uploaded file path if there's a file
        if (req.file) {
            policyData.fileUpload = req.file.path;
        }

        // Find or create the AMS document
        let amsData = await AMS.findOne();
        if (!amsData) {
            amsData = new AMS();
        }

        // Save the policy data under the generated policy ID
        amsData.policyForm.set(policyId, policyData);
        await amsData.save();

        res.status(201).json({ message: "Policy added successfully!", policyId });
    } catch (error) {
        console.error("Failed to add policy:", error);
        res.status(500).json({ message: "Failed to add policy", error });
    }
};
