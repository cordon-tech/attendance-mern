// import React, { useState } from 'react';
// import axios from 'axios';

// const Overtime = () => {
//   const [formData, setFormData] = useState({
//     employeeId: '',
//     employeeName: '',
//     fatherHusbandName: '',
//     gender: '',
//     designation: '',
//     dateOfOvertime: '',
//     totalOvertimeWorked: '',
//     normalRateOfWages: '',
//     overtimeRateOfWages: '',
//     overtimeEarnings: '',
//     dateOfOvertimePaid: '',
//     remarks: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/overtime/create', formData);
//       console.log('Overtime Entry Created:', res.data);
//       alert('Overtime entry created successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Error creating overtime entry');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Employee ID:</label>
//         <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Name of the Employee:</label>
//         <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Father's/Husband's Name:</label>
//         <input type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Gender:</label>
//         <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Designation:</label>
//         <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Date on which Overtime worked:</label>
//         <input type="date" name="dateOfOvertime" value={formData.dateOfOvertime} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Total overtime worked or production:</label>
//         <input type="number" name="totalOvertimeWorked" value={formData.totalOvertimeWorked} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Normal rate of wages:</label>
//         <input type="number" name="normalRateOfWages" value={formData.normalRateOfWages} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Overtime rate of wages:</label>
//         <input type="number" name="overtimeRateOfWages" value={formData.overtimeRateOfWages} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Overtime Earnings:</label>
//         <input type="number" name="overtimeEarnings" value={formData.overtimeEarnings} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Date on which overtime wages paid:</label>
//         <input type="date" name="dateOfOvertimePaid" value={formData.dateOfOvertimePaid} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Remarks:</label>
//         <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Overtime;




import React, { useState } from 'react';
import axios from 'axios';

const Overtime = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    fatherHusbandName: '',
    gender: '',
    designation: '',
    dateOfOvertime: '',
    totalOvertimeWorked: '',
    normalRateOfWages: '',
    overtimeRateOfWages: '',
    overtimeEarnings: '',
    dateOfOvertimePaid: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post('http://localhost:5000/api/overtime/create', formData);
      console.log('Overtime Entry Created:', res.data);
      alert(`Overtime Entry Created: ${JSON.stringify(res.data)}`);
    } catch (err) {
      console.error(err);
      alert('Error creating overtime entry');
    }
  };

  return (
    
    
    <div style={{
      width: '50%',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
    }}><h1 style={{
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333'
    }}>
      Register of Overtime
    </h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Employee ID:
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Name of the Employee:
          </label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Father's/Husband's Name:
          </label>
          <input
            type="text"
            name="fatherHusbandName"
            value={formData.fatherHusbandName}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Gender:
          </label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Designation/Nature of Employment:
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Date on which Overtime worked:
          </label>
          <input
            type="date"
            name="dateOfOvertime"
            value={formData.dateOfOvertime}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Total overtime worked or production:
          </label>
          <input
            type="number"
            name="totalOvertimeWorked"
            value={formData.totalOvertimeWorked}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Normal rate of wages:
          </label>
          <input
            type="number"
            name="normalRateOfWages"
            value={formData.normalRateOfWages}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Overtime rate of wages:
          </label>
          <input
            type="number"
            name="overtimeRateOfWages"
            value={formData.overtimeRateOfWages}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Overtime Earnings:
          </label>
          <input
            type="number"
            name="overtimeEarnings"
            value={formData.overtimeEarnings}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Date on which overtime wages paid:
          </label>
          <input
            type="date"
            name="dateOfOvertimePaid"
            value={formData.dateOfOvertimePaid}
            onChange={handleChange}
            required
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
            Remarks:
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              resize: 'vertical'
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            backgroundColor: '#333',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#555')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#333')}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Overtime;
