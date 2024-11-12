import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PolicyMaster.css";

const PolicyMaster = () => {
    const [policies, setPolicies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPolicies, setFilteredPolicies] = useState([]);
    const [editingPolicyId, setEditingPolicyId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const response = await axios.get("/api/policies");
            setPolicies(response.data);
            setFilteredPolicies(response.data);
        } catch (error) {
            console.error("Failed to fetch policies", error);
        }
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);

        if (searchValue === "") {
            setFilteredPolicies(policies);
        } else {
            const filtered = policies.filter((policy) =>
                policy.policyId.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredPolicies(filtered);
        }
    };

    const handleEdit = (policy) => {
        setEditingPolicyId(policy.policyId);
        setEditData(policy);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSave = async (policyId) => {
        try {
            await axios.put(`/api/policies/${policyId}`, editData);
            setEditingPolicyId(null);
            fetchPolicies(); // Refresh data after saving
            alert("Policy updated successfully!");
        } catch (error) {
            console.error("Failed to update policy", error);
            alert("Failed to update policy.");
        }
    };

    const handleDelete = async (policyId) => {
        try {
            await axios.delete(`/api/policies/${policyId}`);
            fetchPolicies(); // Refresh data after deleting
            alert("Policy deleted successfully!");
        } catch (error) {
            console.error("Failed to delete policy", error);
            alert("Failed to delete policy.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Policy Details</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Policy ID..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control mb-4"
                />
            </div>

            <div className="table-container">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Policy ID</th>
                            <th>Policy Name</th>
                            <th>Policy Number</th>
                            <th>Policy Date</th>
                            <th>Policy Valid Date</th>
                            <th>Project Value</th>
                            <th>Person Value</th>
                            <th>Project</th>
                            <th>Worker Count</th>
                            <th>Insurance</th>
                            <th>Remark</th>
                            <th>File Upload</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPolicies.length > 0 ? (
                            filteredPolicies.map((policy) => (
                                <tr key={policy.policyId}>
                                    <td>{policy.policyId}</td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="text"
                                                name="policyName"
                                                value={editData.policyName}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.policyName
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="text"
                                                name="policyNo"
                                                value={editData.policyNo}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.policyNo
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="date"
                                                name="policyDate"
                                                value={editData.policyDate}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            new Date(policy.policyDate).toLocaleDateString()
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="date"
                                                name="policyValidDate"
                                                value={editData.policyValidDate}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            new Date(policy.policyValidDate).toLocaleDateString()
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="text"
                                                name="projectValue"
                                                value={editData.projectValue}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.projectValue
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="text"
                                                name="personValue"
                                                value={editData.personValue}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.personValue
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="text"
                                                name="project"
                                                value={editData.project}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.project
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="number"
                                                name="workerCount"
                                                value={editData.workerCount}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.workerCount
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <input
                                                type="text"
                                                name="insurance"
                                                value={editData.insurance}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.insurance
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <textarea
                                                name="remark"
                                                value={editData.remark}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            policy.remark
                                        )}
                                    </td>
                                    <td>
                                        {policy.fileUpload ? (
                                            <a href={`http://localhost:5000/${policy.fileUpload}`} target="_blank" rel="noopener noreferrer">
                                                View File
                                            </a>
                                        ) : (
                                            "No File"
                                        )}
                                    </td>
                                    <td>
                                        {editingPolicyId === policy.policyId ? (
                                            <>
                                                <button className="btn btn-success me-2" onClick={() => handleSave(policy.policyId)}>
                                                    Save
                                                </button>
                                                <button className="btn btn-secondary" onClick={() => setEditingPolicyId(null)}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-primary me-2" onClick={() => handleEdit(policy)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(policy.policyId)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" style={{ textAlign: "center", color: "red" }}>
                                    No policies found for the entered ID.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PolicyMaster;
