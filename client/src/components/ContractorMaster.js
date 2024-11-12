// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ContractorMaster.css';

// function ContractorMaster() {
//   const [contractors, setContractors] = useState([]);

//   // Fetch contractor data when component mounts
//   useEffect(() => {
//     fetchContractorData();
//   }, []);

//   const fetchContractorData = async () => {
//     try {
//       // Update the URL to match your backend API, assuming it's running on localhost:5000
//       const response = await axios.get('http://localhost:5000/api/contractor-master'); // Ensure correct path
//       setContractors(response.data); // Update state with fetched data
//     } catch (error) {
//       console.error('Error fetching contractor data:', error);
//     }
//   };

//   return (
//     <div className="contractor-master-container">
//       <h1 className="mb-4 text-center font-weight-bold">Contractor Master</h1>
//       <div className="container-fluid table-container">
//         <table className="table table-bordered table-striped table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Contractor Id</th>
//               <th>Contractor Name</th>
//               <th>Building Name</th>
//               <th>Contact Person</th>
//               <th>Phone No</th>
//               <th>Email</th>
//               <th>Second Email</th>
//               <th>Third Email</th>
//               <th>Fourth Email</th>
//               <th>Address</th>
//               <th>Aadhaar No.</th>
//               <th>Pancard No.</th>
//               <th>WC Policy No.</th>
//               <th>WC Date</th>
//               <th>WC Valid Date</th>
//               <th>Service Type</th>
//               <th>Service Tax No.</th>
//               <th>Shopact Licence</th>
//               <th>Shopact Valid Date</th>
//               <th>Labour Licence No.</th>
//               <th>LL Issue Date</th>
//               <th>LL Valid Date</th>
//               <th>BOCW No.</th>
//               <th>BOCW Date</th>
//               <th>BOCW Valid Date</th>
//               <th>RC</th>
//               <th>RC Count</th>
//               <th>PF No.</th>
//               <th>ESIC No.</th>
//               <th>MLWF No.</th>
//               <th>PTEC No.</th>
//               <th>PTRC No.</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contractors.map(contractor => (
//               <tr key={contractor.contractorId}>
//                 <td>{contractor.contractorId}</td>
//                 <td>{contractor.contractorName}</td>
//                 <td>{contractor.buildingName}</td>
//                 <td>{contractor.contactPerson}</td>
//                 <td>{contractor.phoneNo}</td>
//                 <td>{contractor.email}</td>
//                 <td>{contractor.secondemail}</td>
//                 <td>{contractor.thirdemail}</td>
//                 <td>{contractor.fourthemail}</td>
//                 <td>{contractor.address}</td>
//                 <td>{contractor.aadhaarNo}</td>
//                 <td>{contractor.pancardNo}</td>
//                 <td>{contractor.wcPolicyNo}</td>
//                 <td>{contractor.wcDate || 'N/A'}</td>
//                 <td>{contractor.wcValidDate || 'N/A'}</td>
//                 <td>{contractor.serviceType}</td>
//                 <td>{contractor.serviceTaxNo}</td>
//                 <td>{contractor.shopactLicence}</td>
//                 <td>{contractor.shopactValidDate || 'N/A'}</td>
//                 <td>{contractor.labourLicenceNo}</td>
//                 <td>{contractor.llIssueDate || 'N/A'}</td>
//                 <td>{contractor.llValidDate || 'N/A'}</td>
//                 <td>{contractor.bocwNo}</td>
//                 <td>{contractor.bocwDate || 'N/A'}</td>
//                 <td>{contractor.bocwValidDate || 'N/A'}</td>
//                 <td>{contractor.rc}</td>
//                 <td>{contractor.rcCount}</td>
//                 <td>{contractor.pfNo}</td>
//                 <td>{contractor.esicNo}</td>
//                 <td>{contractor.mlwfNo}</td>
//                 <td>{contractor.ptecNo}</td>
//                 <td>{contractor.ptrcNo}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ContractorMaster;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContractorMaster.css';

function ContractorMaster() {
  const [contractors, setContractors] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track the contractor being edited
  const [editData, setEditData] = useState({}); // Temporary edit data

  // Fetch contractor data when component mounts
  useEffect(() => {
    fetchContractorData();
  }, []);

  const fetchContractorData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contractor-master'); // Fetch from backend
      setContractors(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching contractor data:', error);
    }
  };

  const handleEdit = (contractor) => {
    setIsEditing(contractor.contractorId); // Set editing mode for the selected contractor
    setEditData(contractor); // Store the contractor's data in a temporary state for editing
  };

  const handleSave = async (contractorId) => {
    try {
      await axios.put(`http://localhost:5000/api/contractor-master/${contractorId}`, editData); // Send updated data to backend
      fetchContractorData(); // Refresh data after saving
      setIsEditing(null); // Exit editing mode
    } catch (error) {
      console.error('Error saving contractor data:', error);
    }
  };

  const handleDelete = async (contractorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/contractor-master/${contractorId}`); // Delete contractor from database
      fetchContractorData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting contractor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value }); // Update editData for inline editing
  };

  // Utility function to format dates to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Formats date to YYYY-MM-DD
  };

  return (
    <div className="contractor-master-container">
      <h1 className="mb-4 text-center font-weight-bold">Contractor Master</h1>
      <div className="container-fluid table-container">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Contractor Id</th>
              <th>Contractor Name</th>
              <th>Building Name</th>
              <th>Contact Person</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Second Email</th>
              <th>Third Email</th>
              <th>Fourth Email</th>
              <th>Address</th>
              <th>Aadhaar No.</th>
              <th>Pancard No.</th>
              <th>WC Policy No.</th>
              <th>WC Date</th>
              <th>WC Valid Date</th>
              <th>Service Type</th>
              <th>Service Tax No.</th>
              <th>Shopact Licence</th>
              <th>Shopact Valid Date</th>
              <th>Labour Licence No.</th>
              <th>LL Issue Date</th>
              <th>LL Valid Date</th>
              <th>BOCW No.</th>
              <th>BOCW Date</th>
              <th>BOCW Valid Date</th>
              <th>RC</th>
              <th>RC Count</th>
              <th>PF No.</th>
              <th>ESIC No.</th>
              <th>MLWF No.</th>
              <th>PTEC No.</th>
              <th>PTRC No.</th>
              <th>Action</th> {/* Action column */}
            </tr>
          </thead>
          <tbody>
            {contractors.map(contractor => (
              <tr key={contractor.contractorId}>
                {isEditing === contractor.contractorId ? (
                  <>
                    {/* Input fields for editing */}
                    <td>{contractor.contractorId}</td>
                    <td><input type="text" name="contractorName" value={editData.contractorName} onChange={handleChange} /></td>
                    <td><input type="text" name="buildingName" value={editData.buildingName} onChange={handleChange} /></td>
                    <td><input type="text" name="contactPerson" value={editData.contactPerson} onChange={handleChange} /></td>
                    <td><input type="text" name="phoneNo" value={editData.phoneNo} onChange={handleChange} /></td>
                    <td><input type="email" name="email" value={editData.email} onChange={handleChange} /></td>
                    <td><input type="email" name="secondemail" value={editData.secondemail} onChange={handleChange} /></td>
                    <td><input type="email" name="thirdemail" value={editData.thirdemail} onChange={handleChange} /></td>
                    <td><input type="email" name="fourthemail" value={editData.fourthemail} onChange={handleChange} /></td>
                    <td><input type="text" name="address" value={editData.address} onChange={handleChange} /></td>
                    <td><input type="text" name="aadhaarNo" value={editData.aadhaarNo} onChange={handleChange} /></td>
                    <td><input type="text" name="pancardNo" value={editData.pancardNo} onChange={handleChange} /></td>
                    <td><input type="text" name="wcPolicyNo" value={editData.wcPolicyNo} onChange={handleChange} /></td>
                    <td><input type="date" name="wcDate" value={editData.wcDate} onChange={handleChange} /></td>
                    <td><input type="date" name="wcValidDate" value={editData.wcValidDate} onChange={handleChange} /></td>
                    <td><input type="text" name="serviceType" value={editData.serviceType} onChange={handleChange} /></td>
                    <td><input type="text" name="serviceTaxNo" value={editData.serviceTaxNo} onChange={handleChange} /></td>
                    <td><input type="text" name="shopactLicence" value={editData.shopactLicence} onChange={handleChange} /></td>
                    <td><input type="date" name="shopactValidDate" value={editData.shopactValidDate} onChange={handleChange} /></td>
                    <td><input type="text" name="labourLicenceNo" value={editData.labourLicenceNo} onChange={handleChange} /></td>
                    <td><input type="date" name="llIssueDate" value={editData.llIssueDate} onChange={handleChange} /></td>
                    <td><input type="date" name="llValidDate" value={editData.llValidDate} onChange={handleChange} /></td>
                    <td><input type="text" name="bocwNo" value={editData.bocwNo} onChange={handleChange} /></td>
                    <td><input type="date" name="bocwDate" value={editData.bocwDate} onChange={handleChange} /></td>
                    <td><input type="date" name="bocwValidDate" value={editData.bocwValidDate} onChange={handleChange} /></td>
                    <td><input type="text" name="rc" value={editData.rc} onChange={handleChange} /></td>
                    <td><input type="number" name="rcCount" value={editData.rcCount} onChange={handleChange} /></td>
                    <td><input type="text" name="pfNo" value={editData.pfNo} onChange={handleChange} /></td>
                    <td><input type="text" name="esicNo" value={editData.esicNo} onChange={handleChange} /></td>
                    <td><input type="text" name="mlwfNo" value={editData.mlwfNo} onChange={handleChange} /></td>
                    <td><input type="text" name="ptecNo" value={editData.ptecNo} onChange={handleChange} /></td>
                    <td><input type="text" name="ptrcNo" value={editData.ptrcNo} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-success" onClick={() => handleSave(contractor.contractorId)}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setIsEditing(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Render data in read-only mode */}
                    <td>{contractor.contractorId}</td>
                    <td>{contractor.contractorName}</td>
                    <td>{contractor.buildingName}</td>
                    <td>{contractor.contactPerson}</td>
                    <td>{contractor.phoneNo}</td>
                    <td>{contractor.email}</td>
                    <td>{contractor.secondemail}</td>
                    <td>{contractor.thirdemail}</td>
                    <td>{contractor.fourthemail}</td>
                    <td>{contractor.address}</td>
                    <td>{contractor.aadhaarNo}</td>
                    <td>{contractor.pancardNo}</td>
                    <td>{contractor.wcPolicyNo}</td>
                    <td>{formatDate(contractor.wcDate)}</td> {/* Use formatDate to display */}
                    <td>{formatDate(contractor.wcValidDate)}</td> {/* Use formatDate to display */}
                    <td>{contractor.serviceType}</td>
                    <td>{contractor.serviceTaxNo}</td>
                    <td>{contractor.shopactLicence}</td>
                    <td>{formatDate(contractor.shopactValidDate)}</td> {/* Use formatDate to display */}
                    <td>{contractor.labourLicenceNo}</td>
                    <td>{formatDate(contractor.llIssueDate)}</td> {/* Use formatDate to display */}
                    <td>{formatDate(contractor.llValidDate)}</td> {/* Use formatDate to display */}
                    <td>{contractor.bocwNo}</td>
                    <td>{formatDate(contractor.bocwDate)}</td> {/* Use formatDate to display */}
                    <td>{formatDate(contractor.bocwValidDate)}</td> {/* Use formatDate to display */}
                    <td>{contractor.rc}</td>
                    <td>{contractor.rcCount}</td>
                    <td>{contractor.pfNo}</td>
                    <td>{contractor.esicNo}</td>
                    <td>{contractor.mlwfNo}</td>
                    <td>{contractor.ptecNo}</td>
                    <td>{contractor.ptrcNo}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEdit(contractor)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(contractor.contractorId)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContractorMaster;
