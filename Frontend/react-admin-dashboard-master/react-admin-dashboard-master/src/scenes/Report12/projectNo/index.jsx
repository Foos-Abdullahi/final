// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TextField,
//   IconButton,
//   TableFooter
// } from "@mui/material";
// import { Print } from "@mui/icons-material";

// import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";

// const ClientReport = () => {
//   const [companyName, setCompanyName] = useState("City Construction");
//   const [companyAddress, setCompanyAddress] = useState("Somalia");
//   const [searchPhone, setSearchPhone] = useState("");
//   const [invoices, setInvoices] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     fetchClients();
//     fetchPaymentMethods();
//   }, []);

//   const fetchInvoices = async () => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/invoice_reciept/get_invoices_by_phone/?phone=${searchPhone}`
//       );
//       const data = await response.json();
//       setInvoices(data);
//       setShowResults(true);
//       console.log(data);
//       // Calculate total amount
//       let totalAmount = 0;
//       for (let i = 0; i < data.length; i++) {
//         totalAmount += parseFloat(data[i].amount);
//       }
//       setTotal(totalAmount);
    
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//     }
//   };

//   const fetchClients = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Client/");
//       const data = await response.json();
//       setClients(data);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//     }
//   };

//   const fetchPaymentMethods = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Payment_Methode/");
//       const data = await response.json();
//       setPaymentMethods(data);
//     } catch (error) {
//       console.error("Error fetching payment methods:", error);
//     }
//   };

//   const handleSearch = () => {
//     fetchInvoices();
//     const client = clients.find((client) => client.phone === searchPhone);
//     setSelectedClient(client);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   // const calculateTotalAmount = (invoices) => {
//   //   const total = invoices.reduce((acc, curr) => acc + curr.amount, 0);
    
//   //   setTotalAmount(total);
//   // };

// //   return (
// //     <Box
// //       style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
// //       display="flex"
// //       flexDirection="column"
// //     >
// //       {showResults ? (
// //         <Box>
// //           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //             <Typography variant="h2" color="white">Invoice</Typography>
// //             <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
// //               Print Invoice
// //             </Button>
// //           </Box>
// //           <Box>
// //             {selectedClient && (
// //               <Box display="flex" justifyContent="space-between">
// //                 <Box>
// //                   <Typography variant="h3" color="white">Company</Typography>
// //                   <address>
// //                     Street Address<br />
// //                     State, City<br />
// //                     Region, Postal Code<br />
// //                     ltd@example.com
// //                   </address>
// //                 </Box>
// //                 <Box textAlign="right">
// //                   <Typography variant="h3" color="white">Client</Typography>
// //                   <address>
// //                     {selectedClient.client_name}<br />
// //                     {selectedClient.phone}<br />
// //                   </address>
// //                 </Box>
// //               </Box>
// //             )}
// //             <TableContainer>
// //               <Table>
// //                 <TableHead>
// //                   <TableRow>
// //                     <TableCell style={{ width: "1%" }}><Typography variant="body1" color="white">#</Typography></TableCell>
// //                     <TableCell><Typography variant="body1" color="white">Payment Method</Typography></TableCell>
// //                     <TableCell style={{ width: "1%" }} align="center"><Typography variant="body1" color="white">Amount</Typography></TableCell>
// //                     <TableCell style={{ width: "1%" }} align="right"><Typography variant="body1" color="white">Date</Typography></TableCell>
// //                   </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                   {invoices.map((invoice, index) => {
// //                     const paymentMethod = paymentMethods.find((method) => method.id === invoice.payment_method);
// //                     return (
// //                       <TableRow key={index}>
// //                         <TableCell><Typography variant="body1" color="white">{index + 1}</Typography></TableCell>
// //                         <TableCell><Typography variant="body1" color="white">{paymentMethod ? paymentMethod.Py_method_name : 'Unknown'}</Typography></TableCell>
// //                         <TableCell align="center"><Typography variant="body1" color="white">{invoice.amount}</Typography></TableCell>
// //                         <TableCell align="right"><Typography variant="body1" color="white">{invoice.issue_date}</Typography></TableCell>
// //                       </TableRow>
// //                     );
// //                   })}
// //                 </TableBody>
// //                 <TableFooter>
// //                   <TableRow>
// //                     <TableCell colSpan={2} align="right"><Typography variant="body1" color="white">Total:</Typography></TableCell>
// //                     <TableCell align="center"><Typography variant="body1" color="white">{total}</Typography></TableCell>
// //                     <TableCell></TableCell>
// //                   </TableRow>
// //                 </TableFooter>
// //               </Table>
// //             </TableContainer>
// //             <Typography variant="body2" align="center" color="white" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
// //           </Box>
// //         </Box>
// //       ) : (
// //         <Paper elevation={2} style={{ backgroundColor: "#141B2D", padding: "5px", width: "200px" }}>
// //           <Box display="flex" alignItems="center">
// //             <InputBase
// //               style={{ flex: 1, color: "white" }}
// //               placeholder="Enter client phone number"
// //               value={searchPhone}
// //               onChange={(e) => setSearchPhone(e.target.value)}
// //             />
// //             <IconButton onClick={handleSearch}>
// //               <SearchIcon style={{ color: "white" }} />
// //             </IconButton>
// //           </Box>
// //         </Paper>
// //       )}
// //     </Box>
// //   );
// };

// export default ClientReport;
