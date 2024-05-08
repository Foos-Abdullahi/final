import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const ClientEdit = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [clientData, setClientData] = useState({});
  const [originalClientData, setOriginalClientData] = useState({});
  const [editingClientId, setEditingClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [documentImage, setDocumentImage] = useState(null);
  const [clientImage, setClientImage] = useState(null);
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const response = await fetch(`http://localhost:8000/Client/view/${id}/`);
        if (!response.ok) {
          console.log('No data');
          return;
        }
        const data = await response.json();
        setClientData(data);
        setOriginalClientData(data);
        setEditingClientId(id);
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    fetchClient();
  }, []);

  const updateClient = async () => {
    try {
      const formData = new FormData();
      formData.append('document_image', documentImage);
      formData.append('client_image', clientImage);
      formData.append('client_name', clientName || originalClientData.client_name);
      formData.append('password', password || originalClientData.password);
      formData.append('phone', phone || originalClientData.phone);
      formData.append('issue_date', issueDate || originalClientData.issue_date);

      const response = await fetch(`http://127.0.0.1:8000/Client/update/${editingClientId}/`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        console.log('Client updated successfully');
        window.location.href = '/client';
      } else {
        console.error('Failed to update client');
        alert('Failed to update the client. Please try again.');
      }
    } catch (error) {
      console.error('Error updating client:', error);
      alert('Error updating the client. Please try again.');
    }
  };

  const handleFormSubmit = () => {
    updateClient();
  };

  return (
    <Box m="20px">
      <Header title="EDIT EMPLOYEE" subtitle="Edit an Existing Employee" />

      <Formik onSubmit={handleFormSubmit} initialValues={clientData}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Client Name"
                onBlur={handleBlur}
                onChange={(e)=> setClientName(e.target.value)}
                value={clientName || originalClientData.client_name}
                name="client_name"
                error={touched.client_name && !!errors.client_name}
                helperText={touched.client_name && errors.client_name}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
                value={password || originalClientData.password}
                name="password"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="tel"
                label="Phone"
                onBlur={handleBlur}
                onChange={(e) => setPhone(e.target.value)}
                value={phone || originalClientData.phone}
                name="phone"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="file"
                label="Document Image"
                onBlur={handleBlur}
                onChange={(e) => setDocumentImage(e.target.files[0])}
                name="document_image"
                error={touched.document_image && !!errors.document_image}
                helperText={touched.document_image && errors.document_image}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="file"
                label="Client Image"
                onBlur={handleBlur}
                onChange={(e) => setClientImage(e.target.files[0])}
                name="client_image"
                error={touched.client_image && !!errors.client_image}
                helperText={touched.client_image && errors.client_image}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate || originalClientData.issue_date}
                name="issue_date"
                error={touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
              />
            </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ClientEdit;
