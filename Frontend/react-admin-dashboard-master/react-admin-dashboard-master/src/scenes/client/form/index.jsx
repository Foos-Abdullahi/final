import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const ClientForm = () => {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [document, setDocument] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Client created successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to create Client:", errorData);
      }
    } catch (error) {
      console.error("An error occurred while creating Client:", error);
    }
  };

  const validationSchema = yup.object().shape({
    clientName: yup.string().required("Client name is required"),
    phone: yup.string().required("Phone number is required"),
    contactPerson: yup.string().required("Contact person is required"),
    document: yup.string().required("Document is required"),
    issueDate: yup.string().required("Issue Date is required"),
  });

  const initialValues = {
    clientName: "",
    phone: "",
    contactPerson: "",
    document: "",
    issueDate: "",
  };

  return (
    <Box m="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Client Name"
              onBlur={handleBlur}
              onChange={(e) => setClientName(e.target.value)}
              value={clientName}
              name="clientName"
              error={!!touched.clientName && !!errors.clientName}
              helperText={touched.clientName && errors.clientName}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Phone number"
              onBlur={handleBlur}
              onChange={handleChange} 
            //   onChange={(e) => setPhone(e.target.value)}
              value={values.phone}
              name="phone" 
              error={!!touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Person"
              onBlur={handleBlur}
              onChange={handleChange} 
            //   onChange={(e) => setContactPerson(e.target.value)}
              value={values.contactPerson}
              name="contactPerson"
              error={!!touched.contactPerson && !!errors.contactPerson}
              helperText={touched.contactPerson && errors.contactPerson}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Document"
              onBlur={handleBlur}
            //   onChange={(e) => setDocument(e.target.value)}
              onChange={handleChange} 
              value={values.document}
              name="document" 
              error={!!touched.document && !!errors.document}
              helperText={touched.document && errors.document}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Issue Date"
              onBlur={handleBlur}
            //   onChange={(e) => setIssueDate(e.target.value)}
            onChange={handleChange} 
              value={values.issueDate}
              name="issueDate" 
              error={!!touched.issueDate && !!errors.issueDate}
              helperText={touched.issueDate && errors.issueDate}
            />
            <Button type="submit" color="secondary" variant="contained">
              Create New Client
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ClientForm;