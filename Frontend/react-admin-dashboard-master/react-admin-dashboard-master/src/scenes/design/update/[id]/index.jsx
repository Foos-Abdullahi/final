import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const PaymentMethodEdit = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [DesignData, setDesignData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [EditDesignID, setEditDesignID] = useState('');
//   const [Py_method_name, setPy_method_name] = useState("");
  const [image, setimage] = useState("");
  const [status, setstatus] = useState("");
  const [amount, setamount] = useState("");
  const [issueDate, setIssueDate] = useState("");

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const response = await fetch(`http://127.0.0.1:8000/Design/view/${id}/`);
        if (!response.ok) {
          console.log('No data');
          return;
        }
        const data = await response.json();
        setDesignData(data);
        setOriginalData(data);
        setEditDesignID(id)
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching Designs:', error);
      }
    };

    fetchPaymentMethod();
  }, []);
  
  const updatePaymentMethod = async () => {
    alert(EditDesignID)
    try {
      const response = await fetch(`http://127.0.0.1:8000/Design/update/${EditDesignID}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image || originalData.image,
        status: status || originalData.status,
        amount:amount || originalData.amount,
          issue_date: issueDate || originalData.issue_date,
        }),
      });
      console.log(image || originalData.image);
      console.log(issueDate || originalData.issue_date);
      if (response.ok) {
        console.log('design updated successfully');
        window.location.href = '/design';
      } else {
        console.error('Failed to update Design');
        alert('Failed to update the Design. Please try again.');
      }
    } catch (error) {
      console.error('Error updating Designs:', error);
      alert('Error updating the Designs. Please try again.');
    }
  };

  const handleFormSubmit = (values) => {
    setDesignData(values);
    updatePaymentMethod();
  };

  return (
    <Box m="20px">
      <Header title="EDIT Designs" subtitle="Edit an Existing Designs" />

      <Formik onSubmit={handleFormSubmit} initialValues={DesignData}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="image"
                onBlur={handleBlur}
                onChange={(e) => setimage(e.target.value)}
                value={image || originalData.image}
                name="image"
                error={touched.image && !!errors.image}
                helperText={touched.image && errors.image}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="status"
                onBlur={handleBlur}
                onChange={(e) => setstatus(e.target.value)}
                value={status || originalData.status}
                name="status"
                error={touched.status && !!errors.status}
                helperText={touched.status && errors.status}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={(e) => setamount(e.target.value)}
                value={amount || originalData.amount}
                name="amount"
                error={touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
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
                Update Designs
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentMethodEdit;