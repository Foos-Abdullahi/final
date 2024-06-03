import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Visibility, Edit } from "@mui/icons-material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';

const AllInvoiceReceipts = () => {
  const [invoiceReceipts, setInvoiceReceipts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [clients, SetClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedRole = window.sessionStorage.getItem("UserRole");
    setUserRole(storedRole);
     fetchProjects();
    fetchClients();
    fetchInvoiceReceipts();
    fetchPaymentMethods();
  }, []);

  

  const fetchInvoiceReceipts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/invoice_reciept/");
      const data = await response.json();
      setInvoiceReceipts(data);
    } catch (error) {
      console.error("Error fetching invoice receipts:", error);
    }
  };
  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      const data = await response.json();

      SetClients(data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };
  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Payment_Methode/");
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = userRole === "Admin" ? [
    {
      field: "count",
      headerName: "ID",
      flex: 0.5,
      renderCell: (params) => {
        return params.api.getRowIndex(params.id) + 1;
      },
    },
    {
      field: "clients",
      headerName: "Client",
      flex: 1,
      valueGetter: (params) => {
        const client = clients.find((Client) => Client.id === params.row.client);
        return client ? client.client_name : "";
      },
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      valueGetter: (params) => {
        const paymentMethod = paymentMethods.find((method) => method.id === params.row.payment_method);
        return paymentMethod ? paymentMethod.Py_method_name : "";
      },
    },
    {
      field: "project",
      headerName: "Project",
      flex: 1,
      valueGetter: (params) => {
        const proj= projects.find((pro) => pro.id === params.row.project);
        return proj ? proj.project_name : "";
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>${params.row.amount}</Typography>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      // Other fields for admin
    },
    {
      field: "registration_type",
      headerName: "Registration Type",
      flex: 1,
      // Other fields for admin
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
        <Box>
          <IconButton
            component={Link}
            to={`/invoiceReciept/edit/${params.row.id}`}
          >
            <Edit />
          </IconButton>
          <IconButton
            component={Link}
            to={`/invoiceReciept/reciept/${params.row.id}`} 
          >
            <Visibility />
          </IconButton>
        </Box>
      ),
    },
  ] : userRole === "Cashier" ? [
    { field: "id", headerName: "ID" },
    {
      field: "clients",
      headerName: "Client",
      flex: 1,
      valueGetter: (params) => {
        const client = clients.find((Client) => Client.id === params.row.client);
        return client ? client.client_name : "";
      },
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
      valueGetter: (params) => {
        const paymentMethod = paymentMethods.find((method) => method.id === params.row.payment_method);
        return paymentMethod ? paymentMethod.Py_method_name : "";
      },
    },
    {
      field: "project",
      headerName: "Project",
      flex: 1,
      valueGetter: (params) => {
        const proj= projects.find((pro) => pro.id === params.row.project);
        return proj ? proj.project_name : "";
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>${params.row.amount}</Typography>
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
        <Box>
          <IconButton
            component={Link}
            to={`/invoiceReciept/edit/${params.row.id}`}
          >
            <Edit />
          </IconButton>
          <IconButton
            component={Link}
            to={`/invoiceReciept/reciept/${params.row.id}`} 
          >
            <Visibility />
          </IconButton>
        </Box>
      ),
    },
  ]:[];


  return (
    <Box m="20px">
      <Header title="Invoice Receipts" subtitle="List of Invoice Receipts" />
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
          to="/invoiceReciept/from"
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
        <DataGrid checkboxSelection rows={invoiceReceipts} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllInvoiceReceipts;
