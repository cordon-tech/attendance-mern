// frontend/src/components/PolicyRegistrationForm.js
import React, { useState } from "react";
import axios from "axios";
import "./PolicyRegistration.css";

const PolicyRegistrationForm = () => {
    const [formData, setFormData] = useState({
        policyName: "",
        policyNo: "",
        policyDate: "",
        policyValidDate: "",
        projectValue: "",
        personValue: "",
        project: "",
        workerCount: "",
        insurance: "",
        remark: "",
        fileUpload: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, fileUpload: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));

        try {
            await axios.post("/api/policies", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Policy registered successfully!");
        } catch (error) {
            console.error("Failed to register policy", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Policy Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="input-group">
                            <label className="">Policy Name:</label>
                            <input type="text" name="policyName" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Policy Number:</label>
                            <input type="text" name="policyNo" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Policy Date:</label>
                            <input type="date" name="policyDate" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group">
                            <label>Policy Valid Date:</label>
                            <input type="date" name="policyValidDate" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Project Value:</label>
                            <input type="text" name="projectValue" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Person Value:</label>
                            <input type="text" name="personValue" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Project:</label>
                            <input type="text" name="project" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group">
                            <label>Worker Count:</label>
                            <input type="number" name="workerCount" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Insurance:</label>
                            <input type="text" name="insurance" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Remark:</label>
                            <textarea name="remark" onChange={handleChange}></textarea>
                        </div>
                        <div className="input-group">
                            <label>File Upload:</label>
                            <input type="file" name="fileUpload" onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn-custom">Submit</button>
            </form>
        </div>
    );
};

export default PolicyRegistrationForm;
