import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const PaymentMethodForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [Py_TypeName, setP_T_Name] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userId, setUserId] = useState(""); // Add state for userId
  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);

  useEffect(() => {
    // Fetch user ID from sessionStorage
    const storedUserId = window.sessionStorage.getItem("userid");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const sendForm = async () => {
    const res = await fetch(`http://127.0.0.1:8000/Payment_Type/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Py_Type_name: Py_TypeName,
        issue_date: issueDate,
        user_id: userId,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log(Py_TypeName);
    console.log(issueDate);
    setSnackbarOpen(true); // Show the snackbar
    // Redirect to '/paymentType' after 2 seconds
    setTimeout(() => {
      window.location.href = '/paymentType';
    }, 2000);
  };

  return (
    <Box m="20px">
      <Header title="CREATE PaymentType" subtitle="Create a New PaymentType" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          PaymentTypes: "",
          issue_date: "",
        }}
      >
        {({
          touched,
          errors,
          handleBlur,
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
                label="Payment_Type Name"
                onBlur={handleBlur}
                onChange={(e) => setP_T_Name(e.target.value)}
                value={Py_TypeName}
                name="Py_TypeName"
                error={!!touched.Py_TypeName && !!errors.Py_TypeName}
                helperText={touched.Py_TypeName && errors.Py_TypeName}
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
               {/* <input type="hide" name="user_id" value={userId} /> */}
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Payment Type
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000} // Automatically close after 2 seconds
        onClose={() => setSnackbarOpen(false)}
        message="Payment type created successfully!"
      />
    </Box>
  );
};

export default PaymentMethodForm;
