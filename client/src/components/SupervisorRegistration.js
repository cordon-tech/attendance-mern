import React, { useState } from 'react';
import './SupervisorRegistration.css'; // Importing your uploaded CSS

const SupervisorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    contactNumber: '',
    emailAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    aadharNumber: '',
    aadharFrontUpload: null,
    aadharBackUpload: null,
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false); 
 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    const response = await fetch('http://localhost:5000/api/ams', {
      method: 'POST',
      body: formDataToSend,
    });



    if (response.ok) {
      alert('Supervisor registered successfully!');
    } else {
      alert('Error registering supervisor');
    }
  };

  // const togglePasswordVisibility = () => {
  //   const passwordInput = document.getElementById('password');
  //   const eyeIcon = document.getElementById('togglePasswordIcon');
  //   if (passwordInput.type === 'password') {
  //     passwordInput.type = 'text';
  //     eyeIcon.classList.remove('bi-eye');
  //     eyeIcon.classList.add('bi-eye-slash');
  //   } else {
  //     passwordInput.type = 'password';
  //     eyeIcon.classList.remove('bi-eye-slash');
  //     eyeIcon.classList.add('bi-eye');
  //   }
  // };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const generatePassword = () => {
    const generatedPassword = Math.random().toString(36).slice(-8);
    setFormData({ ...formData, password: generatedPassword });
  };

  return (
    <div>
    

      <div className="container-fluid header">
        <h1>Supervisor Registration</h1>
      </div>

      <div className="container">
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="fullName" className="form-label">
                <b>Full Name</b><span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">
                <b>Gender</b><span className="required">*</span>
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="dob" className="form-label">
                <b>Date of Birth</b><span className="required">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="contactNumber" className="form-label">
                <b>Contact Number</b><span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="emailAddress" className="form-label">
                <b>Email Address</b><span className="required">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="aadharNumber" className="form-label">
                <b>Aadhar Number</b><span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                pattern="[0-9]{12}"
                title="Please enter a valid 12-digit Aadhar number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="street" className="form-label">
                <b>Street</b><span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="city" className="form-label">
                <b>City</b><span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="state" className="form-label">
                <b>State</b><span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="zipCode" className="form-label">
                <b>Zip Code</b><span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                pattern="[0-9]{5,6}"
                title="Please enter a valid zip code"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="aadharFrontUpload" className="form-label">
                <b>Aadhar Card Front Upload</b><span className="">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                id="aadharFrontUpload"
                name="aadharFrontUpload"
                onChange={handleChange}
                accept="image/*"

              />
            </div>

            <div className="form-group  col-md-6 mb-3">
              <label htmlFor="aadharBackUpload" className="form-label">
                <b>Aadhar Card Back Upload</b><span className="">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                id="aadharBackUpload"
                name="aadharBackUpload"
                onChange={handleChange}
                accept="image/*"

              />
            </div>
          </div>

          {/* <div className="form-row">
            <div className="form-group col-md-6 mb-3 password-container">
              <label htmlFor="password" className="form-label">
                <b>Password</b><span className="required">*</span>
              </label>
              <div className="input-group">
                <input

                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter or generate a password"
                />
              </div>
              <button type="button" className="btn btn-secondary mt-2" onClick={generatePassword}>
                Generate Password
              </button>
            </div>
          </div> */}

<div className="form-row">
      <div className="form-group col-md-6 mb-3 password-container">
        <label htmlFor="password" className="form-label">
          <b>Password</b><span className="required">*</span>
        </label>
        <div className="input-group">
          <input
            type={passwordVisible ? 'text' : 'password'} // Toggle input type between text and password
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter or generate a password"
          />
          <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
            {passwordVisible ? '👁️' : '👁️‍🗨️'} 
          </span>
        </div>
        <button type="button" className="btn btn-secondary mt-2" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
          <button type="submit" className="btn btn-success mt-3" id="submitButton">Submit</button>
        </form>
      </div >
    </div >

  );
};

export default SupervisorRegistration;
