

import React, { useEffect, useState } from 'react';
import './WorkerDataTable.css';
import * as XLSX from 'xlsx';

const WorkerDataTable = () => {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workerData/all');
        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredWorkers = workers.filter(worker =>
    worker.firstName.toLowerCase().includes(searchTerm) ||
    worker.lastName.toLowerCase().includes(searchTerm) ||
    worker.workerId?.toString().includes(searchTerm)
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredWorkers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Workers");
    XLSX.writeFile(workbook, "WorkerData.xlsx");
  };

  return (
    <div className="worker-data-table">
      <h2>Worker Details</h2>
      <div className="table-controls">
        <input 
          type="text" 
          placeholder="Search by Worker ID or Name" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="search-input"
        />
        <button onClick={exportToExcel} className="export-button">Export to Excel</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Worker Id</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Mobile No</th>
            <th>Marital Status</th>
            <th>Permanent Address</th>
            <th>City</th>
            <th>District</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Current Address</th>
            <th>ID Type</th>
            <th>Aadhar No</th>
            <th>Aadhar Image</th>
            <th>Aadhar Back</th>
            <th>Bank Passbook</th>
            <th>Contractor Name</th>
            <th>Designation Name</th>
            <th>Labour Type</th>
            <th>Join Date</th>
            <th>Issue Date</th>
            <th>Valid Date</th>
            <th>BOCW Registration</th>
            <th>PF Number</th>
            <th>UAN Number</th>
            <th>ESIC Number</th>
            <th>PAN Number</th>
            <th>IP Number</th>
            <th>Police Verify</th>
            <th>Bank Name</th>
            <th>Branch</th>
            <th>Account No</th>
            <th>IFSC Code</th>
            <th>Nominee</th>
            <th>Relation</th>
            <th>Nominee No</th>
            <th>Children</th>
            <th>Qualification</th>
            <th>Sector</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map((worker, index) => (
            <tr key={index}>
              <td>{worker.workerId}</td>
              <td>{worker.firstName}</td>
              <td>{worker.middleName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.dob}</td>
              <td>{worker.gender}</td>
              <td>{worker.mobileNo}</td>
              <td>{worker.maritalStatus}</td>
              <td>{worker.permanentAddress}</td>
              <td>{worker.city}</td>
              <td>{worker.district}</td>
              <td>{worker.state}</td>
              <td>{worker.pincode}</td>
              <td>{worker.currentAddress}</td>
              <td>{worker.idType}</td>
              <td>{worker.aadharNo}</td>
              <td>{worker.documentFiles}</td>
              <td>{worker.aadharBack}</td>
              <td>{worker.bankPassbook}</td>
              <td>{worker.contractorName}</td>
              <td>{worker.designationName}</td>
              <td>{worker.labourType}</td>
              <td>{worker.joinDate}</td>
              <td>{worker.issueDate}</td>
              <td>{worker.validDate}</td>
              <td>{worker.bocwRegistration}</td>
              <td>{worker.pfNumber}</td>
              <td>{worker.uanNumber}</td>
              <td>{worker.esicNumber}</td>
              <td>{worker.panNumber}</td>
              <td>{worker.ipNumber}</td>
              <td>{worker.policeVerify}</td>
              <td>{worker.bankName}</td>
              <td>{worker.branch}</td>
              <td>{worker.accountNo}</td>
              <td>{worker.ifscCode}</td>
              <td>{worker.nominee}</td>
              <td>{worker.relation}</td>
              <td>{worker.nomineeNo}</td>
              <td>{worker.children}</td>
              <td>{worker.qualification}</td>
              <td>{worker.sector}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerDataTable;
