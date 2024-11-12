import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./AdvanceMaster.css";

const AdvanceMaster = () => {
    const [contractors, setContractors] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedContractor, setSelectedContractor] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("Loading...");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [advanceData, setAdvanceData] = useState([]);
    const [noDataMessage, setNoDataMessage] = useState("");

    useEffect(() => {
        fetchContractors();
    }, []);

    const fetchContractors = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/contractors"); // Ensure the URL matches backend
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
            const response = await axios.get("http://localhost:5000/api/advances", {
                params: { contractorName: selectedContractor, month: selectedMonth }
            });
            if (response.data.message) {
                setAdvanceData([]);
                setNoDataMessage(response.data.message);
            } else {
                setAdvanceData(response.data);
                setNoDataMessage("");
            }
        } catch (error) {
            console.error("Failed to fetch advance data:", error);
        }
    };

    const handleExportToExcel = () => {
        const dataToExport = advanceData.map((advance, index) => ({
            "Sr. No.": index + 1,
            "Name of the Workmen": advance.nameOfWorkman,
            "Father's / Husband's Name": advance.fatherHusbandName,
            "Date Of Advance": new Date(advance.dateOfAdvance).toLocaleDateString(),
            "Sex": advance.gender,
            "Nature of Employment/Designation": advance.designationOfEmployment,
            "Wage Period and Wages Payable": advance.wagesPeriods,
            "Amount of Advance Made": advance.advanceAmount,
            "Purpose(s) for which Advance Made": advance.advancePurpose,
            "No. of Instalments": advance.instalmentNumber,
            "Date & Amount of Each Instalment Repaid": advance.dateOfInstalment,
            "Date on Which Last Instalment was Repaid": advance.dateOfLastInstalment,
            "Remark": advance.remarks
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Advances");
        XLSX.writeFile(workbook, "AdvanceData.xlsx");
    };

    const handlePrint = () => {
        // Get the HTML content of the table
        const tableContent = document.getElementById("advancesTable").outerHTML;
    
        // Create a new window for printing
        const printWindow = window.open("", "_blank");
        printWindow.document.open();
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Table</title>
                    <style>
                        /* Add print-specific styling */
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #5D0E41;
                            color: white;
                        }
                        tr:nth-child(even) {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Register of Advances</h1>
                    ${tableContent} <!-- Inject the table content here -->
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    
    return (
        <div className="main-container">
            <div className="container">
                <header className="header-box">
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>FORM XX</div>
                <div style={{ fontSize: '16px' }}>78 (i) (A) (ii)</div>
                <h1 style={{ fontSize: '24px', margin: '10px 0', color: 'white' }}>Register of Advances</h1>

                </header>
                <div className="search-bar mb-4">
                <select
    id="contractorSearch"
    className="form-control me-2"
    value={selectedContractor}
    onChange={handleContractorChange}
    style={{ width: '200px', height: '60px' ,marginLeft:'10%'}} // Adjust width and height as needed
>
    <option value="">Select Contractor</option>
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
                    <div className="right-info">
                        <p><strong>Principal Employer:</strong> M/S ADS CONSULTANCY AND ENGINEERING SERVICES</p>
                    </div>
                </div>
                <div className="tableContainer">
                    <table id="advancesTable">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name of the Workmen</th>
                                <th>Father's / Husband's Name</th>
                                <th>Date Of Advance</th>
                                <th>Sex</th>
                                <th>Nature of Employment/Designation</th>
                                <th>Wage Period and Wages Payable</th>
                                <th>Amount of Advance Made</th>
                                <th>Purpose(s) for which Advance Made</th>
                                <th>No. of Instalments</th>
                                <th>Date & Amount of Each Instalment Repaid</th>
                                <th>Date on Which Last Instalment was Repaid</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advanceData.length > 0 ? (
                                advanceData.map((advance, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{advance.nameOfWorkman}</td>
                                        <td>{advance.fatherHusbandName}</td>
                                        <td>{new Date(advance.dateOfAdvance).toLocaleDateString()}</td>
                                        <td>{advance.gender}</td>
                                        <td>{advance.designationOfEmployment}</td>
                                        <td>{advance.wagesPeriods}</td>
                                        <td>{advance.advanceAmount}</td>
                                        <td>{advance.advancePurpose}</td>
                                        <td>{advance.instalmentNumber}</td>
                                        <td>{advance.dateOfInstalment}</td>
                                        <td>{advance.dateOfLastInstalment}</td>
                                        <td>{advance.remarks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13" style={{ textAlign: "center", color: "red" }}>
                                        {noDataMessage || "No data found for the selected month."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="action-buttons">
                    <button id="exportButton" className="btn btn-success me-2" onClick={handleExportToExcel}>Export to Excel</button>
                    <button id="printButton" className="btn btn-secondary" onClick={handlePrint}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default AdvanceMaster;
