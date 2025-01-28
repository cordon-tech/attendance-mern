const mongoose = require('mongoose');

exports.getAttendanceByDate = async (req, res) => {
  const { date } = req.params;
  const db = mongoose.connection.db;
  const attendanceCollection = db.collection('ams');

  try {
    const data = await attendanceCollection.findOne({ [`attendanceMaster.${date}`]: { $exists: true } });

    if (data && data.attendanceMaster[date]) {
      const attendanceRecords = Object.keys(data.attendanceMaster[date]).map((workerId) => ({
        workerId,
        date,
        ...data.attendanceMaster[date][workerId]
      }));
      res.status(200).json(attendanceRecords);
    } else {
      res.status(404).json({ message: 'No data found for this date' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};