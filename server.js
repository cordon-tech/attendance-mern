// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const dotenv = require('dotenv');
const damageRoutes = require('./routes/damageRoutes'); // Import routes
const designationRoutes = require('./routes/designationRoutes');  // Import designation routes
const supervisorRoutes = require('./routes/supervisorRoutes');
const supervisorMasterRoutes = require('./routes/supervisorMasterRoutes');
const contractorRoutes = require('./routes/contractorRoutes'); // Existing contractor routes
const contractorMasterRoutes = require('./routes/contractorMasterRoutes'); // New contractor master routes
const fineRoutes = require('./routes/fineRoutes');
const workerRoutes = require('./routes/workerRoute');
const workerFetchRoutes = require('./routes/workerFetchRoute');
const workerKYCRoutes = require('./routes/workerkycroutes'); // Import worker KYC routes
const contractorKYCRoutes = require('./routes/contractorKYCRoutes');
const advanceMasterRoute = require('./routes/advanceMasterRoutes');
const overtimeRoutes = require('./routes/overtimeRoutes');
const overtimeMasterRoutes = require('./routes/overtimeMasterRoute');
const changePasswordRoutes = require('./routes/changePasswordRoutes');
const labourRoutes = require('./routes/LabourRoutes'); // Import labour routes
const KYCSupervisor = require('./routes/KYCsupervisorRoutes');
const AccidentMasterRoutes = require('./routes/AccidentMasterRoutes');
const DamageOrLossMasterRoutes = require('./routes/DamageOrLossMasterRoutes');
const PolicyRegistrationRoutes = require('./routes/PolicyRegistrationRoutes');
const PolicyMasterRoute = require('./routes/PolicyMasterRoute');
const AdvanceRegistrationRoutes = require("./routes/AdvanceRegistrationRoutes");
const FineMasterRouter = require("./routes/FineMasterRouter");
const weekOffRoutes = require('./routes/weekOffRoutes'); // Import the weekOffRoutes
const paidLeaveRoutes = require('./routes/paidLeaveRoutes'); // Add this line
const accidentRoutes = require('./routes/accidentRoutes');
const workerRoutesID = require("./routes/workerRoutesID");
const attendanceRoutes = require("./routes/attendanceRoutes");







const mongoose = require('mongoose');  // Pawan
const moment = require('moment');  // Pawan

const app = express();
require('dotenv').config();  // Load environment variables

// Connect to MongoDB
connectDB();

// Middleware
// app.use(cors());
// app.use(bodyParser.json());

// CORS Middleware with specific origin
const corsOptions = {
  origin: 'http://localhost:3000', // Update to your frontend address
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Collection ID for the main document
const AMS_ID = new mongoose.Types.ObjectId('671f3ea10cdce3e6714e6941');

// Routes
app.use('/api/ams/ams/adminMaster', adminRoutes);  // Your route definition
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/damages', damageRoutes); // Mount routes under /api/damages
app.use('/api/designations', designationRoutes);  // Add designation route definition
app.use('/api/ams', supervisorRoutes);
app.use('/api/ams', supervisorMasterRoutes);
app.use('/api/contractors', contractorRoutes); // Route for existing contractors
app.use('/api/contractor-master', contractorMasterRoutes); // Route for contractor master
app.use('/api/fines', require('./routes/fineRoutes'));
app.use('/api/workers', workerRoutes);
app.use('/api/workerData', workerFetchRoutes);
// Use the worker KYC routes under `/api/workerKYC`
app.use('/api/workerKYC', workerKYCRoutes);
app.use('/api/kyc-contractor', contractorKYCRoutes);
app.use('/api', advanceMasterRoute);
app.use('/api/overtime', overtimeRoutes);
app.use('/api/overtime-master', overtimeMasterRoutes);
app.use('/api/user/change-password', changePasswordRoutes);
app.use('/api/labour', labourRoutes);  // Labour routes
app.use('/api/ams', KYCSupervisor);
app.use("/api", AccidentMasterRoutes);
app.use("/api", AdvanceRegistrationRoutes);
app.use("/api", DamageOrLossMasterRoutes);
app.use("/api", FineMasterRouter);
app.use("/api", PolicyMasterRoute);
app.use("/api", PolicyRegistrationRoutes);
app.use('/api/weekoff', weekOffRoutes); // Add this line to use weekOffRoutes
app.use('/api/paid-leave', paidLeaveRoutes); // Register the new paid leave route
app.use('/api/accidents', accidentRoutes);


app.use("/api/workers", workerRoutesID);
app.use("/api/attendance", attendanceRoutes); 


// Pawan start

// Define the models
const Supervisor = mongoose.model('supervisors', { /* schema */ });
const Contractor = mongoose.model('contractors', { /* schema */ });
const Attendance = mongoose.model('attendances', { /* schema */ });

// Fetch counts
app.get('/api/counts', async (req, res) => {
  try {
    const supervisorCount = await Supervisor.countDocuments();
    const contractorCount = await Contractor.countDocuments();
    
    // Get today's date in 'YYYY-MM-DD' format
    const today = moment().format('YYYY-MM-DD');
    
    // Fetch today's attendance count (presence is implied by the existence of an entry)
    const presentCount = await Attendance.countDocuments({ date: today });

    res.json({
      supervisorCount,
      contractorCount,
      presentCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
});
// Pawan end 


app.get('/api/counts', async (req, res) => {
  try {
    console.log('API route /api/counts called');
    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument) {
      console.error('Main document not found');
      return res.status(404).json({ error: 'Main document not found' });
    }

    // Calculate contractor count
    const contractorCount = mainDocument.contractorMaster
      ? Object.keys(mainDocument.contractorMaster).length
      : 0;

    console.log('Contractor count:', contractorCount);

    // Calculate worker count
    const workerCount = mainDocument.workerMaster
      ? Object.keys(mainDocument.workerMaster).length
      : 0;

    console.log('Worker count:', workerCount);

    // Get today's date in 'YYYY-MM-DD' format
    const today = moment().format('YYYY-MM-DD');
    const presentCount = mainDocument.attendanceMaster && mainDocument.attendanceMaster[today]
      ? Object.keys(mainDocument.attendanceMaster[today]).length
      : 0;

    console.log('Today\'s present count:', presentCount);

    res.json({ contractorCount, workerCount, presentCount });
  } catch (error) {
    console.error('Error in /api/counts route:', error);
    res.status(500).json({ error: 'Failed to fetch counts', details: error.message });
  }
});

// New route to fetch attendance count for a specific date
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

    // Check if the date exists in the attendanceMaster
    if (!mainDocument.attendanceMaster || !mainDocument.attendanceMaster[date]) {
      console.log(`No attendance data found for date: ${date}`);
      return res.json({ count: 0 });
    }

    // Get the count of worker IDs for the specific date
    const attendanceCount = Object.keys(mainDocument.attendanceMaster[date]).length;
    console.log(`Attendance count for ${date}:`, attendanceCount);

    res.json({ count: attendanceCount });
  } catch (error) {
    console.error('Error fetching attendance count:', error);
    res.status(500).json({ error: 'Failed to fetch attendance count', details: error.message });
  }
});



//megha start



//megha end 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});