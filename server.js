const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');  // MongoDB connection

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const damageRoutes = require('./routes/damageRoutes');
const designationRoutes = require('./routes/designationRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const supervisorMasterRoutes = require('./routes/supervisorMasterRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
const contractorMasterRoutes = require('./routes/contractorMasterRoutes');
const fineRoutes = require('./routes/fineRoutes');
const workerRoutes = require('./routes/workerRoute');
const workerFetchRoutes = require('./routes/workerFetchRoute');
const workerKYCRoutes = require('./routes/workerkycroutes');
const contractorKYCRoutes = require('./routes/contractorKYCRoutes');
const advanceMasterRoute = require('./routes/advanceMasterRoutes');
const overtimeRoutes = require('./routes/overtimeRoutes');
const overtimeMasterRoutes = require('./routes/overtimeMasterRoute');
const changePasswordRoutes = require('./routes/changePasswordRoutes');
const labourRoutes = require('./routes/LabourRoutes');
const KYCSupervisor = require('./routes/KYCsupervisorRoutes');
const AccidentMasterRoutes = require('./routes/AccidentMasterRoutes');
const DamageOrLossMasterRoutes = require('./routes/DamageOrLossMasterRoutes');
const PolicyRegistrationRoutes = require('./routes/PolicyRegistrationRoutes');
const PolicyMasterRoute = require('./routes/PolicyMasterRoute');
const AdvanceRegistrationRoutes = require("./routes/AdvanceRegistrationRoutes");
const FineMasterRouter = require("./routes/FineMasterRouter");
const weekOffRoutes = require('./routes/weekOffRoutes');
const paidLeaveRoutes = require('./routes/paidLeaveRoutes');
const accidentRoutes = require('./routes/accidentRoutes');
const workerRoutesID = require("./routes/workerRoutesID");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());

// Define constants
const AMS_ID = new mongoose.Types.ObjectId('671f3ea10cdce3e6714e6941');

// Mount routes
app.use('/api/ams/ams/adminMaster', adminRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/damages', damageRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/ams', supervisorRoutes);
app.use('/api/ams', supervisorMasterRoutes);
app.use('/api/contractors', contractorRoutes);
app.use('/api/contractor-master', contractorMasterRoutes);
app.use('/api/fines', fineRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/workerData', workerFetchRoutes);
app.use('/api/workerKYC', workerKYCRoutes);
app.use('/api/kyc-contractor', contractorKYCRoutes);
app.use('/api', advanceMasterRoute);
app.use('/api/overtime', overtimeRoutes);
app.use('/api/overtime-master', overtimeMasterRoutes);
app.use('/api/user/change-password', changePasswordRoutes);
app.use('/api/labour', labourRoutes);
app.use('/api/ams', KYCSupervisor);
app.use("/api", AccidentMasterRoutes);
app.use("/api", AdvanceRegistrationRoutes);
app.use("/api", DamageOrLossMasterRoutes);
app.use("/api", FineMasterRouter);
app.use("/api", PolicyMasterRoute);
app.use("/api", PolicyRegistrationRoutes);
app.use('/api/weekoff', weekOffRoutes);
app.use('/api/paid-leave', paidLeaveRoutes);
app.use('/api/accidents', accidentRoutes);
app.use("/api/workers", workerRoutesID);
app.use("/api/attendance", attendanceRoutes);

// Route for fetching contractor and worker counts
app.get('/api/counts', async (req, res) => {
  try {
    console.log('API route /api/counts called');
    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument) {
      console.error('Main document not found');
      return res.status(404).json({ error: 'Main document not found' });
    }

    const contractorCount = mainDocument.contractorMaster ? Object.keys(mainDocument.contractorMaster).length : 0;
    const workerCount = mainDocument.workerMaster ? Object.keys(mainDocument.workerMaster).length : 0;

    const today = moment().format('YYYY-MM-DD');
    const presentCount = mainDocument.attendanceMaster && mainDocument.attendanceMaster[today]
      ? Object.keys(mainDocument.attendanceMaster[today]).length
      : 0;

    res.json({ contractorCount, workerCount, presentCount });
  } catch (error) {
    console.error('Error in /api/counts route:', error);
    res.status(500).json({ error: 'Failed to fetch counts', details: error.message });
  }
});

// Route to fetch attendance count for a specific date
app.get('/api/attendance-count', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument) {
      console.error('Main document not found');
      return res.status(404).json({ error: 'Main document not found' });
    }

    const attendanceCount = mainDocument.attendanceMaster && mainDocument.attendanceMaster[date]
      ? Object.keys(mainDocument.attendanceMaster[date]).length
      : 0;

    res.json({ count: attendanceCount });
  } catch (error) {
    console.error('Error fetching attendance count:', error);
    res.status(500).json({ error: 'Failed to fetch attendance count', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
