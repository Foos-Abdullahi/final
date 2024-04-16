import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

const MaterialEditForm = () => {

  const url = window.location.pathname;
  const materialId = url.split("/").pop(); 
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [projectselect, setProjectselect] = useState("");
  const [materialname, setMaterialname] = useState("");
  const [quantityvalue, setQuantity] = useState(0);
  const [unitprice, setUnitprice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [issuedate, setIssuedate] = useState("");
  const [projects, setProjects] = useState([]);



  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data); // Assuming data is an array of projects with IDs and names
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
      setProjectselect(data.project);
      setMaterialname(data.material_name);
      setQuantity(data.quantity);
      setUnitprice(data.unit_price);
      setSubtotal(data.sub_total);
      setIssuedate(data.issue_date);
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
        body: JSON.stringify({
          project: projectselect,
          material_name: materialname,
          quantity: quantityvalue,
          unit_price: unitprice,
          sub_total: subtotal,
          issue_date: issuedate
        }),
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

  return (
    <Box m="20px">
      <Header title="EDIT MATERIAL" subtitle="Edit Material Details" />

      <Formik onSubmit={sendForm} initialValues={{}}>
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
              <TextField
                select
                fullWidth
                variant="filled"
                label="Project"
                onBlur={handleBlur}
                onChange={(e) => setProjectselect(e.target.value)}
                value={projectselect}
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
                onChange={(e) => setMaterialname(e.target.value)}
                value={materialname}
                name="material_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={(e) => setQuantity(e.target.value)}
                value={quantityvalue}
                name="quantity"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Unit Price"
                onBlur={handleBlur}
                onChange={(e) => setUnitprice(e.target.value)}
                value={unitprice}
                name="unit_price"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sub Total"
                onBlur={handleBlur}
                onChange={(e) => setSubtotal(e.target.value)}
                value={subtotal}
                name="sub_total"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssuedate(e.target.value)}
                value={issuedate}
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