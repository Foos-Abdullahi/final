import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import React, { useState, useEffect } from "react";

const MaterialEditForm = () => {
  const url = window.location.pathname;
  const materialId = url.split("/").pop();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [projects, setProjects] = useState([]);
  const [selectproject,setSelectProject]=useState("");
  const [materialname,setMaterial_name]=useState("");
  const [quantity,setQuantity]=useState("");
  const [unit_price,setUnit_price]=useState("");
  const [sub_total,setSub_total]=useState("");
  const [issue_date,setIssue_date]=useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    const role = window.sessionStorage.getItem("UserRole");
    if (user) {
      setUserId(user);
    }
    if (role) {
      setUserRole(role);
    }
  }, []);
  useEffect(() => {
    if (userRole === "project_manager") {
      fetchProjectManagerProjects();
    } else {
      fetchProjects();
    }
  }, [userRole]);
  // const [projects, setProjects] = useState([]);

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

  
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/Material/getbyid/${materialId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch material details");
        }
        const data = await response.json();
        console.log("waaa lawadaa", data);
        setSelectProject(data.project);
        setMaterial_name(data.material_name);
        setQuantity(data.quantity);
        setUnit_price(data.unit_price);
        setSub_total(data.sub_total);
        setIssue_date(data.issue_date);
        setUserId(data.user);
      } catch (error) {
        console.error("Error fetching material details:", error);
      }
    };
    fetchMaterial();
  }, [materialId]);

  const sendForm = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/Material/update/${materialId}/`, {
        method: "PUT",
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
      console.log("Response data:", data);
      window.history.back();
      // Reload data from the server after successful form submission
      // fetchMaterial();
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
              {(userRole === "Admin" || userRole === "project_manager") && (
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Project"
                  onBlur={handleBlur}
                  onChange={handleInputChange}
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
              )}
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
                onChange={(e)=>e.target.value}
                value={issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
                 <input
                type="number"
                name="user_id"
                value={userId}
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