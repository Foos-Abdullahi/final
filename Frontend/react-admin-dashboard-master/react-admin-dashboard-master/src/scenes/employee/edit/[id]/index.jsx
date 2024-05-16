import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const EmployeeEdit = () => {
  
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [employeeData, setEmployeeData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [editingEmployeeId, setEditingEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [issueDate, setIssueDate] = useState("");
const [employeeImage,setEmployeeImage]=useState(null)
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const response = await fetch(`http://localhost:8000/Employee/view/${id}/`);
        if (!response.ok) {
          console.log('No data');
          return;
        }
        const data = await response.json();
        setEmployeeData(data);
        setOriginalData(data);
        setEditingEmployeeId(id)
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, []);
  
  const updateEmployee = async () => {
    alert(editingEmployeeId)
    try {
      const formData = new FormData();
      formData.append('employee_image', employeeImage);
      formData.append('employee_name', employeeName  || originalData.employee_name);
      formData.append('position', position || originalData.position);
      formData.append('phone', phone || originalData.phone);
      formData.append('salary', salary || originalData.salary);
      formData.append('issue_date', issueDate || originalData.issue_date);
      const response = await fetch(`http://127.0.0.1:8000/Employee/update/${editingEmployeeId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:formData,
      });
      console.log(employeeName || originalData.employee_name);
      console.log(position || originalData.position);
      console.log(phone || originalData.phone);
      console.log(salary || originalData.salary);
      console.log(issueDate || originalData.issue_date);
      if (response.ok) {
        console.log('Employee updated successfully');
        window.location.href = '/employee';
      } else {
        console.error('Failed to update employee');
        alert('Failed to update the employee. Please try again.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating the employee. Please try again.');
    }
  };
  const handleFormSubmit = (values) => {
    setEmployeeData(values);
    updateEmployee();
  };

  return (
    <Box m="20px">
      <Header title="EDIT EMPLOYEE" subtitle="Edit an Existing Employee" />

      <Formik onSubmit={handleFormSubmit} initialValues={employeeData}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Employee Name"
                onBlur={handleBlur}
                onChange={(e) => setEmployeeName(e.target.value)}
                value={employeeName || originalData.employee_name}
                name="employee_name"
                error={touched.employee_name && !!errors.employee_name}
                helperText={touched.employee_name && errors.employee_name}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={(e) => setPosition(e.target.value)}
                value={position || originalData.position}
                name="position"
                error={touched.position && !!errors.position}
                helperText={touched.position && errors.position}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="tel"
                label="Phone"
                onBlur={handleBlur}
                onChange={(e) => setPhone(e.target.value)}
                value={phone || originalData.phone}
                name="phone"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="number"
                label="Salary"
                onBlur={handleBlur}
                onChange={(e) => setSalary(e.target.value)}
                value={salary || originalData.salary}
                name="salary"
                error={touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate || originalData.issue_date}
                name="issue_date"
                error={touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="file"
                label="employee Image"
                onBlur={handleBlur}
                onChange={(e) => setEmployeeImage(e.target.files[0])}
                name="employee_name"
                error={touched.employee_image && !!errors.employee_image}
                helperText={touched.employee_image && errors.employee_image}
              />
            </div>
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