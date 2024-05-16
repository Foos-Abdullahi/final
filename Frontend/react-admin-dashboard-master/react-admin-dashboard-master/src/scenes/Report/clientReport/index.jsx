
import React, { useState, useEffect, useRef } from "react";
import {
  Box,Button,useTheme,Typography,Paper,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,IconButton,
TableFooter
} from "@mui/material";
import { Print } from "@mui/icons-material";
import { tokens } from "../../../theme";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const ClientReport = () => {
  // const [companyName, setCompanyName] = useState("City Construction");
  // const [companyAddress, setCompanyAddress] = useState("Somalia");
  const [searchPhone, setSearchPhone] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // fetchClients();
    fetchPaymentMethods();
  }, []);
  const fetchProjectNo = async() =>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/Projects/searchProjectNo/?prNo=${searchPhone}`)
      const data = await response.json();
      setProjects(data);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const element = data[i].client;
        const projectNo = data[i].project_No;
        console.log("Client Id",element);
        console.log("projectNo : ",projectNo);
        const response = await fetch(`http://127.0.0.1:8000/Client/view/${element}`);
        const Clientdata = await response.json();
        setClients(Clientdata);
        console.log("Client Data ", Clientdata.phone);
        const phone = Clientdata.phone
        const Invoiceresponse = await fetch(
          `http://127.0.0.1:8000/invoice_reciept/get_invoices_by_ProjectNO/?prNo=${projectNo}`
        );
        const Invoicedata = await Invoiceresponse.json();
        setInvoices(Invoicedata);
        
        setShowResults(true);
        console.log("Invoice Data",Invoicedata);
        // Calculate total amount
        let totalAmount = 0;
        // totalAmount += parseFloat(Invoicedata[i].amount);
        for (let i = 0; i < Invoicedata.length; i++) {
          totalAmount += parseFloat(Invoicedata[i].amount);
        }
        setTotal(totalAmount);

        // for (let cl = 0; cl < Clientdata.length; cl++) {
        //   const element = Clientdata[cl].phone;
        //   console.log("Client Phone",element);
        // }
        
      }
    } catch (error) {
      
    }
  }
  const fetchInvoices = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/invoice_reciept/get_invoices_by_phone/?phone=${searchPhone}`
      );
      const data = await response.json();
      setInvoices(data);
      setShowResults(true);
      console.log(data);
      // Calculate total amount
      let totalAmount = 0;
      for (let i = 0; i < data.length; i++) {
        totalAmount += parseFloat(data[i].amount);
      }
      setTotal(totalAmount);
    
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSearch = () => {
    // fetchInvoices();
    const client = clients.find((client) => client.phone === searchPhone);
    setSelectedClient(client);
    fetchProjectNo()
  };
  const printContentRef = useRef();
  const handlePrint = () => {
    const content = printContentRef.current.innerHTML;
    // Set title for printing
    document.title = "Invoice";
    // Replace page content with content to print
    document.body.innerHTML = content;
    // Trigger print dialog
    window.print();
    window.location.reload();
  };
  return (
    <Box
      style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
      display="flex"
      flexDirection="column"
    >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h2" color="white">Invoice</Typography>
            <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
              Print Invoice
            </Button>
          </Box>
      {showResults ? (
        <Paper ref={printContentRef} elevation={3} sx={{ padding: "20px", color: "#4CCEA9", bgcolor: "#2C3744" }}>
        <Box>
          <Box>
            {selectedClient && (
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" color="#4CCEA9">Company</Typography>
                  <address>
                    Street Address<br />
                    State, City<br />
                    Region, Postal Code<br />
                    ltd@example.com
                  </address>
                </Box>
                <Box textAlign="right">
                  <Typography variant="h3" color="#4CCEA9">Client</Typography>
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
                    <TableCell style={{ width: "1%" }}><Typography variant="body1" color="#4CCEA9">#</Typography></TableCell>
                    <TableCell><Typography variant="body1" color="#4CCEA9">Payment Method</Typography></TableCell>
                    <TableCell style={{  width:'10%' }} align="center"><Typography variant="body1" color="#4CCEA9">Amount</Typography></TableCell>
                    <TableCell style={{ width: "10%",mr:'5px'}} align="center"><Typography variant="body1" color="#4CCEA9">Date</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice, cl) => {
                    const paymentMethod = paymentMethods.find((method) => method.id === invoice.payment_method);
                    return (
                      <TableRow key={cl} >
                        <TableCell ><Typography variant="body1" color="white">{cl + 1}</Typography></TableCell>
                        <TableCell>
                        <img src={`/assets/payment-method/${paymentMethod.pay_method_image}`} alt="Payment Method" style={{ width: 50, height: 50 }} /></TableCell>
                        <TableCell align="center"><Typography variant="body1" color={colors.greenAccent[500]}>$ {invoice.amount}</Typography></TableCell>
                        <TableCell align="center"><Typography variant="body1" color="#4CCEA9">{invoice.issue_date}</Typography></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} align="right"><Typography variant="body1" color='#4CCEA9'>Total:</Typography></TableCell>
                    <TableCell align="center"><Typography variant="body1" color={colors.greenAccent[500]}>$ {total}</Typography></TableCell>

                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Typography variant="body2" align="center" color="#4CCEA9" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
          </Box>
        </Box>
        </Paper>
      ) : (
        <Paper elevation={2} style={{ backgroundColor: "#141B2D", padding: "5px", width: "200px" }}>
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
      )}
    </Box>
  );
};

export default ClientReport;
