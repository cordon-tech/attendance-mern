// import React, { useState, useEffect } from 'react';
// import './AdminDashboard.css';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [dropdown, setDropdown] = useState(null);
//   const [counts, setCounts] = useState({ supervisorCount: 0, contractorCount: 0, presentCount: 0 });
//   const [hoveredCard, setHoveredCard] = useState(null); // To track which card is hovered

//   const toggleDropdown = (menu) => {
//     setDropdown(dropdown === menu ? null : menu);
//   };
  
//   // Fetch counts from the API
//   const fetchCounts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/counts');
//       const data = await response.json();
//       setCounts(data);
//     } catch (error) {
//       console.error('Error fetching counts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCounts();
//     const interval = setInterval(fetchCounts, 60000); // Fetch every minute for real-time updates
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <header className="navbar">
//         <nav className="navbar-nav">
//           <ul>
//             <li>Admin Dashboard</li>

//             <li onClick={() => toggleDropdown('master')}>
//               Master <span className="arrow">&#9662;</span>
//               {dropdown === 'master' && (
//                 <ul className="dropdown">
//                   <li><Link to="/supervisor-master">Supervisor Master</Link></li>
//                   <li><Link to="/contractor-master">Contractor Master</Link></li>
//                   <li><Link to="/worker-data-table">Worker Master</Link></li>
//                   <li><Link to="/designation">Designation</Link></li>
//                   <li><Link to="/labour-rate">Labour Category</Link></li>
//                   <li><Link to="/attendance-master">Attendance Master</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li onClick={() => toggleDropdown('registration')}>
//               Registration Form <span className="arrow">&#9662;</span>
//               {dropdown === 'registration' && (
//                 <ul className="dropdown">
//                   <li><Link to="/supervisor-registration">Supervisor Registration</Link></li>
//                   <li><Link to="/contractor-registration">Contractor Registration</Link></li>
//                   <li><Link to="/worker-registration">Worker Registration</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li onClick={() => toggleDropdown('forms')}>
//               Forms <span className="arrow">&#9662;</span>
//               {dropdown === 'forms' && (
//                 <ul className="dropdown">
//                   <li><Link to="/damage-registration">Damage or Loss Form</Link></li>
//                   <li><Link to="/fine-form">Fine Form</Link></li>
//                   <li><Link to="/accident-registration">Accident Form</Link></li>
//                   <li><Link to="/advance-register">Advance Form</Link></li>
//                   <li><Link to="/overtime">Overtime Form</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li onClick={() => toggleDropdown('reports')}>
//               Reports <span className="arrow">&#9662;</span>
//               {dropdown === 'reports' && (
//                 <ul className="dropdown">
//                   <li><Link to="/hello">90 Days Form</Link></li>
//                   <li><Link to="/hello">Muster Roll</Link></li>
//                   <li><Link to="/hello">PF Chalan</Link></li>
//                   <li><Link to="/worker-id-card">Worker Id Card</Link></li>
//                   <li><Link to="/advance-master">Advance Master</Link></li>
//                   <li><Link to="/accident-master">Accident Master</Link></li>
//                   <li><Link to="/damage-or-loss-master">Damage or Loss Master</Link></li>
//                   <li><Link to="/fine-master">Fine Master</Link></li>
//                   <li><Link to="/overtime-master">Overtime Master</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li onClick={() => toggleDropdown('kyc')}>
//               KYC <span className="arrow">&#9662;</span>
//               {dropdown === 'kyc' && (
//                 <ul className="dropdown">
//                   <li><Link to="/supervisor-kyc">Supervisor KYC</Link></li>
//                   <li><Link to="/kyc-contractor">Contractor KYC</Link></li>
//                   <li><Link to="/worker-kyc">Worker KYC</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li className="attendance"><Link to="/hello">Daily Attendance</Link></li>

//             <li onClick={() => toggleDropdown('policy')}>
//               Policy/Licence <span className="arrow">&#9662;</span>
//               {dropdown === 'policy' && (
//                 <ul className="dropdown">
//                   <li><Link to="/policy-register">Policy Registration</Link></li>
//                   <li><Link to="/policy-master">Policy Master</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li onClick={() => toggleDropdown('holiday')}>
//               Holiday <span className="arrow">&#9662;</span>
//               {dropdown === 'holiday' && (
//                 <ul className="dropdown">
//                   <li><Link to="/weekly-form">Weekly Off</Link></li>
//                   <li><Link to="/paid-leave">Paid Leaves</Link></li>
//                 </ul>
//               )}
//             </li>

//             <li onClick={() => toggleDropdown('profile')}>
//               Profile <span className="arrow">&#9662;</span>
//               {dropdown === 'profile' && (
//                 <ul className="dropdown">
//                   <li><Link to="/change-password">Change Password</Link></li>
//                   <li><Link to="/hello">Logout</Link></li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </header>

//       <div className="dashboard-content">
//         {/* The rest of your dashboard content remains unchanged */}
//         <div className="dashboard-card" onMouseEnter={() => setHoveredCard('supervisor')} onMouseLeave={() => setHoveredCard(null)}>
//           <div className="icon">
//             <img src="https://imgpanda.com/upload/ib/1yIWjyG41o.png" alt="Supervisor Icon" />
//           </div>
//           <h3>Supervisor Count</h3>
//           <p>{counts.supervisorCount}</p>
//           {hoveredCard === 'supervisor' && (
//             <div className="hover-box">
//               <Link to="/hello">Supervisor Details</Link>
//             </div>
//           )}
//         </div>

//         <div className="dashboard-card" onMouseEnter={() => setHoveredCard('contractor')} onMouseLeave={() => setHoveredCard(null)}>
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

//         <div className="dashboard-card" onMouseEnter={() => setHoveredCard('attendance')} onMouseLeave={() => setHoveredCard(null)}>
//           <div className="icon">
//             <img src="https://imgpanda.com/upload/ib/YQdOwN6IDJ.png" alt="Worker Icon" />
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
//     </div>
//   );
// };

// export default AdminDashboard;
// pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ supervisorCount: 0, contractorCount: 0, presentCount: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fetch counts from the API
  const fetchCounts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/counts');
      const data = await response.json();
      setCounts(data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-card" onMouseEnter={() => setHoveredCard('supervisor')} onMouseLeave={() => setHoveredCard(null)}>
          <div className="icon">
            <img src="https://imgpanda.com/upload/ib/1yIWjyG41o.png" alt="Supervisor Icon" />
          </div>
          <h3>Supervisor Count</h3>
          <p>{counts.supervisorCount}</p>
          {hoveredCard === 'supervisor' && (
            <div className="hover-box">
              <Link to="/hello">Supervisor Details</Link>
            </div>
          )}
        </div>

        <div className="dashboard-card" onMouseEnter={() => setHoveredCard('contractor')} onMouseLeave={() => setHoveredCard(null)}>
          <div className="icon">
            <img src="https://imgpanda.com/upload/ib/Q4tSh2ctkH.png" alt="Contractor Icon" />
          </div>
          <h3>Contractor Count</h3>
          <p>{counts.contractorCount}</p>
          {hoveredCard === 'contractor' && (
            <div className="hover-box">
              <Link to="/hello">Contractor Details</Link>
            </div>
          )}
        </div>

        <div className="dashboard-card" onMouseEnter={() => setHoveredCard('attendance')} onMouseLeave={() => setHoveredCard(null)}>
          <div className="icon">
            <img src="https://imgpanda.com/upload/ib/YQdOwN6IDJ.png" alt="Worker Icon" />
          </div>
          <h3>Today's Worker Count</h3>
          <p>{counts.presentCount}</p>
          {hoveredCard === 'attendance' && (
            <div className="hover-box">
              <Link to="/hello">Attendance Details</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
