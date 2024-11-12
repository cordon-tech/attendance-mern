// const AMS = mongoose.connection.collection("ams");

// const getWorkerDetails = async (req, res) => {
//   try {
//     const { workerId } = req.params;
//     const amsData = await AMS.findOne({}, { projection: { workerMaster: 1 } });

//     if (amsData && amsData.workerMaster && amsData.workerMaster[workerId]) {
//       const workerDetails = amsData.workerMaster[workerId];
//       res.json(workerDetails);
//     } else {
//       res.status(404).json({ message: "Worker not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching worker details:", error);
//     res.status(500).json({ message: "Failed to fetch worker details", error });
//   }
// };

// module.exports = { getWorkerDetails };


const mongoose = require("mongoose"); // Add this line to import mongoose

// Reference the `ams` collection
const AMS = mongoose.connection.collection("ams");

const getWorkerKYCDetails = async (req, res) => {
  const { workerId } = req.params;
  try {
    // Fetch the worker details from the `workerMaster` section by workerId
    const amsData = await AMS.findOne({ [`workerMaster.${workerId}`]: { $exists: true } });
    
    if (!amsData || !amsData.workerMaster[workerId]) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const workerData = amsData.workerMaster[workerId];
    res.json(workerData);
  } catch (error) {
    console.error("Error fetching worker KYC details:", error);
    res.status(500).json({ message: "Error fetching worker KYC details", error });
  }
};

module.exports = { getWorkerKYCDetails };
