import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link} from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetchTask();
    fetchProjects();
    fetchUser();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Tasks/');
      const data = await response.json();
      setTasks(data);
      console.log("Tasks : ",tasks);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Projects/');
      const data = await response.json();
      setProjects(data);
      console.log("Projetcs : ",projects);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
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
    // {
    //   field: "task_image",
    //   headerName: "Task Image",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <img src={params.value} alt="Task" style={{ width: 100, height: 60 }} />
    //   ),
    // },
    {
      field: "task_image",
      headerName: "Task Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`/assets/task/${params.value}`} 
          alt="Tasks"
          style={{ width: 60, height: 60 }} 
        />
      ),
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
          <IconButton component={Link} 
          to={`/task/edit/${params.row.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton component={Link} to={`/task/details/${params.row.id}`}>
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  

  return (
    <Box m="20px">
      <Header title="Tasks" subtitle="List of Tasks" />
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
          to="/task/form"
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
        <DataGrid checkboxSelection rows={tasks} columns={columns} />
      </Box>
    </Box>
  );
  
};

export default AllTask;
