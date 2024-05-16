import { Box, Button, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";

const Designs = () => {

  const [designs, setdesigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchdesigns();
    fetchSearch();
  }, [searchQuery]);

  const fetchdesigns = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Design/'); 
      const data = await response.json();
      setdesigns(data);
    } catch (error) {
      console.error('Error fetching design:', error);
    }
  };
  const fetchSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Design/search?query=${searchQuery}`);
      const data = await response.json();
      setdesigns(data);
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
      field: "architecture",
      headerName: "Architecture",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`/assets/design${params.value}`} 
          alt="Design"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
        <IconButton
          color="secondary"
          component={Link}
          to={`/design/update/${params.row.id}`}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];
  
  return (
    <Box m="20px">
      <Header title="Client" subtitle="List of Client Balances" />
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
            placeholder="Search"
            type="date"
            value={searchQuery}
            onChange={handleSearch}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={fetchSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Button
          color="secondary"
          component={Link}
          to="/design/form"
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
        <DataGrid checkboxSelection rows={designs} columns={columns} />
      </Box>
    </Box>
  );
};

export default Designs;
