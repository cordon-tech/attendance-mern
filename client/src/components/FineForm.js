


import React, { useState } from 'react';
import '../components/FineRegistration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const FineForm = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        fatherHusbandName: '',
        contractorName: '',
        designationNatureOfEmployment: '',
        actOmission: '',
        dateOfOffence: '',
        showedCause: '',
        explanationPerson: '',
        wagesPeriod: '',
        fineAmount: '',
        remarks: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/fines', formData);
            console.log('Fine created:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register of Fines Form</h2>
            <form onSubmit={handleSubmit} className="fine-form p-4 shadow-sm rounded bg-light">
                <div className="form-group mb-3">
                    <label htmlFor="employeeId" style={{ fontWeight: 'bold' }}>Employee ID:</label>
                    <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        className="form-control"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group mb-3">
                    <label htmlFor="employeeName" style={{ fontWeight: 'bold' }}>Name of the Employee:</label>
                    <input
                        type="text"
                        id="employeeName"
                        name="employeeName"
                        className="form-control"
                        value={formData.employeeName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="fatherHusbandName" style={{ fontWeight: 'bold' }}>Father's/Husband's Name:</label>
                    <input
                        type="text"
                        id="fatherHusbandName"
                        name="fatherHusbandName"
                        className="form-control"
                        value={formData.fatherHusbandName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="contractorName" style={{ fontWeight: 'bold' }}>Contractor Name:</label>
                    <input
                        type="text"
                        id="contractorName"
                        name="contractorName"
                        className="form-control"
                        value={formData.contractorName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="designationNatureOfEmployment" style={{ fontWeight: 'bold' }}>Designation/Nature of Employment:</label>
                    <input
                        type="text"
                        id="designationNatureOfEmployment"
                        name="designationNatureOfEmployment"
                        className="form-control"
                        value={formData.designationNatureOfEmployment}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="actOmission" style={{ fontWeight: 'bold' }}>Act/Omission for which fine imposed:</label>
                    <input
                        type="text"
                        id="actOmission"
                        name="actOmission"
                        className="form-control"
                        value={formData.actOmission}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="dateOfOffence" style={{ fontWeight: 'bold' }}>Date of Offence:</label>
                    <input
                        type="date"
                        id="dateOfOffence"
                        name="dateOfOffence"
                        className="form-control"
                        value={formData.dateOfOffence}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="showedCause" style={{ fontWeight: 'bold' }}>Whether Workman showed cause against fine:</label>
                    <textarea
                        id="showedCause"
                        name="showedCause"
                        className="form-control"
                        value={formData.showedCause}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="explanationPerson" style={{ fontWeight: 'bold' }}>Name of person in whose presence employee's explanation was heard:</label>
                    <input
                        type="text"
                        id="explanationPerson"
                        name="explanationPerson"
                        className="form-control"
                        value={formData.explanationPerson}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="wagesPeriod" style={{ fontWeight: 'bold' }}>Wages periods and wages payable:</label>
                    <textarea
                        id="wagesPeriod"
                        name="wagesPeriod"
                        className="form-control"
                        value={formData.wagesPeriod}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="fineAmount" style={{ fontWeight: 'bold' }}>Amount of fine imposed:</label>
                    <input
                        type="number"
                        id="fineAmount"
                        name="fineAmount"
                        className="form-control"
                        value={formData.fineAmount}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="remarks" style={{ fontWeight: 'bold' }}>Remarks:</label>
                    <textarea
                        id="remarks"
                        name="remarks"
                        className="form-control"
                        value={formData.remarks}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
            </form>
        </div>
    );
};

export default FineForm;
