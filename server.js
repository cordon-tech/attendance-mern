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
// const damageRoutes = require('./routes/damageRoutes');
const damageRoutes = require('./routes/damageRoutes');
const designationRoutes = require('./routes/designationRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const supervisorMasterRoutes = require('./routes/supervisorMasterRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
// const contractorMasterRoutes = require('./routes/contractorMasterRoutes');
const contractorMasterRoutes = require('./routes/contractorMasterRoutes'); // Contractor Master route
const fineRoutes = require('./routes/fineRoutes');
const workerRoutes = require('./routes/workerRoute');
const workerFetchRoutes = require('./routes/workerFetchRoute');
const workerKYCRoutes = require('./routes/workerkycroutes');
// const contractorKYCRoutes = require('./routes/contractorKYCRoutes');
const contractorKYCRoutes = require('./routes/contractorKYCRoutes');
const advanceMasterRoute = require('./routes/advanceMasterRoutes');
const overtimeRoutes = require('./routes/overtimeRoutes');
const overtimeMasterRoutes = require('./routes/overtimeMasterRoute');
const changePasswordRoutes = require('./routes/changePasswordRoutes');
// const labourRoutes = require('./routes/LabourRoutes');
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
const attendanceMasterRoutes = require("./routes/attendanceMasterRoutes");
const NineMasterRoute = require("./routes/NineMasterRoute");
const editWorkerRoutes = require('./routes/editWorkerRoutes');
const attendanceRoutes = require("./routes/attendanceRoutes");
const pfChalanRoutes = require('./routes/pfChalanRoutes');
const payrollRoute = require('./routes/payrollRoute'); // Adjust path if necessary

// const supervisorRoutes = require('./routes/supervisorRoutes'); // Import the routes


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: '50mb' })); // For JSON requests
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

// MongoDB connection
connectDB();

// Middleware
// app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define constants
// const AMS_ID = new mongoose.Types.ObjectId('671f3ea10cdce3e6714e6941');
const AMS_ID = new mongoose.Types.ObjectId(process.env._id);

// Mount routes
app.use('/api/ams/ams/adminMaster', adminRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pfChalan', pfChalanRoutes);
app.use('/api/damage', damageRoutes); // Mount damage routes here
app.use('/api/designations', designationRoutes);
app.use('/api/supervisors', supervisorRoutes);

app.use('/api/ams/supervisor-master', supervisorMasterRoutes);
app.use('/api/contractors', contractorRoutes);
// Fix the contractorMasterRoutes mounting
// app.use('/api/contractor-master', contractorMasterRoutes);
app.use('/api/contractorMaster', contractorMasterRoutes);
app.use('/api/payroll', payrollRoute);
app.use('/api/fines', fineRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/workerData', workerFetchRoutes);
app.use('/api/workerKYC', workerKYCRoutes);
// app.use('/api/kyc-contractor', contractorKYCRoutes);
app.use('/api/kyc-contractor', contractorKYCRoutes);
app.use('/api', advanceMasterRoute);
app.use('/api/overtime', overtimeRoutes);
app.use('/api/overtime-master', overtimeMasterRoutes);
app.use('/api/user/change-password', changePasswordRoutes);
// app.use('/api/labour', labourRoutes);
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
app.use("/api/attendance", attendanceMasterRoutes);
app.use('/api/ninetyDays', NineMasterRoute);
app.use('/api/worker', editWorkerRoutes);


// Route for fetching contractor and worker counts
app.get('/api/counts', async (req, res) => {
  try {
    console.log('Fetching counts...');
    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument) {
      console.error('Main document not found');
      return res.status(404).json({ error: 'Main document not found' });
    }

    const contractorCount = mainDocument.contractorMaster ? Object.keys(mainDocument.contractorMaster).length : 0;
    const supervisorCount = mainDocument.supervisorMaster ? Object.keys(mainDocument.supervisorMaster).length : 0;
    
    const today = moment().format('YYYY-MM-DD');
    const presentCount = mainDocument.attendanceMaster && mainDocument.attendanceMaster[today]
      ? Object.keys(mainDocument.attendanceMaster[today]).length
      : 0;

    res.json({ supervisorCount, contractorCount,workerCount, presentCount });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Failed to fetch counts', details: error.message });
  }
});

app.get('/api/attendance-count', async (req, res) => {
  try {
    const { date } = req.query;

    // Log incoming request details
    console.log('Fetching attendance count for date:', date);

    if (!date) {
      console.error('Date is required but not provided');
      return res.status(400).json({ error: 'Date is required' });
    }

    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument) {
      console.error('Main document not found in database');
      return res.status(404).json({ error: 'Main document not found' });
    }

    // Check attendance data for the requested date
    console.log('Attendance Master:', mainDocument.attendanceMaster);

    const attendanceCount = mainDocument.attendanceMaster && mainDocument.attendanceMaster[date]
      ? Object.keys(mainDocument.attendanceMaster[date]).length
      : 0;

    console.log(`Attendance count for ${date}:`, attendanceCount);

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
