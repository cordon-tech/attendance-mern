import React, { useState } from 'react';
import axios from 'axios';
import './AdvanceRegister.css';

const AdvanceForm = () => {
  const [formData, setFormData] = useState({
    workerId: '',
    nameOfWorkman: '',
    dateOfAdvance: '',
    wagesPeriods: '',
    wagesPayable: '',
    advanceAmount: '',
    advancePurpose: '',
    installmentNumber: '',
    dateOfInstallment: '',
    installmentAmount: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Submitting data:", formData); // Log form data
      const response = await axios.post('http://localhost:5000/api/advance', formData);
      console.log(response.data); // Log the success response
      // Handle successful submission (e.g., clear form, show success message)
    } catch (error) {
      if (error.response) {
        // Log detailed error response from server
        console.error("Server responded with error:", error.response.data);
        alert(`Error: ${error.response.data.message || 'Error submitting form'}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Error: No response received from server");
      } else {
        console.error("Error in request setup:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div className="registration" style={{ marginTop: 20, fontWeight: 'bold', fontSize: 26, textAlign: 'center' }}>
      <h1>Register of Advance</h1>
      <form onSubmit={handleSubmit} id="AdvanceForm">
        {/** Form Fields */}
        {['workerId', 'nameOfWorkman', 'wagesPeriods', 'wagesPayable', 'advanceAmount', 'advancePurpose', 'installmentNumber', 'installmentAmount', 'remarks'].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input type="text" id={field} name={field} value={formData[field]} onChange={handleChange} required />
          </div>
        ))}

        {/** Date Fields */}
        <div className="form-group">
          <label htmlFor="dateOfAdvance">Date Of Advance:</label>
          <input type="date" id="dateOfAdvance" name="dateOfAdvance" value={formData.dateOfAdvance} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfInstallment">Date of Each Installment Repaid:</label>
          <input type="date" id="dateOfInstallment" name="dateOfInstallment" value={formData.dateOfInstallment} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success mt-3">Submit</button>
      </form>
    </div>
  );
};

export default AdvanceForm;
