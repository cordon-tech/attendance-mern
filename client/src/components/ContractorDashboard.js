import React, { useState, useEffect } from 'react';
import './ContractorDashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContractorDashboard = () => {
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
          <li>Contractor Dashboard</li>
          <li onClick={() => toggleDropdown('master')} onMouseLeave={() => setDropdown(null)}>
            Master <span className="arrow">&#9662;</span>
            {dropdown === 'master' && (
              <ul className="dropdown">
                <li><Link to="/attendance-master">Attendance Master</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('registration')} onMouseLeave={() => setDropdown(null)}>
            Registration Form <span className="arrow">&#9662;</span>
            {dropdown === 'registration' && (
              <ul className="dropdown">
                <li><Link to="/worker-register">Worker Registration Form</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('reports')} onMouseLeave={() => setDropdown(null)}>
            Reports <span className="arrow">&#9662;</span>
            {dropdown === 'reports' && (
              <ul className="dropdown">
                <li><Link to="/90-days-form">90 Days Form</Link></li>
              </ul>
            )}
          </li>
          <li onClick={() => toggleDropdown('kyc')} onMouseLeave={() => setDropdown(null)}>
            KYC <span className="arrow">&#9662;</span>
            {dropdown === 'kyc' && (
              <ul className="dropdown">
                <li><Link to="/kyc-worker">KYC Worker</Link></li>
              </ul>
            )}
          </li>
        </ul>
     
      </nav>
    </header>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <div className="icon">
            <img src="https://imgpanda.com/upload/ib/1yIWjyG41o.png" alt="Worker Icon" />
          </div>
          <h3>Worker Count</h3>
          <p>{counts.workerCount}</p>
          <div className="details-link">
            {/* <Link to="/worker-details">Check Worker Details</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;

