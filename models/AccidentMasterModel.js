// backend/models/Accident.js
const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
    contractorName: { type: String, required: true },
    date: { type: Date, required: true },
    workerId: { type: String, required: true },
    details: {
        nameOfInjured: String,
        dateOfAccident: Date,
        dateOfReport: Date,
        natureOfAccident: String,
        dateOfReturn: Date,
        daysAbsent: Number
    }
});

const contractorSchema = new mongoose.Schema({
    contractorId: { type: String, required: true },
    contractorName: { type: String, required: true },
});

module.exports = mongoose.model("Contractor", contractorSchema, "contractorMaster");

module.exports = mongoose.model("Accident", accidentSchema);
