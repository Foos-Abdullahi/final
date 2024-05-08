import React, { useState, useEffect } from "react";
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

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box
          style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
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
                
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="h3" color="white">Company</Typography>
                      <address>
                        Street Address<br />
                        State, City<br />
                        Region, Postal Code<br />
                        ltd@example.com
                      </address>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="h3" color="white">Client</Typography>
                      <address>
                        {client.client_name}<br />
                        {client.phone}<br />
                      </address>
                    </Box>
                  </Box>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: "1%" }}><Typography variant="body1" color="white">#</Typography></TableCell>
                        <TableCell><Typography variant="body1" color="white">Payment Method</Typography></TableCell>
                        <TableCell style={{ width: "1%" }} align="center"><Typography variant="body1" color="white">Amount</Typography></TableCell>
                        <TableCell style={{ width: "1%" }} align="right"><Typography variant="body1" color="white">Date</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      
                          <TableRow>
                            <TableCell><Typography variant="body1" color="white">1</Typography></TableCell>
                            <TableCell>
                          <img src={`/assets/payment-method/${paymentMethod.pay_method_image}`} alt="Payment Method" style={{ width: 50, height: 50 }} />
                        </TableCell>
                            <TableCell align="center"><Typography variant="body1" color="white">{invoiceReceipt.amount}</Typography></TableCell>
                            <TableCell align="right"><Typography variant="body1" color="white">{invoiceReceipt.issue_date}</Typography></TableCell>
                          </TableRow>
                        
                                     </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="body2" align="center" color="white" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
              </Box>
            </Box>
          </Box>
      );
};

export default ReceiptPage;
