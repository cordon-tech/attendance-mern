// const mongoose = require('mongoose');

// // Fetch list of contractors for the dropdown
// exports.getContractors = async (req, res) => {
//   try {
//     const amsCollection = mongoose.connection.collection('ams');
//     const contractors = await amsCollection.findOne({}, { projection: { 'contractorMaster': 1 } });

//     const contractorList = Object.entries(contractors.contractorMaster).map(([id, data]) => ({
//       _id: id,
//       contractorName: data.contractorName
//     }));

//     res.status(200).json(contractorList);
//   } catch (error) {
//     console.error('Error fetching contractors:', error);
//     res.status(500).json({ message: 'Failed to fetch contractors' });
//   }
// };

// // Fetch details of a specific contractor
// exports.getContractorDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const amsCollection = mongoose.connection.collection('ams');

//     const contractor = await amsCollection.findOne({}, { projection: { [`contractorMaster.${id}`]: 1 } });

//     if (contractor && contractor.contractorMaster && contractor.contractorMaster[id]) {
//       const contractorData = contractor.contractorMaster[id];
//       res.status(200).json({
//         contractorName: contractorData.contractorName,
//         address: contractorData.address
//       });
//     } else {
//       res.status(404).json({ message: 'Contractor not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching contractor details:', error);
//     res.status(500).json({ message: 'Failed to fetch contractor details' });
//   }
// };

// // Fetch overtime records based on contractorName and overtimeMonth
// exports.getOvertimeRecords = async (req, res) => {
//   try {
//     const { contractorName, overtimeMonth } = req.query;
//     const amsCollection = mongoose.connection.collection('ams');

//     // Check if contractorName and overtimeMonth are provided
//     if (!contractorName || !overtimeMonth) {
//       return res.status(400).json({ message: 'Contractor name and overtime month are required' });
//     }

//     // Extract month and year from overtimeMonth
//     const [selectedYear, selectedMonth] = overtimeMonth.split('-');

//     // Fetch the data for the specified contractorName
//     const contractorData = await amsCollection.findOne(
//       { [`overtimeMaster.${contractorName}`]: { $exists: true } },
//       { projection: { [`overtimeMaster.${contractorName}`]: 1 } }
//     );

//     if (!contractorData || !contractorData.overtimeMaster[contractorName]) {
//       return res.status(404).json({ message: 'No data found for the selected contractor' });
//     }

//     // Filter the records by month and year
//     const overtimeRecords = [];
//     for (const [overtimeDate, records] of Object.entries(contractorData.overtimeMaster[contractorName])) {
//       const [year, month] = overtimeDate.split('-');
//       if (year === selectedYear && month === selectedMonth) {
//         overtimeRecords.push(...Object.values(records)); // Extract each record
//       }
//     }

//     if (overtimeRecords.length > 0) {
//       res.status(200).json(overtimeRecords);
//     } else {
//       res.status(404).json({ message: 'No data found for the selected month and contractor' });
//     }
//   } catch (error) {
//     console.error('Error fetching overtime records:', error);
//     res.status(500).json({ message: 'Failed to fetch overtime records', error: error.message });
//   }
// };


const mongoose = require('mongoose');


// Fetch list of contractors for the dropdown
exports.getContractors = async (req, res) => {
  try {
    const amsCollection = mongoose.connection.collection('ams');
    const contractors = await amsCollection.findOne({}, { projection: { 'contractorMaster': 1 } });

    const contractorList = Object.entries(contractors.contractorMaster).map(([id, data]) => ({
      _id: id,
      contractorName: data.contractorName
    }));

  //   const contractorList = contractors && contractors.contractorMaster
  //   ? Object.entries(contractors.contractorMaster).map(([id, data]) => ({
  //     _id: id,
  //     contractorName: data.contractorName,
  //   }))
  // : [];

    res.status(200).json(contractorList);
  } catch (error) {
    console.error('Error fetching contractors:', error);
    res.status(500).json({ message: 'Failed to fetch contractors' });
  }
};

// Fetch details of a specific contractor
exports.getContractorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const amsCollection = mongoose.connection.collection('ams');

    const contractor = await amsCollection.findOne({}, { projection: { [`contractorMaster.${id}`]: 1 } });

    if (contractor && contractor.contractorMaster && contractor.contractorMaster[id]) {
      const contractorData = contractor.contractorMaster[id];
      res.status(200).json({
        contractorName: contractorData.contractorName,
        address: contractorData.address
      });
    } else {
      res.status(404).json({ message: 'Contractor not found' });
    }
  } catch (error) {
    console.error('Error fetching contractor details:', error);
    res.status(500).json({ message: 'Failed to fetch contractor details' });
  }
};

// Fetch overtime records based on contractorName and overtimeMonth
// Fetch overtime records based on contractorName and overtimeMonth
exports.getOvertimeRecords = async (req, res) => {
  console.log("shravani/////////////////////////////");
  try {
    const { contractorName, overtimeMonth } = req.query;

    // Log the incoming request parameters
    console.log("Request for overtime records received with:");
    console.log("Contractor Name:", contractorName);
    console.log("Overtime Month:", overtimeMonth);

    if (!contractorName || !overtimeMonth) {
      console.log("Error: Missing contractor name or overtime month");
      return res.status(400).json({ message: 'Contractor name and overtime month are required' });
    }

    const [selectedYear, selectedMonth] = overtimeMonth.split('-');
    console.log("Parsed Year:", selectedYear);
    console.log("Parsed Month:", selectedMonth);

    const amsCollection = mongoose.connection.collection('ams');

    // Search by contractor name in overtimeMaster
    const contractorData = await amsCollection.findOne(
      { [`overtimeMaster.${contractorName}`]: { $exists: true } },
      { projection: { [`overtimeMaster.${contractorName}`]: 1 } }
    );

    if (!contractorData || !contractorData.overtimeMaster || !contractorData.overtimeMaster[contractorName]) {
      console.log("No data found for contractor:", contractorName);
      return res.status(404).json({ message: 'No data found for the selected contractor' });
    }

    const overtimeRecords = [];
    const contractorOvertime = contractorData.overtimeMaster[contractorName];

    for (const [overtimeDate, employeeRecords] of Object.entries(contractorOvertime)) {
      const [year, month] = overtimeDate.split('-');
      if (year === selectedYear && month === selectedMonth) {
        console.log(`Matching date found: ${overtimeDate}`);
        overtimeRecords.push(...Object.values(employeeRecords)); // Collect each employee's record
      }
    }

    if (overtimeRecords.length > 0) {
      res.status(200).json(overtimeRecords);
    } else {
      console.log("No records found for the specified month and contractor");
      res.status(404).json({ message: 'No data found for the selected month and contractor' });
    }
  } catch (error) {
    console.error('Error fetching overtime records:', error);
    res.status(500).json({ message: 'Failed to fetch overtime records', error: error.message });
  }
};
