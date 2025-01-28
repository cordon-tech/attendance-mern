
const mongoose = require('mongoose');

// Function to create or update an attendance record
exports.createAttendance = async (req, res) => {
  const { workerId, firstName, lastName, contractorName, inTime, outTime, date, day, buildingNumber } = req.body;

  const currentDate = new Date(date).toISOString().split('T')[0]; // Format date to "YYYY-MM-DD"

  try {
    const editAttendanceData = {
      workerId,
      firstName,
      lastName,
      contractorName,
      inTime,
      outTime,
      date: currentDate,
      day,
      buildingNumber,
    };

    // Insert or update the attendance record in the specified document and path
    const result = await mongoose.connection.db.collection('ams').updateOne(
      { _id: new mongoose.Types.ObjectId("671f3ea10cdce3e6714e6941") }, // Replace with your actual MongoDB document ID
      { $set: { [`attendanceMaster.${currentDate}.${workerId}`]: editAttendanceData } },
      { upsert: true }
    );

    res.status(201).json({ message: 'Attendance recorded successfully', result });
  } catch (error) {
    console.error('Error saving attendance data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to get an attendance record for a specific worker and date
exports.getAttendance = async (req, res) => {
  const { workerId, date } = req.params;
  console.log("Fetching attendance for Worker ID:", workerId, "on Date:", date); 
  
  try {
    const result = await mongoose.connection.db.collection('ams').findOne(
      { _id: new mongoose.Types.ObjectId("671f3ea10cdce3e6714e6941") }, // Replace with your actual MongoDB document ID
      { projection: { [`attendanceMaster.${date}.${workerId}`]: 1 } }
    );

    if (result && result.attendanceMaster && result.attendanceMaster[date] && result.attendanceMaster[date][workerId]) {
      res.json(result.attendanceMaster[date][workerId]);
    } else {
      res.status(404).json({ message: 'Attendance record not found' });
    }
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to update only the outTime for an existing attendance record
exports.updateOutTime = async (req, res) => {
  const { workerId, date } = req.params;
  const { outTime } = req.body;

  try {
    const result = await mongoose.connection.db.collection('ams').updateOne(
      { _id: new mongoose.Types.ObjectId("671f3ea10cdce3e6714e6941") }, // Replace with your actual MongoDB document ID
      { $set: { [`attendanceMaster.${date}.${workerId}.outTime`]: outTime } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Out Time updated successfully' });
    } else {
      res.status(404).json({ message: 'Attendance record not found for updating outTime' });
    }
  } catch (error) {
    console.error('Error updating out time:', error);
    res.status(500).json({ message: 'Server error' });
  }
};