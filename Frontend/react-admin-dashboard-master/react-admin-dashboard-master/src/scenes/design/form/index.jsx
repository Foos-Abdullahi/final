import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const DesignForm = () => {
  const [images, setImage] = useState(null);
  const [statuses, setstatus] = useState("");
  const [amounts, setamount] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userId, setUserId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    const storedRole = window.sessionStorage.getItem("userid");
    if (storedRole) {
      setUserId(storedRole);
    }
  }}, []);
  const sendForm = async () => {
    const formData = new FormData();
    formData.append("architecture", images); 
    formData.append("status", statuses);
    formData.append("amount", amounts);
    formData.append("issue_date", issueDate);
    formData.append("user_id", userId);

    const res = await fetch("http://127.0.0.1:8000/Design/create/", {
      method: "POST",
    //  
      body: formData,
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log(images)
    console.log(statuses)
    console.log(amounts)
    console.log(issueDate)
    console.log(userId)
    setSnackbarMessage("Material created successfully!");
    setSnackbarOpen(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file.name);
  };
  return (
    <Box m="20px">
      <Header title="CREATE Design" subtitle="Create a New Design" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Formik
        onSubmit={sendForm}
        initialValues={{
          Designs: "",
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
                label="Image"
                onBlur={handleBlur}
                onChange={handleImageChange}
                // value={images}
                name="architecture"
                error={!!touched.architecture && !!errors.architecture}
                helperText={touched.architecture && errors.architecture}
                sx={{ gridColumn: "span 4" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={(e) => setstatus(e.target.value)}
                value={statuses}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 4" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={(e) => setamount(e.target.value)}
                value={amounts}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
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
               {/* Hidden user_id field */}
               <input type="text" name="user_id" value={userId} />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Design
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DesignForm;