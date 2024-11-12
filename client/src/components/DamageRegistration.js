import React, { useState } from 'react';
import axios from 'axios';
import './damageRegistration.css'; // Ensure this matches your CSS file location

const DamageRegistration = () => {
  const [formData, setFormData] = useState({
    workerID: '',
    workerName: '',
    particularsOfDamage: '',
    dateOfDamage: '',
    showedCause: '',
    personInPresence: '',
    amountOfDeduction: '',
    numOfInstallments: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/damage', formData);
      alert('Form submitted successfully!');
      setFormData({
        workerID: '',
        workerName: '',
        particularsOfDamage: '',
        dateOfDamage: '',
        showedCause: '',
        personInPresence: '',
        amountOfDeduction: '',
        numOfInstallments: '',
        remarks: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Damage Registration</h1>
      <form id="damageForm" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={key.includes('date') ? 'date' : key.includes('amount') || key.includes('num') ? 'number' : 'text'}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn-custom">Submit</button>
      </form>
    </div>
  );
};

export default DamageRegistration;
