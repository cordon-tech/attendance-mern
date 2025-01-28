// backend/models/amsModel.js
const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    policyName: String,
    policyNo: String,
    policyDate: Date,
    policyValidDate: Date,
    projectValue: String,
    personValue: String,
    project: String,
    workerCount: Number,
    insurance: String,
    remark: String,
    fileUpload: String, // Path or filename of the uploaded file
}, { _id: false }); // Disable automatic _id generation for subdocuments

const amsSchema = new mongoose.Schema({
    policyForm: {
        type: Map,
        of: policySchema, // Each entry in policyForm follows the policySchema
    },
});

module.exports = mongoose.model("AMS", amsSchema, "ams");