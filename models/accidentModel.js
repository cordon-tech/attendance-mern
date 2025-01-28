import mongoose from 'mongoose';

const accidentSchema = new mongoose.Schema({
  contractorName: { type: String, required: true },
  dateAccident: { type: Date, required: true },
  workerId: { type: String, required: true },
  details: {
    nameInjured: { type: String },
    dateReport: { type: Date },
    natureAccident: { type: String },
    dateReturn: { type: Date },
    daysAbsent: { type: Number },
  },
}, { collection: 'ams',strict: false });

export default mongoose.model('Accident', accidentSchema);