import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const PaymentTypEdit = () => {
  const url = window.location.pathname;
  const paymentTypeId = url.split("/").pop();
  
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [paymentTypeName, setPaymentTypeName] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const fetchPaymentType = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Payment_Type/view/${paymentTypeId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch payment type details");
      }
      const data = await response.json();
      setPaymentTypeName(data.Py_Type_name);
      setIssueDate(data.issue_date);
    } catch (error) {
      console.error("Error fetching payment type details:", error);
    }
  };

  useEffect(() => {
    fetchPaymentType();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePaymentType = async () => {
    try {
      const formData = new FormData();
      formData.append('Py_Type_name', paymentTypeName);
      formData.append('issue_date', issueDate);

      const res = await fetch(`http://127.0.0.1:8000/Payment_Type/update/${paymentTypeId}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Py_Type_name: paymentTypeName,
          issue_date: issueDate,
        }),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      window.location.href = "/paymentType";
    } catch (error) {
      console.error("Error updating payment type:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="EDIT PAYMENT TYPE" subtitle="Edit Payment Type Details" />

      <Formik initialValues={
        { 
          Py_Type_name: "",
          issue_date: "" 
        }}
        onSubmit={updatePaymentType}>
        {({ handleBlur, handleSubmit }) => (
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
                required
                variant="filled"
                type="text"
                label="Payment Type Name"
                onBlur={handleBlur}
                onChange={e => setPaymentTypeName(e.target.value)}
                value={paymentTypeName}
                name="Py_Type_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={e => setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Payment Type
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentTypEdit;
