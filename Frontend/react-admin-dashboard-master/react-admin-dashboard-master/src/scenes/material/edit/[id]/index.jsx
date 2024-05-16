import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import React, { useState, useEffect } from "react";

const MaterialEditForm = () => {
  const url = window.location.pathname;
  const materialId = url.split("/").pop();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [material, setMaterial] = useState({
    project: 0,
    material_name: "",
    quantity: 0,
    unit_price: 0,
    sub_total: 0,
    issue_date: "",
  });

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchMaterial = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Material/getbyid/${materialId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch material details");
      }
      const data = await response.json();
      console.log("waaa lawadaa", data);
      setMaterial({
        project: data.project,
        material_name: data.material_name,
        quantity: data.quantity,
        unit_price: data.unit_price,
        sub_total: data.sub_total,
        issue_date: data.issue_date,
      });
    } catch (error) {
      console.error("Error fetching material details:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchMaterial();
  }, []);

  const sendForm = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/Material/update/${materialId}/`, {
        method: "PUT",
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
      console.log("Response data:", data);
      window.history.back();
      // Reload data from the server after successful form submission
      fetchMaterial();
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is not quantity or unit_price, update directly
    if (name !== 'quantity' && name !== 'unit_price') {
      setMaterial({ ...material, [name]: value });
      return;
    }
  
    // Calculate subTotal using the updated value
    let subTotal = material.sub_total;
    if (name === 'quantity') {
      subTotal = value * material.unit_price;
    } else if (name === 'unit_price') {
      subTotal = material.quantity * value;
    }
  
    setMaterial({ ...material, [name]: value, sub_total: subTotal });
  };

  return (
    <Box m="20px">
      <Header title="EDIT MATERIAL" subtitle="Edit Material Details" />

      <Formik onSubmit={sendForm} initialValues={{}}>
        {({ handleBlur, handleSubmit }) => (
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Material
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MaterialEditForm;