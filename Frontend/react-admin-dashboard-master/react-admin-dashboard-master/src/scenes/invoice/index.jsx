import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";


const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClient] = useState([]);
  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Invoice/'); 
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching Invoice:', error);
    }
  };
  const fetchClients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Client/'); 
      const data = await response.json();
      setClient(data);
    } catch (error) {
      console.error('Error fetching Invoice:', error);
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "client_id",
      headerName: "Customer",
      flex: 1,
      // cellClassName: "name-column--cell",
      valueGetter: (params) => {
        const client = clients.find(Client => Client.id === params.row.client_id);
        return client ? client.client_name : '';
      },
    },
    {
      field: "amount",
      headerName: "Amount",
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
          to={`/invoice/edit/${params.row.id}`}
        >
          Update Invoice
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
        to="/invoice/form"
      >
        Create New Invoice
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
        <DataGrid checkboxSelection rows={invoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoice;
