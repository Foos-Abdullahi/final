import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const InvoiceForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [amount, setAmount] = useState("");
  const [clientOptions, setClientOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [issue_date, setIssueDate] = useState("");

  useEffect(() => {
    // Fetch client options
    fetchClientOptions();
  }, []);

  const fetchClientOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      if (!response.ok) {
        throw new Error("Failed to fetch client options");
      }
      const data = await response.json();
      setClientOptions(data);
    } catch (error) {
      console.error("Error fetching client options:", error);
    }
  };

  const sendForm = async () => {
    const res = await fetch("http://127.0.0.1:8000/Invoice/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        client_id: selectedClient,
        issue_date: issue_date,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
  };

  const handleFormSubmit = () => {
    sendForm();
  };

  return (
    <Box m="20px">
      <Header title="CREATE INVOICE" subtitle="Create a New Invoice" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ amount: "", client_id: "", issue_date: "" }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                name="amount"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                label="Client ID"
                onBlur={handleBlur}
                onChange={(e) => setSelectedClient(e.target.value)}
                value={selectedClient}
                name="client_id"
                sx={{ gridColumn: "span 4" }}
              >
                {clientOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.client_name}
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
                value={issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Invoice
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
const checkoutSchema = yup.object().shape({
amount: yup.number().required("Amount is required"),
client_id: yup.string().required("Client ID is required"),
issue_date: yup.string().required("Issue date is required"),
});
  

export default InvoiceForm;
