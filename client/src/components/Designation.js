// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';

// function DesignationView() {
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentDesignation, setCurrentDesignation] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isNewModalOpen, setIsNewModalOpen] = useState(false); // For "Add New" modal
//   const [newDesignation, setNewDesignation] = useState('');
//   const [nextId, setNextId] = useState(''); // For generating the next designation ID

//   useEffect(() => {
//     fetchDesignations();
//   }, []);

//   const fetchDesignations = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/designations');
//       setDesignations(res.data);

//       // Calculate the next designation ID (incremental)
//       const lastId = res.data.length > 0 ? res.data[res.data.length - 1].id : 'DM00';
//       const nextIdNum = parseInt(lastId.replace('DM', '')) + 1;
//       setNextId(`DM${nextIdNum.toString().padStart(2, '0')}`);
//     } catch (err) {
//       console.error('Failed to fetch designations:', err);
//     }
//   };

//   const handleEditClick = (designation) => {
//     setCurrentDesignation(designation);
//     setIsEditModalOpen(true);
//   };

//   const handleAddNewClick = () => {
//     setIsNewModalOpen(true);
//   };

//   const handleSaveNewDesignation = async () => {
//     if (newDesignation.trim() === '') return;

//     try {
//       await axios.post('http://localhost:5000/api/designations', {
//         id: nextId,
//         designationName: newDesignation
//       });
//       setIsNewModalOpen(false);
//       setNewDesignation('');
//       fetchDesignations(); // Refresh the list
//     } catch (err) {
//       console.error('Failed to add new designation:', err);
//     }
//   };

//   const handleSaveEdit = async () => {
//     if (!currentDesignation) return;

//     try {
//       // Make sure to send the correct designation ID and updated name
//       await axios.put(`http://localhost:5000/api/designations/${currentDesignation.id}`, {
//         designationName: currentDesignation.designationName,
//       });
//       setIsEditModalOpen(false);
//       fetchDesignations(); // Refresh the list after saving
//     } catch (err) {
//       console.error('Failed to save designation:', err);
//     }
//   };

//   const handleExportClick = () => {
//     const worksheet = XLSX.utils.json_to_sheet(designations);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Designations');
//     XLSX.writeFile(workbook, 'designations.xlsx');
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '20px' }}>
//       <h1 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Designation View</h1>
      
//       <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', width: '100%', alignItems: 'center' }}>
//         <input
//           type="text"
//           style={{ padding: '10px', fontSize: '16px', marginRight: '20px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
//           placeholder="Search by ID or Designation"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           style={{ padding: '10px 20px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer', fontSize: '16px' }}
//           onClick={handleExportClick}
//         >
//           Export
//         </button>
//         <button
//           style={{ padding: '10px 20px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer', fontSize: '16px' }}
//           onClick={handleAddNewClick}
//         >
//           Add New
//         </button>
//       </div>

//       <table style={{ width: '100%', maxWidth: '800px', borderCollapse: 'collapse', textAlign: 'left', boxShadow: '0 4px 8px rgba(128, 128, 128, 0.5)' }}>
//         <thead>
//           <tr>
//             <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>ID</th>
//             <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Designation</th>
//             <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {designations
//             .filter((d) =>
//               d.designationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               d.id.toLowerCase().includes(searchTerm.toLowerCase())
//             )
//             .map((designation) => (
//               <tr key={designation.id}>
//                 <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{designation.id}</td>
//                 <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{designation.designationName}</td>
//                 <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
//                   <button
//                     style={{ padding: '8px 12px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//                     onClick={() => handleEditClick(designation)}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       {isNewModalOpen && (
//         <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', textAlign: 'center' }}>
//             <h2>New Designation</h2>
//             <label>
//               Designation ID:
//               <input type="text" value={nextId} readOnly style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
//             </label>
//             <label>
//               Designation:
//               <input
//                 type="text"
//                 value={newDesignation}
//                 onChange={(e) => setNewDesignation(e.target.value)}
//                 style={{ width: '100%', padding: '10px', margin: '10px 0' }}
//               />
//             </label>
//             <div style={{ marginTop: '20px' }}>
//               <button
//                 style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
//                 onClick={handleSaveNewDesignation}
//               >
//                 Save
//               </button>
//               <button
//                 style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
//                 onClick={() => setIsNewModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isEditModalOpen && (
//         <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', textAlign: 'center' }}>
//             <h2>Edit Designation</h2>
//             <label>
//               Designation ID:
//               <input type="text" value={currentDesignation.id} readOnly style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
//             </label>
//             <label>
//               Designation:
//               <input
//                 type="text"
//                 value={currentDesignation.designationName}
//                 onChange={(e) =>
//                   setCurrentDesignation({ ...currentDesignation, designationName: e.target.value })
//                 }
//                 style={{ width: '100%', padding: '10px', margin: '10px 0' }}
//               />
//             </label>
//             <div style={{ marginTop: '20px' }}>
//               <button
//                 style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
//                 onClick={handleSaveEdit}
//               >
//                 Save
//               </button>
//               <button
//                 style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
//                 onClick={() => setIsEditModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DesignationView;



/////////////////////////////////////////////Search not working //////////////////////////Updated code////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function DesignationView() {
  const [designations, setDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false); // For "Add New" modal
  const [newDesignation, setNewDesignation] = useState('');
  const [nextId, setNextId] = useState(''); // For generating the next designation ID

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/designations');
      setDesignations(res.data);

      // Calculate the next designation ID (incremental)
      const lastId = res.data.length > 0 ? res.data[res.data.length - 1].id : 'DM00';
      const nextIdNum = parseInt(lastId.replace('DM', '')) + 1;
      setNextId(`DM${nextIdNum.toString().padStart(2, '0')}`);
    } catch (err) {
      console.error('Failed to fetch designations:', err);
    }
  };

  const handleEditClick = (designation) => {
    setCurrentDesignation(designation);
    setIsEditModalOpen(true);
  };

  const handleAddNewClick = () => {
    setIsNewModalOpen(true);
  };

  const handleSaveNewDesignation = async () => {
    if (newDesignation.trim() === '') return;

    try {
      await axios.post('http://localhost:5000/api/designations', {
        id: nextId,
        designationName: newDesignation
      });
      setIsNewModalOpen(false);
      setNewDesignation('');
      fetchDesignations(); // Refresh the list
    } catch (err) {
      console.error('Failed to add new designation:', err);
    }
  };

  const handleSaveEdit = async () => {
    if (!currentDesignation) return;

    try {
      // Make sure to send the correct designation ID and updated name
      await axios.put(`http://localhost:5000/api/designations/${currentDesignation.id}`, {
        designationName: currentDesignation.designationName,
      });
      setIsEditModalOpen(false);
      fetchDesignations(); // Refresh the list after saving
    } catch (err) {
      console.error('Failed to save designation:', err);
    }
  };

  const handleExportClick = () => {
    const worksheet = XLSX.utils.json_to_sheet(designations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Designations');
    XLSX.writeFile(workbook, 'designations.xlsx');
  };

  const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Designation View</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', width: '100%', alignItems: 'center' }}>
        <input
          type="text"
          style={{ padding: '10px', fontSize: '16px', marginRight: '20px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
          placeholder="Search by ID or Designation"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          style={{ padding: '10px 20px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer', fontSize: '16px' }}
          onClick={handleExportClick}
        >
          Export
        </button>
        <button
          style={{ padding: '10px 20px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer', fontSize: '16px' }}
          onClick={handleAddNewClick}
        >
          Add New
        </button>
      </div>

      <table style={{ width: '100%', maxWidth: '800px', borderCollapse: 'collapse', textAlign: 'left', boxShadow: '0 4px 8px rgba(128, 128, 128, 0.5)' }}>
        <thead>
          <tr>
            <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Designation</th>
            <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {designations
            .filter((d) =>
              (d.designationName && d.designationName.toLowerCase().includes(searchTermLower)) ||
              (d.id && d.id.toLowerCase().includes(searchTermLower))
            )
            .map((designation) => (
              <tr key={designation.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{designation.id}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{designation.designationName}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
                  <button
                    style={{ padding: '8px 12px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    onClick={() => handleEditClick(designation)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isNewModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', textAlign: 'center' }}>
            <h2>New Designation</h2>
            <label>
              Designation ID:
              <input type="text" value={nextId} readOnly style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
            </label>
            <label>
              Designation:
              <input
                type="text"
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
              />
            </label>
            <div style={{ marginTop: '20px' }}>
              <button
                style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                onClick={handleSaveNewDesignation}
              >
                Save
              </button>
              <button
                style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                onClick={() => setIsNewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', textAlign: 'center' }}>
            <h2>Edit Designation</h2>
            <label>
              Designation ID:
              <input type="text" value={currentDesignation?.id} readOnly style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
            </label>
            <label>
              Designation:
              <input
                type="text"
                value={currentDesignation?.designationName || ''}
                onChange={(e) =>
                  setCurrentDesignation({ ...currentDesignation, designationName: e.target.value })
                }
                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
              />
            </label>
            <div style={{ marginTop: '20px' }}>
              <button
                style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#5D0E41', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
                onClick={() => setIsEditModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignationView;
