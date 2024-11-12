

// export default SupervisorDashboard;
// This code is ok for contractor,worker and attendance

// import React, { useState, useEffect } from 'react';
// import './SupervisorDashboard.css';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const SupervisorDashboard = () => {
//   const [dropdown, setDropdown] = useState(null);
//   const [counts, setCounts] = useState({ workerCount: 0, contractorCount: 0, presentCount: 0 });
//   const [hoveredCard, setHoveredCard] = useState(null); // To track which card is hovered
//   const [showModal, setShowModal] = useState(false); // State to handle modal visibility
//   const [selectedDate, setSelectedDate] = useState(''); // State to handle the selected date

//   const toggleDropdown = (menu) => {
//     setDropdown(dropdown === menu ? null : menu);
//   };

//   // Fetch counts from the API
//   const fetchCounts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/counts');
//       if (!response.ok) {
//         throw new Error('Failed to fetch counts');
//       }
//       const data = await response.json();
//       setCounts(data);
//     } catch (error) {
//       console.error('Error fetching counts:', error);
//     }
//   };

//   const fetchAttendanceCountByDate = async (selectedDate) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/attendance-count?date=${selectedDate}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch attendance count');
//       }
//       const data = await response.json();
//       console.log('Attendance count for the selected date:', data.count);
//       setCounts((prevCounts) => ({ ...prevCounts, presentCount: data.count }));
//     } catch (error) {
//       console.error('Error fetching attendance count:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCounts();
//     const interval = setInterval(fetchCounts, 60000); // Fetch every minute for real-time updates
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const handleDateSubmit = (e) => {
//     e.preventDefault();
//     console.log('Selected date:', selectedDate);
//     fetchAttendanceCountByDate(selectedDate);
//     setShowModal(false); // Close the modal after submission
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="navbar">
//         <nav className="navbar-nav">
//           <ul>
//             <li>Supervisor Dashboard</li>
//             <li onClick={() => toggleDropdown('master')}>
//               Master <span className="arrow">&#9662;</span>
//               {dropdown === 'master' && (
//                 <ul className="dropdown">
//                   <li><Link to="/hello">Contractor Master</Link></li>
//                   <li><Link to="/hello">Worker Master</Link></li>
//                   <li><Link to="/hello">Attendance Master</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li onClick={() => toggleDropdown('registration')}>
//               Registration Form <span className="arrow">&#9662;</span>
//               {dropdown === 'registration' && (
//                 <ul className="dropdown">
//                   <li><Link to="/contractor-register">Contractor Registration Form</Link></li>
//                   <li><Link to="/hello">Worker Registration Form</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li onClick={() => toggleDropdown('reports')}>
//               Reports <span className="arrow">&#9662;</span>
//               {dropdown === 'reports' && (
//                 <ul className="dropdown">
//                   <li><Link to="/hello">90 Days Form</Link></li>
//                   <li><Link to="/hello">Worker Id Card</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li onClick={() => toggleDropdown('kyc')}>
//               KYC <span className="arrow">&#9662;</span>
//               {dropdown === 'kyc' && (
//                 <ul className="dropdown">
//                   <li><Link to="/hello">Contractor KYC</Link></li>
//                   <li><Link to="/hello">Worker KYC</Link></li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </header>

//       <div className="dashboard-content">
//         <div
//           className="dashboard-card"
//           onMouseEnter={() => setHoveredCard('contractor')}
//           onMouseLeave={() => setHoveredCard(null)}
//         >
//           <div className="icon">
//             <img src="https://imgpanda.com/upload/ib/Q4tSh2ctkH.png" alt="Contractor Icon" />
//           </div>
//           <h3>Contractor Count</h3>
//           <p>{counts.contractorCount}</p>
//           {hoveredCard === 'contractor' && (
//             <div className="hover-box">
//               <Link to="/hello">Contractor Details</Link>
//             </div>
//           )}
//         </div>

//         <div
//           className="dashboard-card"
//           onMouseEnter={() => setHoveredCard('worker')}
//           onMouseLeave={() => setHoveredCard(null)}
//         >
//           <div className="icon">
//             <img src="https://imgpanda.com/upload/ib/1yIWjyG41o.png" alt="Supervisor Icon" />
//           </div>
//           <h3>Worker Count</h3>
//           <p>{counts.workerCount}</p>
//           {hoveredCard === 'worker' && (
//             <div className="hover-box">
//               <Link to="/">Worker Details</Link>
//             </div>
//           )}
//         </div>

//         <div
//           className="dashboard-card"
//           onMouseEnter={() => setHoveredCard('attendance')}
//           onMouseLeave={() => setHoveredCard(null)}
//           onClick={() => setShowModal(true)} // Show the modal when clicked
//         >
//           <div className="icon">
//             <img
//               src="https://imgpanda.com/upload/ib/YQdOwN6IDJ.png"
//               alt="Worker Icon"
//               title="Check Attendance Date Wise" // Tooltip on hover
//             />
//           </div>
//           <h3>Today's Worker Count</h3>
//           <p>{counts.presentCount}</p>
//           {hoveredCard === 'attendance' && (
//             <div className="hover-box">
//               <Link to="/hello">Attendance Details</Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal for date selection */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Date</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleDateSubmit}>
//             <div className="mb-3">
//               <label htmlFor="date" className="form-label">Select Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="d-flex justify-content-end">
//               <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">Close</Button>
//               <Button type="submit" variant="primary">Submit</Button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default SupervisorDashboard;


// export default SupervisorDashboard;
// Proper ok running code

// import React, { useState, useEffect } from 'react';
// import './SupervisorDashboard.css';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const SupervisorDashboard = () => {
//   const [dropdown, setDropdown] = useState(null);
//   const [counts, setCounts] = useState({ workerCount: 0, contractorCount: 0, presentCount: 0 });
//   const [showModal, setShowModal] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');

//   const toggleDropdown = (menu) => {
//     setDropdown(dropdown === menu ? null : menu);
//   };

//   // Fetch counts from the API
//   const fetchCounts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/counts');
//       if (!response.ok) {
//         throw new Error('Failed to fetch counts');
//       }
//       const data = await response.json();
//       setCounts(data);
//     } catch (error) {
//       console.error('Error fetching counts:', error);
//     }
//   };

//   const fetchAttendanceCountByDate = async (selectedDate) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/attendance-count?date=${selectedDate}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch attendance count');
//       }
//       const data = await response.json();
//       console.log('Attendance count for the selected date:', data.count);
//       setCounts((prevCounts) => ({ ...prevCounts, presentCount: data.count }));
//     } catch (error) {
//       console.error('Error fetching attendance count:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCounts();
//     const interval = setInterval(fetchCounts, 60000); // Fetch every minute for real-time updates
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const handleDateSubmit = (e) => {
//     e.preventDefault();
//     console.log('Selected date:', selectedDate);
//     fetchAttendanceCountByDate(selectedDate);
//     setShowModal(false); // Close the modal after submission
//   };

//   return (
//     <div className="dashboard-container">
//       <header className="navbar">
//         <nav className="navbar-nav">
//           <ul>
//             <li>Supervisor Dashboard</li>
//             <li onClick={() => toggleDropdown('master')}>
//               Master <span className="arrow">&#9662;</span>
//               {dropdown === 'master' && (
//                 <ul className="dropdown">
//                   <li><Link to="/hello">Contractor Master</Link></li>
//                   <li><Link to="/hello">Worker Master</Link></li>
//                   <li><Link to="/hello">Attendance Master</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li onClick={() => toggleDropdown('registration')}>
//               Registration Form <span className="arrow">&#9662;</span>
//               {dropdown === 'registration' && (
//                 <ul className="dropdown">
//                   <li><Link to="/contractor-register">Contractor Registration Form</Link></li>
//                   <li><Link to="/hello">Worker Registration Form</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li onClick={() => toggleDropdown('reports')}>
//               Reports <span className="arrow">&#9662;</span>
//               {dropdown === 'reports' && (
//                 <ul className="dropdown">
//                   <li><Link to="/hello">90 Days Form</Link></li>
//                   <li><Link to="/hello">Worker Id Card</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li onClick={() => toggleDropdown('kyc')}>
//               KYC <span className="arrow">&#9662;</span>
//               {dropdown === 'kyc' && (
//                 <ul className="dropdown">
//                   <li><Link to="/hello">Contractor KYC</Link></li>
//                   <li><Link to="/hello">Worker KYC</Link></li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </header>

//       <div className="dashboard-content">
//         <div className="dashboard-card">
//           <div className="icon">
//             <img src="https://imgpanda.com/upload/ib/Q4tSh2ctkH.png" alt="Contractor Icon" />
//           </div>
//           <h3>Contractor Count</h3>
//           <p>{counts.contractorCount}</p>
//           <div className="details-link">
//             <Link to="/hello">Check Contractor Details</Link>
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="icon">
//             <img src="https://imgpanda.com/upload/ib/1yIWjyG41o.png" alt="Worker Icon" />
//           </div>
//           <h3>Worker Count</h3>
//           <p>{counts.workerCount}</p>
//           <div className="details-link">
//             <Link to="/">Check Worker Details</Link>
//           </div>
//         </div>

//         <div className="dashboard-card" onClick={() => setShowModal(true)}>
//           <div className="icon" title="Check Attendance Date Wise">
//             <img src="https://imgpanda.com/upload/ib/YQdOwN6IDJ.png" alt="Today's Worker Icon" />
//           </div>
//           <h3>Today's Worker Count</h3>
//           <p>{counts.presentCount || '0'}</p>
//           <div className="details-link">
//             <Link to="/hello">Check Attendance Details</Link>
//           </div>
//         </div>
//       </div>

//       {/* Modal for date selection */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Select Date</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleDateSubmit}>
//             <div className="mb-3">
//               <label htmlFor="date" className="form-label">Select Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="d-flex justify-content-end">
//               <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">Close</Button>
//               <Button type="submit" variant="primary">Submit</Button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default SupervisorDashboard;


import React, { useState, useEffect } from 'react';
import './SupervisorDashboard.css';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupervisorDashboard = () => {
  const [dropdown, setDropdown] = useState(null);
  const [counts, setCounts] = useState({ workerCount: 0, contractorCount: 0, presentCount: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, redirecting, etc.)
    console.log('User logged out');
  };

  // Fetch counts from the API
  const fetchCounts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/counts');
      if (!response.ok) {
        throw new Error('Failed to fetch counts');
      }
      const data = await response.json();
      setCounts(data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  // Define the fetchAttendanceCountByDate function
  const fetchAttendanceCountByDate = async (date) => {
    try {
      const response = await fetch(`http://localhost:5000/api/attendance-count?date=${date}`);
      if (!response.ok) {
        throw new Error('Failed to fetch attendance count');
      }
      const data = await response.json();
      console.log('Attendance count for the selected date:', data.count);
      setCounts((prevCounts) => ({ ...prevCounts, presentCount: data.count }));
    } catch (error) {
      console.error('Error fetching attendance count:', error);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 60000); // Fetch every minute for real-time updates
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleDateSubmit = (e) => {
    e.preventDefault();
    console.log('Selected date:', selectedDate);
    fetchAttendanceCountByDate(selectedDate); // This line now works as the function is defined
    setShowModal(false); // Close the modal after submission
  };

  return (
    <div className="dashboard-container">
      <header className="navbar">
      <nav className="navbar-nav">
        <ul>
          <li>Supervisor Dashboard</li>
          <li onClick={() => toggleDropdown('master')} onMouseLeave={() => setDropdown(null)}>
            Master <span className="arrow">&#9662;</span>
            {dropdown === 'master' && (
              <ul className="dropdown">
                <li><Link to="/contractor-master">Contractor Master</Link></li>
                <li><Link to="/worker-master">Worker Master</Link></li>
                <li><Link to="/attendance-master">Attendance Master</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('registration')} onMouseLeave={() => setDropdown(null)}>
            Registration Form <span className="arrow">&#9662;</span>
            {dropdown === 'registration' && (
              <ul className="dropdown">
                <li><Link to="/contractor-register">Contractor Registration Form</Link></li>
                <li><Link to="/worker-register">Worker Registration Form</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('reports')} onMouseLeave={() => setDropdown(null)}>
            Reports <span className="arrow">&#9662;</span>
            {dropdown === 'reports' && (
              <ul className="dropdown">
                <li><Link to="/90-days-form">90 Days Form</Link></li>
                <li><Link to="/worker-id-card">Worker Id Card</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('kyc')} onMouseLeave={() => setDropdown(null)}>
            KYC <span className="arrow">&#9662;</span>
            {dropdown === 'kyc' && (
              <ul className="dropdown">
                <li><Link to="/kyc-worker">KYC Worker</Link></li>
                <li><Link to="/kyc-contractor">KYC Contractor</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <div className="icon">
            <img src="https://imgpanda.com/upload/ib/Q4tSh2ctkH.png" alt="Contractor Icon" />
          </div>
          <h3>Contractor Count</h3>
          <p>{counts.contractorCount}</p>
          <div className="details-link">
            <Link to="/contractor-details">Check Contractor Details</Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="icon">
            <img src="https://imgpanda.com/upload/ib/1yIWjyG41o.png" alt="Worker Icon" />
          </div>
          <h3>Worker Count</h3>
          <p>{counts.workerCount}</p>
          <div className="details-link">
            <Link to="/worker-details">Check Worker Details</Link>
          </div>
        </div>

        <div className="dashboard-card" onClick={() => setShowModal(true)}>
          <div className="icon" title="Check Attendance Date Wise">
            <img src="https://imgpanda.com/upload/ib/YQdOwN6IDJ.png" alt="Today's Worker Icon" />
          </div>
          <h3>Today's Worker Count</h3>
          <p>{counts.presentCount || '0'}</p>
          <div className="details-link">
            <Link to="/attendance-details">Check Attendance Details</Link>
          </div>
        </div>
      </div>

      {/* Modal for date selection */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleDateSubmit}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Select Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">Close</Button>
              <Button type="submit" variant="primary">Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SupervisorDashboard;

