/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { Print } from "@mui/icons-material";

const ReceiptPage = () => {
    const [companyName, setCompanyName] = useState("City Construction");
    const [companyAddress, setCompanyAddress] = useState("Somalia");
    const [client, setClient] = useState({});
    const [invoiceReceipt, setInvoiceReceipt] = useState({});
    const [paymentMethod, setPaymentMethod] = useState({});
    const path = window.location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const invoiceUrl = await fetch(`http://127.0.0.1:8000/invoice_reciept/view/${id}`);
                const invoiceData = await invoiceUrl.json();
                setInvoiceReceipt(invoiceData);

                const clientUrl = await fetch(`http://127.0.0.1:8000/Client/view/${invoiceData.client}`);
                const clientData = await clientUrl.json();
                setClient(clientData);

                const paymentMethodUrl = await fetch(`http://127.0.0.1:8000/Payment_Methode/view/${invoiceData.payment_method}`);
                const paymentMethodData = await paymentMethodUrl.json();
                setPaymentMethod(paymentMethodData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);
    const printContentRef = useRef();
    const handlePrint = () => {
      const content = printContentRef.current.innerHTML;
     document.body.innerHTML= content; 
      window.print();
      window.location.reload();
    };

    return (
        <Box
          style={{ backgroundColor: "#5F6368", minHeight: "100vh", padding: "20px" }}
          display="flex"
          flexDirection="column"
        >
          
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h2" color="white">Invoice</Typography>
                <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
                  Print Invoice
                </Button>
              </Box>
              <Box>
              <Paper ref={printContentRef} elevation={3} sx={{ padding: "20px", color: "black", bgcolor: "#FFFFFF" }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <img alt="Design Image" src={`/assets/city logo.png`} width= '250px' height= '100px' />
                    </Box>
                    </Box>
                    <Box textAlign="right" color="black">
                      <Typography variant="h3" >Client</Typography>
                      <address >
                        {client.client_name}<br />
                        {client.phone}<br />
                      </address>
                    </Box>
                  </Box>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell ><Typography variant="body1" color="black">#</Typography></TableCell>
                        <TableCell><Typography variant="body1" color="black">Payment Method</Typography></TableCell>
                        <TableCell><Typography variant="body1" color="black">Amount</Typography></TableCell>
                        <TableCell><Typography variant="body1" color="black">Date</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                          <TableRow>
                            <TableCell><Typography variant="body1" color="black">1</Typography></TableCell>
                            <TableCell>
                          <img src={`/assets/payment-method/${paymentMethod.pay_method_image}`} alt="Payment Method" style={{ width: 50, height: 50 }} />
                        </TableCell>
                            <TableCell><Typography variant="body1" color="black">{invoiceReceipt.amount}</Typography></TableCell>
                            <TableCell><Typography variant="body1" color="black">{invoiceReceipt.issue_date}</Typography></TableCell>
                          </TableRow>
                        
                                     </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="body2" align="center" color="black" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
              </Paper>
              </Box>
            </Box>
          </Box>
      );
};

export default ReceiptPage;
