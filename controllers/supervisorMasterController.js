// // // supervisorMasterController.js
// // const Ams = require('../models/supervisorMasterModel');  // Import the Ams model

// // // Multer setup for file uploads
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');

// // // Ensure the uploads directory exists
// // if (!fs.existsSync('uploads')) {
// //   fs.mkdirSync('uploads');
// // }

// // // Configure multer for file upload
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/');
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   }
// // });

// // const upload = multer({ storage: storage }).fields([
// //   { name: 'aadharFrontUpload', maxCount: 1 },
// //   { name: 'aadharBackUpload', maxCount: 1 }
// // ]);

// // // Delete Supervisor
// // const deleteSupervisor = async (req, res) => {
// //   const supervisorId = req.params.id;

// //   try {
// //     const ams = await Ams.findOne();
// //     if (!ams || !ams.supervisorMaster || !ams.supervisorMaster.has(supervisorId)) {
// //       return res.status(404).json({ message: 'Supervisor not found' });
// //     }

// //     // Remove the supervisor from the supervisorMaster map
// //     ams.supervisorMaster.delete(supervisorId);
// //     await ams.save();

// //     return res.status(200).json({ message: 'Supervisor deleted successfully' });
// //   } catch (error) {
// //     console.error('Error deleting supervisor:', error.message);
// //     return res.status(500).json({ message: 'Error deleting supervisor', error: error.message });
// //   }
// // };
// // // Fetch all supervisors
// // // const getSupervisors = async (req, res) => {
// // //   try {
// // //     const ams = await Ams.findOne();  // Fetch the AMS document (assuming one document exists)

// // //     if (!ams || !ams.supervisorMaster) {
// // //       return res.status(404).json({ message: 'No supervisors found' });
// // //     }

// // //     // Convert the Map of supervisors to an array of objects
// // //     const supervisorsArray = Array.from(ams.supervisorMaster.values());

// // //     res.status(200).json(supervisorsArray);
// // //   } catch (error) {
// // //     console.error('Error fetching supervisors:', error.message);
// // //     res.status(500).json({ message: 'Error fetching supervisors', error: error.message });
// // //   }
// // // };


// // const getSupervisors = async (req, res) => {
// //   try {
// //     const ams = await Ams.findOne();  // Fetch the AMS document (assuming one document exists)

// //     if (!ams || !ams.supervisorMaster) {
// //       return res.status(404).json({ message: 'No supervisors found' });
// //     }

// //     // Convert the Map of supervisors to an array of objects, including supervisorId as a key
// //     const supervisorsArray = Array.from(ams.supervisorMaster.entries()).map(([supervisorId, supervisorData]) => ({
// //       supervisorId, // Set supervisorId from the key
// //       ...supervisorData.toObject(), // Convert Mongoose document to plain object to include all fields
// //     }));

// //     res.status(200).json(supervisorsArray);
// //   } catch (error) {
// //     console.error('Error fetching supervisors:', error.message);
// //     res.status(500).json({ message: 'Error fetching supervisors', error: error.message });
// //   }
// // };



// // // // Update Supervisor
// // // const updateSupervisor = async (req, res) => {
// // //   const supervisorId = req.params.id;

// // //   try {
// // //     const {
// // //       fullName, gender, dob, contactNumber, emailAddress, password,
// // //       address: { street, city, state, zipCode },
// // //       // aadharDetails: { aadharNumber }
// // //       aadharNumber
// // //     } = req.body;

// // //     // Find the AMS entry and update the supervisor data
// // //     const ams = await Ams.findOne();
// // //     if (!ams || !ams.supervisorMaster || !ams.supervisorMaster.has(supervisorId)) {
// // //       return res.status(404).json({ message: 'Supervisor not found' });
// // //     }

// // //     // Update the supervisor data
// // //     const supervisor = ams.supervisorMaster.get(supervisorId);
// // //     supervisor.fullName = fullName;
// // //     supervisor.gender = gender;
// // //     supervisor.dob = dob;
// // //     supervisor.contactNumber = contactNumber;
// // //     supervisor.emailAddress = emailAddress;
// // //     supervisor.password = password;
// // //     supervisor.address = { street, city, state, zipCode };
// // //     supervisor.aadharNumber = aadharNumber;

// // //     // Save the updated AMS document
// // //     await ams.save();

// // //     return res.status(200).json(supervisor);
// // //   } catch (error) {
// // //     console.error('Error updating supervisor:', error.message);
// // //     return res.status(500).json({ message: 'Error updating supervisor', error: error.message });
// // //   }
// // // };
// // const updateSupervisor = async (req, res) => {
// //   const supervisorId = req.params.id; // Extract supervisor ID from the URL

// //   try {
// //     // Find the AMS document
// //     const ams = await Ams.findOne();
// //     if (!ams || !ams.supervisorMaster || !ams.supervisorMaster.has(supervisorId)) {
// //       return res.status(404).json({ message: 'Supervisor not found' });
// //     }

// //     // Get the supervisor data from the map
// //     const supervisor = ams.supervisorMaster.get(supervisorId);

// //     // Update supervisor data with new values
// //     const updatedSupervisorData = {
// //       supervisorId: supervisorId, // Ensure supervisorId is included
// //       fullName: req.body.fullName || supervisor.fullName,
// //       gender: req.body.gender || supervisor.gender,
// //       dob: req.body.dob || supervisor.dob,
// //       contactNumber: req.body.contactNumber || supervisor.contactNumber,
// //       emailAddress: req.body.emailAddress || supervisor.emailAddress,
// //       password: req.body.password || supervisor.password,
// //       aadharNumber: req.body.aadharNumber || supervisor.aadharNumber,
// //       address: {
// //         street: req.body.address?.street || supervisor.address.street,
// //         city: req.body.address?.city || supervisor.address.city,
// //         state: req.body.address?.state || supervisor.address.state,
// //         zipCode: req.body.address?.zipCode || supervisor.address.zipCode,
// //       },
// //     };

// //     // Update the supervisor in the map
// //     ams.supervisorMaster.set(supervisorId, updatedSupervisorData);

// //     // Save the AMS document
// //     await ams.save();

// //     res.status(200).json(updatedSupervisorData);
// //   } catch (error) {
// //     console.error('Error updating supervisor:', error.message);
// //     res.status(500).json({ message: 'Error updating supervisor', error: error.message });
// //   }
// // };




// // // module.exports = { getSupervisors, registerSupervisor, updateSupervisor };


// // module.exports = { getSupervisors, updateSupervisor ,deleteSupervisor};




// import React, { useState, useEffect } from 'react';
// import './SupervisorMaster.css';
// import * as XLSX from 'xlsx';

// const SupervisorTable = () => {
//   const [supervisors, setSupervisors] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editedSupervisor, setEditedSupervisor] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchSupervisors();
//   }, []);

//   const editableFieldStyle = {
//     width: '100%',
//     padding: '15px',
//     border: '2px solid #5a0f47', // Highlight border
//     borderRadius: '8px',
//     fontSize: '16px',
//     backgroundColor: '#f9f5fa', // Light background
//     outline: 'none',
//   };
  
//   const fetchSupervisors = () => {
//     fetch('http://localhost:5000/api/ams/supervisor-master')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then(data => setSupervisors(data))
//       .catch(error => console.error('Error fetching supervisors:', error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedSupervisor({ ...editedSupervisor, [name]: value });
//   };

//   const handleEditClick = (supervisor) => {
//     setEditingId(supervisor.supervisorId);
//     setEditedSupervisor({
//       ...supervisor,
//       address: { ...supervisor.address },
//     });
//   };

//   // const handleSaveClick = async (supervisorId) => {
//   //   const supervisorData = {
//   //     ...editedSupervisor,
//   //     supervisorId: supervisorId, // Ensure supervisorId is included
//   //     address: {
//   //       street: editedSupervisor.address?.street || "Default Street",
//   //       city: editedSupervisor.address?.city || "Default City",
//   //       state: editedSupervisor.address?.state || "Default State",
//   //       zipCode: editedSupervisor.address?.zipCode || "000000",
//   //     },
//   //   };

//   //   try {
//   //     const response = await fetch(`http://localhost:5000/api/ams/supervisor-master/${supervisorId}`, {
//   //       method: 'PUT',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(supervisorData),
//   //     });

//   //     if (!response.ok) {
//   //       const errorData = await response.text();
//   //       throw new Error(`Error updating supervisor: ${errorData}`);
//   //     }

//   //     const updatedData = await response.json();
//   //     const updatedSupervisors = supervisors.map((s) =>
//   //       s.supervisorId === supervisorId ? updatedData : s
//   //     );
//   //     setSupervisors(updatedSupervisors);
//   //     setEditingId(null);
//   //   } catch (error) {
//   //     console.error('Error updating supervisor:', error.message);
//   //   }
//   // };
//   const handleSaveClick = async (supervisorId) => {
//     // Find the original supervisor data
//     const originalSupervisor = supervisors.find(s => s.supervisorId === supervisorId);
  
//     // Merge edited fields with the original data
//     const supervisorData = {
//       ...originalSupervisor, // Use original data as base
//       ...editedSupervisor, // Override with edited fields
//       address: {
//         ...originalSupervisor.address, // Use original address as base
//         ...editedSupervisor.address, // Override with edited address fields
//       },
//     };
  
//     try {
//       const response = await fetch(`http://localhost:5000/api/ams/supervisor-master/${supervisorId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(supervisorData),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(`Error updating supervisor: ${errorData}`);
//       }
  
//       const updatedData = await response.json();
//       const updatedSupervisors = supervisors.map((s) =>
//         s.supervisorId === supervisorId ? updatedData : s
//       );
//       setSupervisors(updatedSupervisors);
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error updating supervisor:', error.message);
//     }
//   };
  

//   // const handleDeleteClick = (supervisorId) => {
//   //   fetch(`http://localhost:5000/api/ams/supervisor-master/${supervisorId}`, {
//   //     method: 'DELETE',
//   //   })
//   //     .then(response => {
//   //       if (response.ok) {
//   //         setSupervisors(supervisors.filter(s => s.supervisorId !== supervisorId));
//   //       } else {
//   //         console.error('Error deleting supervisor:', response.statusText);
//   //       }
//   //     })
//   //     .catch(error => console.error('Error deleting supervisor:', error));
//   // };

//   const handleDeleteClick = (supervisorId) => {
//     // Display a confirmation dialog
//     const confirmDelete = window.confirm("Are you sure you want to delete this supervisor?");
    
//     if (confirmDelete) {
//       fetch(`http://localhost:5000/api/ams/supervisor-master/${supervisorId}`, {
//         method: 'DELETE',
//       })
//         .then(response => {
//           if (response.ok) {
//             setSupervisors(supervisors.filter(s => s.supervisorId !== supervisorId));
//           } else {
//             console.error('Error deleting supervisor:', response.statusText);
//           }
//         })
//         .catch(error => console.error('Error deleting supervisor:', error));
//     } else {
//       console.log('Delete action cancelled');
//     }
//   };
  

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const filteredSupervisors = supervisors.filter(s =>
//     (s.supervisorId && s.supervisorId.toString().includes(searchTerm)) ||
//     (s.fullName && s.fullName.toLowerCase().includes(searchTerm))
//   );

//   const handleExportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredSupervisors);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Supervisors");
//     XLSX.writeFile(workbook, "supervisors.xlsx");
//   };

//   return (
//     <div className="container-fluid" style={{ padding: '40px' , maxWidth:'100%'}}>
//       <div className="container" style={{ marginTop: '30px', maxWidth: '95%' }}>
//         {/* <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
//           <input
//             type="text"
//             placeholder="Search by Supervisor ID or Name"
//             className="form-control search-bar"
//             style={{ width: '400px', padding: '15px', fontSize: '18px' }}
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <button className="btn btn-primary export-btn" onClick={handleExportToExcel} style={{ padding: '5px 20px', width: '150px',fontSize: '18px', marginLeft: '10px important' }}>
//             Export to Excel
//           </button>
//         </div> */}
// <h1 style={{textAlign:'center'}}>Supervisor Master</h1>
// <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent:'center'}}>
//   <input
//     type="text"
//     placeholder="Search by Supervisor ID or Name"
//     style={{
//       padding: '10px',
//       fontSize: '16px',
//       width: '300px',
//       marginRight: '10px'
//     }}
//       value={searchTerm}
//       onChange={handleSearchChange}
    
//   />
//   <button
//     className="btn btn-primary export-btn"
//     onClick={handleExportToExcel}
//     style={{
//       padding: '12px 20px',
//       width: '200px',
//       fontSize: '16px',
//       marginLeft: '10px',
//       backgroundColor: '#5a0f47', // Matches the theme color in your UI
//       border: 'none',
//       color: '#fff',
//     }}
//   >
//     Export to Excel
//   </button>
// </div>


//         <div className="table-responsive" style={{ overflowX: 'auto', marginTop: '30px' }}>
//           <table className="table table-bordered table-striped table-hover" style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead className="table-dark" style={{ background: 'black', color: 'white' }}>
//               <tr>
//                 <th style={{ width: '12%', padding: '15px' }}>Supervisor Id</th>
//                 <th style={{ width: '15%', padding: '15px' }}>Full Name</th>
//                 <th style={{ width: '12%', padding: '15px' }}>Gender</th>
//                 <th style={{ width: '12%', padding: '15px' }}>Dob</th>
//                 <th style={{ width: '15%', padding: '15px' }}>Contact Number</th>
//                 <th style={{ width: '15%', padding: '15px' }}>Email Address</th>
//                 <th style={{ width: '15%', padding: '15px' }}>Aadhar Number</th>
//                 <th style={{ width: '12%', padding: '15px' }}>City</th>
//                 <th style={{ width: '12%', padding: '15px' }}>Password</th>
//                 <th style={{ width: '12%', padding: '15px' }}>State</th>
//                 <th style={{ width: '15%', padding: '15px' }}>Street</th>
//                 <th style={{ width: '12%', padding: '15px' }}>Aadhar Front</th>
//                 <th style={{ width: '12%', padding: '15px' }}>Aadhar Back</th>
//                 <th style={{ width: '20%', padding: '15px' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSupervisors.map(supervisor => (
//                 <tr key={supervisor.supervisorId}>
//                   <td>{supervisor.supervisorId}</td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={editedSupervisor.fullName || ''}
//                         onChange={handleInputChange}
                        
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47'}}
//                       />
//                     ) : supervisor.fullName}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="text"
//                         name="gender"
//                         value={editedSupervisor.gender || ''}
//                         onChange={handleInputChange}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' ,border: '2px solid #5a0f47'  }}
//                       />
//                     ) : supervisor.gender}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="date"
//                         name="dob"
//                         value={editedSupervisor.dob ? editedSupervisor.dob.split('T')[0] : ''}
//                         onChange={handleInputChange}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47' }}
//                       />
//                     ) : new Date(supervisor.dob).toLocaleDateString()}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="text"
//                         name="contactNumber"
//                         value={editedSupervisor.contactNumber || ''}
//                         onChange={handleInputChange}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47' }}
//                       />
//                     ) : supervisor.contactNumber}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="email"
//                         name="emailAddress"
//                         value={editedSupervisor.emailAddress || ''}
//                         onChange={handleInputChange}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47' }}
//                       />
//                     ) : supervisor.emailAddress}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="text"
//                         name="aadharNumber"
//                         value={editedSupervisor.aadharNumber || ''}
//                         onChange={handleInputChange}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47' }}
//                       />
//                     ) : supervisor.aadharNumber}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="text"
//                         name="city"
//                         value={editedSupervisor.address.city || ''}
//                         onChange={(e) => setEditedSupervisor({
//                           ...editedSupervisor,
//                           address: { ...editedSupervisor.address, city: e.target.value }
//                         })}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47'}}
//                       />
//                     ) : supervisor.address.city}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="password"
//                         name="password"
//                         value={editedSupervisor.password || ''}
//                         onChange={handleInputChange}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47' }}
//                       />
//                     ) : supervisor.password}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="text"
//                         name="state"
//                         value={editedSupervisor.address.state || ''}
//                         onChange={(e) => setEditedSupervisor({
//                           ...editedSupervisor,
//                           address: { ...editedSupervisor.address, state: e.target.value }
//                         })}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', border: '2px solid #5a0f47'}}
//                       />
//                     ) : supervisor.address.state}
//                   </td>
//                   <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <input
//                         type="text"
//                         name="street"
//                         value={editedSupervisor.address.street || ''}
//                         onChange={(e) => setEditedSupervisor({
//                           ...editedSupervisor,
//                           address: { ...editedSupervisor.address, street: e.target.value }
//                         })}
//                         style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' , border: '2px solid #5a0f47'}}
//                       />
//                     ) : supervisor.address.street}
//                   </td>
//                   <td>
//   {supervisor.aadharFrontUpload ? (
//     supervisor.aadharFrontUpload.includes('firebasestorage.googleapis.com') ? (
//       <a
//         href={supervisor.aadharFrontUpload}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         View Image
//       </a>
//     ) : (
//       <a
//         href={`http://localhost:5000/uploads/${supervisor.aadharFrontUpload}`}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         View Image
//       </a>
//     )
//   ) : (
//     'Not Available'
//   )}
// </td>
// <td>
//   {supervisor.aadharBackUpload ? (
//     supervisor.aadharBackUpload.includes('firebasestorage.googleapis.com') ? (
//       <a
//         href={supervisor.aadharBackUpload}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         View Image
//       </a>
//     ) : (
//       <a
//         href={`http://localhost:5000/uploads/${supervisor.aadharBackUpload}`}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         View Image
//       </a>
//     )
//   ) : (
//     'Not Available'
//   )}
// </td>


//                   {/* <td>
//                     {editingId === supervisor.supervisorId ? (
//                       <button className="btn btn-save" onClick={() => handleSaveClick(supervisor.supervisorId)} style={{ padding: '4px 10px',fontSize: '14px', border: 'none', cursor: 'pointer', borderRadius: '8px', margin: '0 15px' }}>Save</button>
//                     ) : (
//                       <button className="btn btn-edit" onClick={() => handleEditClick(supervisor)} style={{ padding: '4px 10px', fontSize: '14px', border: 'none', cursor: 'pointer', borderRadius: '8px', margin: '0 15px' }}>Edit</button>
//                     )}
//                     <br/>
//                     <button className="btn btn-danger" onClick={() => handleDeleteClick(supervisor.supervisorId)} style={{ padding: '4px 10px', fontSize: '14px', border: 'none', cursor: 'pointer', borderRadius: '8px', margin: '0 15px',marginTop:'10px',marginRight:'50px' }}>Delete</button>
//                   </td> */}
//                   <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px 5px' }}>
//   {editingId === supervisor.supervisorId ? (
//     <button
//       className="btn btn-save"
//       onClick={() => handleSaveClick(supervisor.supervisorId)}
//       style={{
//         padding: '6px 12px',
//         fontSize: '14px',
//         border: 'none',
//         cursor: 'pointer',
//         borderRadius: '5px',
//         marginBottom: '10px', // Space between Save and Delete buttons
//         backgroundColor: '#5a0f47', // Matches theme color
//         color: '#fff',
//         display: 'block', // Ensures buttons stack vertically
//         width: '100px', // Consistent button width
//       }}
//     >
//       Save
//     </button>
//   ) : (
//     <button
//       className="btn btn-edit"
//       onClick={() => handleEditClick(supervisor)}
//       style={{
//         padding: '6px 12px',
//         fontSize: '14px',
//         border: 'none',
//         cursor: 'pointer',
//         borderRadius: '5px',
//         marginBottom: '10px', // Space between Edit and Delete buttons
//         backgroundColor: '#5a0f47', // Matches theme color
//         color: '#fff',
//         display: 'block', // Ensures buttons stack vertically
//         width: '100px', // Consistent button width
//       }}
//     >
//       Edit
//     </button>
//   )}
//   <button
//     className="btn btn-danger"
//     onClick={() => handleDeleteClick(supervisor.supervisorId)}
//     style={{
//       padding: '6px 12px',
//       fontSize: '14px',
//       border: 'none',
//       cursor: 'pointer',
//       borderRadius: '5px',
//       backgroundColor: '#5a0f47', // Red for delete
//       color: '#fff',
//       display: 'block', // Ensures buttons stack vertically
//       width: '100px', // Consistent button width
//     }}
//   >
//     Delete
//   </button>
// </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupervisorTable;






// supervisorMasterController.js
const Ams = require('../models/supervisorMasterModel');  // Import the Ams model

// Multer setup for file uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).fields([
  { name: 'aadharFrontUpload', maxCount: 1 },
  { name: 'aadharBackUpload', maxCount: 1 }
]);

// Delete Supervisor
const deleteSupervisor = async (req, res) => {
  const supervisorId = req.params.id;

  try {
    const ams = await Ams.findOne();
    if (!ams || !ams.supervisorMaster || !ams.supervisorMaster.has(supervisorId)) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Remove the supervisor from the supervisorMaster map
    ams.supervisorMaster.delete(supervisorId);
    await ams.save();

    return res.status(200).json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    console.error('Error deleting supervisor:', error.message);
    return res.status(500).json({ message: 'Error deleting supervisor', error: error.message });
  }
};

//chatgpt code 
// const getSupervisors = async (req, res) => {
//   try {
//     const ams = await Ams.findOne({ _id: process.env._id });

//     if (!ams || !ams.supervisorMaster) {
//       return res.status(404).json({ message: 'No supervisors found' });
//     }

//     const supervisorsArray = Array.from(ams.supervisorMaster.values()).map(supervisor => supervisor.toObject());

//     res.setHeader('Content-Type', 'application/json'); // Ensure JSON header
//     res.status(200).json(supervisorsArray);
//   } catch (error) {
//     console.error('Error fetching supervisors:', error);
//     res.status(500).json({ message: 'Error fetching supervisors', error: error.message });
//   }
// };


const getSupervisors = async (req, res) => {
  try {
    const ams = await Ams.findOne({ _id: process.env._id });

    if (!ams || !ams.supervisorMaster) {
      return res.status(404).json({ message: 'No supervisors found' });
    }

    // Convert supervisorMaster Map to an array, including aadharFrontUpload and aadharBackUpload
    const supervisorsArray = Array.from(ams.supervisorMaster.entries()).map(
      ([supervisorId, supervisorData]) => ({
        supervisorId, // Key as supervisorId
        ...supervisorData.toObject(), // Convert to plain object to include all fields
        aadharFrontUpload: supervisorData.aadharFrontUpload, // Ensure Aadhar Front path is included
        aadharBackUpload: supervisorData.aadharBackUpload, // Ensure Aadhar Back path is included
      })
    );

    res.status(200).json(supervisorsArray);
  } catch (error) {
    console.error('Error fetching supervisors:', error);
    res.status(500).json({ message: 'Error fetching supervisors', error: error.message });
  }
};




// // Update Supervisor
// const updateSupervisor = async (req, res) => {
//   const supervisorId = req.params.id;

//   try {
//     const {
//       fullName, gender, dob, contactNumber, emailAddress, password,
//       address: { street, city, state, zipCode },
//       // aadharDetails: { aadharNumber }
//       aadharNumber
//     } = req.body;

//     // Find the AMS entry and update the supervisor data
//     const ams = await Ams.findOne();
//     if (!ams || !ams.supervisorMaster || !ams.supervisorMaster.has(supervisorId)) {
//       return res.status(404).json({ message: 'Supervisor not found' });
//     }

//     // Update the supervisor data
//     const supervisor = ams.supervisorMaster.get(supervisorId);
//     supervisor.fullName = fullName;
//     supervisor.gender = gender;
//     supervisor.dob = dob;
//     supervisor.contactNumber = contactNumber;
//     supervisor.emailAddress = emailAddress;
//     supervisor.password = password;
//     supervisor.address = { street, city, state, zipCode };
//     supervisor.aadharNumber = aadharNumber;

//     // Save the updated AMS document
//     await ams.save();

//     return res.status(200).json(supervisor);
//   } catch (error) {
//     console.error('Error updating supervisor:', error.message);
//     return res.status(500).json({ message: 'Error updating supervisor', error: error.message });
//   }
// };


const updateSupervisor = async (req, res) => {
  const supervisorId = req.params.id;

  try {
    // Check if AMS document and supervisor exist
    const ams = await Ams.findOne();
    if (!ams || !ams.supervisorMaster || !ams.supervisorMaster.has(supervisorId)) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Log incoming request data for debugging
    console.log("Update request body:", req.body);

    // Get the supervisor data from the supervisorMaster map
    const supervisor = ams.supervisorMaster.get(supervisorId);

    // Merge existing supervisor data with the updated data
    const updatedSupervisorData = {
      fullName: req.body.fullName || supervisor.fullName,
      gender: req.body.gender || supervisor.gender,
      dob: req.body.dob || supervisor.dob,
      contactNumber: req.body.contactNumber || supervisor.contactNumber,
      emailAddress: req.body.emailAddress || supervisor.emailAddress,
      password: req.body.password || supervisor.password,
      aadharNumber: req.body.aadharNumber || supervisor.aadharNumber,
      supervisorId: supervisorId, // Retain supervisorId

      address: {
        street: req.body.address?.street || supervisor.address.street,
        city: req.body.address?.city || supervisor.address.city,
        state: req.body.address?.state || supervisor.address.state,
        zipCode: req.body.address?.zipCode || supervisor.address.zipCode,
      }
    };

    // Update the supervisor data in the map
    ams.supervisorMaster.set(supervisorId, updatedSupervisorData);

    // Save changes and handle validation errors
    await ams.save();

    return res.status(200).json(updatedSupervisorData);
  } catch (error) {
    console.error('Error updating supervisor:', error);
    return res.status(500).json({ message: 'Error updating supervisor', error: error.message });
  }
};


// module.exports = { getSupervisors, registerSupervisor, updateSupervisor };


module.exports = { getSupervisors, updateSupervisor ,deleteSupervisor};