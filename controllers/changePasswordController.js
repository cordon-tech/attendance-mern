const mongoose = require('mongoose');

// Change Password Function
// exports.changePassword = async (req, res) => {
//   const { userId, userType, newPassword } = req.body;

//   let collectionName;
//   if (userType === 'Admin') {
//     collectionName = 'adminMaster';
//   } else if (userType === 'Supervisor') {
//     collectionName = 'supervisorMaster';
//   } else if (userType === 'Contractor') {
//     collectionName = 'contractorMaster';
//   } else {
//     return res.status(400).json({ message: 'Invalid user type.' });
//   }

//   try {
//     const db = mongoose.connection.collection('ams');
//     const updatePath = `${collectionName}.${userId}.password`;
//     const updateResult = await db.updateOne(
//       { [`${collectionName}.${userId}`]: { $exists: true } },
//       { $set: { [updatePath]: newPassword } }
//     );

//     if (updateResult.modifiedCount === 0) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json({ message: 'Password changed successfully.' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ message: 'Failed to change password.', error: error.message });
//   }
// };

// Change Password Function
exports.changePassword = async (req, res) => {
  const { userId, userType, newPassword } = req.body;

  let collectionName;
  if (userType === 'Admin') {
    collectionName = 'adminMaster';
  } else if (userType === 'Supervisor') {
    collectionName = 'supervisorMaster';
  } else if (userType === 'Contractor') {
    collectionName = 'contractorMaster';
  } else {
    return res.status(400).json({ message: 'Invalid user type.' });
  }

  try {
    const db = mongoose.connection.collection('ams');
    const userPath = `${collectionName}.${userId}.password`;

    // Fetch current password from the database
    const user = await db.findOne({ [`${collectionName}.${userId}`]: { $exists: true } }, { projection: { [userPath]: 1 } });
    const currentPassword = user && user[collectionName] && user[collectionName][userId]?.password;

    // Check if the new password matches the current password
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'The password is already defined. Please choose a different password.' });
    }

    // Update the password if it's different
    const updateResult = await db.updateOne(
      { [`${collectionName}.${userId}`]: { $exists: true } },
      { $set: { [userPath]: newPassword } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password.', error: error.message });
  }
};
