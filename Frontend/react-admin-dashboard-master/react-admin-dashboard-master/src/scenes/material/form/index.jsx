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
    user_id: "", // Add user_id to the state
  });
  const [projects, setProjects] = useState([]);
  const [selectproject,setSelectProject]=useState("");
  const [materialname,setMaterial_name]=useState("");
  const [quantity,setQuantity]=useState("");
  const [unit_price,setUnit_price]=useState("");
  const [sub_total,setSub_total]=useState("");
  const [issue_date,setIssue_date]=useState(new Date().toISOString().substr(0, 10));
  const [userId, setUserId] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);

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

    const storedUserId = window.sessionStorage.getItem("userid");
    if (storedUserId) {
      setMaterial((prevMaterial) => ({ ...prevMaterial, user_id: storedUserId }));
    }
  }, []);

  const sendForm = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Material/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: selectproject,
          material_name: materialname,
          quantity: quantity,
          unit_price: unit_price,
          sub_total: sub_total,
          issue_date: issue_date,
          user_id: userId,


        }),
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
    let subTotal = material.sub_total;
    if (name === "quantity") {
      setQuantity(value);
      setSub_total(value * unit_price);
    } else if (name === "unit_price") {
      setUnit_price(value);
      setSub_total(quantity * value);
    }
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
      <Formik onSubmit={sendForm} initialValues={{
        material_name: "",
        quantity: "",
        unit_price: "",
        sub_total: "",
        project: "",
        issue_date: ""
      }}>
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
                onChange={(e)=>setSelectProject(e.target.value)}
                value={selectproject}
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
                onChange={(e)=>setMaterial_name(e.target.value)}
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
                onChange={handleInputChange}
                value={quantity}
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
                value={unit_price}
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
                value={sub_total}
                name="sub_total"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e)=>setIssue_date(e.target.value)}
                value={issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
                    <input
                type="hidden"
                name="user_id"
                value={userId}
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
