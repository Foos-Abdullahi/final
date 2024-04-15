import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link} from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
const AllMaterail = () => {
  const [material, setMaterial] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Material/');
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
      field: "material_name",
      headerName: "material Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "unit_price",
      headerName: "Unit price",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.unit_price}
        </Typography>
      ),
    },
    {
      field: "sub_total",
      headerName: "Sub total",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.sub_total}
        </Typography>
      ),
    },
    {
      field: "issue_date",
      headerName: "Issue Date",
      flex: 1,
    },
    {
      field: "actions", // Add a new column for actions
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/material/edit/${params.row.id}`} // Link to the edit form with material ID
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
      <Header  title="Material" subtitle="List of Material Balances" />
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
          to="/material/form"
        >
          Create New Material
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

export default AllMaterail;
