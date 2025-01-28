const PFChalan = require('../models/pfChalanModel');
const mongoose = require('mongoose');

// exports.getAllPFChalan = async (req, res) => {
//   try {
//     const { year, month, contractorName } = req.query;
    
//     const monthYear = `${month} ${year}`; // Combine month and year for the query structure
    
//     const amsCollection = mongoose.connection.collection('ams');

//     // Retrieve the entire document for the given month-year and contractor for debugging
//     const payrollData = await amsCollection.findOne(
//       { [`payroll.${monthYear}.${contractorName}`]: { $exists: true } }
//     );

//     // Log the full data to inspect the structure
//     console.log("Payroll Data Retrieved:", JSON.stringify(payrollData, null, 2));

//     if (!payrollData || !payrollData.payroll || !payrollData.payroll[monthYear]) {
//       return res.status(404).json({ message: 'No payroll data found for the selected contractor and month-year.' });
//     }

//     const contractorPayroll = payrollData.payroll[monthYear][contractorName];
//     const { totalSubscribers, totalWages } = contractorPayroll;

//     // Send only the necessary data
//     res.json({ totalSubscribers, totalWages });
    
//   } catch (error) {
//     console.error("Error fetching PF Chalan data:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getAllPFChalan = async (req, res) => {
  try {
    const { year, month, contractorName } = req.query;
    const monthYear = `${month} ${year}`;
    
    const amsCollection = mongoose.connection.collection('ams');

    // Check if there’s any data for the given year
    const yearData = await amsCollection.findOne(
      { [`payroll.${monthYear}`]: { $exists: true } }
    );

    if (!yearData) {
      return res.status(404).json({ message: 'There is no data for this month and year!' });
    }

    // Check if there’s data for the specific month and year
    const monthData = await amsCollection.findOne(
      { [`payroll.${monthYear}`]: { $exists: true } }
    );

    if (!monthData || !monthData.payroll[monthYear]) {
      return res.status(404).json({ message: 'There is no data for this month and year!' });
    }

    // Check if there’s data for the specific contractor in the given month and year
    const contractorData = monthData.payroll[monthYear][contractorName];
    if (!contractorData) {
      return res.status(404).json({ message: 'This contractor does not exist for the given month and year.' });
    }

    // Extract totalSubscribers and totalWages
    const { totalSubscribers, totalWages } = contractorData;
    res.json({ totalSubscribers, totalWages });
    
  } catch (error) {
    console.error("Error fetching PF Chalan data:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.createOrUpdatePFChalan = async (req, res) => {
    try {
        const { year, month, contractorName, attendanceRecords } = req.body;
        const data = await PFChalan.findOneAndUpdate(
            { year, month, contractorName },
            { attendanceRecords },
            { new: true, upsert: true }
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




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
  