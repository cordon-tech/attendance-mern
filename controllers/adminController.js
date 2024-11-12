const AdminMaster = require('../models/Admin');

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { projectName, firstName, middleName, lastName, password } = req.body;

  // Create adminData from the request body
  const adminData = {
    projectName,
    firstName,
    middleName,
    lastName,
    password,
    createdAt: new Date(),
  };

  try {
    // Check if an admin with _id 10001 already exists
    const existingAdmin = await AdminMaster.findOne({ 'adminMaster.10001': { $exists: true } });

    if (existingAdmin) {
      // If admin with _id 10001 exists, send a message indicating the admin is already registered
      return res.status(400).json({ error: 'Admin is already registered' });
    }

    // Create or update the document with _id 10001 and store adminData in adminMaster
    const result = await AdminMaster.findOneAndUpdate(
      { },  // Use a fixed ID of 10001
      { $set: { 'adminMaster.10001': adminData } },
      { upsert: true, new: true }  // If not found, insert a new document with _id 10001
    );

    res.status(201).json({ message: 'Admin registered successfully', result });
  } catch (err) {
    console.error('Error during admin registration:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};
