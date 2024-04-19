import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const ClientForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [clientName, setClientName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  useEffect(() => {
    // Fetch client options
    fetchClientOptions();
  }, []);

  const fetchClientOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/create/");
      if (!response.ok) {
        throw new Error("Failed to fetch client options");
      }
      const data = await response.json();
      // Process data if needed
    } catch (error) {
      console.error("Error fetching client options:", error);
    }
  };

  const sendForm = async () => {
    const res = await fetch("http://127.0.0.1:8000/Client/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_name: clientName,
        contact_person: contactPerson,
        phone: phone,
        document: document,
        issue_date: issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    window.location.href = '/client';
  };

  const handleFormSubmit = () => {
    sendForm();
  };

  const validationSchema = yup.object().shape({
    client_name: yup.string().required("Client name is required"),
    contact_person: yup.string().required("Contact person is required"),
    phone: yup.string().required("Phone number is required"),
    document: yup.string().required("Document is required"),
    issue_date: yup.string().required("Issue date is required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE CLIENT" subtitle="Create a New Client" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          client_name: "",
          contact_person: "",
          phone: "",
          document: "",
          issue_date: "",
        }}
        // validationSchema={}
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
                label="Client Name"
                onBlur={handleBlur}
                onChange={(e) => setClientName(e.target.value)}
                value={clientName}
                name="client_name"
                error={!!touched.client_name && !!errors.client_name}
                helperText={touched.client_name && errors.client_name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Contact Person"
                onBlur={handleBlur}
                onChange={(e) => setContactPerson(e.target.value)}
                value={contactPerson}
                name="contact_person"
                error={!!touched.contact_person && !!errors.contact_person}
                helperText={touched.contact_person && errors.contact_person}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="tel"
                label="Phone"
                onBlur={handleBlur}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Document"
                onBlur={handleBlur}
                onChange={(e) => setDocument(e.target.value)}
                value={document}
                name="document"
                error={!!touched.document && !!errors.document}
                helperText={touched.document && errors.document}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
                error={!!touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ClientForm;
