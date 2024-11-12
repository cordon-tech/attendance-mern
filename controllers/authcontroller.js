const jwt = require('jsonwebtoken');
const AdminMaster = require('../models/Admin');
exports.loginUser = async (req, res) => {
  const { userID, password, role } = req.body;
  try {
    if (role === 'Admin') {
      // Find the admin with the given userID dynamically
      const adminData = await AdminMaster.findOne({ [`adminMaster.${userID}`]: { $exists: true } });
      if (!adminData || !adminData.adminMaster[userID]) {
        return res.status(400).json({ message: 'Admin not found' });
      }
      const admin = adminData.adminMaster[userID];
      // Directly compare plain-text passwords
      if (password !== admin.password) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      // If credentials match, create a JWT token
      const token = jwt.sign({ userID, role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token, message: 'Login successful', redirectUrl: '/adminRegistration' });
    }  else if (role === 'Supervisor') {
      // Supervisor login
      const supervisorData = await AdminMaster.findOne({ [`supervisorMaster.${userID}`]: { $exists: true } });
      if (!supervisorData || !supervisorData.supervisorMaster[userID]) {
        return res.status(400).json({ message: 'Supervisor not found' });
      }
      const supervisor = supervisorData.supervisorMaster[userID];
      if (password !== supervisor.password) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ userID, role: 'Supervisor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token, message: 'Login successful', redirectUrl: '/supervisorRegistration' });
    } else if (role === 'Contractor') {
      // Contractor login
      const contractorData = await AdminMaster.findOne({ [`contractorMaster.${userID}`]: { $exists: true } });
      if (!contractorData || !contractorData.contractorMaster[userID]) {
        return res.status(400).json({ message: 'Contractor not found' });
      }
      const contractor = contractorData.contractorMaster[userID];
      if (password !== contractor.password) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ userID, role: 'Contractor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token, message: 'Login successful', redirectUrl: '/contractorRegistration' });
    } else {
      return res.status(400).json({ message: 'Invalid role for login' });
    }
  } catch (err) {
    console.error('Server error during login:', err);
    return res.status(500).json({ message: 'Server error', error: err.toString() });
  }
};



