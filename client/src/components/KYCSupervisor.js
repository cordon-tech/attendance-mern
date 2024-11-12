
// // src/components/SupervisorKYCForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './KYCSupervisor.css';
// import html2pdf from 'html2pdf.js';

// function SupervisorKYCForm() {
//   const [formData, setFormData] = useState({
//     searchSupervisorId: '',
//     fullName: '',
//     dob: '',
//     gender: '',
//     contactNumber: '',
//     emailAddress: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     aadharNumber: '',
//   });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Fetch supervisor data by supervisorId
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const { searchSupervisorId } = formData;

//     if (!searchSupervisorId) {
//       alert("Please enter a Supervisor ID to search");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:5000/api/ams/${searchSupervisorId}`);
//       const supervisor = response.data;

//       setFormData({
//         ...formData,
//         fullName: supervisor.fullName,
//         dob: supervisor.dob,
//         gender: supervisor.gender,
//         contactNumber: supervisor.contactNumber,
//         emailAddress: supervisor.emailAddress,
//         street: supervisor.address.street,
//         city: supervisor.address.city,
//         state: supervisor.address.state,
//         zipCode: supervisor.address.zipCode,
//         aadharNumber: supervisor.aadharNumber,
//       });
//     } catch (error) {
//       console.error("Error fetching supervisor data:", error);
//       alert("Supervisor not found. Please check the ID and try again.");
//     }
//   };

//   // Handle Print functionality
//   const handlePrint = () => {
//     window.print();
//   };

//   // Handle Download as PDF functionality
//   const handleDownloadPDF = () => {
//     const element = document.getElementById('supervisorKYCForm');
//     const options = {
//       margin: 0.5,
//       filename: `Supervisor_KYC_${formData.searchSupervisorId || 'Form'}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//     };

//     html2pdf().from(element).set(options).save();
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Supervisor KYC Form</h1>
//       <form id="supervisorKYCForm">
//         {/* Search Section */}
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="searchSupervisorId" className="form-label">Search Supervisor ID:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="searchSupervisorId"
//               name="searchSupervisorId"
//               value={formData.searchSupervisorId}
//               onChange={handleChange}
//               placeholder="Enter Supervisor ID"
//             />
//           </div>
//           <div className="col-md-6 d-flex align-items-end">
//             <button onClick={handleSearch} id="searchButton" className="btn btn-primary">Search</button>
//           </div>
//         </div>

//         {/* Personal Details */}
//         <fieldset className="border p-3 mb-4">
//           <legend className="w-auto px-2">Personal Details</legend>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="fullName" className="form-label">Name of Supervisor:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="fullName"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="dob" className="form-label">Date of Birth:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="dob"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="gender" className="form-label">Gender:</label>
//               <select
//                 id="gender"
//                 name="gender"
//                 className="form-select"
//                 value={formData.gender}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 id="contactNumber"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="emailAddress" className="form-label">Email Address:</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="emailAddress"
//                 name="emailAddress"
//                 value={formData.emailAddress}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </fieldset>

//         {/* Address Details */}
//         <fieldset className="border p-3 mb-4">
//           <legend className="w-auto px-2">Address Details</legend>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="street" className="form-label">Street:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="street"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="city" className="form-label">City:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="state" className="form-label">State:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="zipCode" className="form-label">Zip Code:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="zipCode"
//                 name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </fieldset>

//         {/* Document Details */}
//         <fieldset className="border p-3 mb-4">
//           <legend className="w-auto px-2">Document Details</legend>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="aadharNumber" className="form-label">AADHAR NO:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="aadharNumber"
//                 name="aadharNumber"
//                 value={formData.aadharNumber}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </fieldset>

//         {/* Action Buttons */}
//         <div className="row mb-2 d-flex justify-content-center">
//           <div className="col-md-12 text-center ">
//             <button type="button" id="printButton" className="btn btn-success" onClick={handlePrint}>Print</button>
//             <button type="button" id="downloadPDFButton" className="btn btn-success" onClick={handleDownloadPDF}>Download as PDF</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SupervisorKYCForm;





// src/components/SupervisorKYCForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './KYCSupervisor.css';
import html2pdf from 'html2pdf.js';

function SupervisorKYCForm() {
  const [formData, setFormData] = useState({
    searchSupervisorId: '',
    fullName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    emailAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    aadharNumber: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Fetch supervisor data by supervisorId
  const handleSearch = async (e) => {
    e.preventDefault();
    const { searchSupervisorId } = formData;

    if (!searchSupervisorId) {
      alert("Please enter a Supervisor ID to search");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/ams/${searchSupervisorId}`);
      const supervisor = response.data;

      setFormData({
        ...formData,
        fullName: supervisor.fullName,
        dob: supervisor.dob,
        gender: supervisor.gender,
        contactNumber: supervisor.contactNumber,
        emailAddress: supervisor.emailAddress,
        street: supervisor.address.street,
        city: supervisor.address.city,
        state: supervisor.address.state,
        zipCode: supervisor.address.zipCode,
        aadharNumber: supervisor.aadharNumber,
      });
    } catch (error) {
      console.error("Error fetching supervisor data:", error);
      alert("Supervisor not found. Please check the ID and try again.");
    }
  };

  // Handle Print functionality
  const handlePrint = () => {
    window.print();
  };

  // // Handle Download as PDF functionality
  // const handleDownloadPDF = () => {
  //   const element = document.getElementById('supervisorKYCForm');
  //   const options = {
  //     margin: 0.5,
  //     filename: `Supervisor_KYC_${formData.searchSupervisorId || 'Form'}.pdf`,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  //   };

  //   html2pdf().from(element).set(options).save();
  // };

  const handleDownloadPDF = () => {
    // Create a new div to hold the data for the PDF
    const pdfContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Supervisor KYC Form</h2>
        <h3>Personal Details</h3>
        <p><strong>Name of Supervisor:</strong> ${formData.fullName}</p>
        <p><strong>Date of Birth:</strong> ${formData.dob}</p>
        <p><strong>Gender:</strong> ${formData.gender}</p>
        <p><strong>Contact Number:</strong> ${formData.contactNumber}</p>
        <p><strong>Email Address:</strong> ${formData.emailAddress}</p>
        
        <h3>Address Details</h3>
        <p><strong>Street:</strong> ${formData.street}</p>
        <p><strong>City:</strong> ${formData.city}</p>
        <p><strong>State:</strong> ${formData.state}</p>
        <p><strong>Zip Code:</strong> ${formData.zipCode}</p>
        
        <h3>Document Details</h3>
        <p><strong>AADHAR NO:</strong> ${formData.aadharNumber}</p>
      </div>
    `;
  
    // Create a new window for PDF
    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write(pdfContent);
    pdfWindow.document.close();
  
    // Options for html2pdf
    const options = {
      margin: 0.5,
      filename: `Supervisor_KYC_${formData.searchSupervisorId || 'Form'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
  
    // Use html2pdf to convert the new content to PDF
    html2pdf().from(pdfWindow.document.body).set(options).save();
  };
  
  


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Supervisor KYC Form</h1>
      <form id="supervisorKYCForm">
        
        {/* Search Section in one div */}
        <div className="row mb-3">
  <div className="col-md-6">
    <label htmlFor="searchSupervisorId" className="form-label">Enter Supervisor ID:</label>
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        id="searchSupervisorId"
        name="searchSupervisorId"
        value={formData.searchSupervisorId}
        onChange={handleChange}
        placeholder="Enter Supervisor ID"
        style={{ width: '100%' }}
      />
      <button onClick={handleSearch} id="searchButton" className="btn btn-primary">Search</button>
    </div>
  </div>
</div>


        {/* Personal Details */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto px-2">Personal Details</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">Name of Supervisor:</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="dob" className="form-label">Date of Birth:</label>
              <input
                type="text"
                className="form-control"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <select
                id="gender"
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
              <input
                type="tel"
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="emailAddress" className="form-label">Email Address:</label>
              <input
                type="email"
                className="form-control"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Address Details */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto px-2">Address Details</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="street" className="form-label">Street:</label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">City:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="state" className="form-label">State:</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="zipCode" className="form-label">Zip Code:</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Document Details */}
        <fieldset className="border p-3 mb-4">
          <legend className="w-auto px-2">Document Details</legend>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="aadharNumber" className="form-label">AADHAR NO:</label>
              <input
                type="text"
                className="form-control"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

      
<div className="row mb-2 d-flex justify-content-center">
  <div className="d-flex justify-content-center">
    <button type="button" id="printButton" className="btn btn-success me-2" onClick={handlePrint}>Print</button>
    <button type="button" id="downloadPDFButton" className="btn btn-success" onClick={handleDownloadPDF}>Download as PDF</button>
  </div>
</div>

      </form>
    </div>
  );
}

export default SupervisorKYCForm;
