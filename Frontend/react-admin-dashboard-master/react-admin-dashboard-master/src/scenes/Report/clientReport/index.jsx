/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import {Box,Button,useTheme,Typography,Paper,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,IconButton,TableFooter,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import { tokens } from "../../../theme";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const ClientReport = () => {
  const [searchPhone, setSearchPhone] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [total, setTotal] = useState(0);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const printContentRef = useRef();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchProjectNo = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Projects/searchProjectNo/?prNo=${searchPhone}`);
      const data = await response.json();
      setProjects(data);
      if (data.length > 0) {
        const clientId = data[0].client;
        fetchClientData(clientId);
        fetchInvoicesByProjectNo(data[0].project_No);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const fetchClientData = async (clientId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Client/view/${clientId}`);
      const clientData = await response.json();
      setClients([clientData]);
      setSelectedClient(clientData);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  const fetchInvoicesByProjectNo = async (projectNo) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/invoice_reciept/get_invoices_by_ProjectNO/?prNo=${projectNo}`);
      const invoiceData = await response.json();
      setInvoices(invoiceData);
      calculateTotal(invoiceData);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  const calculateTotal = (invoiceData) => {
    const totalAmount = invoiceData.reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
    setTotal(totalAmount);
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Payment_Methode/");
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const handleSearch = () => {
    if (searchPhone.trim() === "") {
      setShowResults(false);
      setSelectedClient(null);
      setProjects([]);
      setInvoices([]);
      setTotal(0);
    } else {
      fetchProjectNo();
    }
  };

  const handlePrint = () => {
    const originalContent = document.body.innerHTML;
    const printContent = printContentRef.current.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <Box
      style={{ backgroundColor: "#5F6368", minHeight: "100vh", padding: "20px" }}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h2" color="white">Invoice</Typography>
        <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
          Print Invoice
        </Button>
      </Box>
      {!showResults ? (
        <Paper elevation={2} style={{ backgroundColor: "#141B2D", padding: "5px", width: "50%" }}>
          <Box display="flex" alignItems="center">
            <InputBase
              style={{ flex: 1, color: "white" }}
              placeholder="Enter client Project number"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        <Paper ref={printContentRef} elevation={3} sx={{ padding: "20px", color: "black", bgcolor: "#FFFFFF" }}>
          <Box>
            {selectedClient && (
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <img alt="Design Image" src={`/assets/city logo.png`} width= '250px' height= '100px' />
                </Box>
                <Box textAlign="right">
                  <Typography variant="h3" color="black">Client</Typography>
                  <address>
                    {selectedClient.client_name}<br />
                    {selectedClient.phone}<br />
                  </address>
                </Box>
              </Box>
            )}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "1%" }}>
                      <Typography variant="body1" color="black">#</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" color="black">Payment Method</Typography>
                    </TableCell>
                    <TableCell style={{ width: "10%" }} align="center">
                      <Typography variant="body1" color="black">Amount</Typography>
                    </TableCell>
                    <TableCell style={{ width: "10%", mr: '5px' }} align="center">
                      <Typography variant="body1" color="black">Date</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice, cl) => {
                    const paymentMethod = paymentMethods.find((method) => method.id === invoice.payment_method);
                    return (
                      <TableRow key={cl}>
                        <TableCell>
                          <Typography variant="body1" color="black">{cl + 1}</Typography>
                        </TableCell>
                        <TableCell>
                          <img src={`/assets/payment-method/${paymentMethod.pay_method_image}`} alt="Payment Method" style={{ width: 50, height: 50 }} />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1" color='black'>$ {invoice.amount}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1" color="black">{invoice.issue_date}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} align="right">
                      <Typography variant="body1" color='black'>Total:</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" color='black'>$ {total}</Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Typography variant="body2" align="center" color="black" mt={5}>
              Thank you very much for doing business with us. We look forward to working with you again!
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ClientReport;
