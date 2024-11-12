
// // frontend/src/components/FineMaster.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import "./FineMaster.css";

// const FineMaster = () => {
//     const [contractors, setContractors] = useState([]);
//     const [addresses, setAddresses] = useState([]);
//     const [selectedContractor, setSelectedContractor] = useState("");
//     const [selectedMonth, setSelectedMonth] = useState("");
//     const [fineData, setFineData] = useState([]);
//     const [noDataMessage, setNoDataMessage] = useState("");

//     useEffect(() => {
//         fetchContractors();
//     }, []);

//     // Fetch contractor names and addresses on component mount
//     const fetchContractors = async () => {
//         try {
//             const response = await axios.get("/api/contractors");
//             const { contractorNames, addresses } = response.data;
//             setContractors(contractorNames);
//             setAddresses(addresses);
//         } catch (error) {
//             console.error("Failed to fetch contractor names:", error);
//         }
//     };

//     const handleContractorChange = (event) => {
//         const contractorName = event.target.value;
//         setSelectedContractor(contractorName);
//         const contractorIndex = contractors.indexOf(contractorName);
//         setAddresses(contractorIndex !== -1 ? addresses[contractorIndex] : "Loading...");
//     };

//     // Fetch fine data based on selected contractor and month when "Search" button is clicked
//     const handleSearch = async () => {
//         if (!selectedContractor || !selectedMonth) {
//             alert("Please select both contractor and month.");
//             return;
//         }
//         try {
//             console.log("Fetching fines for contractor:", selectedContractor, "and month:", selectedMonth);
//             const response = await axios.get("/api/fines", {
//                 params: { contractorName: selectedContractor, month: selectedMonth }
//             });
//             console.log("Response Data:", response.data);
//             setFineData(response.data.message ? [] : response.data);
//             setNoDataMessage(response.data.message || "");
//         } catch (error) {
//             console.error("Failed to fetch fine data:", error);
//         }
//     };
    

//     const handleExportToExcel = () => {
//         const dataToExport = fineData.map((fine, index) => ({
//             "Sr. No.": index + 1,
//             "Worker Id": fine.workerId,
//             "Name of the workmen": fine.nameOfWorkmen,
//             "Designation": fine.designation,
//             "Act/Omission": fine.actOmission,
//             "Date of Offence": fine.dateOfOffence,
//             "Showed Cause": fine.showedCause,
//             "Person Present": fine.personPresent,
//             "Wage Period": fine.wagesPeriods,
//             "Fine Amount": fine.fineAmount,
//             "Realised Date": fine.fineRealisedDate,
//             "Remarks": fine.remarks
//         }));
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Fines");
//         XLSX.writeFile(workbook, "FineData.xlsx");
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="main-container">
//             <div className="container">
//                 <header className="header-box">
//                     <h1>Register of Fines</h1>
//                 </header>

//                 <div className="search-bar mb-4">
//                     <select
//                         id="contractorSearch"
//                         className="form-control me-2"
//                         value={selectedContractor}
//                         onChange={handleContractorChange}
//                     >
//                         <option value="">Select Contractor...</option>
//                         {contractors.map((contractor, index) => (
//                             <option key={index} value={contractor}>{contractor}</option>
//                         ))}
//                     </select>
//                     <input
//                         type="month"
//                         id="monthSearch"
//                         className="form-control me-2"
//                         value={selectedMonth}
//                         onChange={(e) => setSelectedMonth(e.target.value)}
//                     />
//                     <button id="searchBtn" className="btn btn-primary" onClick={handleSearch}>Search</button>
//                 </div>

//                 <div className="tableContainer">
//                     <table id="fineTable">
//                         <thead>
//                             <tr>
//                                 <th>Sr. No.</th>
//                                 <th>Worker Id</th>
//                                 <th>Name of the workmen</th>
//                                 <th>Designation</th>
//                                 <th>Act/Omission</th>
//                                 <th>Date of Offence</th>
//                                 <th>Showed Cause</th>
//                                 <th>Person Present</th>
//                                 <th>Wage Period</th>
//                                 <th>Fine Amount</th>
//                                 <th>Realised Date</th>
//                                 <th>Remarks</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {fineData.length > 0 ? (
//                                 fineData.map((fine, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>{fine.workerId}</td>
//                                         <td>{fine.nameOfWorkmen}</td>
//                                         <td>{fine.designation}</td>
//                                         <td>{fine.actOmission}</td>
//                                         <td>{fine.dateOfOffence}</td>
//                                         <td>{fine.showedCause}</td>
//                                         <td>{fine.personPresent}</td>
//                                         <td>{fine.wagesPeriods}</td>
//                                         <td>{fine.fineAmount}</td>
//                                         <td>{fine.fineRealisedDate}</td>
//                                         <td>{fine.remarks}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="12" style={{ textAlign: "center", color: "red" }}>
//                                         {noDataMessage || "No data found for the selected month."}
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="export-print-container">
//                     <button id="exportButton" className="btn btn-success" onClick={handleExportToExcel}>Export to Excel</button>
//                     <button id="printButton" className="btn btn-secondary" onClick={handlePrint}>Print</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FineMaster;



// frontend/src/components/FineMaster.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./FineMaster.css";

const FineMaster = () => {
    const [contractors, setContractors] = useState([]);
    const [selectedContractor, setSelectedContractor] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [fineData, setFineData] = useState([]);
    const [noDataMessage, setNoDataMessage] = useState("");

    useEffect(() => {
        fetchContractors();
    }, []);

    // Fetch contractor names on component mount
    const fetchContractors = async () => {
        try {
            const response = await axios.get("/api/contractors");
            const { contractorNames } = response.data;
            setContractors(contractorNames);
        } catch (error) {
            console.error("Failed to fetch contractor names:", error);
        }
    };

    const handleSearch = async () => {
        if (!selectedContractor || !selectedMonth) {
            alert("Please select both contractor and month.");
            return;
        }
        try {
            const response = await axios.get("/api/fines", {
                params: { contractorName: selectedContractor, month: selectedMonth }
            });
            setFineData(response.data.message ? [] : response.data);
            setNoDataMessage(response.data.message || "");
        } catch (error) {
            console.error("Failed to fetch fine data:", error);
        }
    };

    const handleExportToExcel = () => {
        const dataToExport = fineData.map((fine, index) => ({
            "Sr. No.": index + 1,
            "Worker Id": fine.workerId,
            "Name of the workmen": fine.nameOfWorkmen,
            "Designation": fine.designationNatureOfEmployment,
            "Act/Omission": fine.actOmission,
            "Date of Offence": fine.dateOfOffence,
            "Showed Cause": fine.showedCause,
            "Person Present": fine.personInPresence,
            "Wage Period": fine.wagesPeriodsWagesPayable,
            "Fine Amount": fine.amountOfFine,
            "Realised Date": fine.fineRealisedDate,
            "Remarks": fine.remarks
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Fines");
        XLSX.writeFile(workbook, "FineData.xlsx");
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="main-container">
            <div className="container">
                <header className="header-box">
                    <h1>Register of Fines</h1>
                </header>

                <div className="search-bar mb-4">
                    <select
                        id="contractorSearch"
                        className="form-control me-2"
                        value={selectedContractor}
                        onChange={(e) => setSelectedContractor(e.target.value)}
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

                <div className="tableContainer">
                    <table id="fineTable">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Worker Id</th>
                                <th>Name of the workmen</th>
                                <th>Designation</th>
                                <th>Act/Omission</th>
                                <th>Date of Offence</th>
                                <th>Showed Cause</th>
                                <th>Person Present</th>
                                <th>Wage Period</th>
                                <th>Fine Amount</th>
                                <th>Realised Date</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fineData.length > 0 ? (
                                fineData.map((fine, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{fine.workerId}</td>
                                        <td>{fine.nameOfWorkman}</td>
                                        <td>{fine.designationNatureOfEmployment}</td>
                                        <td>{fine.actOmission}</td>
                                        <td>{fine.dateOfOffence}</td>
                                        <td>{fine.showedCause}</td>
                                        <td>{fine.personInPresence}</td>
                                        <td>{fine.wagesPeriodsWagesPayable}</td>
                                        <td>{fine.amountOfFine}</td>
                                        <td>{fine.fineRealisedDate || "N/A"}</td>
                                        <td>{fine.remarks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" style={{ textAlign: "center", color: "red" }}>
                                        {noDataMessage || "No data found for the selected month."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="export-print-container">
                    <button id="exportButton" className="btn btn-success" onClick={handleExportToExcel}>Export to Excel</button>
                    <button id="printButton" className="btn btn-secondary" onClick={handlePrint}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default FineMaster;

