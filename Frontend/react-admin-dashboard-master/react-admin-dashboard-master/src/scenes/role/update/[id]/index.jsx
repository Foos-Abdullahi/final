import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const RoleEdit = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [RoleData, setRoleData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [editRoleId, seteditRoleId] = useState('');
  const [Role_name, setRole_name] = useState("");
  const [issueDate, setIssueDate] = useState("");

  useEffect(() => {
    const fetchPaymentType = async () => {
      try {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const response = await fetch(`http://127.0.0.1:8000/Role/view/${id}/`);
        if (!response.ok) {
          console.log('No data');
          return;
        }
        const data = await response.json();
        setRoleData(data);
        setOriginalData(data);
        seteditRoleId(id)
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching payment type:', error);
      }
    };

    fetchPaymentType();
  }, []);
  
  const updatePaymentType = async () => {
    alert(editRoleId)
    try {
      const response = await fetch(`http://127.0.0.1:8000/Role/update/${editRoleId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Role_name: Role_name || originalData.Role_name,
          issue_date: issueDate || originalData.issue_date,
        }),
      });
      console.log(Role_name || originalData.Role_name);
      console.log(issueDate || originalData.issue_date);
      if (response.ok) {
        console.log('Payment type updated successfully');
        window.location.href = '/role';
      } else {
        console.error('Failed to update payment type');
        alert('Failed to update the payment type. Please try again.');
      }
    } catch (error) {
      console.error('Error updating payment type:', error);
      alert('Error updating the payment type. Please try again.');
    }
  };

  const handleFormSubmit = (values) => {
    setRoleData(values);
    updatePaymentType();
  };

  return (
    <Box m="20px">
      <Header title="EDIT ROLE" subtitle="Edit an Existing Role" />

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
                onChange={(e) => setRole_name(e.target.value)}
                value={Role_name || originalData.Role_name}
                name="Role_name"
                error={touched.Role_name && !!errors.Role_name}
                helperText={touched.Role_name && errors.Role_name}
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
                Update Payment_type
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RoleEdit;