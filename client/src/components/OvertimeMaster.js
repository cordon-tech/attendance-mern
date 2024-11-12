import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OvertimeMaster = () => {
  const [contractors, setContractors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [contractorDetails, setContractorDetails] = useState({
    contractorName: 'Loading...',
    address: 'Loading...'
  });
  const [overtimeRecords, setOvertimeRecords] = useState([]); // Default empty array

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        // const response = await fetch('http://localhost:5000/api/contractors'); // Ensure this route is correct
        const response = await fetch('http://localhost:5000/api/overtime-master/contractors');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setContractors(data); // Ensure data is an array
        } else {
          setContractors([]); // Fallback in case data isn't an array
        }
      } catch (error) {
        console.error("Error fetching contractors:", error);
        setContractors([]); // Handle error by setting contractors as an empty array
      }
    };
    fetchContractors();
  }, []);
  
  const handleContractorChange = async (event) => {
    const contractorId = event.target.value;
    setSelectedContractor(contractorId);
    
    if (contractorId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/contractor/${contractorId}`);
        setContractorDetails(response.data);
      } catch (error) {
        console.error('Error fetching contractor details:', error);
      }
    } else {
      setContractorDetails({
        contractorName: 'Loading...',
        address: 'Loading...'
      });
    }
  };

  const handleSearch = async () => {
    if (selectedContractor && selectedMonth) {
      try {
        const contractor = contractors.find(c => c.contractorId === selectedContractor); // Find the contractor by ID
        const contractorName = contractor ? contractor.contractorName : ''; // Extract the name
  
        const response = await axios.get(`http://localhost:5000/api/records`, {
          params: { contractorName, overtimeMonth: selectedMonth }
        });
        setOvertimeRecords(response.data);
      } catch (error) {
        console.error('Error fetching overtime records:', error);
        setOvertimeRecords([]); // Set to empty array if no records are found
      }
    } else {
      setOvertimeRecords([]); // Set to empty array if fields are not selected
    }
  };
  

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <header style={{ textAlign: 'center', padding: '15px', backgroundColor: '#5D0E41', color: 'white', borderRadius: '8px 8px 0 0' }}>
        <h2 style={{ margin: 0 }}>FORM XXIII</h2>
        <p>[See Rule 78(1)(a)(iii)]</p>
        <h3 style={{ margin: '5px 0' }}>Register of Overtime</h3>
        <p style={{ margin: 0, fontWeight: 'bold' }}>JUNE 2024</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
          <label htmlFor="contractorSelect" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#5a005a' }}>Select a contractor:</label>
          <select
            id="contractorSelect"
            onChange={handleContractorChange}
            style={{ padding: '8px', fontSize: '16px', borderColor: '#5a005a', color: '#5a005a', borderRadius: '4px' }}
          >
            <option value="">Select a contractor...</option>
            {Array.isArray(contractors) && contractors.map(contractor => (
              <option key={contractor.contractorId} value={contractor.contractorId}>
                {contractor.contractorName}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
          <label htmlFor="monthPicker" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#5D0E41' }}>Select month and year:</label>
          <input
            type="month"
            id="monthPicker"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '8px', fontSize: '16px', borderColor: '#5D0E41', color: '#5a005a', borderRadius: '4px' }}
          />
        </div>

        <button onClick={handleSearch} style={{ padding: '10px 15px', backgroundColor: '#5D0E41', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px', height: 'fit-content', alignSelf: 'flex-end', borderRadius: '4px' }}>
          Search
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <p style={{ fontSize: '16px', color: '#5a005a' }}><strong>Contractor Name:</strong> {contractorDetails.contractorName}</p>
        <p style={{ fontSize: '16px', color: '#5a005a' }}><strong>Address:</strong> {contractorDetails.address}</p>
        <p style={{ fontSize: '16px', color: '#5a005a' }}>
          <strong>Principal Employer:</strong> M/S ADS CONSULTANCY AND ENGINEERING SERVICES COPOVITEZ PVT LIMITED BHARAMATI MIDC PUNE
        </p>
      </div>

      {/* Display Overtime Records */}
      <div style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '8px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#5D0E41', color: 'white' }}>
              <th style={{ padding: '10px' }}>Sr. No.</th>
              <th style={{ padding: '10px' }}>Name of workman</th>
              <th style={{ padding: '10px' }}>Father's / Husband's Name</th>
              <th style={{ padding: '10px' }}>Date on which overtime worked</th>
              <th style={{ padding: '10px' }}>Sex</th>
              <th style={{ padding: '10px' }}>Designation / Nature of employment</th>
              <th style={{ padding: '10px' }}>Total overtime worked</th>
              <th style={{ padding: '10px' }}>Normal rate of wages</th>
              <th style={{ padding: '10px' }}>Overtime rate of wages</th>
              <th style={{ padding: '10px' }}>Overtime earnings</th>
              <th style={{ padding: '10px' }}>Date on which overtime wages paid</th>
              <th style={{ padding: '10px' }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {overtimeRecords.length > 0 ? (
              overtimeRecords.map((record, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{index + 1}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.employeeName}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.fatherHusbandName}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.dateOfOvertimeWorked}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.gender}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.designation}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.totalOvertimeWorked}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.normalRateOfWages}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.overtimeRateOfWages}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.overtimeEarnings}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.dateOfOvertimePaid}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{record.remarks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ padding: '10px', textAlign: 'center', color: '#5a005a', fontWeight: 'bold' }}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OvertimeMaster;
