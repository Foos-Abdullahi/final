import { Box, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const CreateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [issue_date, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Fetch employee options
    fetchEmployeeOptions();
    // Fetch role options
    fetchRoleOptions();
  }, []);

  const fetchEmployeeOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Employee/");
      if (!response.ok) {
        throw new Error("Failed to fetch employee options");
      }
      const data = await response.json();
      setEmployeeOptions(data);
    } catch (error) {
      console.error("Error fetching employee options:", error);
    }
  };

  const fetchRoleOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Role/");
      if (!response.ok) {
        throw new Error("Failed to fetch role options");
      }
      const data = await response.json();
      setRoleOptions(data);
    } catch (error) {
      console.error("Error fetching role options:", error);
    }
  };

  const sendForm = async () => {
    const res = await fetch("http://127.0.0.1:8000/user/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: userName,
        Password: password,
        employee_id: selectedEmployee,
        role_id: selectedRole,
        issue_date: issue_date,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    setSnackbarMessage("Material created successfully!");
    setSnackbarOpen(true);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Formik
        onSubmit={sendForm}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
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
                label="UserName"
                onBlur={handleBlur}
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                name="userName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                label="Employee ID"
                onBlur={handleBlur}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                value={selectedEmployee}
                name="employee_id"
                sx={{ gridColumn: "span 4" }}
              >
                {employeeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.employee_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                variant="filled"
                label="Role ID"
                onBlur={handleBlur}
                onChange={(e) => setSelectedRole(e.target.value)}
                value={selectedRole}
                name="role_id"
                error={!!touched.role_id && !!errors.role_id}
                helperText={touched.role_id && errors.role_id}
                sx={{ gridColumn: "span 4" }}
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.Role_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   userName: yup.string().required("required"),
//   password: yup.string().required("required"),
//   employee_id: yup.string().required("required"),
//   role_id: yup.string().required("required"),
//   issue_date: yup.string().required("required"),
// });
const initialValues = {
  userName: "",
  password: "",
  employee_id: "",
  role_id: "",
  issue_date: "",
};

export default CreateUser;
