import { Box, Button , useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchEmployees();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Role/");
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRoles(data);
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
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/'); 
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.map(user => ({
        ...user,
        employee_name: employees.find(employee => employee.id === user.employee_id)?.employee_name || '',
        Role_name: roles.find(role => role.id === user.role_id)?.Role_name || '',
      })));

      console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "employee_name",
      headerName: "Employee",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "UserName",
      headerName: "UserName",
      flex: 1,
    },
    {
      field: "Password",
      headerName: "Password",
      flex: 1,
    },
    {
      field: "Role_name",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "issue_date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Edit",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={`/user/edit/${params.row.id}`}
        >
          Update User
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="User" subtitle="List of Users" />
      <Box
        display="flex"
        justifyContent="end"
        mt="20px"
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to="/user/create"
        >
          Create New User
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default User;