import { Box, Button , useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

const Projects = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Projects/'); 
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "client_id",
      headerName: "Client",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
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
      field: "nootaayo",
      headerName: "Nootaayo",
      flex: 1,
    },
    {
      field: "issue_date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    
    <Box m="20px">
      <Header title="Projects" subtitle="List of Projects" />
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

export default Projects;
