import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [users, setUser] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchProjects();
    fetchClients();
    fetchDesigns();
    fetchUser();
  }, []);

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
  const fetchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user/");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchDesigns = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Design/");
      const data = await response.json();
      setDesigns(data);      
    } catch (error) {
      console.error("Error fetching designs:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "project_name", headerName: "Project Name", flex: 1 },
    {
      field: "client_name",
      headerName: "Client Name",
      flex: 1,
      valueGetter: (params) => {
        const client = clients.find(Client => Client.id === params.row.client);
        return client ? client.client_name : '';
      },
    },
    {
      field: "design",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => {
        const design = designs.find((design) => design.id === params.row.design);
        return (
          <img
            src={`/assets/design/${design ? design.architecture : 'placeholder.jpg'}`}
            alt="Design"
            style={{ width: 90, height: 60 }}
          />
        );
      },
    },
    { field: "status", headerName: "Status", flex: 1 },
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
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton component={Link} to={`/project/edit/${params.row.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton component={Link} to={`/project/details/${params.row.id}`}>
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Projects" subtitle="List of Projects" />
      <Box
        display="flex"
        justifyContent="flex-end"
        mb="20px"
      >
        <Button
          color="secondary"
          component={Link}
          to="/project/form"
          variant="contained"
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

export default Projects;
