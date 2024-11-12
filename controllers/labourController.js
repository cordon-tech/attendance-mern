// controllers/labourController.js

const Ams = require('../models/labourModel');

// Get all labour rates
exports.getLabours = async (req, res) => {
  try {
    const amsDocument = await Ams.findOne();
    const labours = amsDocument ? amsDocument.labourRate : {};
    res.status(200).json({ labourRate: labours });
  } catch (err) {
    console.error('Failed to fetch labour rates:', err);
    res.status(500).json({ message: 'Failed to fetch labour rates', error: err.message });
  }
};

// Get next available labour ID
exports.getNextLabourId = async (req, res) => {
  try {
    const amsDocument = await Ams.findOne();
    const lastId = amsDocument && amsDocument.labourRate
      ? Array.from(amsDocument.labourRate.keys()).pop()
      : 'LR00';
    const nextIdNum = parseInt(lastId.replace('LR', '')) + 1;
    const nextId = `LR${nextIdNum.toString().padStart(2, '0')}`;
    res.status(200).json({ nextLabourId: nextId });
  } catch (err) {
    console.error('Failed to fetch next labour ID:', err);
    res.status(500).json({ message: 'Failed to fetch next labour ID', error: err.message });
  }
};

// Add a new labour rate
exports.addLabour = async (req, res) => {
  const { labourType, labourRate } = req.body;

  try {
    let amsDocument = await Ams.findOne();
    if (!amsDocument) {
      amsDocument = new Ams({ labourRate: {} });
    }

    const lastId = amsDocument.labourRate ? Array.from(amsDocument.labourRate.keys()).pop() : 'LR00';
    const nextIdNum = parseInt(lastId.replace('LR', '')) + 1;
    const nextId = `LR${nextIdNum.toString().padStart(2, '0')}`;

    const newLabour = {
      labourId: nextId,
      labourType,
      labourRate: labourRate.toString() // Store as string to match existing structure
    };

    amsDocument.labourRate.set(nextId, newLabour);
    await amsDocument.save();

    res.status(201).json({ message: 'Labour rate added successfully', newLabour });
  } catch (err) {
    console.error('Failed to add labour rate:', err);
    res.status(500).json({ message: 'Failed to add labour rate', error: err.message });
  }
};

// Update an existing labour rate by ID
// controllers/labourController.js

exports.updateLabour = async (req, res) => {
  const { id } = req.params; // e.g., LR01
  const { labourRate } = req.body;

  console.log("Update request received for ID:", id);
  console.log("Received labour rate for update:", labourRate);

  try {
    // Find the Ams document in the database
    const amsDocument = await Ams.findOne();

    if (!amsDocument) {
      console.log("No document found in the Ams collection.");
      return res.status(404).json({ message: 'No document found' });
    }

    // Check if the specified labourId entry exists in labourRate
    const existingEntry = amsDocument.labourRate.get(id);
    if (existingEntry) {
      // Update only the labourRate and retain labourType
      amsDocument.labourRate.set(id, {
        labourId: id,// Set labourId explicitly to satisfy validation
        labourType: existingEntry.labourType,
        labourRate: labourRate.toString() // Store as a string to match DB structure
      });

      await amsDocument.save();
      console.log(`Labour rate for ${id} updated successfully`);
      res.status(200).json({ message: 'Labour rate updated successfully' });
    } else {
      console.log(`Labour rate with ID ${id} not found`);
      res.status(404).json({ message: 'Labour rate not found' });
    }
  } catch (err) {
    console.error('Failed to update labour rate:', err);
    res.status(500).json({ message: 'Failed to update labour rate', error: err.message });
  }
};

// Export labour rates to Excel
exports.exportLabours = async (req, res) => {
  try {
    const amsDocument = await Ams.findOne();
    const labours = amsDocument?.labourRate ? Array.from(amsDocument.labourRate.values()) : [];

    const data = labours.map(labour => ({
      ID: labour.labourId,
      LabourType: labour.labourType,
      LabourRate: labour.labourRate
    }));

    const XLSX = require('xlsx');
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'labourRate');

    res.setHeader('Content-Disposition', 'attachment; filename="labourRate.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ message: 'Failed to export data' });
  }
};
