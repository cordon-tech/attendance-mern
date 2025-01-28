
// const mongoose = require('mongoose');

// const fineEntrySchema = new mongoose.Schema({
//     fineId: { type: String, required: true },
//     employeeId: { type: String, required: true },
//     contractorName: { type: String, required: true },
//     designationNatureOfEmployment: { type: String, required: false },
//     fatherHusbandName: { type: String, required: false },
//     employeeName: { type: String, required: false },
//     dateOfOffence: { type: Date, required: false },
//     actOmission: { type: String, required: false },
//     amountOfFine: { type: Number, required: false },
//     personInPresence: { type: String, required: false },
//     remarks: { type: String, required: false },
//     showedCause: { type: String, required: false },
//     fineAmount: { type: String, required: false },
//     wagesPeriod: { type: String, required: false },
//     explanationPerson: { type: String, required: false },

// });

// const fineSchema = new mongoose.Schema({
//     fineMaster: {
//         type: Map,
//         of: fineEntrySchema, // Use the fineEntrySchema to define the structure for each fine
//         default: {},
//     },
// });

// const Fine = mongoose.model('Fine', fineSchema, 'ams');
// module.exports = Fine;






const mongoose = require('mongoose');

const fineEntrySchema = new mongoose.Schema({
    fineId: { type: String, required: true },
    workerId: { type: String, required: true }, // Changed from employeeId
    contractorName: { type: String, required: true },
    designationNatureOfEmployment: { type: String, required: true },
    fatherHusbandName: { type: String, required: true }, // Changed from optional to required
    nameOfWorkman: { type: String, required: true }, // Changed from employeeName
    dateOfOffence: { type: Date, required: false },
    actOmission: { type: String, required: true },
    amountOfFine: { type: Number, required: false }, // Changed from fineAmount
    personInPresence: { type: String, required: false },
    remarks: { type: String, required: false },
    showedCause: { type: String, required: false },
    wagesPeriodsWagesPayable: { type: String, required: false }, // Changed from wagesPeriod
});

const fineSchema = new mongoose.Schema({
    fineMaster: {
        type: Map,
        of: fineEntrySchema, // Use the fineEntrySchema to define the structure for each fine
        default: {},
    },
});

const Fine = mongoose.model('Fine', fineSchema, 'ams');
module.exports = Fine;
