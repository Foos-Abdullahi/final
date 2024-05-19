import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, TextField, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import InputBase from "@mui/material/InputBase";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const Client = () => {
  const [Clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Client/'); 
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching Clients:', error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "client_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "client_image",
      headerName: "Client Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`/assets/client/${params.value}`} 
          alt="ClientImage"
          style={{ width: 60, height: 60 }} 
        />
      ),
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
    },
    {
      field: "document_image",
      headerName: "Document",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`/assets/${params.value}`} 
          alt="DocumentImage"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "issue_date",
      headerName: "Issue Date",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="secondary"
            component={Link}
            to={`/client/edit/${params.row.id}`}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Client" subtitle="List of Clients" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        position='relative'
        left='90%'
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to="/Client/form"
        >
          <AddIcon />
          Add New
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
        <DataGrid checkboxSelection rows={Clients} columns={columns} />
      </Box>
    </Box>
  );
};

export default Client;
