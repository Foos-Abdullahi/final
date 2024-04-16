import { Box, Button , useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';

const PymentTaype = () => {

  const [payment_types, setpayment_types] = useState([]);

  useEffect(() => {
    fetchPy_types();
  }, []);

  const fetchPy_types = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Payment_Type/'); 
      const data = await response.json();
      setpayment_types(data);
    } catch (error) {
      console.error('Error fetching paymentTypes:', error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Py_Type_name",
      headerName: "name",
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
          to={`/paymentType/update/${params.row.id}`}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ),
    }
    
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
        to="/paymentType/create"
      >
        Create New PaymentType
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
        <DataGrid checkboxSelection rows={payment_types} columns={columns} />
      </Box>
    </Box>
  );
};

export default PymentTaype;
