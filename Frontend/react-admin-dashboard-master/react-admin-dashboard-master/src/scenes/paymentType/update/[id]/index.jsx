import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const PaymentTypEdit = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [RoleData, setRoleData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [EditP_TypeID, setEditP_TypeID] = useState('');
  const [PaymentTyp_Name, setPaymentTyp_Name] = useState("");
  const [issueDate, setIssueDate] = useState("");

  useEffect(() => {
    const fetchPaymentType = async () => {
      try {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const response = await fetch(`http://127.0.0.1:8000/Payment_Type/view/${id}/`);
        if (!response.ok) {
          console.log('No data');
          return;
        }
        const data = await response.json();
        setRoleData(data);
        setOriginalData(data);
        setEditP_TypeID(id)
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching Payment__Type:', error);
      }
    };

    fetchPaymentType();
  }, []);
  
  const updatePaymentType = async () => {
    alert(EditP_TypeID)
    try {
      const response = await fetch(`http://127.0.0.1:8000/Payment_Type/update/${EditP_TypeID}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Py_Type_name: PaymentTyp_Name || originalData.PaymentTyp_Name,
          issue_date: issueDate || originalData.issue_date,
        }),
      });
      console.log(PaymentTyp_Name || originalData.PaymentTyp_Name);
      console.log(issueDate || originalData.issue_date);
      if (response.ok) {
        console.log('Payment__Type updated successfully');
        window.location.href = '/paymentType';
      } else {
        console.error('Failed to update Payment__Type');
        alert('Failed to update the Payment__Type. Please try again.');
      }
    } catch (error) {
      console.error('Error updating Payment__Type:', error);
      alert('Error updating the Payment__Type. Please try again.');
    }
  };

  const handleFormSubmit = (values) => {
    setRoleData(values);
    updatePaymentType();
  };

  return (
    <Box m="20px">
      <Header title="EDIT Payment__Type" subtitle="Edit an Existing Payment__Type" />

      <Formik onSubmit={handleFormSubmit} initialValues={RoleData}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Payment Type Name"
                onBlur={handleBlur}
                onChange={(e) => setPaymentTyp_Name(e.target.value)}
                value={PaymentTyp_Name || originalData.PaymentTyp_Name}
                name="PaymentTyp_Name"
                error={touched.PaymentTyp_Name && !!errors.PaymentTyp_Name}
                helperText={touched.PaymentTyp_Name && errors.PaymentTyp_Name}
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
                Update Payment__Type
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentTypEdit;