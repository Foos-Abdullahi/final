import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link} from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchTask();
    fetchProjects();
    fetchSearch();
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
  const fetchSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Tasks/search?query=${searchQuery}`);
      const data = await response.json();
      setTasks(data);
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
          style={{ width: 100, height: 60 }} 
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
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/task/edit/${params.row.id}`}
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
        >
          
        </Button>
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
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
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
