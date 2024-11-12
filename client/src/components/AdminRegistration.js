import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminRegistration() {
  const [adminData, setAdminData] = useState({
    projectName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    password: '',
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false); // state to control visibility
  const navigate = useNavigate();


  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setAdminData({ ...adminData, password: randomPassword });
    // Show the password input and submit button
    setShowPasswordFields(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/ams/ams/adminMaster/registerAdmin', adminData);
      alert('Admin registered successfully');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error === 'Admin is already registered') {
        alert('Admin is already registered');  // Show alert if admin is already registered
      } else {
        console.error('Error during registration:', err);
        alert('Error registering admin');
      }
    }
  };
  const handleLoginRedirect = () => {
    navigate('/login');  // This will redirect to the Login component
  };
  


  return (
    
<div className="container mt-5">
  <h1 className="text-center mb-4" style={{ fontWeight: 'bold',textAlign:'center' }}>Admin Registration</h1>
  <div className="container"
       style={{
         border: '1px solid black',
         padding: '20px',
         maxWidth: '400px',
         borderRadius: '10px',
         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
         backgroundColor: '#ffffff',
         margin: '0 auto'
       }}>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="projectName" className="form-label" style={{ display: 'block', fontWeight: 'bold' }}>
         Project Name<span className="text-danger" style={{color:'red'}}>*</span>
       </label>
       <input type="text" id="projectName" name="projectName" className="form-control" style={{width:'90%',padding:'10px'}} value={adminData.projectName} onChange={handleChange} required />
    </div>
   

    <div className="mb-3">
        <label htmlFor="firstName" className="form-label " style={{ display:'block', textAlign: 'left', fontWeight: 'bold',marginTop:'20px' }}>
          First Name<span className="text-danger" style={{color:'red',marginTop:'20px'}}>*</span>
        </label>
        <input type="text" id="firstName" name="firstName" className="form-control" style={{width:'90%',padding:'10px',marginTop:'10px'}} value={adminData.firstName} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="middleName" className="form-label d-block" style={{display:'block', textAlign: 'left', fontWeight: 'bold',marginTop:'20px' }}>
          Middle Name<span className="text-danger" style={{color:'red'}}>*</span>
        </label>
        <input type="text" id="middleName" name="middleName" className="form-control" style={{width:'90%',padding:'10px',marginTop:'10px'}} value={adminData.middleName} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" name="lastName" className="form-label d-block" style={{display:'block', textAlign: 'left', fontWeight: 'bold',marginTop:'20px' }}>
          Last Name<span className="text-danger" style={{color:'red'}}>*</span>
        </label>
        <input type="text" id="lastName" name="lastName" className="form-control" style={{width:'90%',padding:'10px',marginTop:'10px'}} value={adminData.lastName} onChange={handleChange} required />
      </div>

      <button type="button" className="btn btn-primary w-100 mb-3 mt-3"
              style={{ backgroundColor: '#5D0E41',color:'white', borderColor: 'black', fontWeight: 'bold',width:'90%',padding:'10px',marginTop: '20px',marginLeft:'10px' }}
              onClick={generatePassword}>Generate Password</button>
 {showPasswordFields && (
            <>
      <div className="mb-3">
        <label htmlFor="password" className="form-label d-block" style={{display:'block', textAlign: 'left', fontWeight: 'bold',marginTop:'10px' }}>
          Password
        </label>
        <input type="text" id="password" name="password" className="form-control" style={{width:'90%',padding:'10px',marginTop:'10px'}} value={adminData.password} readOnly />
      </div>

      <button type="submit" className="btn btn-success w-100" 
              style={{ fontWeight: 'bold',backgroundColor: '#5D0E41',color:'white', borderColor: 'black',width:'90%',padding:'10px',marginTop: '10px',marginBottom:'10px',marginLeft:'10px' }}>Submit</button>
              </>
          )}
      <button
      type="button"
      className="btn btn-primary w-100 mb-3 mt-3"
      style={{ backgroundColor: '#5D0E41', color: 'white', borderColor: 'black', fontWeight: 'bold', width: '90%', padding: '10px', marginTop: '20px', marginLeft: '10px' }}
      onClick={handleLoginRedirect}  // Trigger redirect on button click
    >
      Login
    </button>
    </form>
  </div>
</div>

  );
}

export default AdminRegistration;
