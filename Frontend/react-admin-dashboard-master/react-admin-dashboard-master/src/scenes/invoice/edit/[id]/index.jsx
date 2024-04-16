import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../../components/Header";

const EditInvoice = () => {
  const [clientID, setClientID] = useState("");
  const [amount, setAmount] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [invoiceData, setInvoiceData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);

  const fetchInvoiceDetails = async (invoiceId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Invoice/view/${invoiceId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch invoice details");
      }
      const data = await response.json();
      setInvoiceData(data);
      setOriginalData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    const url = window.location.pathname;
    const invoiceId = url.split("/").pop();
    if (invoiceId) {
      setEditingInvoiceId(invoiceId);
      fetchInvoiceDetails(invoiceId);
    }
    fetchClients();
  }, []);

  const sendForm = async () => {
    alert(editingInvoiceId)
    const url = `http://127.0.0.1:8000/invoice/update/${editingInvoiceId}/`;
  
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingInvoiceId,
        client_id: clientID || originalData.client_id,
        amount: amount || originalData.amount,
        issue_date: issueDate || originalData.issue_date,
      }),
    });
  
    if (!res.ok) {
      // Handle error
    }
  
    const data = await res.json();
    console.log("Response data:", data);
  };

  const handleFormSubmit = () => {
    sendForm();
  };

  return (
    <Box m="20px">
      <Header title="EDIT INVOICE" subtitle="Edit an Existing Invoice" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={invoiceData}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Client ID"
              onBlur={handleBlur}
              onChange={(e) => setClientID(e.target.value)}
              value={clientID || originalData.client_id}
              name="client_id"
              error={!!touched.client_id && !!errors.client_id}
              helperText={touched.client_id && errors.client_id}
            /> */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Amount"
              onBlur={handleBlur}
              onChange={(e) => setAmount(e.target.value)}
              value={amount || originalData.amount}
              name="amount"
              error={!!touched.amount && !!errors.amount}
              helperText={touched.amount && errors.amount}
            />
            <TextField
              fullWidth
              select
              variant="filled"
              label="Client"
              onBlur={handleBlur}
              onChange={(e) => setSelectedClient(e.target.value)}
              value={selectedClient || originalData.client_id}
              name="client_id"
              error={!!touched.client_id && !!errors.client_id}
              helperText={touched.client_id && errors.client_id}
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id} selected={client.id === selectedClient}>
                  {client.client_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Issue Date"
              onBlur={handleBlur}
              onChange={(e) => setIssueDate(e.target.value)}
              value={issueDate || originalData.issue_date}
              name="issue_date"
              error={!!touched.issue_date && !!errors.issue_date}
              helperText={touched.issue_date && errors.issue_date}
            />
            </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Invoice
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditInvoice;
