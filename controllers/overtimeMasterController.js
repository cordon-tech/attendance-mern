const mongoose = require('mongoose');


// Fetch list of contractors for the dropdown
exports.getContractors = async (req, res) => {
  try {
    const amsCollection = mongoose.connection.collection('ams');
    const contractors = await amsCollection.findOne({}, { projection: { contractorMaster: 1 } });

    if (!contractors || !contractors.contractorMaster) {
      console.log("No contractors found in the database.");
      return res.status(404).json({ message: "No contractors found" });
    }

    const contractorList = Object.entries(contractors.contractorMaster).map(([id, data]) => ({
      _id: id,
      contractorName: data.contractorName,
      address:data.address,
    }));

    console.log("Fetched contractor list:", contractorList);
    res.status(200).json(contractorList);
  } catch (error) {
    console.error("Error fetching contractors:", error);
    res.status(500).json({ message: "Failed to fetch contractors" });
  }
};


// Fetch details of a specific contractor
// Fetch contractor details by contractorId
exports.getContractorDetails = async (req, res) => {
  try {
    const contractorId = req.params.id; // Retrieve contractorId from the URL
    console.log("Fetching details for contractor with ID:", contractorId);

    const amsCollection = mongoose.connection.collection('ams');
    const contractorData = await amsCollection.findOne(
      { [`contractorMaster.${contractorId}`]: { $exists: true } },
      { projection: { [`contractorMaster.${contractorId}`]: 1 } }
    );

    if (contractorData?.contractorMaster?.[contractorId]) {
      const contractorDetails = contractorData.contractorMaster[contractorId];
      res.status(200).json({
        contractorName: contractorDetails.contractorName,
        address: contractorDetails.address
      });
    } else {
      res.status(404).json({ message: 'Contractor not found' });
    }
  } catch (error) {
    console.error("Error fetching contractor details:", error);
    res.status(500).json({ message: 'Failed to fetch contractor details' });
  }
};




// Fetch overtime records based on contractorName and overtimeMonth
// Fetch overtime records based on contractorName and overtimeMonth
// exports.getOvertimeRecords = async (req, res) => {
//   console.log("shravani/////////////////////////////");
//   try {
//     const { contractorName, overtimeMonth } = req.query;

//     // Log the incoming request parameters
//     console.log("Request for overtime records received with:");
//     console.log("Contractor Name:", contractorName);
//     console.log("Overtime Month:", overtimeMonth);

//     if (!contractorName || !overtimeMonth) {
//       console.log("Error: Missing contractor name or overtime month");
//       return res.status(400).json({ message: 'Contractor name and overtime month are required' });
//     }

//     const [selectedYear, selectedMonth] = overtimeMonth.split('-');
//     console.log("Parsed Year:", selectedYear);
//     console.log("Parsed Month:", selectedMonth);

//     const amsCollection = mongoose.connection.collection('ams');

//     // Search by contractor name in overtimeMaster
//     const contractorData = await amsCollection.findOne(
//       { [`overtimeMaster.${contractorName}`]: { $exists: true } },
//       { projection: { [`overtimeMaster.${contractorName}`]: 1 } }
//     );

//     if (!contractorData || !contractorData.overtimeMaster || !contractorData.overtimeMaster[contractorName]) {
//       console.log("No data found for contractor:", contractorName);
//       return res.status(404).json({ message: 'No data found for the selected contractor' });
//     }

//     const overtimeRecords = [];
//     const contractorOvertime = contractorData.overtimeMaster[contractorName];

//     for (const [overtimeDate, employeeRecords] of Object.entries(contractorOvertime)) {
//       const [year, month] = overtimeDate.split('-');
//       if (year === selectedYear && month === selectedMonth) {
//         console.log(`Matching date found: ${overtimeDate}`);
//         overtimeRecords.push(...Object.values(employeeRecords)); // Collect each employee's record
//       }
//     }

//     if (overtimeRecords.length > 0) {
//       res.status(200).json(overtimeRecords);
//     } else {
//       console.log("No records found for the specified month and contractor");
//       res.status(404).json({ message: 'No data found for the selected month and contractor' });
//     }
//   } catch (error) {
//     console.error('Error fetching overtime records:', error);
//     res.status(500).json({ message: 'Failed to fetch overtime records', error: error.message });
//   }
// };
// In your controller (e.g., overtimeMasterController.js)
exports.getOvertimeRecords = async (req, res) => {
  const { contractorName, overtimeMonth } = req.query;
  
  console.log("Received contractor:", contractorName);
  console.log("Received overtimeMonth:", overtimeMonth);

  if (!contractorName || !overtimeMonth) {
    return res.status(400).json({ message: 'Both contractorName and overtimeMonth are required.' });
  }

  try {
    const amsCollection = mongoose.connection.collection('ams');
    
    // Find the contractor in overtimeMaster
    const contractorData = await amsCollection.findOne(
      { [`overtimeMaster.${contractorName}`]: { $exists: true } },
      { projection: { [`overtimeMaster.${contractorName}`]: 1 } }
    );

    if (!contractorData || !contractorData.overtimeMaster[contractorName]) {
      return res.status(404).json({ message: 'No data found for the specified contractor.' });
    }

    // Extract the overtime records
    const contractorOvertime = contractorData.overtimeMaster[contractorName];
    const overtimeRecords = [];

    // Loop through dates to match the month-year
    for (const [date, records] of Object.entries(contractorOvertime)) {
      const [year, month] = date.split('-');
      if (`${year}-${month}` === overtimeMonth) {
        overtimeRecords.push(...Object.values(records)); // Flatten records under this date
      }
    }

    if (overtimeRecords.length > 0) {
      return res.status(200).json(overtimeRecords);
    } else {
      return res.status(404).json({ message: 'No overtime records found for the specified month.' });
    }
  } catch (error) {
    console.error("Error fetching overtime records:", error);
    return res.status(500).json({ message: 'Error fetching overtime records.', error: error.message });
  }
};