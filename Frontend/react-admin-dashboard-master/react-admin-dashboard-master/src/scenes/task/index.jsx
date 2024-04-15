import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link} from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
const AllTask = () => {
  const [material, setMaterial] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchTask();
    fetchProjects();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Tasks/');
      const data = await response.json();
      setMaterial(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
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
      field: "task_name",
      headerName: "Task Name",
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
      field: "status",
      headerName: "Status",
      flex: 1,
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
          to={`/task/edit/${params.row.id}`}
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
      <Header  title="Tasks" subtitle="List of Task Balances" />
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
          to="/task/form"
        >
          Create New Task
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
        <DataGrid checkboxSelection rows={material} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllTask;
