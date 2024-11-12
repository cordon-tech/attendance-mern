import React, { useState, useEffect } from 'react';
import './SupervisorMaster.css';

const SupervisorTable = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the supervisor being edited
  const [editedSupervisor, setEditedSupervisor] = useState({}); // Hold the data being edited

  // Fetch data from the backend
  useEffect(() => {
    fetch('/api/ams')  // API to fetch supervisors
      .then(response => response.json())
      .then(data => setSupervisors(data))
      .catch(error => console.error('Error fetching supervisors:', error));
  }, []);

  // Handle input changes when editing a supervisor
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSupervisor({ ...editedSupervisor, [name]: value });
  };

  // Start editing the supervisor
  const handleEditClick = (supervisor) => {
    setEditingId(supervisor.supervisorId);
    setEditedSupervisor(supervisor); // Initialize the edit form with existing supervisor data
  };

  // Save the updated supervisor to the backend
  const handleSaveClick = (supervisorId) => {
    fetch(`/api/ams/${supervisorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedSupervisor),
    })
      .then(response => response.json())
      .then(data => {
        // Update the supervisors list with the edited data
        const updatedSupervisors = supervisors.map(s => s.supervisorId === supervisorId ? data : s);
        setSupervisors(updatedSupervisors);
        setEditingId(null); // Exit edit mode
      })
      .catch(error => console.error('Error updating supervisor:', error));
  };

  return (
    
    <div className="container-fluid">
      <div className="container">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Supervisor Id</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Dob</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Aadhar Number</th>
                <th>City</th>
                <th>Password</th>
                <th>State</th>
                <th>Street</th>
                <th>Aadhar Front</th>
                <th>Aadhar Back</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map(supervisor => (
                <tr key={supervisor.supervisorId}>
                  <td>{supervisor.supervisorId}</td>
                  <td>
                    {editingId === supervisor.supervisorId ? (
                      <input 
                        type="text"
                        name="fullName"
                        value={editedSupervisor.fullName || ''}
                        onChange={handleInputChange}
                      />
                    ) : supervisor.fullName}
                  </td>
                  <td>
                    {editingId === supervisor.supervisorId ? (
                      <input 
                        type="text"
                        name="gender"
                        value={editedSupervisor.gender || ''}
                        onChange={handleInputChange}
                      />
                    ) : supervisor.gender}
                  </td>
                  <td>{new Date(supervisor.dob).toLocaleDateString()}</td>
                  <td>
                    {editingId === supervisor.supervisorId ? (
                      <input 
                        type="text"
                        name="contactNumber"
                        value={editedSupervisor.contactNumber || ''}
                        onChange={handleInputChange}
                      />
                    ) : supervisor.contactNumber}
                  </td>
                  <td>{supervisor.emailAddress}</td>
                  <td>{supervisor.aadharDetails.aadharNumber}</td>
                  <td>{supervisor.address.city}</td>
                  <td>{supervisor.password}</td>
                  <td>{supervisor.address.state}</td>
                  <td>{supervisor.address.street}</td>
                  <td>
                    {supervisor.aadharDetails.aadharFrontUpload 
                      ? <a href={`/uploads/${supervisor.aadharDetails.aadharFrontUpload}`} target="_blank" rel="noopener noreferrer">View</a>
                      : 'Not Available'}
                  </td>
                  <td>
                    {supervisor.aadharDetails.aadharBackUpload 
                      ? <a href={`/uploads/${supervisor.aadharDetails.aadharBackUpload}`} target="_blank" rel="noopener noreferrer">View</a>
                      : 'Not Available'}
                  </td>
                  <td>
                    {editingId === supervisor.supervisorId ? (
                      <button className="btn btn-save" onClick={() => handleSaveClick(supervisor.supervisorId)}>Save</button>
                    ) : (
                      <button className="btn btn-edit" onClick={() => handleEditClick(supervisor)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupervisorTable;
