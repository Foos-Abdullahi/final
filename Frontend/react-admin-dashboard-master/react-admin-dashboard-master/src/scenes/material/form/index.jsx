import { Box, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const MaterialForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [material, setMaterial] = useState({
    project: 0,
    material_name: "",
    quantity: 0,
    unit_price: 0,
    sub_total: 0,
    issue_date: new Date().toISOString().substr(0, 10),
    user_id: "",
  });
  const [projects, setProjects] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    const role = window.sessionStorage.getItem("UserRole");
    if (user) {
      setMaterial((prevMaterial) => ({ ...prevMaterial, user_id: user }));
    }
    if (role) {
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
    if (userRole === "project_manager") {
      fetchProjectManagerProjects();
    } else {
      fetchAllProjects();
    }
  }, [userRole]);

  const fetchAllProjects = async () => {
    try {
      const projectResponse = await fetch("http://127.0.0.1:8000/Projects/");
      if (!projectResponse.ok) {
        throw new Error("Failed to fetch projects");
      }
      const projectData = await projectResponse.json();
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchProjectManagerProjects = async () => {
    try {
      const projectManagerId = window.sessionStorage.getItem("userid");
      if (!projectManagerId) {
        console.error("Project manager ID not found in sessionStorage");
        return;
      }
      const response = await fetch(`http://127.0.0.1:8000/Projects/get_project_managerBy_id/?pmId=${projectManagerId}`);
      const data = await response.json();
      setProjects(data);
      console.log("Projects for project manager:", data);
    } catch (error) {
      console.error("Error fetching project manager projects:", error);
    }
  };

  const sendForm = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Material/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(material),
      });
      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }
      const data = await res.json();
      console.log("Response data material:", data);
      setSnackbarMessage("Material created successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending form:", error);
      setSnackbarMessage("Error creating material.");
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevMaterial) => {
      const updatedMaterial = { ...prevMaterial, [name]: value };
      if (name === "quantity" || name === "unit_price") {
        updatedMaterial.sub_total = updatedMaterial.quantity * updatedMaterial.unit_price;
      }
      return updatedMaterial;
    });
  };

  return (
    <Box m="20px">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Header title="CREATE MATERIAL" subtitle="Create a New Material" />
      <Formik
        onSubmit={sendForm}
        initialValues={material}
      >
        {({
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {(userRole === "Admin" || userRole === "project_manager") && (
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Project"
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  value={material.project}
                  name="project"
                  sx={{ gridColumn: "span 4" }}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.project_name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Material Name"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={material.material_name}
                name="material_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={material.quantity}
                name="quantity"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Unit Price"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={material.unit_price}
                name="unit_price"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sub Total"
                value={material.sub_total}
                name="sub_total"
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={material.issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
             <input
                type="hidden"
                name="user_id"
                value={material.user_id}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Material
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MaterialForm;
