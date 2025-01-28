
const mongoose = require('mongoose');

exports.getContractors = async (req, res) => {
  try {
    console.log('getContractors function called');
    const amsCollection = mongoose.connection.collection('ams');
    const contractorsData = await amsCollection.findOne({}, { projection: { 'contractorMaster': 1 } });

    if (!contractorsData || !contractorsData.contractorMaster) {
      console.log('No contractorMaster data found');
      return res.status(404).json({ message: 'No contractor data found' });
    }

    const contractorList = Object.entries(contractorsData.contractorMaster).map(([id, data]) => ({
      _id: id,
      contractorName: data.contractorName,
      address: data.address
    }));

    console.log('Contractor data fetched:', contractorList);
    res.status(200).json(contractorList);
  } catch (error) {
    console.error('Error fetching contractors:', error);
    res.status(500).json({ message: 'Failed to fetch contractors' });
  }
};
// exports.getWorkersByContractor = async (req, res) => {
//   const { contractorName } = req.params;

//   try {
//     const amsCollection = mongoose.connection.collection('ams');

//     // Fetch all labourRate data
//     const labourRatesData = await amsCollection.findOne({}, { projection: { labourRate: 1 } });
//     const labourRates = {};
//     if (labourRatesData && labourRatesData.labourRate) {
//       Object.values(labourRatesData.labourRate).forEach(rate => {
//         labourRates[rate.labourType] = rate.labourRate;
//       });
//     } else {
//       console.log("No labourRate data found");
//     }

//     const attendanceData = await amsCollection.findOne({}, { projection: { attendanceMaster: 1 } });
//     const workerIds = [];
//     Object.keys(attendanceData.attendanceMaster).forEach(date => {
//       const dateEntries = attendanceData.attendanceMaster[date];
//       Object.keys(dateEntries).forEach(workerId => {
//         const workerEntry = dateEntries[workerId];
//         if (workerEntry.contractorName === contractorName) {
//           workerIds.push(workerEntry.workerId);
//         }
//       });
//     });

//     const workerDetails = [];
//     for (const workerId of workerIds) {
//       const workerData = await amsCollection.findOne(
//         { [`workerMaster.${workerId}`]: { $exists: true } },
//         { projection: { [`workerMaster.${workerId}`]: 1 } }
//       );

//       if (workerData && workerData.workerMaster && workerData.workerMaster[workerId]) {
//         const worker = workerData.workerMaster[workerId];
//         const labourType = worker.labourType;
//         const minimumWageRate = labourRates[labourType] || 0; // Fetch labour rate or set to 0 if not found

//         workerDetails.push({
//           serialNo: workerDetails.length + 1,
//           workerId,
//           uanNo: worker.uanNumber,
//           fullName: `${worker.firstName} ${worker.middleName} ${worker.lastName}`,
//           fathersName: worker.middleName,
//           gender: worker.gender,
//           dateOfBirth: worker.dateOfBirth,
//           dateOfJoining: worker.dateOfJoining,
//           designation: worker.designation,
//           workingHoursFrom: "09:00 AM",
//           workingHoursTo: "06:00 PM",
//           intervalFrom: "01:00 PM",
//           intervalTo: "02:00 PM",
//           minimumWageRate // Pass the minimum wage rate to the frontend
//         });
//       }
//     }

//     res.status(200).json(workerDetails);
//   } catch (error) {
//     console.error('Error fetching worker details:', error);
//     res.status(500).json({ message: 'Failed to fetch worker details' });
//   }
// };
exports.getWorkersByContractor = async (req, res) => {
  const { contractorName } = req.params;
  try {
    const amsCollection = mongoose.connection.collection('ams');
    // Fetch all labourRate data
    const labourRatesData = await amsCollection.findOne({}, { projection: { labourRate: 1 } });
    const labourRates = {};
    if (labourRatesData && labourRatesData.labourRate) {
      Object.values(labourRatesData.labourRate).forEach(rate => {
        labourRates[rate.labourType] = rate.labourRate;
      });
    } else {
      console.log("No labourRate data found");
    }
    const attendanceData = await amsCollection.findOne({}, { projection: { attendanceMaster: 1 } });
    const workerAttendanceMap = {}; // Map to store workers and attendance data
    Object.keys(attendanceData.attendanceMaster).forEach(date => {
      const dateEntries = attendanceData.attendanceMaster[date];
      Object.keys(dateEntries).forEach(workerId => {
        const workerEntry = dateEntries[workerId];
        if (workerEntry.contractorName === contractorName) {
          if (!workerAttendanceMap[workerId]) {
            // Initialize worker data
            workerAttendanceMap[workerId] = {
              workerId,
              dates: {}, // Store attendance status by date
            };
          }
          // Add or update the attendance status for the specific date
          workerAttendanceMap[workerId].dates[date] = workerEntry.attendanceStatus || 'A'; // Default to 'A'
        }
      });
    });
    const workerDetails = [];
    for (const workerId of Object.keys(workerAttendanceMap)) {
      const workerData = await amsCollection.findOne(
        { [`workerMaster.${workerId}`]: { $exists: true } },
        { projection: { [`workerMaster.${workerId}`]: 1 } }
      );
      if (workerData && workerData.workerMaster && workerData.workerMaster[workerId]) {
        const worker = workerData.workerMaster[workerId];
        const labourType = worker.labourType;
        const minimumWageRate = labourRates[labourType] || 0;
        workerDetails.push({
          serialNo: workerDetails.length + 1,
          workerId,
          uanNo: worker.uanNumber,
          fullName: `${worker.firstName} ${worker.middleName} ${worker.lastName}`,
          fathersName: worker.middleName,
          gender: worker.gender,
          dateOfBirth: worker.dateOfBirth,
          dateOfJoining: worker.dateOfJoining,
          designation: worker.designation,
          workingHoursFrom: "09:00 AM",
          workingHoursTo: "06:00 PM",
          intervalFrom: "01:00 PM",
          intervalTo: "02:00 PM",
          minimumWageRate, // Pass the minimum wage rate to the frontend
          attendance: workerAttendanceMap[workerId].dates, // Pass attendance data by date
        });
      }
    }
    res.status(200).json(workerDetails);
  } catch (error) {
    console.error('Error fetching worker details:', error);
    res.status(500).json({ message: 'Failed to fetch worker details' });
  }
};
// Utility function to generate attendance columns based on the From Date and To Date
exports.generateAttendanceColumns = (fromDate, toDate) => {
  console.log('Generating attendance columns from:', fromDate, 'to:', toDate);
  
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const attendanceColumns = [];

  while (start <= end) {
    const day = daysOfWeek[start.getDay()];
    const date = start.getDate();
    
    attendanceColumns.push({
      date: `${date}`,
      day: `${day}`
    });

    // Move to the next day
    start.setDate(start.getDate() + 1);
  }

  console.log('Generated attendance columns:', attendanceColumns);
  return attendanceColumns;
};
exports.getAttendanceData = async (req, res) => {
  const { fromDate, toDate } = req.body;

  try {
    const amsCollection = mongoose.connection.collection('ams');

    // Fetch week off and paid leave days
    const paidLeaveDaysData = await amsCollection.findOne({}, { projection: { paidLeaveDays: 1 } });
    const weekOffDaysData = await amsCollection.findOne({}, { projection: { weekOffDays: 1 } });

    const weekOffDays = weekOffDaysData ? Object.values(weekOffDaysData.weekOffDays).map(day => day.weekOffDay) : [];
    const paidHolidays = paidLeaveDaysData ? Object.values(paidLeaveDaysData.paidLeaveDays).map(day => day.paidLeaveDay) : [];

    // Fetch attendance records within the date range
    const attendanceMaster = await amsCollection.findOne({}, { projection: { attendanceMaster: 1 } });
    const attendanceData = [];

    if (attendanceMaster && attendanceMaster.attendanceMaster) {
      Object.keys(attendanceMaster.attendanceMaster).forEach(date => {
        const currentDate = new Date(date);
        if (currentDate >= new Date(fromDate) && currentDate <= new Date(toDate)) {
          attendanceData.push({
            date,
            data: attendanceMaster.attendanceMaster[date] // Ensures worker data is nested under `data`
          });
        }
      });
    } else {
      console.log('No attendanceMaster data found');
    }

    console.log("Final attendanceData to send to frontend:", attendanceData);
    res.status(200).json({ weekOffDays, paidHolidays, attendanceData });
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ message: 'Failed to fetch attendance data' });
  }
};

exports.savePayrollData = async (req, res) => {
  const { fromDate, contractorName, totalSubscribers, totalWages } = req.body;
  const existingId = process.env._id; // The specific ID where you want to save data

  try {
    const amsCollection = mongoose.connection.collection('ams');

    // Convert fromDate to "Month Year" format
    const monthName = new Date(fromDate).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Fetch contractor's address from contractorMaster
    const contractorData = await amsCollection.findOne(
      { [`contractorMaster`]: { $exists: true } },
      { projection: { contractorMaster: 1 } }
    );

    const contractorDetails = Object.values(contractorData.contractorMaster).find(
      contractor => contractor.contractorName === contractorName
    );

    if (!contractorDetails) {
      return res.status(404).json({ message: 'Contractor not found in contractorMaster' });
    }

    const address = contractorDetails.address;

    // Prepare payroll data to save
    const payrollData = {
      address,
      contractorName,
      monthName,
      totalSubscribers,
      totalWages
    };

    // Update the document with the existing _id
    await amsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(existingId) },  // Search by existing _id
      { 
        $set: { [`payroll.${monthName}.${contractorName}`]: payrollData } 
      },
      { upsert: false }  // Create if it doesn't exist, but it should update if it does
    );
    
  res.status(200).json({ message: 'Payroll data saved successfully' });
  } catch (error) {
    console.error('Error saving payroll data:', error);
    res.status(500).json({ message: 'Failed to save payroll data' });
  }
};





