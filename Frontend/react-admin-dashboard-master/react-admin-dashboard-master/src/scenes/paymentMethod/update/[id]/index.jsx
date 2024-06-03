import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Snackbar } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const PaymentMethodEdit = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [paymentMethodData, setPaymentMethodData] = useState({});
  const [editingPaymentMethodId, setEditingPaymentMethodId] = useState('');
  const [Py_method_name, setPy_method_name] = useState("");
  const [paymentMethodImage, setPaymentMethodImage] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const response = await fetch(`http://127.0.0.1:8000/Payment_Methode/view/${id}/`);
        if (!response.ok) {
          console.log('No data');
          return;
        }
        const data = await response.json();
        setPaymentMethodData(data);
        setPy_method_name(data.Py_method_name);
        setPaymentMethodImage(data.pay_method_image)
        setIssueDate(data.issue_date);
        setEditingPaymentMethodId(id);
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching payment method:', error);
      }
    };

    fetchPaymentMethod();
  }, []);

  const updatePaymentMethod = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Payment_Methode/update/${editingPaymentMethodId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Py_method_name: Py_method_name,
          pay_method_image: paymentMethodImage,
          issue_date: issueDate,
        }),
      });

      if (response.ok) {
        console.log('Payment method updated successfully');
        setSnackbarOpen(true); // Show the snackbar
        setTimeout(() => {
          window.location.href = '/paymentMethod';
        }, 1000);
      } else {
        console.error('Failed to update payment method');
        alert('Failed to update the payment method. Please try again.');
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      alert('Error updating the payment method. Please try again.');
    }
  };

  const handleFormSubmit = (values) => {
    setPaymentMethodData(values);
    updatePaymentMethod();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPaymentMethodImage(file.name);
  };


  return (
    <Box m="20px">
      <Header title="EDIT PAYMENT METHOD" subtitle="Edit an Existing Payment Method" />

      <Formik
        initialValues={{
          Py_method_name: Py_method_name,
          issue_date: issueDate,
        }}
        enableReinitialize
        onSubmit={handleFormSubmit}
      >
        {({ handleBlur, handleChange, handleSubmit }) => (
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
                type="text"
                label="Payment Method Name"
                onBlur={handleBlur}
                onChange={(e) => setPy_method_name(e.target.value)}
                value={Py_method_name}
                name="Py_method_name"
                sx={{ gridColumn: "span 4" }}
              />
               {/* <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Invoice Reciept"
                accept="image/*"
                onBlur={handleBlur}
                onChange={handleImageChange}
                name="pay_method_image"
                sx={{ gridColumn: "span 4" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Payment method updated successfully!"
      />
    </Box>
  );
};

export default PaymentMethodEdit;
