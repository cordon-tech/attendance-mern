import React, { useState } from 'react';
import axios from 'axios';
import './AttendanceMaster.css';
import * as XLSX from 'xlsx'; // Import XLSX

const AttendanceMaster = () => {
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchDataByDate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/${date}`);
      setAttendanceData(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data or no data found.');
      setAttendanceData([]);
    }
  };

  const exportToExcel = () => {
    const table = document.getElementById('attendanceTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'Attendance' });
    XLSX.writeFile(wb, 'attendanceMaster.xlsx');
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4 text-center font-weight-bold">Attendance Details</h1>
      <form id="dateForm" onSubmit={fetchDataByDate}>
        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">Select Date:</label>
          <input
            type="date"
            id="dateInput"
            name="dateInput"
            className="form-control"
            required
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Fetch Data</button>
      </form>
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
      
      <div className="d-flex justify-content-center mb-4">
        <button id="exportButton" className="btn btn-success" onClick={exportToExcel}>Export to Excel</button>
      </div>
      
      <div className="container">
        <div style={{ height: '400px', overflowY: 'scroll' }}>
          <table id="attendanceTable" className="table table-striped">
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Date</th>
                <th>Building Name</th>
                <th>Contractor Name</th>
                <th>Day</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Worker First Name</th>
                <th>Worker Last Name</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data, index) => (
                <tr key={index}>
                  <td>{data.workerId}</td>
                  <td>{data.date}</td>
                  <td>{data.buildingNumber || 'N/A'}</td>
                  <td>{data.contractorName || 'N/A'}</td>
                  <td>{data.day || 'N/A'}</td>
                  <td>{data.inTime || 'N/A'}</td>
                  <td>{data.outTime || 'N/A'}</td>
                  <td>{data.firstName || 'N/A'}</td>
                  <td>{data.lastName || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMaster;
