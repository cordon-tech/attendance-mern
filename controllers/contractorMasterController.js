
const mongoose = require("mongoose");
const AMS = mongoose.connection.collection("ams");

exports.getContractors = async (req, res) => {
  try {
    const contractorData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });
    if (!contractorData || !contractorData.contractorMaster) {
      return res.status(404).json({ message: "No contractors found." });
    }
    const contractors = Object.values(contractorData.contractorMaster);
    res.json(contractors);
  } catch (error) {
    console.error("Error fetching contractors:", error);
    res.status(500).json({ message: "Error fetching contractors" });
  }
};

exports.updateContractor = async (req, res) => {
  const { contractorId } = req.params;
  const updates = req.body;

  try {
    const contractorData = await AMS.findOneAndUpdate(
      { [`contractorMaster.${contractorId}`]: { $exists: true } },
      { $set: { [`contractorMaster.${contractorId}`]: updates } },
      { new: true }
    );
    res.json(contractorData);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contractor", error });
  }
};

exports.deleteContractor = async (req, res) => {
  const { contractorId } = req.params;
  try {
    const contractorData = await AMS.updateOne({}, { $unset: { [`contractorMaster.${contractorId}`]: "" } });
    res.json({ message: "Contractor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contractor", error });
  }
};