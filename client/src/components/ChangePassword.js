// import React, { useState } from 'react';
// import axios from 'axios';

// const ChangePassword = () => {
//   const [userId, setUserId] = useState('');
//   const [selectedType, setSelectedType] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false);

//   // Handle ID Input Change
//   const handleIdChange = (e) => {
//     setUserId(e.target.value);
//   };

//   // Handle Password Change and Matching
//   const handlePasswordChange = (e) => {
//     setNewPassword(e.target.value);
//     setIsButtonEnabled(e.target.value === confirmPassword);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//     setIsButtonEnabled(e.target.value === newPassword);
//   };

//   // Toggle Password Visibility
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   // Handle Type Selection with Validation
//   const handleTypeSelection = (type) => {
//     if (
//       (userId.startsWith('1') && type !== 'Admin') ||
//       (userId.startsWith('2') && type !== 'Supervisor') ||
//       (userId.startsWith('3') && type !== 'Contractor')
//     ) {
//       alert('Please select the valid ID');
//       return;
//     }
//     setSelectedType(type);
//   };

//   // Submit Password Change
//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/user/change-password', {
//         userId,
//         userType: selectedType,
//         newPassword
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("Failed to change password.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//       <h2 style={{ textAlign: 'center' }}>Change Password</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label>Enter ID:</label>
//         <input
//           type="text"
//           placeholder="Enter ID (Contractor, Supervisor, or Admin)"
//           value={userId}
//           onChange={handleIdChange}
//           style={{ width: '95%', padding: '10px', border: '1px solid #5D0E41', borderRadius: '4px', marginTop: '5px' }}
//         />
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label>Type of ID:</label>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
//           {['Admin','Contractor', 'Supervisor'].map((type) => (
//             <button
//               key={type}
//               onClick={() => handleTypeSelection(type)}
//               style={{
//                 width: '30%',
//                 padding: '10px',
//                 backgroundColor: selectedType === type ? '#5D0E41' : '#ccc',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer'
//               }}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label>Enter New Password:</label>
//         <input
//           type={passwordVisible ? 'text' : 'password'}
//           placeholder="Enter New Password"
//           value={newPassword}
//           onChange={handlePasswordChange}
//           style={{ width: '95%', padding: '10px', border: '1px solid #5D0E41', borderRadius: '4px', marginTop: '5px' }}
//         />
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label>Confirm New Password:</label>
//         <input
//           type={passwordVisible ? 'text' : 'password'}
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={handleConfirmPasswordChange}
//           style={{ width: '95%', padding: '10px', border: '1px solid #5D0E41', borderRadius: '4px', marginTop: '5px' }}
//         />
//       </div>

//       {/* <button onClick={togglePasswordVisibility} style={{ float: 'right', color: '#5a005a', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
//         {passwordVisible ? 'visibility_off' : 'visibility'}
//       </button> */}

//       <button
//         onClick={handleSubmit}
//         disabled={!isButtonEnabled || !selectedType}
//         style={{
//           width: '95%',
//           padding: '12px',
//           backgroundColor: isButtonEnabled && selectedType ? '#5D0E41' : '#ccc',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           textAlign:'center',
//           marginLeft:'10px ',
//           cursor: isButtonEnabled && selectedType ? 'pointer' : 'not-allowed'
//         }}
//       >
//         Change Password
//       </button>
//     </div>
//   );
// };

// export default ChangePassword;
import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Handle ID Input Change and Determine User Type
  const handleIdChange = (e) => {
    const id = e.target.value;
    setUserId(id);

    // Determine user type based on ID
    if (id.startsWith('1')) {
      setUserType('Admin');
    } else if (id.startsWith('2')) {
      setUserType('Supervisor');
    } else if (id.startsWith('3')) {
      setUserType('Contractor');
    } else {
      setUserType('');
    }
  };

  // Handle Password Change and Matching
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setIsButtonEnabled(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsButtonEnabled(e.target.value === newPassword);
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Submit Password Change
//   const handleSubmit = async () => {
//     if (!userType) {
//       alert('Please enter a valid ID.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/user/change-password', {
//         userId,
//         userType,
//         newPassword
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("Failed to change password.");
//     }
//   };
const handleSubmit = async () => {
    if (!userType) {
      alert('Please enter a valid ID.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/user/change-password', {
        userId,
        userType,
        newPassword
      });
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Show custom error message from backend
      } else {
        alert("Failed to change password.");
      }
    }
  };
  

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Change Password</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Enter ID:</label>
        <input
          type="text"
          placeholder="Enter ID (Contractor, Supervisor, or Admin)"
          value={userId}
          onChange={handleIdChange}
          style={{ width: '95%', padding: '10px', border: '1px solid #5a005a', borderRadius: '4px', marginTop: '5px' }}
        />
        {userType && (
          <p style={{ color: '#5a005a', marginTop: '10px', fontWeight: 'bold' }}>
            User Type: {userType}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Enter New Password:</label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Enter New Password"
          value={newPassword}
          onChange={handlePasswordChange}
          style={{ width: '95%', padding: '10px', border: '1px solid #5a005a', borderRadius: '4px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Confirm New Password:</label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          style={{ width: '95%', padding: '10px', border: '1px solid #5a005a', borderRadius: '4px', marginTop: '5px' }}
          
        />
       
      </div>

      <button onClick={togglePasswordVisibility} style={{ float: 'right', color: '#5a005a', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
        {passwordVisible ? 'visibility_off' : 'visibility'}
      </button>

      <button
        onClick={handleSubmit}
        disabled={!isButtonEnabled || !userType}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: isButtonEnabled && userType ? '#5a005a' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isButtonEnabled && userType ? 'pointer' : 'not-allowed'
        }}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
