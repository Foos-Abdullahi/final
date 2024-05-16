import React, { useState } from "react";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { Formik } from "formik";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const PaymentMethodForm = () => {
  const [roleName, setRoleName] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const sendForm = async () => {
    const res = await fetch(`http://127.0.0.1:8000/Role/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Role_name: roleName,
        issue_date: issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
      return;
    }

   // Show Snackbar with success message
   setSnackbarMessage("Role created successfully!");
   setSnackbarOpen(true);

    const data = await res.json();
    console.log("Response data:", data);
    console.log(roleName);
    console.log(issueDate);
    window.location.href = '/role';
  };
  const checkExistingRole = async () => {
    const res = await fetch(`http://127.0.0.1:8000/Role/search?query=${roleName}`);
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        return true; // role with this role name already exists
      }
    }
    return false; // role with this role name doesn't exist
  };
  return (
    <Box m="20px">
      <Header title="CREATE Role" subtitle="Create a New Role" />

      <Formik
        // onSubmit={sendForm}
        onSubmit={async (values, actions) => {
          const exists = await checkExistingRole();
          if (exists) {
            setSnackbarMessage("this role already exists!");
            setSnackbarOpen(true);
          } else {
            sendForm();
            actions.resetForm();
          }
        }}
        initialValues={{
          roleName: "",
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
                label="Role Name"
                onBlur={handleBlur}
                onChange={(e) => setRoleName(e.target.value)}
                value={roleName}
                name="roleName"
                error={!!touched.roleName && !!errors.roleName}
                helperText={touched.roleName && errors.roleName}
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
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Project
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

export default PaymentMethodForm;
