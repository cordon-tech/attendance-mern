// controllers/NinetyDaysFormController.js
const mongoose = require('mongoose');
// const NinetyDaysMaster = require('../models/NinetyDaysFormModel')

// Helper function to generate a new job number
async function generateJobNumber() {
  try {
    const amsCollection = mongoose.connection.db.collection('ams');
    const amsData = await amsCollection.findOne({});

    let lastJobNumber = 'PA1002024'; // Default starting job number if no data exists
    if (amsData && amsData.ninetyDaysMaster) {
      const jobNumbers = Object.keys(amsData.ninetyDaysMaster);
      lastJobNumber = jobNumbers[jobNumbers.length - 1];
    }

    const lastNumber = parseInt(lastJobNumber.slice(2, 5), 10);
    if (isNaN(lastNumber)) {
      throw new Error('Last job number is not a valid number.');
    }

    return `PA${(lastNumber + 1).toString().padStart(3, '0')}2024`;
  } catch (error) {
    console.error('Error generating job number:', error);
    throw error;
  }
}


// Fetch worker data by worker ID

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const generateTotalDays = () => {
  return Math.floor(Math.random() * (96 - 90)) + 90;
};

// Fetch worker and contractor data by worker ID
exports.getWorkerData = async (req, res) => {
  try {
    const workerId = req.params.workerId;

    // Log the incoming request
    console.log(`Fetching data for workerId: ${workerId}`);

    // Fetch the `ams` document where all data is stored
    const amsData = await mongoose.connection.db.collection('ams').findOne({});
    console.log('Fetched AMS Data:', amsData);

    // Check if the `workerMaster` collection and specific `workerId` exist
    if (!amsData || !amsData.workerMaster || !amsData.workerMaster[workerId]) {
      console.log(`Worker with ID ${workerId} not found in workerMaster`);
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Fetch the worker data by `workerId`
    const workerData = amsData.workerMaster[workerId];
    console.log('Fetched Worker Data:', workerData);

    // Prepare worker-specific data
    const combinedName = `${workerData.lastName || ''} ${workerData.middleName || ''} ${workerData.firstName || ''}`.trim();
    const workerAge = calculateAge(workerData.dateOfBirth);

    console.log('Worker Combined Name:', combinedName);
    console.log('Worker Age:', workerAge);

    // Extract contractorName from worker data
    const contractorName = workerData.contractorName;
    console.log('Contractor Name:', contractorName);

    let contractorData = {};

    // Search for contractor data based on contractorName in `contractorMaster`
    if (amsData.contractorMaster) {
      for (const key in amsData.contractorMaster) {
        const contractor = amsData.contractorMaster[key];
        if (contractor.contractorName === contractorName) {
          contractorData = contractor;
          console.log('Found Contractor Data:', contractorData);
          break;
        }
      }
    }

    // Fetch the labourType from the worker data
    const workerLabourType = workerData.labourType;
    console.log('Worker Labour Type:', workerLabourType);

    // Search through each key in the `labourRate` object to find the matching labourType
    let labourRate = 'Not Found';
    if (amsData.labourRate) {
      for (const key in amsData.labourRate) {
        const labour = amsData.labourRate[key];
        if (labour.labourType === workerLabourType) {
          labourRate = labour.labourRate;
          console.log(`Labour Rate found for labourType ${workerLabourType}:`, labourRate);
          break;
        }
      }
    }

    console.log('Labour Rate:', labourRate);

    // Structure the response data with both worker, contractor, and labour rate details
    const responseData = {
      workerName: combinedName,
      workerAge: workerAge,
      totalDays: generateTotalDays(),
      workerFullAddress: workerData.permanentAddress || '',
      workerVillage: workerData.permanentcity || '',
      workerTaluka: workerData.permanentcity || '',
      workerDistrict: workerData.permanentdistrict || '',
      workerPinCode: workerData.permanentPinCode || '',
      workerPhone: workerData.phoneNumber || '',
      workerDesignation: workerData.designation || '',
      workStartDate: workerData.dateOfJoining || '',
      currentWorkAddress: workerData.currentAddress || '',
      currentVillage: workerData.permanentcity || '',

      // Contractor details
      contractorEstablishment: contractorData.contractorName || 'N.B. Associates Pvt. Ltd',
      contractorId: contractorData.contractorID || '2313602310018008',
      contractorAddress: contractorData.address || 'Sunder Nagar, Road No - 02, Kalina, Santacruz East',
      contractorVillage: contractorData.village || '',
      contractorTaluka: contractorData.taluka || '',
      contractorDistrict: contractorData.district || '',
      contractorPinCode: contractorData.pinCode || '',
      contractorPhone: contractorData.phone || '',

      // Labour rate
      labourRate: labourRate
    };

    // Log the final response data before sending it
    console.log('Final Response Data:', responseData);

    // Send the structured response data
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching worker and contractor data:', error);
    res.status(500).json({ message: 'Error fetching worker and contractor data', error });
  }
};




// Assuming the 'labourRate' data is inside 'ams' collection
// controllers/NinetyDaysFormController.js

// Assuming that 'ams' collection contains 'labourRate' schema
// controllers/NinetyDaysFormController.js

// Fetch labourRate based on labourType (labourId) and its details (labourRate, labourType)
exports.getLabourRate = async (req, res) => {
  const { labourType } = req.params;
  try {
    // Fetch the document from the 'ams' collection based on the given 'labourType'
    const amsData = await mongoose.connection.db.collection('ams').findOne({});
    
    if (!amsData || !amsData.labourRate) {
      console.log('Labour rate data not found');
      return res.status(404).json({ message: 'Labour rate data not found.' });
    }

    // Loop through the 'labourRate' to find the matching 'labourType'
    let foundLabourRate = null;
    for (const labourId in amsData.labourRate) {
      const labour = amsData.labourRate[labourId];
      if (labour.labourType === labourType) {
        foundLabourRate = labour.labourRate; // Store the labourRate
        break;  // Stop once we find the matching labourType
      }
    }

    if (!foundLabourRate) {
      console.log('Labour rate not found for the specified labourType:', labourType);
      return res.status(404).json({ message: `Labour rate not found for ${labourType}.` });
    }

    // Return the found labourRate
    res.json({ labourRate: foundLabourRate });
  } catch (error) {
    console.error('Error fetching labour rate:', error);
    res.status(500).json({ message: 'Failed to fetch labour rate', error });
  }
};









// Save worker data with a generated job number in the `ams` collection
exports.saveWorkerData = async (req, res) => {
  try {
    const {
      contractorEstablishment,
      contractorName,
      jobDate,
      totalDays,
      workEndDate,
      workStartDate,
      workerAge,
      workerDesignation,
      workerFullAddress,
      workerId,
      workerName
    } = req.body; // Destructure directly from req.body to avoid undefined values

    // const calculatedTotalDays = totalDays || 90;
    const newJobNumber = await generateJobNumber();

    const workerData = {
      contractorEstablishment,
      contractorName,
      jobDate,
      totalDays,
      workEndDate,
      workStartDate,
      workerAge,
      workerDesignation,
      workerFullAddress,
      workerId,
      workerName
    };

    const amsCollection = mongoose.connection.db.collection('ams');

    // Update `ams` collection with the new job number data under `ninetyDaysMaster`
    await amsCollection.updateOne(
      {}, // Empty filter to update the existing `ams` document
      {
        $set: {
          [`ninetyDaysMaster.${newJobNumber}`]: workerData
        }
      },
      { upsert: true }
    );

    res.status(201).json({ message: 'Worker data saved successfully', jobNumber: newJobNumber });
  } catch (error) {
    console.error('Error saving worker data:', error);
    res.status(500).json({ message: 'Error saving worker data', error });
  }
};