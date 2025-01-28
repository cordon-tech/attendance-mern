// const mongoose = require('mongoose');

// const labourSchema = new mongoose.Schema({
//   labourRate: {
//     type: Number,
//     required: true,
//   },
//   labourType: {
//     type: String,
//     required: true,
//   },
// });

// const LabourRate = mongoose.model('LabourRate', labourSchema);

// module.exports = LabourRate;const mongoose = require('mongoose');

const labourSchema = new mongoose.Schema({
  labourRate: {
    type: Number,
    required: true,
  },
  labourType: {
    type: String,
    required: true,
  },
});

const LabourRate = mongoose.model('LabourRate', labourSchema);

module.exports = LabourRate;