import { Box, Button, useTheme,IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

import PaymentType from "../paymentType";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [PaymentTypes, setPaymentType] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetchPayments();
    fetchProjects();
    fetchPaymentType();
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
  const fetchPayments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/payment/");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Projects/');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const fetchPaymentType = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Payment_Type/');
      const data = await response.json();
      setPaymentType(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "count",
      headerName: "ID",
      flex: 0.5,
      renderCell: (params) => {
        return params.api.getRowIndex(params.id) + 1;
      },
    },
    {
      field: "payment_Type",
      headerName: "Payment Type",
      flex: 1,
      valueGetter: (params) => {
        const payment_type = PaymentTypes.find(PaymentType => PaymentType.id === params.row.payment_Type);
        return payment_type ? payment_type.Py_Type_name : '';
      },
    },
    {
      field: "expense_description",
      headerName: "Discription",
      flex: 1,
      valueGetter: (params) => {
        const payment_type = PaymentTypes.find(PaymentType => PaymentType.id === params.row.payment_Type);
        return payment_type ? payment_type.Py_Type_name : '';
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "expense_date",
      headerName: "Expense Date",
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
          to={`/payment/edit/${params.row.id}`}
        >
          <EditIcon />
        </IconButton>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header title="PAYMENTS" subtitle="List of Payment Records" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        position='relative'
        left='85%'
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to="/payment/create"
        >
          Create New Payment
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
        <DataGrid checkboxSelection rows={payments} columns={columns} />
      </Box>
    </Box>
  );
};

export default Payment;
