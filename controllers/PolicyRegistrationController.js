// // backend/controllers/policyFormController.js
// const AMS = require("../models/PolicyRegistartionModel");

// // Helper function to generate the next policy ID
// const generatePolicyId = async () => {
//     const amsData = await AMS.findOne();
//     if (!amsData || !amsData.policyForm) {
//         return "PF01";
//     }

//     const policyIds = Array.from(amsData.policyForm.keys());
//     if (policyIds.length === 0) {
//         return "PF01";
//     }

//     const lastPolicyId = policyIds.sort().pop(); // Get the highest policy ID
//     const lastIdNumber = parseInt(lastPolicyId.slice(2), 10); // Remove 'PF' and parse the number
//     const newIdNumber = lastIdNumber + 1;
//     return `PF${newIdNumber.toString().padStart(2, "0")}`; // Pad with zeros to maintain two digits
// };

// // Add a new policy entry to policyForm in the AMS collection
// exports.addPolicy = async (req, res) => {
//     try {
//         const policyId = await generatePolicyId();
//         const policyData = req.body;

//         // Save uploaded file path if there's a file
//         if (req.file) {
//             policyData.fileUpload = req.file.path;
//         }

//         // Find or create the AMS document
//         let amsData = await AMS.findOne();
//         if (!amsData) {
//             amsData = new AMS();
//         }

//         // Save the policy data under the generated policy ID
//         amsData.policyForm.set(policyId, policyData);
//         await amsData.save();

//         res.status(201).json({ message: "Policy added successfully!", policyId });
//     } catch (error) {
//         console.error("Failed to add policy:", error);
//         res.status(500).json({ message: "Failed to add policy", error });
//     }
// };

const AMS = require("../models/PolicyRegistartionModel");
const { storage } = require("../config/firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const path = require("path");

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

// Function to upload a file to Firebase Storage under the policy ID folder
const uploadFileToFirebase = async (file, policyId) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const validExtensions = [".png", ".jpg", ".jpeg", ".pdf", ".docx"]; // Valid file extensions

    if (!validExtensions.includes(extension)) {
        throw new Error("Invalid file type. Allowed types are PNG, JPG, JPEG, PDF, DOCX.");
    }

    const filePath = `policyRegistration/${policyId}/${file.originalname}`;
    const storageRef = ref(storage, filePath);

    try {
        const metadata = {
            contentType: file.mimetype,
        };

        const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        throw new Error(`Failed to upload file: ${file.originalname}. Error: ${error.message}`);
    }
};

// Add a new policy entry to policyForm in the AMS collection
exports.addPolicy = async (req, res) => {
    try {
        const policyId = await generatePolicyId(); // Generate policy ID
        const policyData = req.body;

        // Upload the file to Firebase and save the URL under the policy ID folder
        if (req.file) {
            const fileUrl = await uploadFileToFirebase(req.file, policyId);
            policyData.fileUpload = fileUrl;
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
