import React from 'react';
import AdminRegistration from './components/AdminRegistration'; // Adjust the path as needed
import Login from './components/login'; // Import your Login component
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './AdminDashboard'; // Adjust the import path as needed
 // Create this component

import Designation from './components/Designation';
import SupervisorRegistration from './components/SupervisorRegistration';
import SupervisorMaster from './components/SupervisorMaster';
import ContractorMaster from './components/ContractorMaster'; // Import the ContractorMaster component
import ContractorRegistration from './components/ContractorRegistration'; // Import the ContractorRegistration component
import FineForm from './components/FineForm';
import WorkerRegistrationForm from './components/WorkerRegistrationForm';
import WorkerDataTable from './components/WorkerDataTable';
import WorkerKYCForm from './components/WorkerKYCForm';
import KYCContractorForm from './components/KYCContractorForm';
import AdvanceMaster from './components/AdvanceMaster';
import Overtime from './components/Overtime';
import OvertimeMaster from './components/OvertimeMaster';
import ChangePassword from './components/ChangePassword';
import LabourRate from './components/LabourRate';
import SupervisorKYCForm from './components/KYCSupervisor';
import AccidentMaster from './components/AccidentMaster';
import AdvanceForm from './components/AdvanceRegister';
import DamageOrLossMaster from './components/DamageOrLossMaster';
import FineMaster from './components/FineMaster';
import PolicyMaster from './components/PolicyMaster';
import PolicyRegistrationForm from './components/PolicyRegistration';
import WeeklyOffForm from './components/WeeklyOffForm';
import PaidLeaveView from './components/PaidLeaveForm';
import AccidentRegistration from './components/AccidentRegistration';
import WorkerIdCard from './components/WorkerIdCard';
import DamageRegistration from './components/DamageRegistration';
import AttendanceMaster from './components/AttendanceMaster'; // Import AttendanceMaster component
import SupervisorDashboard from './components/SupervisorDashboard';
import ContractorDashboard from './components/ContractorDashboard';


function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <Link to="/admin-registration">Admin Registration</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Layout>
        <Routes>
          <Route path="/admin-registration" element={<AdminRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/hello" element={<SupervisorMaster />} />
        
          <Route path="/designation" element={<Designation/>} />
          <Route path="/supervisor-registration" element={<SupervisorRegistration/>} />
          <Route path="/supervisor-master" element={<SupervisorMaster/>} />
          <Route path="/contractor-master" element={<ContractorMaster />} />
          <Route path="/contractor-registration" element={<ContractorRegistration />} />
          <Route path="/fine-form" element={<FineForm />} />
          <Route path="/worker-registration" element={<WorkerRegistrationForm />} />
          <Route path="/worker-data-table" element={<WorkerDataTable />} />
          <Route path="/worker-kyc" element={<WorkerKYCForm />} />
          <Route path="/kyc-contractor" element={<KYCContractorForm />} /> 
          <Route path="/advance-master" element={<AdvanceMaster />} />
          <Route path="/overtime" element={<Overtime />} />
          <Route path="/overtime-master" element={<OvertimeMaster />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/labour-rate" element={<LabourRate/>} />


          <Route path="/supervisor-kyc" element={<SupervisorKYCForm/>} />
          <Route path="/accident-master" element={<AccidentMaster/>} />
          <Route path="/advance-register" element={<AdvanceForm/>} />
          <Route path="/damage-or-loss-master" element={<DamageOrLossMaster/>} />
          <Route path="/fine-master" element={<FineMaster/>} />
          <Route path="/policy-master" element={<PolicyMaster/>} />
          <Route path="/policy-register" element={<PolicyRegistrationForm/>} />
          
          <Route path="/weekly-form" element={<WeeklyOffForm/>}/>
          <Route path="/paid-leave" element={<PaidLeaveView />} />
       
          <Route path="/accident-registration" element={<AccidentRegistration />} />

          <Route path="/worker-id-card" element={<WorkerIdCard />} />
          <Route path="/damage-registration" element={<DamageRegistration />} /> {/* Damage Registration */}


          <Route path="/attendance-master" element={<AttendanceMaster />} /> {/* Attendance Master */}

          <Route path="/SuperVisorDashboard" element={<SupervisorDashboard/>}/>
            <Route path="/ContractorDashboard" element={<ContractorDashboard/>}/>
     
        
        
        </Routes>
        </Layout>
      </div>
    </Router>
  );
}


export default App;
