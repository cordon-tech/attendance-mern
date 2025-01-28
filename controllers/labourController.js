
// const mongoose = require('mongoose');

// const AMS_ID = new mongoose.Types.ObjectId(process.env._id);

// exports.getLabourRates = async (req, res) => {
//   try {
//     const amsCollection = mongoose.connection.collection('ams'); // Access `ams` collection
//     const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

//     if (!mainDocument || !mainDocument.labourRate) {
//       return res.status(404).json({ success: false, message: "Labour rates not found" });
//     }

//     const labourRates = Object.entries(mainDocument.labourRate).map(([key, value]) => ({
//       labourId: key,
//       ...value,
//     }));

//     res.status(200).json({ success: true, labourRates });
//   } catch (error) {
//     console.error("Error fetching labour rates:", error.message);
//     res.status(500).json({ success: false, message: "Failed to fetch labour rates", error: error.message });
//   }
// };


// exports.addLabourRate = async (req, res) => {
//   try {
//     const { labourRate, labourType } = req.body;

//     if (!labourRate || !labourType) {
//       return res.status(400).json({ success: false, message: "Labour rate and type are required" });
//     }

//     const amsCollection = mongoose.connection.collection('ams');
//     const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

//     if (!mainDocument) {
//       return res.status(404).json({ success: false, message: "Main document not found" });
//     }

//     const lastLabourId = Object.keys(mainDocument.labourRate || {}).pop();
//     const nextLabourId = `LR${String(parseInt(lastLabourId?.substring(2) || 0) + 1).padStart(2, '0')}`;

//     await amsCollection.updateOne(
//       { _id: AMS_ID },
//       {
//         $set: {
//           [`labourRate.${nextLabourId}`]: { labourRate: parseFloat(labourRate), labourType },
//         },
//       }
//     );

//     res.status(201).json({ success: true, message: "Labour rate added successfully" });
//   } catch (error) {
//     console.error("Error adding labour rate:", error.message);
//     res.status(500).json({ success: false, message: "Failed to add labour rate", error: error.message });
//   }
// };

// exports.getNextLabourId = async (req, res) => {
//   try {
//     const amsCollection = mongoose.connection.collection('ams');
//     const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

//     if (!mainDocument) {
//       return res.status(404).json({ success: false, message: "Main document not found" });
//     }

//     const lastLabourId = Object.keys(mainDocument.labourRate || {}).pop();
//     const nextLabourId = `LR${String(parseInt(lastLabourId?.substring(2) || 0) + 1).padStart(2, '0')}`;

//     res.status(200).json({ success: true, nextLabourId });
//   } catch (error) {
//     console.error("Error fetching next labour ID:", error.message);
//     res.status(500).json({ success: false, message: "Failed to fetch next labour ID", error: error.message });
//   }
// };
// const XLSX = require('xlsx');

// // Export labour rates to Excel
// exports.exportLabourRates = async (req, res) => {
//   try {
//     const amsCollection = mongoose.connection.collection('ams');
//     const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

//     if (!mainDocument || !mainDocument.labourRate) {
//       return res.status(404).json({ success: false, message: "No labour rates found to export" });
//     }

//     const labourRates = Object.entries(mainDocument.labourRate).map(([key, value]) => ({
//       LabourID: key,
//       LabourType: value.labourType,
//       LabourRate: value.labourRate,
//     }));

//     // Create a new workbook and worksheet
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(labourRates);

//     // Append the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, "LabourRates");

//     // Write the workbook to a buffer
//     const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

//     // Set headers for the response to download the file
//     res.setHeader("Content-Disposition", "attachment; filename=LabourRates.xlsx");
//     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//     res.send(excelBuffer);
//   } catch (error) {
//     console.error("Error exporting labour rates:", error.message);
//     res.status(500).json({ success: false, message: "Failed to export labour rates", error: error.message });
//   }
// };
// exports.updateLabourRate = async (req, res) => {
//   try {
//     const { labourRate } = req.body;
//     const { labourId } = req.params;

//     if (!labourRate || isNaN(labourRate)) {
//       return res.status(400).json({ success: false, message: "Valid labour rate is required" });
//     }

//     const amsCollection = mongoose.connection.collection('ams');
//     const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

//     if (!mainDocument || !mainDocument.labourRate || !mainDocument.labourRate[labourId]) {
//       return res.status(404).json({ success: false, message: "Labour entry not found" });
//     }

//     // Update the labour rate in the database
//     await amsCollection.updateOne(
//       { _id: AMS_ID },
//       { $set: { [`labourRate.${labourId}.labourRate`]: parseFloat(labourRate) } }
//     );

//     res.status(200).json({ success: true, message: "Labour rate updated successfully" });
//   } catch (error) {
//     console.error("Error updating labour rate:", error.message);
//     res.status(500).json({ success: false, message: "Failed to update labour rate", error: error.message });
//   }
// };


const mongoose = require('mongoose');

const AMS_ID = new mongoose.Types.ObjectId(process.env._id);

exports.getLabourRates = async (req, res) => {
  try {
    const amsCollection = mongoose.connection.collection('ams'); // Access `ams` collection
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument || !mainDocument.labourRate) {
      return res.status(404).json({ success: false, message: "Labour rates not found" });
    }

    const labourRates = Object.entries(mainDocument.labourRate).map(([key, value]) => ({
      labourId: key,
      ...value,
    }));

    res.status(200).json({ success: true, labourRates });
  } catch (error) {
    console.error("Error fetching labour rates:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch labour rates", error: error.message });
  }
};


exports.addLabourRate = async (req, res) => {
  try {
    const { labourRate, labourType } = req.body;

    if (!labourRate || !labourType) {
      return res.status(400).json({ success: false, message: "Labour rate and type are required" });
    }

    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument) {
      return res.status(404).json({ success: false, message: "Main document not found" });
    }

    const lastLabourId = Object.keys(mainDocument.labourRate || {}).pop();
    const nextLabourId = `LR${String(parseInt(lastLabourId?.substring(2) || 0) + 1).padStart(2, '0')}`;

    await amsCollection.updateOne(
      { _id: AMS_ID },
      {
        $set: {
          [`labourRate.${nextLabourId}`]: { labourRate: parseFloat(labourRate), labourType },
        },
      }
    );

    res.status(201).json({ success: true, message: "Labour rate added successfully" });
  } catch (error) {
    console.error("Error adding labour rate:", error.message);
    res.status(500).json({ success: false, message: "Failed to add labour rate", error: error.message });
  }
};

exports.deleteLabourRate = async (req, res) => {
  try {
    const { labourId } = req.params;

    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument || !mainDocument.labourRate || !mainDocument.labourRate[labourId]) {
      return res.status(404).json({ success: false, message: "Labour entry not found" });
    }

    // Delete the labour rate from the database
    await amsCollection.updateOne(
      { _id: AMS_ID },
      { $unset: { [`labourRate.${labourId}`]: "" } }
    );

    res.status(200).json({ success: true, message: "Labour rate deleted successfully" });
  } catch (error) {
    console.error("Error deleting labour rate:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete labour rate", error: error.message });
  }
};


exports.getNextLabourId = async (req, res) => {
  try {
    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument) {
      return res.status(404).json({ success: false, message: "Main document not found" });
    }

    const lastLabourId = Object.keys(mainDocument.labourRate || {}).pop();
    const nextLabourId = `LR${String(parseInt(lastLabourId?.substring(2) || 0) + 1).padStart(2, '0')}`;

    res.status(200).json({ success: true, nextLabourId });
  } catch (error) {
    console.error("Error fetching next labour ID:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch next labour ID", error: error.message });
  }
};
const XLSX = require('xlsx');

// Export labour rates to Excel
exports.exportLabourRates = async (req, res) => {
  try {
    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument || !mainDocument.labourRate) {
      return res.status(404).json({ success: false, message: "No labour rates found to export" });
    }

    const labourRates = Object.entries(mainDocument.labourRate).map(([key, value]) => ({
      LabourID: key,
      LabourType: value.labourType,
      LabourRate: value.labourRate,
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(labourRates);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "LabourRates");

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Set headers for the response to download the file
    res.setHeader("Content-Disposition", "attachment; filename=LabourRates.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error exporting labour rates:", error.message);
    res.status(500).json({ success: false, message: "Failed to export labour rates", error: error.message });
  }
};
exports.updateLabourRate = async (req, res) => {
  try {
    const { labourRate } = req.body;
    const { labourId } = req.params;

    if (!labourRate || isNaN(labourRate)) {
      return res.status(400).json({ success: false, message: "Valid labour rate is required" });
    }

    const amsCollection = mongoose.connection.collection('ams');
    const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

    if (!mainDocument || !mainDocument.labourRate || !mainDocument.labourRate[labourId]) {
      return res.status(404).json({ success: false, message: "Labour entry not found" });
    }

    // Update the labour rate in the database
    await amsCollection.updateOne(
      { _id: AMS_ID },
      { $set: { [`labourRate.${labourId}.labourRate`]: parseFloat(labourRate) } }
    );

    res.status(200).json({ success: true, message: "Labour rate updated successfully" });
  } catch (error) {
    console.error("Error updating labour rate:", error.message);
    res.status(500).json({ success: false, message: "Failed to update labour rate", error: error.message });
  }
};