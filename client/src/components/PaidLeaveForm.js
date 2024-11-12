

// src/components/PaidLeaveForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaidLeaveForm = () => {
  const [leaveDay, setLeaveDay] = useState('');
  const [leaveValue, setLeaveValue] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Update button state when either leaveDay or leaveValue changes
  useEffect(() => {
    setIsButtonEnabled(leaveDay !== '' && leaveValue !== '');
  }, [leaveDay, leaveValue]);

  // Handle Leave Day Change
  const handleLeaveDayChange = (e) => {
    setLeaveDay(e.target.value);
  };

  // Handle Leave Value Change
  const handleLeaveValueChange = (e) => {
    setLeaveValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/paid-leave', {
        leaveDay,
        leaveValue,
      });
      alert(response.data.message);
      setLeaveDay('');
      setLeaveValue('');
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Show custom error message from backend
      } else {
        alert("Failed to submit leave form.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Paid Leave Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Paid Leave Day:</label>
          <input
            type="date"
            value={leaveDay}
            onChange={handleLeaveDayChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #5a005a',
              borderRadius: '4px',
              marginTop: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Paid Leave Value:</label>
          <textarea
            value={leaveValue}
            onChange={handleLeaveValueChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #5a005a',
              borderRadius: '4px',
              marginTop: '5px',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!isButtonEnabled}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isButtonEnabled ? '#5a005a' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaidLeaveForm;
