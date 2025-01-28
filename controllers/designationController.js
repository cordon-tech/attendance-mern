// const AdminMaster = require('../models/Admin'); // Assuming this is your main model for the 'ams' collection

// // Fetch all designations
// exports.getDesignations = async (req, res) => {
//   try {
//     const amsData = await AdminMaster.findOne({}, { designation: 1 }); // Fetch the designation object directly under 'ams'
//     if (!amsData || !amsData.designation) {
//       return res.status(404).json({ message: 'No designations found' });
//     }
    
//     const designations = Object.values(amsData.designation); // Extract all designations as an array
//     res.status(200).json(designations);
//   } catch (err) {
//     console.error('Failed to fetch designations:', err);
//     res.status(500).json({ message: 'Failed to fetch designations' });
//   }
// };

// // Add a new designation
// exports.addDesignation = async (req, res) => {
//   const { designationName } = req.body;

//   try {
//     // Find the current designation data
//     const amsData = await AdminMaster.findOne({}, { designation: 1 });

//     if (!amsData) {
//       return res.status(404).json({ message: 'No designation data found' });
//     }

//     // Calculate the next designation ID
//     const designations = amsData.designation || {};
//     const lastId = Object.keys(designations).pop() || 'DM00'; // Start from DM00 if no designations exist
//     const nextIdNum = parseInt(lastId.replace('DM', '')) + 1;
//     const nextId = `DM${nextIdNum.toString().padStart(2, '0')}`;

//     // Add the new designation
//     const newDesignation = { id: nextId, designationName };
//     await AdminMaster.updateOne({}, { $set: { [`designation.${nextId}`]: newDesignation } });

//     res.status(201).json({ message: 'Designation added successfully', newDesignation });
//   } catch (err) {
//     console.error('Failed to add designation:', err);
//     res.status(500).json({ message: 'Failed to add designation' });
//   }
// };

// // Update an existing designation by ID
// exports.updateDesignation = async (req, res) => {
//   const { id } = req.params;
//   const { designationName } = req.body;

//   console.log("ID to update:", id); // Debugging log to check the ID received
//   console.log("New designation name:", designationName); // Debugging log to check the new designation name

//   try {
//     // Update the specific designation under the 'designation' object
//     const updatedDesignation = await AdminMaster.updateOne(
//       { [`designation.${id}`]: { $exists: true } }, // Check if the designation exists
//       { $set: { [`designation.${id}.designationName`]: designationName } } // Update designationName
//     );

//     // Check if any document was modified
//     if (updatedDesignation.nModified === 0) {
//       console.log("Designation not found or not modified");
//       return res.status(404).json({ message: 'Designation not found' });
//     }

//     console.log("Designation updated successfully");
//     res.status(200).json({ message: 'Designation updated successfully' });
//   } catch (err) {
//     console.error('Failed to update designation:', err);
//     res.status(500).json({ message: 'Failed to update designation' });
//   }
// };

const AdminMaster = require('../models/Admin'); // Assuming this is your main model for the 'ams' collection

// Fetch all designations
exports.getDesignations = async (req, res) => {
  try {
    const amsData = await AdminMaster.findOne({}, { designation: 1 }); // Fetch the designation object directly under 'ams'
    if (!amsData || !amsData.designation) {
      return res.status(404).json({ message: 'No designations found' });
    }
    
    const designations = Object.values(amsData.designation); // Extract all designations as an array
    res.status(200).json(designations);
  } catch (err) {
    console.error('Failed to fetch designations:', err);
    res.status(500).json({ message: 'Failed to fetch designations' });
  }
};

// Add a new designation
exports.addDesignation = async (req, res) => {
  const { designationName } = req.body;

  try {
    // Find the current designation data
    const amsData = await AdminMaster.findOne({}, { designation: 1 });

    if (!amsData) {
      return res.status(404).json({ message: 'No designation data found' });
    }

    // Calculate the next designation ID
    const designations = amsData.designation || {};
    const lastId = Object.keys(designations).pop() || 'DM00'; // Start from DM00 if no designations exist
    const nextIdNum = parseInt(lastId.replace('DM', '')) + 1;
    const nextId = `DM${nextIdNum.toString().padStart(2, '0')}`;

    // Add the new designation
    const newDesignation = { id: nextId, designationName };
    await AdminMaster.updateOne({}, { $set: { [`designation.${nextId}`]: newDesignation } });

    res.status(201).json({ message: 'Designation added successfully', newDesignation });
  } catch (err) {
    console.error('Failed to add designation:', err);
    res.status(500).json({ message: 'Failed to add designation' });
  }
};

// Update an existing designation by ID
exports.updateDesignation = async (req, res) => {
  const { id } = req.params;
  const { designationName } = req.body;

  console.log("ID to update:", id); // Debugging log to check the ID received
  console.log("New designation name:", designationName); // Debugging log to check the new designation name

  try {
    // Update the specific designation under the 'designation' object
    const updatedDesignation = await AdminMaster.updateOne(
      { [`designation.${id}`]: { $exists: true } }, // Check if the designation exists
      { $set: { [`designation.${id}.designationName`]: designationName } } // Update designationName
    );

    // Check if any document was modified
    if (updatedDesignation.nModified === 0) {
      console.log("Designation not found or not modified");
      return res.status(404).json({ message: 'Designation not found' });
    }

    console.log("Designation updated successfully");
    res.status(200).json({ message: 'Designation updated successfully' });
  } catch (err) {
    console.error('Failed to update designation:', err);
    res.status(500).json({ message: 'Failed to update designation' });
  }
};
// Delete a designation by ID
exports.deleteDesignation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await AdminMaster.updateOne(
      { [`designation.${id}`]: { $exists: true } },
      { $unset: { [`designation.${id}`]: '' } } // Remove the specific designation
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    res.status(200).json({ message: 'Designation deleted successfully' });
  } catch (err) {
    console.error('Failed to delete designation:', err);
    res.status(500).json({ message: 'Failed to delete designation' });
  }
};