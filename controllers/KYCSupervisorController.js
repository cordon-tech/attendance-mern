// server/controllers/supervisorController.js
const Ams = require('../models/supervisorModel');


const getSupervisorById = async (req, res) => {
  try {
    const { supervisorId } = req.params;
    const ams = await Ams.findOne();

    if (!ams || !ams.supervisorMaster.has(supervisorId)) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    const supervisor = ams.supervisorMaster.get(supervisorId);
    return res.json(supervisor);
  } catch (error) {
    console.error('Error fetching supervisor by ID:', error.message);
    return res.status(500).json({ message: 'Error fetching supervisor', error: error.message });
  }
};

module.exports = {  getSupervisorById };
