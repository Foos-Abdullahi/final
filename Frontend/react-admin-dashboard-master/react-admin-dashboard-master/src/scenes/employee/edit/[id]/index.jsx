import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const EmployeeEdit = () => {
  const url = window.location.pathname;
  const employeeId = url.split("/").pop();

  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [employeeImage, setEmployeeImage] = useState(null);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Employee/view/${employeeId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch employee details");
      }
      const data = await response.json();
      setEmployeeName(data.employee_name);
      setPosition(data.position);
      setPhone(data.phone);
      setEmail(data.email);
      setSalary(data.salary);
      setIssueDate(data.issue_date);
      setEmployeeImage(data.employee_image);
      console.log(data.employee_Image );
      console.log(data.position );
      console.log(data.phone );
      console.log(data.email );
      console.log(data.salary);
      console.log(data.issue_date);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };
  useEffect(() => {

    fetchEmployee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateEmployee = async () => {
    try {
      const formData = new FormData();
      formData.append('employee_name', employeeName);
      formData.append('employee_Image', employeeImage);
      formData.append('position', position);
      formData.append('phone', phone);
      formData.append('email', Email);
      formData.append('salary', salary);
      formData.append('issue_date', issueDate);
      // if (employeeImage) {
      //   formData.append('employee_image', employeeImage);
      // }

      const res = await fetch(`http://127.0.0.1:8000/Employee/update/${employeeId}/`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      console.log(employeeName);
      console.log(employeeImage );
      console.log(position );
      console.log(phone );
      console.log(Email );
      console.log(salary);
      console.log(issueDate);
      // window.location.href = "/employee";
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleEmployeeImageChange = (e) => {
    const file = e.target.files[0];
    setEmployeeImage(file.name);
  };

  return (
    <Box m="20px">
      <Header title="EDIT EMPLOYEE" subtitle="Edit Employee Details" />

      <Formik initialValues={
        { 
          employee_name: "",
          position: "", 
          phone: "", 
          email: "", 
          salary: "",
          issue_date: "" 
        }}
        onSubmit={updateEmployee}>
        {({ handleBlur, handleSubmit }) => (
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
                label="Employee Name"
                onBlur={handleBlur}
                onChange={e => setEmployeeName(e.target.value)}
                value={employeeName}
                name="employee_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={e => setPosition(e.target.value)}
                value={position}
                name="position"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="tel"
                label="Phone"
                onBlur={handleBlur}
                onChange={e => setPhone(e.target.value)}
                value={phone}
                name="phone"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={e => setEmail(e.target.value)}
                value={Email}
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="number"
                label="Salary"
                onBlur={handleBlur}
                onChange={e => setSalary(e.target.value)}
                value={salary}
                name="salary"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={e => setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Employee Image"
                accept="image/*"
                onBlur={handleBlur}
                onChange={handleEmployeeImageChange}
                name="employee_image"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Employee
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EmployeeEdit;
