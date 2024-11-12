// src/components/WeeklyOffForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './WeeklyOffForm.css'; // Import the CSS file

const WeeklyOffForm = () => {
  const [weekOffDay, setWeekOffDay] = useState('');
  const [weekOffValue, setWeekOffValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", { weekOffDay, weekOffValue }); // Debugging
    try {
      const response = await axios.post('http://localhost:5000/api/weekoff/add', {
        weekOffDay,
        weekOffValue
      });
      alert(response.data.message);
      setWeekOffDay('');
      setWeekOffValue('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Week Off Day Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="weekOffDay" className="form-label">Week Off Day:</label>
          <input
            type="date"
            className="form-control"
            id="weekOffDay"
            value={weekOffDay}
            onChange={(e) => setWeekOffDay(e.target.value)}
            placeholder="Select the week off day"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weekOffValue" className="form-label">Week Off Value:</label>
          <textarea
            className="form-control"
            id="weekOffValue"
            value={weekOffValue}
            onChange={(e) => setWeekOffValue(e.target.value)}
            placeholder="Enter details for the week off value"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-danger">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default WeeklyOffForm;
