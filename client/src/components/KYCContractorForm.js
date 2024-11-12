// import React, { useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import './KYCContractor.css';

// const KYCContractorForm = () => {
//   const [contractorData, setContractorData] = useState({});
//   const [contractorId, setContractorId] = useState("");

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:5000/api/kyc-contractor/${contractorId}`);
//       if (response.data) {
//         setContractorData(response.data);
//       } else {
//         alert("Contractor ID not found.");
//         setContractorData({});
//       }
//     } catch (error) {
//       console.error("Error fetching contractor data:", error);
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     // Set the font size for the title
//     doc.setFontSize(16);
//     doc.text("Contractor KYC Form", 105, 15, { align: 'center' });

//     // Set the font size for the content
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Company Information", 10, 30);
//     doc.setFont("helvetica", "normal");

//     // Adjust the spacing between the text entries
//     const lineHeight = 8; // Reduce line height for tighter spacing

//     // Company Information
//     doc.text(`Contractor Name: ${contractorData.contractorName || 'N/A'}`, 10, 40);
//     doc.text(`Contact Person: ${contractorData.contactPerson || 'N/A'}`, 10, 40 + lineHeight);
//     doc.text(`Phone No: ${contractorData.phoneNo || 'N/A'}`, 10, 40 + lineHeight * 2);
//     doc.text(`Email: ${contractorData.email || 'N/A'}`, 10, 40 + lineHeight * 3);
//     doc.text(`Address: ${contractorData.address || 'N/A'}`, 10, 40 + lineHeight * 4);

//     // Document Details section
//     doc.setFont("helvetica", "bold");
//     doc.text("Document Details", 10, 100);
//     doc.setFont("helvetica", "normal");

//     // Document fields with adjusted spacing
//     doc.text(`Aadhaar No: ${contractorData.aadhaarNo || 'N/A'}`, 10, 110);
//     doc.text(`Pancard No: ${contractorData.pancardNo || 'N/A'}`, 10, 110 + lineHeight);
//     doc.text(`WC Policy No: ${contractorData.wcPolicyNo || 'N/A'}`, 10, 110 + lineHeight * 2);
//     doc.text(`WC Start Date: ${contractorData.wcDate || 'N/A'}`, 10, 110 + lineHeight * 3);
//     doc.text(`WC Expiry Date: ${contractorData.wcValidDate || 'N/A'}`, 10, 110 + lineHeight * 4);
//     doc.text(`Service Type: ${contractorData.serviceType || 'N/A'}`, 10, 110 + lineHeight * 5);
//     doc.text(`Service Tax No: ${contractorData.serviceTaxNo || 'N/A'}`, 10, 110 + lineHeight * 6);
//     doc.text(`Shopact Licence: ${contractorData.shopactLicence || 'N/A'}`, 10, 110 + lineHeight * 7);
//     doc.text(`Shopact Expiry Date: ${contractorData.shopactValidDate || 'N/A'}`, 10, 110 + lineHeight * 8);
//     doc.text(`Labour Licence No: ${contractorData.labourLicenceNo || 'N/A'}`, 10, 110 + lineHeight * 9);
//     doc.text(`LL Start Date: ${contractorData.llIssueDate || 'N/A'}`, 10, 110 + lineHeight * 10);
//     doc.text(`LL Expiry Date: ${contractorData.llValidDate || 'N/A'}`, 10, 110 + lineHeight * 11);
//     doc.text(`BOCW No: ${contractorData.bocwNo || 'N/A'}`, 10, 110 + lineHeight * 12);
//     doc.text(`BOCW Start Date: ${contractorData.bocwDate || 'N/A'}`, 10, 110 + lineHeight * 13);
//     doc.text(`BOCW Expiry Date: ${contractorData.bocwValidDate || 'N/A'}`, 10, 110 + lineHeight * 14);
//     doc.text(`RC: ${contractorData.rc || 'N/A'}`, 10, 110 + lineHeight * 15);
//     doc.text(`RC Count: ${contractorData.rcCount || 'N/A'}`, 10, 110 + lineHeight * 16);
//     doc.text(`PF Establishment Code: ${contractorData.pfNo || 'N/A'}`, 10, 110 + lineHeight * 17);
//     doc.text(`ESIC Establishment Code: ${contractorData.esicNo || 'N/A'}`, 10, 110 + lineHeight * 18);
//     doc.text(`MLWF No: ${contractorData.mlwfNo || 'N/A'}`, 10, 110 + lineHeight * 19);
//     doc.text(`PTEC No: ${contractorData.ptecNo || 'N/A'}`, 10, 110 + lineHeight * 20);
//     doc.text(`PTRC No: ${contractorData.ptrcNo || 'N/A'}`, 10, 110 + lineHeight * 21);

//     doc.save("Contractor_KYC_Form.pdf");
// };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Contractor KYC Form</h1>

//       <form>
//         <div className="d-flex justify-content-between mb-4">
//           <input
//             type="text"
//             className="form-control w-50"
//             id="searchContractorId"
//             placeholder="Enter Contractor ID"
//             value={contractorId}
//             onChange={(e) => setContractorId(e.target.value)}
//           />
//           <button className="btn btn-primary" id="searchButton" onClick={handleSearch}>Search</button>
//         </div>
//       </form>

//       <form>
//         {/* Company Information */}
//         <fieldset className="border p-3 mb-4">
//           <legend className="w-auto px-2">Company Information</legend>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="contractorName" className="form-label">Contractor Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="contractorName"
//                 value={contractorData.contractorName || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="contactPerson" className="form-label">Contact Person:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="contactPerson"
//                 value={contractorData.contactPerson || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="phoneNo" className="form-label">Phone No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="phoneNo"
//                 value={contractorData.phoneNo || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="email" className="form-label">Email:</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 value={contractorData.email || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-12">
//               <label htmlFor="address" className="form-label">Address:</label>
//               <textarea
//                 className="form-control"
//                 id="address"
//                 value={contractorData.address || ""}
//                 readOnly
//               />
//             </div>
//           </div>
//         </fieldset>

//         {/* Document Details */}
//         <fieldset className="border p-3 mb-4">
//           <legend className="w-auto px-2">Document Details</legend>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="aadhaarNo" className="form-label">Aadhar No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="aadhaarNo"
//                 value={contractorData.aadhaarNo || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="pancardNo" className="form-label">Pancard No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="pancardNo"
//                 value={contractorData.pancardNo || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="wcPolicyNo" className="form-label">WC Policy No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="wcPolicyNo"
//                 value={contractorData.wcPolicyNo || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="wcDate" className="form-label">WC Start Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="wcDate"
//                 value={contractorData.wcDate || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="wcValidDate" className="form-label">WC Expiry Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="wcValidDate"
//                 value={contractorData.wcValidDate || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="serviceType" className="form-label">Service Type:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="serviceType"
//                 value={contractorData.serviceType || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="serviceTaxNo" className="form-label">Service Tax No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="serviceTaxNo"
//                 value={contractorData.serviceTaxNo || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="shopactLicence" className="form-label">Shopact Licence:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="shopactLicence"
//                 value={contractorData.shopactLicence || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="shopactValidDate" className="form-label">Shopact Expiry Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="shopactValidDate"
//                 value={contractorData.shopactValidDate || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="labourLicenceNo" className="form-label">Labour Licence No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="labourLicenceNo"
//                 value={contractorData.labourLicenceNo || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="llIssueDate" className="form-label">LL Start Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="llIssueDate"
//                 value={contractorData.llIssueDate || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="llValidDate" className="form-label">LL Expiry Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="llValidDate"
//                 value={contractorData.llValidDate || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="bocwNo" className="form-label">BOCW No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="bocwNo"
//                 value={contractorData.bocwNo || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="bocwDate" className="form-label">BOCW Start Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="bocwDate"
//                 value={contractorData.bocwDate || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="bocwValidDate" className="form-label">BOCW Expiry Date:</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="bocwValidDate"
//                 value={contractorData.bocwValidDate || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="rc" className="form-label">RC:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="rc"
//                 value={contractorData.rc || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="rcCount" className="form-label">RC Count:</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="rcCount"
//                 value={contractorData.rcCount || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="pfNo" className="form-label">PF Establishment Code:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="pfNo"
//                 value={contractorData.pfNo || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="esicNo" className="form-label">ESIC Establishment Code:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="esicNo"
//                 value={contractorData.esicNo || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="mlwfNo" className="form-label">MLWF No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="mlwfNo"
//                 value={contractorData.mlwfNo || ""}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label htmlFor="ptecNo" className="form-label">PTEC No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="ptecNo"
//                 value={contractorData.ptecNo || ""}
//                 readOnly
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="ptrcNo" className="form-label">PTRC No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="ptrcNo"
//                 value={contractorData.ptrcNo || ""}
//                 readOnly
//               />
//             </div>
//           </div>
//         </fieldset>

//         <div className="row mb-2 text-center">
//           <div className="col-md-12">
//             <button type="button" id="printButton" className="btn btn-success" onClick={handlePrint}>Print</button>
//             <button type="button" id="downloadPDFButton" className="btn btn-success" onClick={handleDownloadPDF}>Download as pdf</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default KYCContractorForm;














import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './KYCContractor.css';

const KYCContractorForm = () => {
  const [contractorData, setContractorData] = useState({});
  const [contractorId, setContractorId] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/kyc-contractor/${contractorId}`);
      if (response.data) {
        setContractorData(response.data);
      } else {
        alert("Contractor ID not found.");
        setContractorData({});
        setContractorId(""); // Reset input field on failure
      }
    } catch (error) {
      console.error("Error fetching contractor data:", error);
      alert("Error fetching data. Please try again.");
      setContractorData({});
      setContractorId(""); // Reset input field on error
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handlePrint = () => {
        window.print();
      };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set the font size for the title
    doc.setFontSize(16);
    doc.text("Contractor KYC Form", 105, 15, { align: 'center' });

    // Set the font size for the content
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Company Information", 10, 30);
    doc.setFont("helvetica", "normal");

    // Adjust the spacing between the text entries
    const lineHeight = 8; // Reduce line height for tighter spacing

    // Company Information
    doc.text(`Contractor Name: ${contractorData.contractorName || 'N/A'}`, 10, 40);
    doc.text(`Contact Person: ${contractorData.contactPerson || 'N/A'}`, 10, 40 + lineHeight);
    doc.text(`Phone No: ${contractorData.phoneNo || 'N/A'}`, 10, 40 + lineHeight * 2);
    doc.text(`Email: ${contractorData.email || 'N/A'}`, 10, 40 + lineHeight * 3);
    doc.text(`Address: ${contractorData.address || 'N/A'}`, 10, 40 + lineHeight * 4);

    // Document Details section
    doc.setFont("helvetica", "bold");
    doc.text("Document Details", 10, 100);
    doc.setFont("helvetica", "normal");

    // Document fields with adjusted spacing
    doc.text(`Aadhaar No: ${contractorData.aadhaarNo || 'N/A'}`, 10, 110);
    doc.text(`Pancard No: ${contractorData.pancardNo || 'N/A'}`, 10, 110 + lineHeight);
    doc.text(`WC Policy No: ${contractorData.wcPolicyNo || 'N/A'}`, 10, 110 + lineHeight * 2);
    doc.text(`WC Start Date: ${formatDate(contractorData.wcDate) || 'N/A'}`, 10, 110 + lineHeight * 3);
    doc.text(`WC Expiry Date: ${formatDate(contractorData.wcValidDate) || 'N/A'}`, 10, 110 + lineHeight * 4);
    doc.text(`Service Type: ${contractorData.serviceType || 'N/A'}`, 10, 110 + lineHeight * 5);
    doc.text(`Service Tax No: ${contractorData.serviceTaxNo || 'N/A'}`, 10, 110 + lineHeight * 6);
    doc.text(`Shopact Licence: ${contractorData.shopactLicence || 'N/A'}`, 10, 110 + lineHeight * 7);
    doc.text(`Shopact Expiry Date: ${formatDate(contractorData.shopactValidDate) || 'N/A'}`, 10, 110 + lineHeight * 8);
    doc.text(`Labour Licence No: ${contractorData.labourLicenceNo || 'N/A'}`, 10, 110 + lineHeight * 9);
    doc.text(`LL Start Date: ${formatDate(contractorData.llIssueDate) || 'N/A'}`, 10, 110 + lineHeight * 10);
    doc.text(`LL Expiry Date: ${formatDate(contractorData.llValidDate) || 'N/A'}`, 10, 110 + lineHeight * 11);
    doc.text(`BOCW No: ${contractorData.bocwNo || 'N/A'}`, 10, 110 + lineHeight * 12);
    doc.text(`BOCW Start Date: ${formatDate(contractorData.bocwDate) || 'N/A'}`, 10, 110 + lineHeight * 13);
    doc.text(`BOCW Expiry Date: ${formatDate(contractorData.bocwValidDate) || 'N/A'}`, 10, 110 + lineHeight * 14);
    doc.text(`RC: ${contractorData.rc || 'N/A'}`, 10, 110 + lineHeight * 15);
    doc.text(`RC Count: ${contractorData.rcCount || 'N/A'}`, 10, 110 + lineHeight * 16);
    doc.text(`PF Establishment Code: ${contractorData.pfNo || 'N/A'}`, 10, 110 + lineHeight * 17);
    doc.text(`ESIC Establishment Code: ${contractorData.esicNo || 'N/A'}`, 10, 110 + lineHeight * 18);
    doc.text(`MLWF No: ${contractorData.mlwfNo || 'N/A'}`, 10, 110 + lineHeight * 19);
    doc.text(`PTEC No: ${contractorData.ptecNo || 'N/A'}`, 10, 110 + lineHeight * 20);
    doc.text(`PTRC No: ${contractorData.ptrcNo || 'N/A'}`, 10, 110 + lineHeight * 21);

    doc.save("Contractor_KYC_Form.pdf");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contractor KYC Form</h1>

      <form>
        <div className="d-flex justify-content-between mb-4">
          <input
            type="text"
            className="form-control w-50"
            id="searchContractorId"
            placeholder="Enter Contractor ID"
            value={contractorId}
            onChange={(e) => setContractorId(e.target.value)}
          />
          <button className="btn btn-primary" id="searchButton" onClick={handleSearch}>Search</button>
        </div>
      </form>

      <div id="printableContent">
        <form>
          {/* Company Information */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Company Information</legend>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="contractorName" className="form-label">Contractor Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="contractorName"
                  value={contractorData.contractorName || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="contactPerson" className="form-label">Contact Person:</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactPerson"
                  value={contractorData.contactPerson || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="phoneNo" className="form-label">Phone No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  value={contractorData.phoneNo || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={contractorData.email || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="address" className="form-label">Address:</label>
                <textarea
                  className="form-control"
                  id="address"
                  value={contractorData.address || ""}
                  readOnly
                />
              </div>
            </div>
          </fieldset>

          {/* Document Details */}
          <fieldset className="border p-3 mb-4">
            <legend className="w-auto px-2">Document Details</legend>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="aadhaarNo" className="form-label">Aadhar No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="aadhaarNo"
                  value={contractorData.aadhaarNo || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="pancardNo" className="form-label">Pancard No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="pancardNo"
                  value={contractorData.pancardNo || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="wcPolicyNo" className="form-label">WC Policy No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="wcPolicyNo"
                  value={contractorData.wcPolicyNo || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="wcDate" className="form-label">WC Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="wcDate"
                  value={contractorData.wcDate ? formatDate(contractorData.wcDate) : ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="wcValidDate" className="form-label">WC Expiry Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="wcValidDate"
                  value={contractorData.wcValidDate ? formatDate(contractorData.wcValidDate) : ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="serviceType" className="form-label">Service Type:</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceType"
                  value={contractorData.serviceType || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="serviceTaxNo" className="form-label">Service Tax No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceTaxNo"
                  value={contractorData.serviceTaxNo || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="shopactLicence" className="form-label">Shopact Licence:</label>
                <input
                  type="text"
                  className="form-control"
                  id="shopactLicence"
                  value={contractorData.shopactLicence || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="shopactValidDate" className="form-label">Shopact Expiry Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="shopactValidDate"
                  value={contractorData.shopactValidDate ? formatDate(contractorData.shopactValidDate) : ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="labourLicenceNo" className="form-label">Labour Licence No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="labourLicenceNo"
                  value={contractorData.labourLicenceNo || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="llIssueDate" className="form-label">LL Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="llIssueDate"
                  value={contractorData.llIssueDate ? formatDate(contractorData.llIssueDate) : ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="llValidDate" className="form-label">LL Expiry Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="llValidDate"
                  value={contractorData.llValidDate ? formatDate(contractorData.llValidDate) : ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="bocwNo" className="form-label">BOCW No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="bocwNo"
                  value={contractorData.bocwNo || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="bocwDate" className="form-label">BOCW Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="bocwDate"
                  value={contractorData.bocwDate ? formatDate(contractorData.bocwDate) : ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="bocwValidDate" className="form-label">BOCW Expiry Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="bocwValidDate"
                  value={contractorData.bocwValidDate ? formatDate(contractorData.bocwValidDate) : ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="rc" className="form-label">RC:</label>
                <input
                  type="text"
                  className="form-control"
                  id="rc"
                  value={contractorData.rc || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="rcCount" className="form-label">RC Count:</label>
                <input
                  type="number"
                  className="form-control"
                  id="rcCount"
                  value={contractorData.rcCount || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="pfNo" className="form-label">PF Establishment Code:</label>
                <input
                  type="text"
                  className="form-control"
                  id="pfNo"
                  value={contractorData.pfNo || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="esicNo" className="form-label">ESIC Establishment Code:</label>
                <input
                  type="text"
                  className="form-control"
                  id="esicNo"
                  value={contractorData.esicNo || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="mlwfNo" className="form-label">MLWF No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="mlwfNo"
                  value={contractorData.mlwfNo || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="ptecNo" className="form-label">PTEC No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="ptecNo"
                  value={contractorData.ptecNo || ""}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="ptrcNo" className="form-label">PTRC No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="ptrcNo"
                  value={contractorData.ptrcNo || ""}
                  readOnly
                />
              </div>
            </div>
          </fieldset>

          <div className="row mb-2 text-center">
            <div className="col-md-12">
              <button type="button" id="printButton" className="btn btn-success" onClick={handlePrint}>Print</button>
              <button type="button" id="downloadPDFButton" className="btn btn-success" onClick={handleDownloadPDF}>Download as PDF</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KYCContractorForm;
