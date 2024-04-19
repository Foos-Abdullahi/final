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
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
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
    //alert(editingClientId);
    try {
      const response = await fetch(`http://127.0.0.1:8000/Client/update/${editingClientId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_name: clientName || originalClientData.client_name,
          contact_person: contactPerson || originalClientData.contact_person,
          phone: phone || originalClientData.phone,
          document: document || originalClientData.document,
          issue_date: issueDate || originalClientData.issue_date,
        }),
      });
      console.log(clientName || originalClientData.client_name);
      console.log(contactPerson || originalClientData.contact_person);
      console.log(phone || originalClientData.phone);
      console.log(document || originalClientData.document);
      console.log(issueDate || originalClientData.issue_date);
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

  const handleFormSubmit = (values) => {
    setClientData(values);
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
                type="text"
                label="Contact Person"
                onBlur={handleBlur}
                onChange={(e) => setContactPerson(e.target.value)}
                value={contactPerson || originalClientData.contact_person}
                name="contact_person"
                error={touched.contact_person && !!errors.contact_person}
                helperText={touched.contact_person && errors.contact_person}
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
                type="text"
                label="Document"
                onBlur={handleBlur}
                onChange={(e) => setDocument(e.target.value)}
                value={document || originalClientData.document}
                name="document"
                error={touched.document && !!errors.document}
                helperText={touched.document && errors.document}
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
                sx={{ gridColumn: 'span 4' }}
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