// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { QRCodeCanvas } from "qrcode.react";
// import "./WorkerIdCard.css";

// const WorkerIdCard = () => {
//     const [workerId, setWorkerId] = useState("");
//     const [contractors, setContractors] = useState([]);
//     const [selectedContractor, setSelectedContractor] = useState("");
//     const [workerData, setWorkerData] = useState(null);
//     const [validity, setValidity] = useState("3 months");

//     const printRef = useRef();

//     // Fetch contractor names on component mount
//     useEffect(() => {
//         fetchContractors();
//     }, []);

//     const fetchContractors = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/workers/contractors");
//             setContractors(response.data.map(item => item.contractorName));
//         } catch (error) {
//             console.error("Error fetching contractor names:", error);
//         }
//     };

//     const fetchWorkerData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/workers/${workerId}`);
//             setWorkerData([response.data]); // Wrap in an array for consistency
//         } catch (error) {
//             console.error("Error fetching worker data:", error);
//         }
//     };

//     const fetchWorkersByContractor = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/workers/contractor/${selectedContractor}`);
//             setWorkerData(response.data); // Multiple workers
//         } catch (error) {
//             console.error("Error fetching workers by contractor:", error);
//         }
//     };

//     const handleSearch = () => {
//         if (workerId) {
//             fetchWorkerData();
//         } else if (selectedContractor) {
//             fetchWorkersByContractor();
//         } else {
//             alert("Please enter a Worker ID or select a Contractor.");
//         }
//     };

//     const calculateAge = (dateOfBirth) => {
//         const birthDate = new Date(dateOfBirth);
//         const today = new Date();
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//         return age;
//     };

//     const handlePrint = () => {
//         const printContent = printRef.current;
//         const printWindow = window.open("", "_blank");
//         printWindow.document.write("<html><head><title>Print ID Cards</title>");
//         printWindow.document.write(
//             `<style>
//                 @page { size: A4; margin: 0; }
//                 body { margin: 0; display: flex; flex-wrap: wrap; justify-content: center; }
//                 .id-card { width: 48%; height: auto; margin: 5px; padding: 10px; border: 1px solid #ddd; box-sizing: border-box; }
//                 .photo { width: 30px; height: 35px; object-fit: cover; margin: auto; display: block; }
//                 .qr-code { width: 50px !important; height: 50px !important; }
//                 h2 { font-size: 12px; text-align: center; margin-bottom: 5px; }
//                 p { font-size: 10px; margin: 2px 0; }
//             </style>`
//         );
//         printWindow.document.write("</head><body>");
//         printWindow.document.write(printContent.innerHTML);
//         printWindow.document.write("</body></html>");
//         printWindow.document.close();
//         printWindow.print();
//     };


//     return (
//         <div className="container">
//             <h1>Worker ID Cards</h1>
//             <input
//                 type="text"
//                 placeholder="Enter Worker ID"
//                 value={workerId}
//                 onChange={(e) => setWorkerId(e.target.value)}
//                 id="workerIdInput"
//             />
//             <select
//                 value={selectedContractor}
//                 onChange={(e) => setSelectedContractor(e.target.value)}
//             >
//                 <option value="">Select Contractor</option>
//                 {contractors.map((name, index) => (
//                     <option key={index} value={name}>{name}</option>
//                 ))}
//             </select>
//             <select value={validity} onChange={(e) => setValidity(e.target.value)}>
//                 <option value="3 months">3 Months</option>
//                 <option value="6 months">6 Months</option>
//                 <option value="12 months">12 Months</option>
//             </select>
//             <button onClick={handleSearch}>Search</button>
//             <button
//                 id="printBtn"
//                 onClick={handlePrint}
//                 style={{
//                     marginLeft: "10px",
//                     backgroundColor: "#5d014",
//                     color: "white",
//                     padding: "8px 16px",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                     fontSize: "16px",
//                 }}
//             >
//                 Print
//             </button>

//             <div ref={printRef} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//                 {workerData && workerData.map((worker, index) => (
//                     <div
//                         key={index}
//                         className="id-card"
//                         style={{
//                             width: "48%",
//                             margin: "5px",
//                             padding: "10px",
//                             border: "1px solid #ddd",
//                             boxSizing: "border-box"
//                         }}
//                     >
//                         <div className="left-section">
//                             <img
//                                 src={worker.capturedPhoto || "default.jpg"}
//                                 alt="Worker"
//                                 className="photo"
//                                 style={{ width: "40px", height: "45px", objectFit: "cover", margin: "auto", display: "block" }}
//                             />
//                             <div>
//                                 <h2 style={{ fontSize: "12px", textAlign: "center", marginBottom: "5px" }}>IDENTITY CARD</h2>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Contractor Name:</strong> {worker.contractorName}</p>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>First Name:</strong> {worker.firstName}</p>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Middle Name:</strong> {worker.middleName}</p>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Last Name:</strong> {worker.lastName}</p>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>BOCW Reg.:</strong> {worker.bocwReg}</p>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Issue Date:</strong> {worker.issueDate}</p>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Validity:</strong> {validity}</p>
//                                 <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>ID:</strong> {worker.workerId}</p>
//                             </div>
//                         </div>
//                         <div className="right-section">
//                             <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Gender:</strong> {worker.gender}</p>
//                             <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Designation:</strong> {worker.designation}</p>
//                             <p style={{ fontSize: "10px", margin: "2px 0" }}><strong> Contact:</strong> {worker.phoneNumber}</p>
//                             <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Age:</strong> {calculateAge(worker.dateOfBirth)}</p>
//                             <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Date of Birth:</strong> {worker.dateOfBirth}</p>
//                             <div className="qr-code-container">
//                                 <QRCodeCanvas value={JSON.stringify(worker.qrCodeJson)} size={80} />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default WorkerIdCard;






import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import QRCode from "qrcode";
import "./WorkerIdCard.css";

const WorkerIdCard = () => {
    const [workerId, setWorkerId] = useState("");
    const [contractors, setContractors] = useState([]);
    const [selectedContractor, setSelectedContractor] = useState("");
    const [workerData, setWorkerData] = useState([]);
    const [validity, setValidity] = useState("3 months");
    const printRef = useRef();

    useEffect(() => {
        fetchContractors();
    }, []);

    const fetchContractors = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/workers/contractors");
            setContractors(response.data.map(item => item.contractorName));
        } catch (error) {
            console.error("Error fetching contractor names:", error);
        }
    };

    const fetchWorkerData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/workers/${workerId}`);
            const worker = response.data;
            const qrCodeUrl = await generateQrCodeUrl(worker.qrCodeJson);
            setWorkerData([{ ...worker, qrCodeUrl }]);
        } catch (error) {
            console.error("Error fetching worker data:", error);
        }
    };

    const fetchWorkersByContractor = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/workers/contractor/${selectedContractor}`);
            const workersWithQr = await Promise.all(
                response.data.map(async (worker) => ({
                    ...worker,
                    qrCodeUrl: await generateQrCodeUrl(worker.qrCodeJson)
                }))
            );
            setWorkerData(workersWithQr);
        } catch (error) {
            console.error("Error fetching workers by contractor:", error);
        }
    };

    const handleSearch = () => {
        if (workerId) {
            fetchWorkerData();
        } else if (selectedContractor) {
            fetchWorkersByContractor();
        } else {
            alert("Please enter a Worker ID or select a Contractor.");
        }
    };

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const generateQrCodeUrl = async (data) => {
        try {
            // Generate QR code with higher resolution and error correction
            const dataUrl = await QRCode.toDataURL(JSON.stringify(data), {
                width: 200,            // Higher resolution
                margin: 1,             // Minimal margin
                errorCorrectionLevel: 'H' // High error correction for better readability
            });
            return dataUrl;
        } catch (error) {
            console.error("Error generating QR code:", error);
            return "";
        }
    };

    const handlePrint = () => {
        const printContent = printRef.current;
        const printWindow = window.open("", "_blank");
        printWindow.document.write("<html><head><title>Print ID Cards</title>");
        printWindow.document.write(
            `<style>
                @page { size: A4; margin: 0; }
                body { margin: 0; display: flex; flex-wrap: wrap; justify-content: center; }
                .id-card { width: 48%; height: auto; margin: 5px; padding: 10px; border: 1px solid #ddd; box-sizing: border-box; }
                .photo { width: 30px; height: 35px; object-fit: cover; margin: auto; display: block; }
                .qr-code { width: 80px; height: 80px; } /* Larger QR code for printing */
                h2 { font-size: 12px; text-align: center; margin-bottom: 5px; }
                p { font-size: 10px; margin: 2px 0; }
            </style>`
        );
        printWindow.document.write("</head><body>");
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="container">
            <h1>Worker ID Cards</h1>
            <input
                type="text"
                placeholder="Enter Worker ID"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                id="workerIdInput"
            />
            <select
                value={selectedContractor}
                onChange={(e) => setSelectedContractor(e.target.value)}
            >
                <option value="">Select Contractor</option>
                {contractors.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
            </select>
            <select value={validity} onChange={(e) => setValidity(e.target.value)}>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="12 months">12 Months</option>
            </select>
            <button onClick={handleSearch}>Search</button>
            <button
                id="printBtn"
                onClick={handlePrint}
                style={{
                    marginLeft: "10px",
                    backgroundColor: "#5d014",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Print
            </button>

            <div ref={printRef} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {workerData && workerData.map((worker, index) => (
                    <div
                        key={index}
                        className="id-card"
                        style={{
                            width: "48%",
                            margin: "5px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            boxSizing: "border-box"
                        }}
                    >
                        <div className="left-section">
                            <img
                                src={worker.capturedPhoto || "default.jpg"}
                                alt="Worker"
                                className="photo"
                                style={{ width: "40px", height: "45px", objectFit: "cover", margin: "auto", display: "block" }}
                            />
                            <div>
                                <h2 style={{ fontSize: "12px", textAlign: "center", marginBottom: "5px" }}>IDENTITY CARD</h2>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Contractor Name:</strong> {worker.contractorName}</p>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>First Name:</strong> {worker.firstName}</p>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Middle Name:</strong> {worker.middleName}</p>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Last Name:</strong> {worker.lastName}</p>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>BOCW Reg.:</strong> {worker.bocwReg}</p>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Issue Date:</strong> {worker.issueDate}</p>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Validity:</strong> {validity}</p>
                                <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>ID:</strong> {worker.workerId}</p>
                            </div>
                        </div>
                        <div className="right-section">
                            <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Gender:</strong> {worker.gender}</p>
                            <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Designation:</strong> {worker.designation}</p>
                            <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Emergency Contact:</strong> {worker.phoneNumber}</p>
                            <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Age:</strong> {calculateAge(worker.dateOfBirth)}</p>
                            <p style={{ fontSize: "10px", margin: "2px 0" }}><strong>Date of Birth:</strong> {worker.dateOfBirth}</p>
                            <div className="qr-code-container">
                                {worker.qrCodeUrl ? (
                                    <img src={worker.qrCodeUrl} alt="QR Code" className="qr-code" style={{ width: "80px", height: "80px" }} />
                                ) : (
                                    <p>QR Code not available</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkerIdCard;