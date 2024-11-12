

//final testing



const mongoose = require('mongoose');
const AMS = mongoose.connection.collection("ams");

// Fetch all unique contractor names and addresses from contractorMaster in the ams collection
exports.getContractorNames = async (req, res) => {
    try {
        const amsData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });
        if (!amsData || !amsData.contractorMaster) {
            return res.status(404).json({ message: "No contractors found." });
        }
        const contractors = Object.values(amsData.contractorMaster);
        const contractorNames = contractors.map(contractor => contractor.contractorName);
        res.json(contractorNames);
    } catch (error) {
        console.error("Error fetching contractor names:", error);
        res.status(500).json({ message: "Failed to fetch contractor names", error });
    }
};



// Fetch all unique designation names from designation in the ams collection
exports.getDesignationNames = async (req, res) => {
  try {
      const amsData = await AMS.findOne({}, { projection: { designation: 1 } });
      if (!amsData || !amsData.designation) {
          return res.status(404).json({ message: "No designations found." });
      }
      const designations = Object.values(amsData.designation);
      const designationNames = designations.map(designation => designation.designationName);
      res.json(designationNames);
  } catch (error) {
      console.error("Error fetching designation names:", error);
      res.status(500).json({ message: "Failed to fetch designation names", error });
  }
};


// Fetch all unique labour types from labourRate in the ams collection
exports.getLabourTypes = async (req, res) => {
    try {
        // Retrieve `labourType` from each entry in `labourRate`
        const amsData = await AMS.findOne({}, { projection: { labourRate: 1 } });
        
        if (!amsData || !amsData.labourRate) {
            return res.status(404).json({ message: "No labour types found." });
        }
        
        const labourEntries = Object.values(amsData.labourRate);
        const labourTypes = labourEntries.map(entry => entry.labourType).filter(Boolean); // Filter out undefined values
        res.json(labourTypes);
    } catch (error) {
        console.error("Error fetching labour types:", error);
        res.status(500).json({ message: "Failed to fetch labour types", error });
    }
};


// Register a new worker with workerId under workerMaster
exports.registerWorker = async (req, res) => {
  try {
    console.log(req.body); // Log the incoming data for debugging

    // Fetch the latest worker entry to determine the next workerId
    const latestWorker = await mongoose.connection.collection('ams').findOne({
      workerMaster: { $exists: true }
    });

    let newWorkerId = 40001; // Default starting workerId
    if (latestWorker && latestWorker.workerMaster) {
      const workerIds = Object.keys(latestWorker.workerMaster);
      const maxWorkerId = Math.max(...workerIds.map(id => parseInt(id)));
      newWorkerId = maxWorkerId + 1; // Increment to get the new ID
    }

    // Prepare worker data, including the generated workerId and new fields
    const newWorkerData = {
      workerId: newWorkerId, // Store the generated unique workerId here
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      gender: req.body.gender,
      mobileNo: req.body.mobileNo,
      maritalStatus: req.body.maritalStatus,
      permanentAddress: req.body.permanentAddress,
      city: req.body.city,
      district: req.body.district,
      state: req.body.state,
      pincode: req.body.pincode,
      currentAddress: req.body.currentAddress,
      idType: req.body.idType,
      aadharNo: req.body.aadharNo,
      documentFiles: req.body.documentFiles || "",  // Assuming document file data comes as a text URL or file name
      aadharBack: req.body.aadharBack || "",       // Text data for the back of Aadhar card
      bankPassbook: req.body.bankPassbook || "",   // Text data for bank passbook
      contractorName: req.body.contractorName,
      designationName: req.body.designationName,
      labourType: req.body.labourType,
      joinDate: req.body.joinDate,
      issueDate: req.body.issueDate,
      validDate: req.body.validDate,
      bocwRegistration: req.body.bocwRegistration,
      pfNumber: req.body.pfNumber,
      uanNumber: req.body.uanNumber,
      esicNumber: req.body.esicNumber,
      panNumber: req.body.panNumber,
      ipNumber: req.body.ipNumber,
      policeVerify: req.body.policeVerify,
      bankName: req.body.bankName,
      branch: req.body.branch,
      accountNo: req.body.accountNo,
      ifscCode: req.body.ifscCode,
      nominee: req.body.nominee,
      relation: req.body.relation,
      nomineeNo: req.body.nomineeNo,
      children: req.body.children,
      qualification: req.body.qualification,
      sector: req.body.sector,
    };

    // Store the new worker data in workerMaster
    await mongoose.connection.collection('ams').updateOne(
      {},
      { $set: { [`workerMaster.${newWorkerId}`]: newWorkerData } },
      { upsert: true }
    );

    res.status(201).json({ message: 'Worker registered successfully', workerId: newWorkerId });
  } catch (error) {
    console.error('Error registering worker:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to register worker', error: error.message });
  }
};

