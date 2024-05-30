import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const ClientForm = () => {
  const [documentImage, setDocumentImage] = useState(null);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientImage, setClientImage] = useState(null);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);

  const sendForm = async () => {
    const getres = await fetch("http://127.0.0.1:8000/Client/");
    const dataGET = await getres.json();
    const existingClient = dataGET.find((client) => client.phone === phone || client.email === email);

    if (existingClient) {
      setSnackbarMessage("Client with this phone number or Email already exists!");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("document_image", documentImage);
    formData.append("client_image", clientImage);
    formData.append("client_name", clientName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("issue_date", issueDate);
    formData.append("user_id", userId);

    const res = await fetch("http://127.0.0.1:8000/Client/create/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log("Document Image:", documentImage);
    console.log("Client Name:", clientName);
    console.log("Phone:", phone);
    console.log("Issue Date:", issueDate);
    console.log("User ID:", userId);

    setSnackbarMessage("Client created successfully!");
    setSnackbarOpen(true);
  };

  const handleClientFIle = (e) =>{
    const file = e.target.files[0];
    console.log(file.name);
    if (file) {
      setClientImage(file.name)
      setDocumentImage(file.name)
    }
  }

  return (
    <Box m="20px">
      <Header title="CREATE CLIENT" subtitle="Create a New Client" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          client_name: "",
          phone: "",
          email: "",
          password: "",
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
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleClientFIle}
                error={!!touched.document_image && !!errors.document_image}
                helperText={touched.document_image && errors.document_image}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Client Image"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleClientFIle}
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
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
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
              <input
                type="hidden"
                name="user_id"
                value={userId}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button color="primary" variant="contained" onClick={() => window.location.href = "/client"}>
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ClientForm;

