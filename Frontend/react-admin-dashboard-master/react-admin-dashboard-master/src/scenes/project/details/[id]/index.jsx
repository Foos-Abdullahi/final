import { Box, Button, useTheme, IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Visibility, Edit } from "@mui/icons-material";
const DetailProject = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [designs, setDesigns] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchClients();
    fetchdesigns();
    fetchSearch();
  }, [searchQuery]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      const data = await response.json();
      
      
      
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
  const fetchdesigns = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Design/");
      const data = await response.json();
      setDesigns(data);
      console.log("xogta ",data);
    } catch (error) {
      console.error("Error fetching Design:", error);
    }
  };
  const fetchSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Projects/search?query=${searchQuery}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching Clients:', error);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "client_name",
      headerName: "Client Name",
      // field: "client",
      // headerName: "Client",
      flex: 1,
      valueGetter: (params) => {
        const client = clients.find(Client => Client.id === params.row.client);
        return client ? client.client_name : '';
      },
    },
    {
      field: "image",
      headerName: "Image",
      // field: "design",
      // headerName: "design",
      flex: 1,
      valueGetter: (params) => {
        const Design = designs.find(design => design.id === params.row.design);
        return Design ? Design.image: '';
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "Agreements",
      headerName: "Agreements",
      flex: 1,
    },
    {
      field: "budget",
      headerName: "budget",
      flex: 1,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 1,
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
        <Box>
          <IconButton
            component={Link}
            to={`/project/edit/${params.row.id}`}
          >
            <Edit />
          </IconButton>
          <IconButton
            component={Link}
            to={`/project/details/${params.row.id}`} 
          >
            <Visibility />
          </IconButton>
        </Box>
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
          to="/project/form"
        >
            Create New Project
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
        <DataGrid checkboxSelection rows={projects} columns={columns} />
      </Box>
    </Box>
  );
  
};

export default DetailProject;
