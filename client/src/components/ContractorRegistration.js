import React, { useState } from 'react';
import axios from 'axios';
import './ContractorRegistrationForm.css';

const ContractorRegistration = () => {
  const [formData, setFormData] = useState({
    contractorName: '',
    contactPerson: '',
    phoneNo: '',
    email: '',
    secondemail: '',
    thirdemail: '',
    fourthemail: '',
    address: '',
    aadhaarNo: '',
    pancardNo: '',
    wcPolicyNo: '',
    wcDate: '',
    wcValidDate: '',
    serviceType: '',
    serviceTaxNo: '',
    shopactLicence: '',
    shopactValidDate: '',
    labourLicenceNo: '',
    llIssueDate: '',
    llValidDate: '',
    bocwNo: '',
    bocwDate: '',
    bocwValidDate: '',
    rc: '',
    rcCount: '',
    pfNo: '',
    esicNo: '',
    mlwfNo: '',
    ptecNo: '',
    ptrcNo: '',
    buildingName: '',
    password: '',
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   Object.keys(formData).forEach((key) => {
  //     data.append(key, formData[key]);
  //   });

  //   files.forEach((file) => {
  //     data.append('documents', file);
  //   });

  //   try {
  //     await axios.post('http://localhost:5000/api/contractors/register', data);
  //     alert('Contractor registered successfully');
  //   } catch (error) {
  //     console.error('Error registering contractor:', error);
  //   }
  // };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData object
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
  
    // Append the files
    files.forEach((file) => {
      data.append('documents', file);
    });
  
    try {
      // Submit the form data
      await axios.post('http://localhost:5000/api/contractors/register', data);
  
      // Alert on successful registration
      alert('Contractor registered successfully');
  
      // Reset the form fields and files
      setFormData({}); // Assuming formData is managed via state
      setFiles([]); // Assuming files are managed via state
  
      // Optionally reset the form fields directly if using uncontrolled form inputs
      e.target.reset();
  
    } catch (error) {
      // Log and alert any errors
      console.error('Error registering contractor:', error);
      alert('Error registering contractor: ' + error.response.data.error);
    }
  };
  

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
  };

  return (
    <div className="contractor-form-container">
      <form onSubmit={handleSubmit} className="contractor-registration-form">
        {/* First Row - Contractor Name, Contact Person, Phone No */}
        <div className="form-group">
          <div>
            <label htmlFor="contractorName">Contractor Name:<span className="required">*</span></label>
            <input
              type="text"
              name="contractorName"
              value={formData.contractorName}
              onChange={handleChange}
              placeholder="Contractor Name"
              required
            />
          </div>

          <div>
            <label htmlFor="contactPerson">Contact Person:<span className="required">*</span></label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNo">Phone No:<span className="required">*</span></label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Phone No"
              required
            />
          </div>
        </div>

        <div className="email-row form-group">
  <div className="email-field">
    <label htmlFor="email">Email:<span className="required">*</span></label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email"
      required
    />
  </div>

  <div className="email-field">
    <label htmlFor="secondemail">Second Email:<span className="required">*</span></label>
    <input
      type="email"
      name="secondemail"
      value={formData.secondemail}
      onChange={handleChange}
      placeholder="Second Email"
      required
    />
  </div>

  <div className="email-field">
    <label htmlFor="thirdemail">Third Email:<span className="required">*</span></label>
    <input
      type="email"
      name="thirdemail"
      value={formData.thirdemail}
      onChange={handleChange}
      placeholder="Third Email"
      required
    />
  </div>
</div>

<div className="email-address-row form-group">
  <div className="email-field">
    <label htmlFor="fourthemail">Fourth Email:<span className="required">*</span></label>
    <input
      type="email"
      name="fourthemail"
      value={formData.fourthemail}
      onChange={handleChange}
      placeholder="Fourth Email"
      required
    />
  </div>

  <div className="address-field">
    <label htmlFor="address">Address:<span className="required">*</span></label>
    <textarea
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Enter Address"
      required
    />
  </div>
</div>

        {/* Fourth Row - Aadhaar No, Aadhar Card Front, Aadhar Card Back */}
        <div className="form-group">
  <div>
    <label htmlFor="aadhaarNo">Aadhaar No:</label> {/* Removed required asterisk */}
    <input
      type="text"
      name="aadhaarNo"
      value={formData.aadhaarNo}
      onChange={handleChange}
      placeholder="Aadhaar No"
      // Removed required prop
    />
  </div>

  <div>
    <label htmlFor="Aadharcardfront">Aadhar Card Front:</label> {/* Removed required asterisk */}
    <input type="file" name="Aadharcardfront" onChange={handleFileChange} />
  </div>

  <div>
    <label htmlFor="Aadharcardback">Aadhar Card Back:</label> {/* Removed required asterisk */}
    <input type="file" name="Aadharcardback" onChange={handleFileChange} />
  </div>
</div>

        {/* Fifth Row - Pancard No, WC Policy No, WC Start Date */}
        <div className="form-group">
          <div>
            <label htmlFor="pancardNo">Pancard No:</label>
            <input
              type="text"
              name="pancardNo"
              value={formData.pancardNo}
              onChange={handleChange}
              placeholder="Pancard No"
              required
            />
          </div>

          <div>
            <label htmlFor="wcPolicyNo">WC Policy No:</label>
            <input
              type="text"
              name="wcPolicyNo"
              value={formData.wcPolicyNo}
              onChange={handleChange}
              placeholder="WC Policy No"
            />
          </div>

          <div>
            <label htmlFor="wcDate">WC Start Date:</label>
            <input
              type="date"
              name="wcDate"
              value={formData.wcDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Sixth Row - WC Expiry Date, Service Type, Service Tax No */}
        <div className="form-group">
          <div>
            <label htmlFor="wcValidDate">WC Expiry Date:</label>
            <input
              type="date"
              name="wcValidDate"
              value={formData.wcValidDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="serviceType">Service Type:</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              placeholder="Service Type"
            />
          </div>

          <div>
            <label htmlFor="serviceTaxNo">Service Tax No:</label>
            <input
              type="text"
              name="serviceTaxNo"
              value={formData.serviceTaxNo}
              onChange={handleChange}
              placeholder="Service Tax No"
            />
          </div>
        </div>

        {/* Seventh Row - Shopact Licence, Shopact Expiry Date, Labour Licence No */}
        <div className="form-group">
          <div>
            <label htmlFor="shopactLicence">Shopact Licence:</label>
            <input
              type="text"
              name="shopactLicence"
              value={formData.shopactLicence}
              onChange={handleChange}
              placeholder="Shopact Licence"
            />
          </div>

          <div>
            <label htmlFor="shopactValidDate">Shopact Expiry Date:</label>
            <input
              type="date"
              name="shopactValidDate"
              value={formData.shopactValidDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="labourLicenceNo">Labour Licence No:</label>
            <input
              type="text"
              name="labourLicenceNo"
              value={formData.labourLicenceNo}
              onChange={handleChange}
              placeholder="Labour Licence No"
            />
          </div>
        </div>

        {/* Eighth Row - LL Start Date, LL Expiry Date, BOCW No */}
        <div className="form-group">
          <div>
            <label htmlFor="llIssueDate">LL Start Date:</label>
            <input
              type="date"
              name="llIssueDate"
              value={formData.llIssueDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="llValidDate">LL Expiry Date:</label>
            <input
              type="date"
              name="llValidDate"
              value={formData.llValidDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="bocwNo">BOCW No:</label>
            <input
              type="text"
              name="bocwNo"
              value={formData.bocwNo}
              onChange={handleChange}
              placeholder="BOCW No"
            />
          </div>
        </div>

        {/* Ninth Row - BOCW Start Date, BOCW Expiry Date, RC */}
        <div className="form-group">
          <div>
            <label htmlFor="bocwDate">BOCW Start Date:</label>
            <input
              type="date"
              name="bocwDate"
              value={formData.bocwDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="bocwValidDate">BOCW Expiry Date:</label>
            <input
              type="date"
              name="bocwValidDate"
              value={formData.bocwValidDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="rc">RC:</label>
            <input
              type="text"
              name="rc"
              value={formData.rc}
              onChange={handleChange}
              placeholder="RC"
            />
          </div>
        </div>

        {/* Tenth Row - RC Count, PF Establishment Code, ESIC Establishment Code */}
        <div className="form-group">
          <div>
            <label htmlFor="rcCount">RC Count:</label>
            <input
              type="text"
              name="rcCount"
              value={formData.rcCount}
              onChange={handleChange}
              placeholder="RC Count"
            />
          </div>

          <div>
            <label htmlFor="pfNo">PF Establishment Code:</label>
            <input
              type="text"
              name="pfNo"
              value={formData.pfNo}
              onChange={handleChange}
              placeholder="PF Establishment Code"
            />
          </div>

          <div>
            <label htmlFor="esicNo">ESIC Establishment Code:</label>
            <input
              type="text"
              name="esicNo"
              value={formData.esicNo}
              onChange={handleChange}
              placeholder="ESIC Establishment Code"
            />
          </div>
        </div>

        {/* Eleventh Row - MLWF No, PTEC No, PTRC No */}
        <div className="form-group">
          <div>
            <label htmlFor="mlwfNo">MLWF No:</label>
            <input
              type="text"
              name="mlwfNo"
              value={formData.mlwfNo}
              onChange={handleChange}
              placeholder="MLWF No"
            />
          </div>

          <div>
            <label htmlFor="ptecNo">PTEC No:</label>
            <input
              type="text"
              name="ptecNo"
              value={formData.ptecNo}
              onChange={handleChange}
              placeholder="PTEC No"
            />
          </div>

          <div>
            <label htmlFor="ptrcNo">PTRC No:</label>
            <input
              type="text"
              name="ptrcNo"
              value={formData.ptrcNo}
              onChange={handleChange}
              placeholder="PTRC No"
            />
          </div>
        </div>

        {/* Twelfth Row - Building Name, File Uploads */}
        <div className="form-group">
          <div>
            <label htmlFor="buildingName">Building Name:</label>
            <input
              type="text"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
              placeholder="Building Name"
            />
          </div>

          <div>
            <label htmlFor="
            ">Upload Shop Act License:</label>
            <input type="file" name="shopActLicense" onChange={handleFileChange} />
          </div>

          <div>
            <label htmlFor="providentFundCode">Provident Fund Code Letter:</label>
            <input type="file" name="providentFundCode" onChange={handleFileChange} />
          </div>
        </div>

        {/* File Upload Row - More Documents */}
        <div className="form-group">
          <div>
            <label htmlFor="esicCodeLetter">ESIC Code Letter:</label>
            <input type="file" name="esicCodeLetter" onChange={handleFileChange} />
          </div>

          <div>
            <label htmlFor="ptecPtrcCode">PTEC and PTRC Code Letter:</label>
            <input type="file" name="ptecPtrcCode" onChange={handleFileChange} />
          </div>

          <div>
            <label htmlFor="mlwfCodeLetter">MLWF Code Letter:</label>
            <input type="file" name="mlwfCodeLetter" onChange={handleFileChange} />
          </div>
        </div>

        <div className="form-group">
          <div>
            <label htmlFor="bocwLicense">BOCW License:</label>
            <input type="file" name="bocwLicense" onChange={handleFileChange} />
          </div>

          <div>
            <label htmlFor="labourLicense">Labour License:</label>
            <input type="file" name="labourLicense" onChange={handleFileChange} />
          </div>

          <div>
            <label htmlFor="wcPolicy">WC Policy:</label>
            <input type="file" name="wcPolicy" onChange={handleFileChange} />
          </div>
        </div>
        <div className="form-group password-group">
  <label htmlFor="password" >Password:<span className="required">*</span></label>
  <input
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Password"
    required
  />
  <button type="button" id="generatePasswordBtn" onClick={generatePassword}>
    Generate Password
  </button>
</div>


        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContractorRegistration;
