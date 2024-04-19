import { Box, Button , useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

const PaymentMethode = () => {

  const [PaymentMethodes, setpaymentMothode] = useState([]);

  useEffect(() => {
    fetchPymentMothode();
  }, []);

  const fetchPymentMothode = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Payment_Methode/'); 
      const data = await response.json();
      setpaymentMothode(data);
    } catch (error) {
      console.error('Error fetching payment_methode:', error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Py_method_name",
      headerName: "Payment Methode",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "issue_date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to={`/paymentMethod/edit/${params.row.id}`}
        >
          Update payment Method
        </Button>
      ),
    },
   
  ];

  return (
    
    <Box m="20px">
      <Header title="Payment Methode" subtitle="List of Payment Methode" />
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
        to="/paymentMethod/create"
      >
        Create New PaymentMethode
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
        <DataGrid checkboxSelection rows={PaymentMethodes} columns={columns} />
      </Box>
    </Box>
  );
};

export default PaymentMethode;