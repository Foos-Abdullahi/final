import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AllMaterial = () => {
  const [material, setMaterial] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUser] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userPromanager, setUserPromanager] = useState([]);
  useEffect(() => {
    const storedRole = window.sessionStorage.getItem("UserRole");
    setUserRole(storedRole);
  }, []);
  useEffect(() => {
    const storedRole = window.sessionStorage.getItem("UserRole");
    setUserRole(storedRole);
    fetchEmployees();
    fetchProjects();
    fetchUser();
    fetchProjectManagerProjects();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user/");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Material/");
      const data = await response.json();
      setMaterial(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchProjectManagerProjects = async () => {
    try {
      const userName = window.sessionStorage.getItem("UserName");
      if (!userName) {
        console.error("Project manager ID not found in sessionStorage");
        return;
      }
      const response = await fetch(
        `http://127.0.0.1:8000/Material/get_materials_for_user/?username=${userName}`
      );
      const data = await response.json();
      setUserPromanager(data);
      console.log("Project manager projects:", data);
    } catch (error) {
      console.error("Error fetching project manager projects:", error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns =
    userRole === "Admin" || userRole === "project_manager"
      ? [
        {
          field: "count",
          headerName: "ID",
          flex: 0.5,
          renderCell: (params) => {
            return params.api.getRowIndex(params.id) + 1;
          },
        },
          {
            field: "project",
            headerName: "Project",
            flex: 1,
            valueGetter: (params) => {
              const project = projects.find((proj) => proj.id === params.row.project);
              return project ? project.project_name : "";
            },
          },
          {
            field: "material_name",
            headerName: "Material Name",
            flex: 1,
          },
          {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
          },
          {
            field: "unit_price",
            headerName: "Unit Price",
            flex: 1,
            renderCell: (params) => (
              <Typography color={colors.greenAccent[500]}>
                ${params.row.unit_price}
              </Typography>
            ),
          },
          {
            field: "sub_total",
            headerName: "Sub Total",
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
            field: "user",
            headerName: "User Name",
            flex: 1,
            valueGetter: (params) => {
              const user = users.find((usr) => usr.id === params.row.user);
              return user ? user.UserName : "";
            },
          },
          {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <Box>
                <IconButton
                  component={Link}
                  to={`/material/edit/${params.row.id}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  to={`/material/details/${params.row.id}`}
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            ),
          },
        ]
      : [];

  return (
    <Box m="20px">
      <Header title="Material" subtitle="List of Materials" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        position="relative"
        left="90%"
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to="/material/form"
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
        <DataGrid
          checkboxSelection
          rows={userRole === "project_manager" ? userPromanager : material}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default AllMaterial;
