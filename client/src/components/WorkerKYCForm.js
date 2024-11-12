
// WorkerKYCForm.js
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './WorkerKYCForm.css';

const WorkerKYCForm = () => {
  const [workerId, setWorkerId] = useState("");
  const [workerData, setWorkerData] = useState({
    contractorName: "",
    fullName: "",
    dob: "",
    gender: "",
    mobileNumber: "",
    maritalStatus: "",
    permanentAddress: "",
    permanentPin: "",
    aadhaarNumber: "",
    panCardNumber: "",
    uan: "",
    bankName: "",
    bankAccountNumber: "",
    ifscCode: ""
  });

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/workerKYC/worker/${workerId}`);
      
      if (!response.ok) {
        alert("Worker not found");
        return;
      }
      
      const data = await response.json();
      setWorkerData({
        contractorName: data.contractorName || "",
        fullName: `${data.firstName || ""} ${data.middleName || ""} ${data.lastName || ""}`,
        dob: data.dob || "",
        gender: data.gender || "",
        mobileNumber: data.mobileNo || "",
        maritalStatus: data.maritalStatus || "",
        permanentAddress: data.permanentAddress || "",
        permanentPin: data.pincode || "",
        aadhaarNumber: data.aadharNo || "",
        panCardNumber: data.panNumber || "",
        uan: data.uanNumber || "",
        bankName: data.bankName || "",
        bankAccountNumber: data.accountNo || "",
        ifscCode: data.ifscCode || ""
      });
    } catch (error) {
      console.error("Error fetching worker details:", error);
      alert("Error fetching worker details");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Worker KYC Form", 20, 10);
    doc.autoTable({
      startY: 20,
      theme: 'grid',
      styles: { halign: 'left' },
      head: [['Field', 'Details']],
      body: [
        ['Name of the Contractor', workerData.contractorName],
        ['Full Name', workerData.fullName],
        ['Date of Birth', workerData.dob],
        ['Gender', workerData.gender],
        ['Mobile Number', workerData.mobileNumber],
        ['Marital Status', workerData.maritalStatus],
        ['Permanent Address', workerData.permanentAddress],
        ['PIN Code', workerData.permanentPin],
        ['AADHAAR NO', workerData.aadhaarNumber],
        ['PAN CARD NO', workerData.panCardNumber],
        ['UAN', workerData.uan],
        ['BANK NAME', workerData.bankName],
        ['BANK A/C NO', workerData.bankAccountNumber],
        ['IFSC CODE', workerData.ifscCode],
      ],
    });
    doc.save("Worker_KYC_Form.pdf");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Worker KYC Form</h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="searchWorkerId" className="form-label">Search Worker ID:</label>
          <input
            type="text"
            className="form-control"
            id="searchWorkerId"
            value={workerId}
            onChange={(e) => setWorkerId(e.target.value)}
            placeholder="Enter Worker ID"
          />
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <button onClick={handleSearch} className="btn btn-primary" id="searchButton">Search</button>
        </div>
      </div>

      <form id="labourKYCForm">
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto px-2">Personal Details</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="contractorName" className="form-label">Name of the Contractor:</label>
              <input type="text" className="form-control" id="contractorName" value={workerData.contractorName} readOnly />
            </div>
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">Full Name:</label>
              <input type="text" className="form-control" id="fullName" value={workerData.fullName} readOnly />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="dob" className="form-label">Date of Birth:</label>
              <input type="text" className="form-control" id="dob" value={workerData.dob} readOnly />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <input type="text" className="form-control" id="gender" value={workerData.gender} readOnly />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
              <input type="tel" className="form-control" id="mobileNumber" value={workerData.mobileNumber} readOnly />
            </div>
            <div className="col-md-6">
              <label htmlFor="maritalStatus" className="form-label">Marital Status:</label>
              <input type="text" className="form-control" id="maritalStatus" value={workerData.maritalStatus} readOnly />
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-3 mb-4">
          <legend className="w-auto px-2">Address Details</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="permanentAddress" className="form-label">Permanent Address:</label>
              <textarea id="permanentAddress" className="form-control" rows="3" value={workerData.permanentAddress} readOnly></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="permanentPin" className="form-label">PIN Code:</label>
              <input type="text" className="form-control" id="permanentPin" value={workerData.permanentPin} readOnly />
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-3 mb-4">
          <legend className="w-auto px-2">Document Details</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="aadhaarNumber" className="form-label">AADHAAR NO:</label>
              <input type="text" className="form-control" id="aadhaarNumber" value={workerData.aadhaarNumber} readOnly />
            </div>
            <div className="col-md-6">
              <label htmlFor="panCardNumber" className="form-label">PAN CARD NO:</label>
              <input type="text" className="form-control" id="panCardNumber" value={workerData.panCardNumber} readOnly />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="uan" className="form-label">UAN:</label>
              <input type="text" className="form-control" id="uan" value={workerData.uan} readOnly />
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-3 mb-4">
          <legend className="w-auto px-2">Bank Details</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="bankName" className="form-label">BANK NAME:</label>
              <input type="text" className="form-control" id="bankName" value={workerData.bankName} readOnly />
            </div>
            <div className="col-md-6">
              <label htmlFor="bankAccountNumber" className="form-label">BANK A/C NO:</label>
              <input type="text" className="form-control" id="bankAccountNumber" value={workerData.bankAccountNumber} readOnly />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="ifscCode" className="form-label">IFSC CODE:</label>
              <input type="text" className="form-control" id="ifscCode" value={workerData.ifscCode} readOnly />
            </div>
          </div>
        </fieldset>

        <div className="row mb-2">
          <div className="col-md-12 text-center">
            <button type="button" onClick={handlePrint} className="btn btn-success mx-2" id="printButton">Print</button>
            <button type="button" onClick={handleDownloadPDF} className="btn btn-danger mx-2" id="downloadPDFButton">Download as PDF</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkerKYCForm;
