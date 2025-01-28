// Ok code

// controllers/weekOffController.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose

// Replace this with your specific document's ObjectId
const amsDocumentId = new ObjectId(process.env._id);

// Reference to the 'ams' collection
const amsCollection = mongoose.connection.collection('ams');

exports.addWeekOffDay = async (req, res) => {
  try {
    const { weekOffDay, weekOffValue } = req.body;

    // Fetch the main document where data should be stored
    const amsDocument = await amsCollection.findOne({ _id: amsDocumentId });

    // Ensure the document exists
    if (!amsDocument) {
      return res.status(404).json({ message: "Document with specified ID not found" });
    }

    // Fetch existing weekOffDays or initialize an empty object
    const weekOffDays = amsDocument.weekOffDays || {};

    // Generate the next ID based on existing entries in `weekOffDays`
    const lastId = Object.keys(weekOffDays).sort().pop() || 'WD00';
    const nextId = `WD${(parseInt(lastId.replace('WD', '')) + 1).toString().padStart(2, '0')}`;

    // Prepare new entry data
    const newWeekOffData = { weekOffDay, woValue: weekOffValue };

    // Update the document with the new `weekOffDays` entry
    await amsCollection.updateOne(
      { _id: amsDocumentId },
      { $set: { [`weekOffDays.${nextId}`]: newWeekOffData } }
    );

    res.status(201).json({ message: 'Week Off Day added successfully', id: nextId });
  } catch (error) {
    console.error('Error adding Week Off Day:', error);
    res.status(500).json({ message: 'Failed to add Week Off Day', error: error.message });
  }
};
