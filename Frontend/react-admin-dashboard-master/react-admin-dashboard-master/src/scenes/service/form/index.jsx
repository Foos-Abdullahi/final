import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServiceForm = () => {
  const [serviceImage, setServiceImage] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userId, setUserId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);

  const sendForm = async () => {
    const formData = new FormData();
    formData.append("service_name", serviceName);
    formData.append("service_image", serviceImage);
    formData.append("issue_date", issueDate);
    formData.append("user_id", userId);

    const res = await fetch("http://127.0.0.1:8000/service/create/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log(serviceName);
    console.log(serviceImage);
    console.log(issueDate);
    console.log(userId);
    setSnackbarMessage("Service created successfully!");
    setSnackbarOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setServiceImage(file.name);
  };

  return (
    <Box m="20px">
      <Header title="CREATE SERVICE" subtitle="Create a New Service" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Formik
        onSubmit={sendForm}
        initialValues={{
          service_name: "",
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
                type="text"
                label="Service Name"
                onBlur={handleBlur}
                onChange={(e) => setServiceName(e.target.value)}
                value={serviceName}
                name="service_name"
                error={!!touched.service_name && !!errors.service_name}
                helperText={touched.service_name && errors.service_name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Service Image"
                onBlur={handleBlur}
                onChange={handleImageChange}
                name="service_image"
                error={!!touched.service_image && !!errors.service_image}
                helperText={touched.service_image && errors.service_image}
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
                name="issue_date"
                error={!!touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: "span 4" }}
              />
              <input
                type="hidden"
                name="user_id"
                value={userId}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Service
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ServiceForm;