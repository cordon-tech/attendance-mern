// // models/NinetyDaysMaster.js
// const mongoose = require('mongoose');

// const NinetyDaysMasterSchema = new mongoose.Schema({
//     jobNumber: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     workerData: {
//         type: Object,
//         required: true
//     }
// }, { collection: 'ninetyDaysMaster' });

// module.exports = mongoose.model('NinetyDaysMaster', NinetyDaysMasterSchema);



const mongoose = require('mongoose');

const WorkerDataSchema = new mongoose.Schema({
  contractorEstablishment: { type: String, required: true },
  contractorName: { type: String, required: true },
  jobDate: { type: String, required: true },
  totalDays: { type: Number, required: true },
  workEndDate: { type: String, required: true },
  workStartDate: { type: String, required: true },
  workerAge: { type: Number, required: true },
  workerDesignation: { type: String, required: true },
  workerFullAddress: { type: String, required: true },
  workerId: { type: String, required: true },
  workerName: { type: String, required: true },
});

const NinetyDaysMasterSchema = new mongoose.Schema({
  jobNumber: { type: String, required: true, unique: true },
  workerData: { type: WorkerDataSchema, required: true },
}, { collection: 'ninetyDaysMaster' });

module.exports = mongoose.model('NinetyDaysMaster', NinetyDaysMasterSchema);