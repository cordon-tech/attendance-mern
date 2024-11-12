

/////working code
import React, { useState, useEffect } from 'react';
import './WorkerRegistrationForm.css';

const WorkerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    mobileNo: '',
    maritalStatus: '',
    permanentAddress: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    currentAddress: '',
    idType: '',
    aadharNo: '',
    documentFiles: [],
    aadharBack: '',
    bankPassbook: '',
    contractorName: '',
    designationName: '',
    labourType: '',
    joinDate: '',
    issueDate: '',
    validDate: '',
    bocwRegistration: '',
    pfNumber: '',
    uanNumber: '',
    esicNumber: '',
    panNumber: '',
    ipNumber: '',
    policeVerify: '',
    bankName: '',
    branch: '',
    accountNo: '',
    ifscCode: '',
    nominee: '',
    relation: '',
    nomineeNo: '',
    children: '',
    qualification: '',
    sector: ''
  });
  
  const [contractors, setContractors] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [labourTypes, setLabourTypes] = useState([]); // Initialize as an array

  // Fetch contractor names
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workers/contractors');
        const data = await response.json();
        setContractors(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching contractors:', error);
      }
    };
    fetchContractors();
  }, []);

  // Fetch designation names
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workers/designations');
        const data = await response.json();
        setDesignations(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching designations:', error);
      }
    };
    fetchDesignations();
  }, []);

  // Fetch labour types
  useEffect(() => {
    const fetchLabourTypes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workers/labourTypes');
        const data = await response.json();
        setLabourTypes(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching labour types:', error);
      }
    };
    fetchLabourTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/workers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert('Worker registered successfully');
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        mobileNo: '',
        maritalStatus: '',
        permanentAddress: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        currentAddress: '',
        idType: '',
        aadharNo: '',
        documentFiles: [],
        aadharBack: '',
        bankPassbook: '',
        contractorName: '',
        designationName: '',
        labourType: '',
        joinDate: '',
        issueDate: '',
        validDate: '',
        bocwRegistration: '',
        pfNumber: '',
        uanNumber: '',
        esicNumber: '',
        panNumber: '',
        ipNumber: '',
        policeVerify: '',
        bankName: '',
        branch: '',
        accountNo: '',
        ifscCode: '',
        nominee: '',
        relation: '',
        nomineeNo: '',
        children: '',
        qualification: '',
        sector: ''
      });
    } catch (error) {
      console.error('Error registering worker:', error);
      alert(`Registration failed: ${error.message}`);
    }
  };
  
  return (
    <div className="form-container">
      <h2>Worker Registration</h2>
      <form onSubmit={handleSubmit}>
        
        <section className="personal-information">
          <h3>Personal Information:</h3>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Middle Name:</label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />

          <label>DOB:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Mobile No:</label>
          <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />

          <label>Marital Status:</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </section>

        <section className="address">
          <h3>Address:</h3>
          <label>Permanent Address:</label>
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />

          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />

          <label>District:</label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} />

          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} />

          <label>Pincode:</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />

          <label>Current Address:</label>
          <input type="text" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
        </section>

        <section className="documents">
          <h3>Documents:</h3>
          <label>Aadhar Card:</label>
          <select name="idType" value={formData.idType} onChange={handleChange}>
            <option value="">Select ID Type</option>
            {/* Add options as necessary */}
          </select>

          <label>Aadhar No:</label>
          <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} />

          <label>Aadhar Image:</label>
          <input type="file" name="documentFiles" onChange={handleChange} />

          <label>Aadhar Back:</label>
          <input type="file" name="aadharBack" onChange={handleChange} />

          <label>Bank Passbook:</label>
          <input type="file" name="bankPassbook" onChange={handleChange} />
        </section>

        <section className="worker-information">
          <h3>Worker Information:</h3>
          <label>Contractor Name:</label>
          <select name="contractorName" value={formData.contractorName} onChange={handleChange}>
            <option value="">Select Contractor Name</option>
            {contractors.map((contractor, index) => (
              <option key={index} value={contractor}>{contractor}</option>
            ))}
          </select>

          <label>Designation Name:</label>
          <select name="designationName" value={formData.designationName} onChange={handleChange}>
            <option value="">Select Designation Name</option>
            {designations.map((designation, index) => (
              <option key={index} value={designation}>{designation}</option>
            ))}
          </select>

          <label>Labour Type:</label>
          <select name="labourType" value={formData.labourType} onChange={handleChange}>
            <option value="">Select Labour Type</option>
            {Array.isArray(labourTypes) && labourTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <label>Join Date:</label>
          <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} />

          <label>Issue Date:</label>
          <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} />

          <label>Valid Date:</label>
          <input type="date" name="validDate" value={formData.validDate} onChange={handleChange} />

          <label>BOCW Registration:</label>
          <input type="text" name="bocwRegistration" value={formData.bocwRegistration} onChange={handleChange} />

          <label>PF Number:</label>
          <input type="text" name="pfNumber" value={formData.pfNumber} onChange={handleChange} />

          <label>UAN Number:</label>
          <input type="text" name="uanNumber" value={formData.uanNumber} onChange={handleChange} />

          <label>ESIC Number:</label>
          <input type="text" name="esicNumber" value={formData.esicNumber} onChange={handleChange} />

          <label>PAN Number:</label>
          <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} />

          <label>IP Number:</label>
          <input type="text" name="ipNumber" value={formData.ipNumber} onChange={handleChange} />

          <label>Police Verify:</label>
          <select name="policeVerify" value={formData.policeVerify} onChange={handleChange}>
            <option value="">Police Verify</option>
            {/* Add options as necessary */}
          </select>
        </section>

        <section className="bank-details">
          <h3>Bank Details:</h3>
          <label>Bank Name:</label>
          <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />

          <label>Branch:</label>
          <input type="text" name="branch" value={formData.branch} onChange={handleChange} />

          <label>Account No:</label>
          <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} />

          <label>IFSC Code:</label>
          <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />

          <label>Nominee:</label>
          <input type="text" name="nominee" value={formData.nominee} onChange={handleChange} />

          <label>Relation:</label>
          <input type="text" name="relation" value={formData.relation} onChange={handleChange} />

          <label>Nominee No:</label>
          <input type="text" name="nomineeNo" value={formData.nomineeNo} onChange={handleChange} />

          <label>Children:</label>
          <input type="text" name="children" value={formData.children} onChange={handleChange} />

          <label>Qualification:</label>
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />

          <label>Sector:</label>
          <input type="text" name="sector" value={formData.sector} onChange={handleChange} />
        </section>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkerRegistrationForm;

