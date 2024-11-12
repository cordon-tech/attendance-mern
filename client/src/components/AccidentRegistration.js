import React, { useState } from 'react';
import axios from 'axios';
import './RegisterAccident.css';

const AccidentRegistration = () => {
  const [formData, setFormData] = useState({
    WorkerID: '',
    nameInjured: '',
    dateAccident: '',
    dateReport: '',
    natureAccident: '',
    dateReturn: '',
    daysAbsent: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/accidents', formData);
      alert('Form submitted successfully!');
      setFormData({
        WorkerID: '',
        nameInjured: '',
        dateAccident: '',
        dateReport: '',
        natureAccident: '',
        dateReturn: '',
        daysAbsent: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Register of Accident and Dangerous Occurrence</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type={key.includes('date') ? 'date' : key.includes('daysAbsent') ? 'number' : 'text'}
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

export default AccidentRegistration;
