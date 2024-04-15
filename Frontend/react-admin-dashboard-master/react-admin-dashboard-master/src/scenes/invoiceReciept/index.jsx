import React, { useState, useEffect } from "react";
import { Box, Button,Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link} from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const AllInvoiceReceipts = () => {
  const [invoiceReceipts, setInvoiceReceipts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchInvoiceReceipts();
    fetchProjects();
    fetchPaymentMethods();
  }, []);

  const fetchInvoiceReceipts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/invoice_reciept/');
      const data = await response.json();
      setInvoiceReceipts(data);
    } catch (error) {
      console.error('Error fetching invoice receipts:', error);
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

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Payment_Methode/');
      const data = await response.json();
      setPaymentMethods(data);
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
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      valueGetter: (params) => {
        const paymentMethod = paymentMethods.find(method => method.id === params.row.payment_method);
        return paymentMethod ? paymentMethod.Py_method_name : '';
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.amount}
        </Typography>
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
        <Button
          component={Link}
          to={`/invoiceReciept/edit/${params.row.id}`}
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Invoice Receipts" subtitle="List of Invoice Receipts" />
      <Box
        display="flex"
        justifyContent="end"
        mt="-100px"
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to="/invoiceReciept/from"
        >
          Create New Invoice Receipt
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
        <DataGrid checkboxSelection rows={invoiceReceipts} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllInvoiceReceipts;
