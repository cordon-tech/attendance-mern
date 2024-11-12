
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Labour.css';

const LabourRate = () => {
  const [labours, setLabours] = useState([]);
  const [newLabour, setNewLabour] = useState({ labourId: '', labourType: '', labourRate: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editLabourId, setEditLabourId] = useState(null);
  const [editRate, setEditRate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLabours();
  }, []);

  const fetchLabours = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/labour');
      const labourData = response.data.labourRate || {};
      const laboursArray = Object.keys(labourData).map((key) => ({
        ...labourData[key],
        labourId: key,
      }));
      setLabours(laboursArray);
    } catch (error) {
      console.error('Error fetching labours:', error);
    }
  };

  const fetchNextLabourId = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/labour/next-id');
      setNewLabour({ ...newLabour, labourId: response.data.nextLabourId });
    } catch (error) {
      console.error('Error fetching next labour ID:', error);
    }
  };

  const handleAddLabour = async () => {
    const labourData = {
      labourType: newLabour.labourType,
      labourRate: parseFloat(newLabour.labourRate),
    };

    try {
      await axios.post('http://localhost:5000/api/labour/add', labourData);
      fetchLabours();
      setIsFormVisible(false);
      setNewLabour({ labourId: '', labourType: '', labourRate: '' });
    } catch (error) {
      console.error('Error adding labour', error.response ? error.response.data : error);
    }
  };

  const handleEdit = (labourId, currentRate) => {
    setEditLabourId(labourId);
    setEditRate(currentRate || '');
  };

  const handleUpdateLabourRate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/labour/${editLabourId}`, {
        labourRate: editRate || "0",
      });
      fetchLabours();
      setEditLabourId(null);
      setEditRate('');
    } catch (error) {
      console.error('Error updating labour rate:', error.response ? error.response.data : error);
    }
  };

  const handleCancelEdit = () => {
    setEditLabourId(null);
    setEditRate('');
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      fetchNextLabourId(); // Fetch next ID only when form is opened
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setNewLabour({ labourId: '', labourType: '', labourRate: '' });
  };

  const handleExport = () => {
    axios.get('http://localhost:5000/api/labour/export', {
      responseType: 'blob' // Important for downloading files
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'labours.xlsx'); // Filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => console.error('Error exporting data:', error));
  };

  const filteredLabours = labours.filter(
    (labour) =>
      labour.labourId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      labour.labourType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Labour Category</h1>
      
      {/* Search and Export Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by ID or labour"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleExport}>Export</button> {/* Export Button */}
      </div>

      {/* Add New Button */}
      <button onClick={toggleForm}>Add New</button>

      {/* Form Section */}
      {isFormVisible && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={newLabour.labourId || ''}
            readOnly
            placeholder="Labour ID"
          />
          <input
            type="text"
            value={newLabour.labourType || ''}
            onChange={(e) => setNewLabour({ ...newLabour, labourType: e.target.value })}
            placeholder="Labour Type"
          />
          <input
            type="number"
            value={newLabour.labourRate || ''}
            onChange={(e) => setNewLabour({ ...newLabour, labourRate: e.target.value })}
            placeholder="Rate"
          />
          <button onClick={handleAddLabour}>Save</button>
          <button onClick={handleCancelForm}>Cancel</button>
        </div>
      )}

      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>Labour ID</th>
            <th>Labour Type</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLabours.map((labour) => (
            <tr key={labour.labourId}>
              <td>{labour.labourId}</td>
              <td>{labour.labourType}</td>
              <td>
                {editLabourId === labour.labourId ? (
                  <input
                    type="number"
                    value={editRate || ''}
                    onChange={(e) => setEditRate(e.target.value)}
                  />
                ) : (
                  labour.labourRate
                )}
              </td>
              <td>
                {editLabourId === labour.labourId ? (
                  <>
                    <button onClick={handleUpdateLabourRate}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(labour.labourId, labour.labourRate)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabourRate;
