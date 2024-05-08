import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const ClientForm = () => {
  const [documentImage, setDocumentImage] = useState(null);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [clientImage, setClientImage] = useState(null);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const sendForm = async () => {
    const documentImageName = documentImage.name;
    const ClientImageName = clientImage.name;
    const fileName = documentImage.name.split('.')[0];
    const formData = new FormData();
    
    formData.append("document_image", documentImage)
    formData.append("client_image", documentImage)
    formData.append("client_name", clientName);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("issue_date", issueDate);

    const res = await fetch("http://127.0.0.1:8000/Client/create/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log(documentImageName);
    console.log(documentImage);
    console.log(clientName);
    console.log(phone);
    console.log(issueDate);
  };

  return (
    <Box m="20px">
      <Header title="CREATE Client" subtitle="Create a New Client" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          client_name: "",
          phone: "",
          issue_date: "",
        }}
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
                variant="filled"
                type="file"
                label="Document Image"
                onBlur={handleBlur}
                onChange={(e) => setDocumentImage(e.target.files[0])}
                error={!!touched.document_image && !!errors.document_image}
                helperText={touched.document_image && errors.document_image}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Client Image"
                onBlur={handleBlur}
                onChange={(e) => setClientImage(e.target.files[0])}
                error={!!touched.clientImage && !!errors.clientImage}
                helperText={touched.clientImage && errors.clientImage}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Client Name"
                onBlur={handleBlur}
                onChange={(e) => setClientName(e.target.value)}
                value={clientName}
                required
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                required
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