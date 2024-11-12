
// models/WeekOff.js
const mongoose = require('mongoose');

const weekOffSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: 'ams' // Ensures the root document has `_id: "ams"`
  },
  WeekOffDays: {
    type: Map,
    of: {
      weekOffDay: Date,
      weekOffValue: String
    },
    default: {}
  }
});

module.exports = mongoose.model('WeekOff', weekOffSchema);
