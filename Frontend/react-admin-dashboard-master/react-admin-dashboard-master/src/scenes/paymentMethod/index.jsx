import { Box, Button, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

const PaymentMethode = () => {

  const [PaymentMethodes, setpaymentMothode] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetchPymentMothode();
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user/");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
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
      headerName: "Payment Method",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "pay_method_image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={`/assets/payment-method/${params.value}`}
          alt="Payment Method"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "issue_date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "user",
      headerName: "User Name",
      flex: 1,
      valueGetter: (params) => {
        const user = users.find(User => User.id === params.row.user);
        return user ? user.UserName : '';
      },
    },
    {
      field: "Edit",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          component={Link}
          to={`/paymentMethod/update/${params.row.id}`}
        >
          <EditIcon />
        </IconButton>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header title="Payment Methode" subtitle="List of Payment Methode" />
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
          to="/paymentMethod/create"
          startIcon={<AddIcon />}
        >
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
        <DataGrid checkboxSelection rows={PaymentMethodes} columns={columns} />
      </Box>
    </Box>
  );
  
};
export default PaymentMethode;
