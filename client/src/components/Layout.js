// components/Layout.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LayoutNavigation.css';

function Layout({ children }) {
  const location = useLocation();
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = ['/login', '/admin-registration', '/', '/SuperVisorDashboard', '/ContractorDashboard'];

  // Check if the current route is one of the routes where we want to hide the navbar
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="layout">
      {/* Only render the navbar if we're not on a page where it should be hidden */}
      {!shouldHideNavbar && (
        <header className="navbar">
          <nav className="navbar-nav">
            <ul>
              <li>Admin Dashboard</li>
              <li onClick={() => toggleDropdown('master')}>
                Master <span className="arrow">&#9662;</span>
                {dropdown === 'master' && (
                  <ul className="dropdown">
                    <li><Link to="/supervisor-master">Supervisor Master</Link></li>
                    <li><Link to="/contractor-master">Contractor Master</Link></li>
                    <li><Link to="/worker-data-table">Worker Master</Link></li>
                    <li><Link to="/designation">Designation</Link></li>
                    <li><Link to="/labour-rate">Labour Category</Link></li>
                    <li><Link to="/attendance-master">Attendance Master</Link></li>
                  </ul>
                )}
              </li>

              <li onClick={() => toggleDropdown('registration')}>
                Registration Form <span className="arrow">&#9662;</span>
                {dropdown === 'registration' && (
                  <ul className="dropdown">
                    <li><Link to="/supervisor-registration">Supervisor Registration</Link></li>
                    <li><Link to="/contractor-registration">Contractor Registration</Link></li>
                    <li><Link to="/worker-registration">Worker Registration</Link></li>
                  </ul>
                )}
              </li>

              <li onClick={() => toggleDropdown('forms')}>
                Forms <span className="arrow">&#9662;</span>
                {dropdown === 'forms' && (
                  <ul className="dropdown">
                    <li><Link to="/damage-registration">Damage or Loss Form</Link></li>
                    <li><Link to="/fine-form">Fine Form</Link></li>
                    <li><Link to="/accident-registration">Accident Form</Link></li>
                    <li><Link to="/advance-register">Advance Form</Link></li>
                    <li><Link to="/overtime">Overtime Form</Link></li>
                  </ul>
                )}
              </li>

              <li onClick={() => toggleDropdown('reports')}>
                Reports <span className="arrow">&#9662;</span>
                {dropdown === 'reports' && (
                  <ul className="dropdown">
                    <li><Link to="/90-days-form">90 Days Form</Link></li>
                    <li><Link to="/muster-roll">Muster Roll</Link></li>
                    <li><Link to="/pf-chalan">PF Chalan</Link></li>
                    <li><Link to="/worker-id-card">Worker Id Card</Link></li>
                    <li><Link to="/advance-master">Advance Master</Link></li>
                    <li><Link to="/accident-master">Accident Master</Link></li>
                    <li><Link to="/damage-or-loss-master">Damage or Loss Master</Link></li>
                    <li><Link to="/fine-master">Fine Master</Link></li>
                    <li><Link to="/overtime-master">Overtime Master</Link></li>
                  </ul>
                )}
              </li>

              <li onClick={() => toggleDropdown('kyc')}>
                KYC <span className="arrow">&#9662;</span>
                {dropdown === 'kyc' && (
                  <ul className="dropdown">
                    <li><Link to="/supervisor-kyc">Supervisor KYC</Link></li>
                    <li><Link to="/kyc-contractor">Contractor KYC</Link></li>
                    <li><Link to="/worker-kyc">Worker KYC</Link></li>
                  </ul>
                )}
              </li>

              <li className="attendance"><Link to="/daily-attendance">Daily Attendance</Link></li>

              <li onClick={() => toggleDropdown('policy')}>
                Policy/Licence <span className="arrow">&#9662;</span>
                {dropdown === 'policy' && (
                  <ul className="dropdown">
                    <li><Link to="/policy-register">Policy Registration</Link></li>
                    <li><Link to="/policy-master">Policy Master</Link></li>
                  </ul>
                )}
              </li>

              <li onClick={() => toggleDropdown('holiday')}>
                Holiday <span className="arrow">&#9662;</span>
                {dropdown === 'holiday' && (
                  <ul className="dropdown">
                    <li><Link to="/weekly-form">Weekly Off</Link></li>
                    <li><Link to="/paid-leave">Paid Leaves</Link></li>
                  </ul>
                )}
              </li>

              <li onClick={() => toggleDropdown('profile')}>
                Profile <span className="arrow">&#9662;</span>
                {dropdown === 'profile' && (
                  <ul className="dropdown">
                    <li><Link to="/change-password">Change Password</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </header>
      )}

      {/* Page content area */}
      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
