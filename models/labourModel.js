
// const mongoose = require('mongoose');

// const labourSchema = new mongoose.Schema({
//   labourId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   labourType: {
//     type: String,
//     required: true
//   },
//   labourRate: {
//     type: Number,
//     required: true
//   }
// });

// const AmsSchema = new mongoose.Schema({
//   labourRate: {
//     type: Map,
//     of: labourSchema,
//     default: {}
//   }
// });

// module.exports = mongoose.model('Ams', AmsSchema);
const mongoose = require('mongoose');

const labourSchema = new mongoose.Schema({
  labourId: {
    type: String,
    required: true,
    unique: true
  },
  labourType: {
    type: String,
    required: true
  },
  labourRate: {
    type: Number,
    required: true
  }
});

const AmsSchema = new mongoose.Schema({
  labourRate: {
    type: Map,
    of: labourSchema,
    default: {}
  }
});

// Check if the model already exists before defining it
module.exports = mongoose.models.Ams || mongoose.model('Ams', AmsSchema);
