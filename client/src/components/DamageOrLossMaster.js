// frontend/src/components/DamageOrLossMaster.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./DamageOrLossMaster.css";

const DamageOrLossMaster = () => {
    const [contractors, setContractors] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedContractor, setSelectedContractor] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("Loading...");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [damageData, setDamageData] = useState([]);
    const [noDataMessage, setNoDataMessage] = useState("");

    // Fetch contractor names and addresses on component mount
    useEffect(() => {
        fetchContractors();
    }, []);

    const fetchContractors = async () => {
        try {
            const response = await axios.get("/api/contractors");
            const { contractorNames, addresses } = response.data;
            setContractors(contractorNames);
            setAddresses(addresses);
        } catch (error) {
            console.error("Failed to fetch contractor names:", error);
        }
    };

    const handleContractorChange = (event) => {
        const contractorName = event.target.value;
        setSelectedContractor(contractorName);

        // Set address based on the selected contractor
        const contractorIndex = contractors.indexOf(contractorName);
        if (contractorIndex !== -1) {
            setSelectedAddress(addresses[contractorIndex]);
        } else {
            setSelectedAddress("Loading...");
        }
    };

    const handleSearch = async () => {
        if (!selectedContractor || !selectedMonth) {
            alert("Please select both contractor and month.");
            return;
        }

        try {
            const response = await axios.get("/api/damage", {
                params: {
                    contractorName: selectedContractor,
                    month: selectedMonth,
                }
            });

            if (response.data.message) {
                setDamageData([]);
                setNoDataMessage(response.data.message);
            } else {
                setDamageData(response.data);
                setNoDataMessage("");
            }
        } catch (error) {
            console.error("Failed to fetch damage data:", error);
        }
    };

    const handleExportToExcel = () => {
        const dataToExport = damageData.map((item, index) => ({
            "Sr. No.": index + 1,
            "Image": item.image || "N/A",
            "Name of Workmen": item.nameOfWorkmen,
            "Designation / Nature of Employment": item.designation,
            "Particulars of Damage or Loss": item.particulars,
            "Date of Damage or Loss": new Date(item.dateOfDamage).toLocaleDateString(),
            "Person Present During Explanation": item.personPresent,
            "Amount of Deduction": item.deductionAmount,
            "No. of Installments": item.installments,
            "Remarks": item.remarks,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "DamageOrLoss");
        XLSX.writeFile(workbook, "DamageOrLossData.xlsx");
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="main-container">
            <div className="container">
                <header className="header-box">
                    <footer>
                        <p><strong>FORM XX</strong><br />[See rule 78 (i) (A) (ii)]</p>
                    </footer>
                    <h1>Register of Deductions for Damage or Loss</h1>
                </header>

                <div className="search-bar mb-4">
                    <select
                        id="searchContractorName"
                        className="form-control me-2"
                        value={selectedContractor}
                        onChange={handleContractorChange}
                    >
                        <option value="">Select Contractor Name...</option>
                        {contractors.map((contractor, index) => (
                            <option key={index} value={contractor}>{contractor}</option>
                        ))}
                    </select>
                    <input
                        type="month"
                        id="searchDateOfDamage"
                        className="form-control me-2"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                    <button id="searchButton" className="btn btn-custom" onClick={handleSearch}>Search</button>
                </div>

                <div className="contractor-info-box">
                    <div className="left-info">
                        <p><strong>Contractor Name:</strong> {selectedContractor || "Loading..."}</p>
                        <p><strong>Address:</strong> {selectedAddress}</p>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="right-info">
                        <p><strong>Principal Employer:</strong></p>
                        <p>M/S ADS CONSULTANCY AND ENGINEERING SERVICES</p>
                        <p>COPOVITEZ PVT LIMITED BHARAMATI MIDC PUNE</p>
                    </div>
                </div>

                <div className="tableContainer">
                    <div className="scrollable-table">
                        <table id="damageTable">
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Image</th>
                                    <th>Name of Workmen</th>
                                    <th>Designation / Nature of Employment</th>
                                    <th>Particulars of Damage or Loss</th>
                                    <th>Date of Damage or Loss</th>
                                    <th>Whether workman showed cause against deduction</th>
                                    <th>Person Present During Explanation</th>
                                    <th>Amount of Deduction</th>
                                    <th>No. of Installments</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {damageData.length > 0 ? (
                                    damageData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.image ? <img src={item.image} alt="Damage" width="50" /> : "N/A"}</td>
                                            <td>{item.nameOfWorkmen}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.particulars}</td>
                                            <td>{new Date(item.dateOfDamage).toLocaleDateString()}</td>
                                            <td>{item.showCause}</td>
                                            <td>{item.personPresent}</td>
                                            <td>{item.deductionAmount}</td>
                                            <td>{item.installments}</td>
                                            <td>{item.remarks}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" style={{ textAlign: "center", color: "red" }}>
                                            {noDataMessage || "No data found for the selected month."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Export and Print Buttons */}
                <div className="export-print-container">
                    <button id="exportButton" className="btn btn-success me-2" onClick={handleExportToExcel}>Export to Excel</button>
                    <button id="printButton" className="btn btn-secondary" onClick={handlePrint}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default DamageOrLossMaster;
