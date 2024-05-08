import { Box, Button, useTheme,IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaymentType from "../paymentType";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [PaymentTypes, setPaymentType] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPayments();
    fetchProjects();
    fetchPaymentType();
    fetchSearch();
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
  const fetchSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/payment/search?query=${searchQuery}`);
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching Clients:', error);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
      >
        <Box
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          display="flex"
          alignItems="center"
          pl={1}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            type="date"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
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
