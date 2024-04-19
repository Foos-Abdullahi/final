import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const PaymentMethodEdit = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [paymentMethodData, setPaymentMethodData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [editingPaymentMethodId, setEditingPaymentMethodId] = useState('');
  const [Py_method_name, setPy_method_name] = useState("");
  const [issueDate, setIssueDate] = useState("");

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
        setOriginalData(data);
        setEditingPaymentMethodId(id)
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching payment method:', error);
      }
    };

    fetchPaymentMethod();
  }, []);
  
  const updatePaymentMethod = async () => {
    alert(editingPaymentMethodId)
    try {
      const response = await fetch(`http://127.0.0.1:8000/Payment_Methode/update/${editingPaymentMethodId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Py_method_name: Py_method_name || originalData.Py_method_name,
          issue_date: issueDate || originalData.issue_date,
        }),
      });
      console.log(Py_method_name || originalData.Py_method_name);
      console.log(issueDate || originalData.issue_date);
      if (response.ok) {
        console.log('Payment method updated successfully');
        window.location.href = '/paymentMethod';
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

  return (
    <Box m="20px">
      <Header title="EDIT PAYMENT METHOD" subtitle="Edit an Existing Payment Method" />

      <Formik onSubmit={handleFormSubmit} initialValues={paymentMethodData}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Payment Type Name"
                onBlur={handleBlur}
                onChange={(e) => setPy_method_name(e.target.value)}
                value={Py_method_name || originalData.Py_method_name}
                name="Py_method_name"
                error={touched.Py_method_name && !!errors.Py_method_name}
                helperText={touched.Py_method_name && errors.Py_method_name}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate || originalData.issue_date}
                name="issue_date"
                error={touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
              />
            </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Payment Method
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentMethodEdit;