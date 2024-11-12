import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin', 'Supervisor', 'Contractor');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        userID,
        password,
        role,
      });

      navigate("/admin-dashboard");
      setMessage('Admin Login Successful');
      console.log(res.data.token); // Optionally, store the token in local storage

      if (role === 'Admin') {
        navigate("/admin-dashboard");
        setMessage('Admin Login Successful');
        console.log(res.data.token); // Optionally, store the token in local storage
      }
      else if (role === 'Supervisor') {
        navigate("/SuperVisorDashboard");
        setMessage('Supervisor Login Successful');
        console.log(res.data.token); // Optionally, store the token in local storage
      }
      else if (role ==='Contractor') {
        navigate("/ContractorDashboard");
        setMessage('Contractor Login Successful');
        console.log(res.data.token); // Optionally, store the token in local storage
      }
    } catch (err) {
      // Log the error to see what the backend is responding with
      console.error('Login failed:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="/logo.png" width="200px" height="200px" alt="Logo" />
        <h1 className="fw-bold" style={{ fontSize: '40px', marginBottom: '5px' }}>AMS</h1>
      </div>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card p-4" style={{ backgroundColor: '#f0f0f0', boxShadow: '0 4px 8px rgba(128, 128, 128, 0.5)', padding: '50px', textAlign: 'center' }}>
          <form onSubmit={handleLogin}>
            <div className="mb-3 position-relative">
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '320px', padding: '10px', fontSize: '16px', marginBottom: '20px' }}>
                <option value="Admin">Admin</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Contractor">Contractor</option>
              </select>
            </div>
            <div className="mb-3 position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="User ID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '15px' }}
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              />
              <i
                className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', right: '15px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#5D0E41', color: 'white', padding: '10px', width: '325px', marginTop: '20px', fontSize: '18px', borderRadius: '5px' }}>
                Login
              </button>
            </div>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
