import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const EmployeeForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const fetchEmployeeOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Employee/create/");
      if (!response.ok) {
        throw new Error("Failed to fetch employee options");
      }
      const data = await response.json();
      // Process data if needed
    } catch (error) {
      console.error("Error fetching employee options:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeOptions();
  }, []);

  const sendForm = async () => {
    const res = await fetch("http://127.0.0.1:8000/Employee/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_name: employeeName,
        position: position,
        phone: phone,
        salary: salary,
        issue_date: issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
  };

  const handleFormSubmit = () => {
    sendForm();
  };

  // const validationSchema = yup.object().shape({
  //   employee_name: yup.string().required("Employee name is required"),
  //   position: yup.string().required("Position is required"),
  //   phone: yup.string().required("Phone number is required"),
  //   salary: yup.number().required("Salary is required"),
  //   issue_date: yup.string().required("Issue date is required"),
  // });

  return (
    <Box m="20px">
      <Header title="CREATE EMPLOYEE" subtitle="Create a New Employee" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          employee_name: "",
          position: "",
          phone: "",
          salary: "",
          issue_date: "",
        }}
        // validationSchema={validationSchema}
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
                label="Employee Name"
                onBlur={handleBlur}
                onChange={(e) => setEmployeeName(e.target.value)}
                value={employeeName}
                name="employee_name"
                error={!!touched.employee_name && !!errors.employee_name}
                helperText={touched.employee_name && errors.employee_name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
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
                variant="filled"
                type="number"
                label="Salary"
                onBlur={handleBlur}
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Employee
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EmployeeForm;
