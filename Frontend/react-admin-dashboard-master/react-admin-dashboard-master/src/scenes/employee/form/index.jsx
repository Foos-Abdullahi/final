import React, { useState } from "react";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const EmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const[Email,setEmail]=useState('')
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [employeeImage, setEmployeeImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const sendForm = async () => {
    // Check if an email and phone number already exist
    const getres = await fetch("http://127.0.0.1:8000/Employee/");
    const dataGET = await getres.json();
    const existingEmployee = dataGET.find((employee) => employee.phone === phone || employee.email === Email);
  
    if (existingEmployee) {
      setSnackbarMessage("An employee with this email or phone number already exists!");
      setSnackbarOpen(true);
      return;
    }
  
    // Proceed with creating the employee if not already exists
    const formData = new FormData(); 
    formData.append("employee_Image", employeeImage); 
    formData.append("employee_name", employeeName);
    formData.append("position", position);
    formData.append("email", Email);
    formData.append("phone", phone);
    formData.append("salary", salary);
    formData.append("issue_date", issueDate);
  
    const res = await fetch("http://127.0.0.1:8000/Employee/create/", {
      method: "POST",
      body: formData, 
    });
  
    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
      return;
    }
  
    const data = await res.json();
    console.log("Response data:", data);
    console.log(employeeName);
    console.log(issueDate);
    
    // Show Snackbar with success message
    setSnackbarMessage("Employee created successfully!");
    setSnackbarOpen(true);
  };
  

  const validationSchema = yup.object().shape({
    employee_name: yup.string().required("Employee name is required"),
    position: yup.string().required("Position is required"),
    phone: yup.string().required("Phone number is required"),
    salary: yup.number().required("Salary is required"),
    issue_date: yup.date().required("Issue date is required"),
  });
  return (
    <Box m="20px">
      <Header title="CREATE Role" subtitle="Create a New Role" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Formik
        initialValues={{
          employee_name: "",
          position: "",
          phone: "",
          salary: "",
          issue_date: "",
        }}
        // validationSchema={validationSchema}
        // onSubmit={sendForm}
        onSubmit={sendForm}
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
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                name="email"
                error={!!touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
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
              {/* Input field for uploading image */}
              <input
                type="file"
                onChange={(e) => setEmployeeImage(e.target.files[0])}
                accept="image/*"
                style={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button color="primary" variant="contained" onClick={() => window.location.href = "/employee"}>
                Back
              </Button>
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
