// backend/controllers/policyController.js
const mongoose = require("mongoose");
const AMS = mongoose.connection.collection("ams"); // Access the 'ams' collection

// Fetch all policies from the policyForm in the ams collection
const getPolicies = async (req, res) => {
    try {
        // Find the document containing policyForm
        const amsData = await AMS.findOne({}, { projection: { policyForm: 1 } });

        if (!amsData || !amsData.policyForm) {
            return res.status(404).json({ message: "No policies found." });
        }

        // Convert policyForm from Map to Array, where each policy includes its ID
        const policies = Object.entries(amsData.policyForm).map(([policyId, policyData]) => ({
            policyId,
            ...policyData,
        }));

        res.json(policies);
    } catch (error) {
        console.error("Error fetching policies:", error);
        res.status(500).json({ message: "Failed to fetch policies", error });
    }
};

// Update policy
 const updatePolicy = async (req, res) => {
    const { policyId } = req.params;
    const updatedData = req.body;

    try {
        const amsData = await AMS.findOneAndUpdate(
            { [`policyForm.${policyId}`]: { $exists: true } },
            { $set: { [`policyForm.${policyId}`]: updatedData } },
            { new: true }
        );

        if (!amsData) {
            return res.status(404).json({ message: "Policy not found." });
        }

        res.status(200).json({ message: "Policy updated successfully!" });
    } catch (error) {
        console.error("Failed to update policy:", error);
        res.status(500).json({ message: "Failed to update policy", error });
    }
};

// Delete policy
 const deletePolicy = async (req, res) => {
    const { policyId } = req.params;

    try {
        const amsData = await AMS.findOneAndUpdate(
            { [`policyForm.${policyId}`]: { $exists: true } },
            { $unset: { [`policyForm.${policyId}`]: "" } },
            { new: true }
        );

        if (!amsData) {
            return res.status(404).json({ message: "Policy not found." });
        }

        res.status(200).json({ message: "Policy deleted successfully!" });
    } catch (error) {
        console.error("Failed to delete policy:", error);
        res.status(500).json({ message: "Failed to delete policy", error });
    }
};
module.exports = { getPolicies,deletePolicy,updatePolicy };
