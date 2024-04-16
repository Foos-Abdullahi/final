import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

const EditUSer = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [issue_date, setIssueDate] = useState("");
  const [userData, setUserData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/view/${userId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUserData(data);
      setOriginalData(data);
      console.log('original',originalData);
      console.log('userdata',userData);
      console.log('data',data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Role/");
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRoles(data);
      console.log('Roles',roles);
      console.log('data Roles',data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Employee/");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployees(data);
      // console.log
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    const url = window.location.pathname; 
    const userId = url.split("/").pop(); 
    alert(userId);
    console.log('Editing',editingUserId);
    if (userId) {
      setEditingUserId(userId);
      fetchUserDetails(userId);
    }
    fetchRoles();
    fetchEmployees();
  }, []);

  const sendForm = async () => {
    const url = `http://127.0.0.1:8000/user/update/${editingUserId}/`;
    alert(editingUserId)
  
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingUserId,
        UserName: userName || originalData.UserName,
        Password: password || originalData.Password,
        employee_id: selectedEmployee || originalData.employee_id,
        role_id: selectedRole || originalData.role_id,
        issue_date: issue_date || originalData.issue_date,
      }),
    });
    console.log('Selected Username:', userName || originalData.UserName);
    console.log('Selected password:', password || originalData.Password );
    console.log('Selected Employee ID:', selectedEmployee || originalData.employee_id);
    console.log('Selected Role ID:', selectedRole || originalData.role_id);
    console.log('Selected issue_data:', issue_date || originalData.issue_date);
  
    if (!res.ok) {
      // Handle error
    }
  
    const data = await res.json();
    console.log("Response data:", data);
  };

  const handleFormSubmit = (values) => {
    sendForm(values);
  };

  return (
    <Box m="20px">
      <Header title="EDIT USER" subtitle="Edit an Existing User" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={userData}
      >
        {({
          errors,
          touched,
          handleBlur,
          // handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Username"
              onBlur={handleBlur}
              onChange={(e) => setUserName(e.target.value)}
              value={userName || originalData.UserName}
              name="UserName"
              error={!!touched.UserName && !!errors.UserName}
              helperText={touched.UserName && errors.UserName}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Password"
              onBlur={handleBlur}
              onChange={(e) => setPassword(e.target.value)}
              value={password || originalData.Password}
              name="Password"
              error={!!touched.Password && !!errors.Password}
              helperText={touched.Password && errors.Password}
            />
            <TextField
              fullWidth
              select
              variant="filled"
              label="Role"
              onBlur={handleBlur}
              onChange={(e) => setSelectedRole(e.target.value)}
              value={selectedRole || originalData.role_id}
              name="role_id"
              error={!!touched.role_id && !!errors.role_id}
              helperText={touched.role_id && errors.role_id}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.Role_name}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              variant="filled"
              label="Employee"
              onBlur={handleBlur}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              value={selectedEmployee || originalData.employee_id}
              name="employee_id"
              error={!!touched.employee_id && !!errors.employee_id}
              helperText={touched.employee_id && errors.employee_id}
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.employee_name}
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
              value={issue_date || originalData.issue_date}
              name="issue_date"
              error={!!touched.issue_date && !!errors.issue_date}
              helperText={touched.issue_date && errors.issue_date}
            />

            </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditUSer;
