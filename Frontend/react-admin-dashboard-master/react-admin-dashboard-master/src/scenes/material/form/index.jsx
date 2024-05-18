import { Box, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const MaterialForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [material, setMaterial] = useState({
    project: 0, // Default project ID
    material_name: "",
    quantity: 0,
    unit_price: 0,
    sub_total: 0,
    issue_date: new Date().toISOString().substr(0, 10),
  });
  const [projects, setProjects] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    const fetchProjects = async () => {
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
    fetchProjects();
  }, []);

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
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending form:", error);
    }
    setSnackbarMessage("Material created successfully!");
    setSnackbarOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is not quantity or unit_price, update directly
    if (name !== "quantity" && name !== "unit_price") {
      setMaterial({ ...material, [name]: value });
      return;
    }
      // Show Snackbar with success message
      
    // Calculate subTotal using the updated value
    let subTotal = material.sub_total;
    if (name === "quantity") {
      subTotal = value * material.unit_price;
    } else if (name === "unit_price") {
      subTotal = material.quantity * value;
    }

    setMaterial({ ...material, [name]: value, sub_total: subTotal });
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
      <Formik onSubmit={sendForm} initialValues={material}>
        {({
          values,
          errors,
          touched,
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
              <TextField
                select
                fullWidth
                variant="filled"
                label="Project"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={material.project}
                name="project"
                error={!!touched.project && !!errors.project}
                helperText={touched.project && errors.project}
                sx={{ gridColumn: "span 4" }}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.project_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Material Name"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={material.material_name}
                name="material_name"
                error={!!touched.material_name && !!errors.material_name}
                helperText={touched.material_name && errors.material_name}
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
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={material.sub_total}
                name="sub_total"
                sx={{ gridColumn: "span 4" }}
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
