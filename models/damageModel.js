const mongoose = require('mongoose');

const damageSchema = new mongoose.Schema({
  workerID: { type: String, required: true },
  workerName: { type: String },
  particularsOfDamage: { type: String, required: true },
  dateOfDamage: { type: Date, required: true },
  showedCause: { type: String, required: true },
  personInPresence: { type: String, required: true },
  amountOfDeduction: { type: Number, required: true },
  numOfInstallments: { type: Number, required: true },
  remarks: { type: String, required: true }
}, { collection: 'ams' });

module.exports = mongoose.model('Damage', damageSchema);
