



// frontend/src/components/AccidentMaster.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./AccidentMaster.css";

const AccidentMaster = () => {
    const [contractors, setContractors] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedContractor, setSelectedContractor] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("Loading...");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [accidentData, setAccidentData] = useState([]);
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
            const response = await axios.get("/api/accidents", {
                params: {
                    contractorName: selectedContractor,
                    month: selectedMonth,
                }
            });

            if (response.data.message) {
                setAccidentData([]);
                setNoDataMessage(response.data.message);
            } else {
                setAccidentData(response.data);
                setNoDataMessage("");
            }
        } catch (error) {
            console.error("Failed to fetch accident data:", error);
        }
    };


    // const handleExportToExcel = () => {
    //     const worksheet = XLSX.utils.json_to_sheet(accidentData);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Accidents");
    //     XLSX.writeFile(workbook, "AccidentData.xlsx");
    // };

    const handleExportToExcel = () => {
        // Define the headers for the Excel sheet
        const dataToExport = accidentData.map((accident, index) => ({
            "Sr. No.": index + 1,
            "Name of Injured Person": accident.nameInjured,
            "Date of Accident or Dangerous Occurrence": new Date(accident.dateAccident).toLocaleDateString(),
            "Date of Report to Inspector": new Date(accident.dateReport).toLocaleDateString(),
            "Nature of Accident": accident.natureAccident,
            "Date of Return to Work": new Date(accident.dateReturn).toLocaleDateString(),
            "Days Absent": accident.daysAbsent,
        }));
    
        // Convert the data with headers to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    
        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Accidents");
    
        // Export the workbook to Excel
        XLSX.writeFile(workbook, "AccidentData.xlsx");
    };
    

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="main-container">
            <div className="container">
                <header className="header-box">
                    <footer>
                        <p><strong>FORM XX</strong><br />78 (i) (A) (ii)</p>
                    </footer>
                    <h1>Register of Accident and Dangerous Occurrence</h1>
                </header>

                <div className="search-bar mb-4">
                    <select
                        id="contractorSearch"
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
                        id="monthSearch"
                        className="form-control me-2"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                    <button id="searchBtn" className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>

                <div className="contractor-info-box">
                    <div className="left-info">
                        <p><strong>NAME OF CONTRACTOR:</strong> {selectedContractor || "Loading..."}</p>
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
                    <div className="table-wrapper">
                        <table id="accidentTable">
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Name of Injured Person (if any)</th>
                                    <th>Date of Accident or Dangerous Occurrence</th>
                                    <th>Date of Report (Form 24) to Inspector</th>
                                    <th>Nature of Accident or Dangerous Occurrence</th>
                                    <th>Date of Return of Injured Person to Work</th>
                                    <th>Number of Days Injured Person was Absent from Work</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accidentData.length > 0 ? (
                                    accidentData.map((accident, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{accident.nameInjured}</td>
                                            <td>{new Date(accident.dateAccident).toLocaleDateString()}</td>
                                            <td>{new Date(accident.dateReport).toLocaleDateString()}</td>
                                            <td>{accident.natureAccident}</td>
                                            <td>{new Date(accident.dateReturn).toLocaleDateString()}</td>
                                            <td>{accident.daysAbsent}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center", color: "red" }}>
                                            {noDataMessage || "No data found for the selected month."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="action-buttons">
                    <button id="exportButton" className="btn btn-success me-2" onClick={handleExportToExcel}>Export to Excel</button>
                    <button id="printButton" className="btn btn-secondary" onClick={handlePrint}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default AccidentMaster;

