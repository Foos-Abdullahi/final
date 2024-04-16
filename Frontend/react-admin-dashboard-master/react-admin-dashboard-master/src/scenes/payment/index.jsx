import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaymentType from "../paymentType";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [PaymentTypes, setPaymentType] = useState([]);

  useEffect(() => {
    fetchPayments();
    fetchProjects();
    fetchPaymentType();
  }, []);

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
    { field: "id", headerName: "ID" },
    {
      field: "project",
      headerName: "Project",
      flex: 1,
      valueGetter: (params) => {
        const project = projects.find(Project => Project.id === params.row.project);
        return project ? project.project_name : '';
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
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "expense_date",
      headerName: "Expense Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="PAYMENTS" subtitle="List of Payment Records" />
      <Box display="flex" justifyContent="end" mt="20px">
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
