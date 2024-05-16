import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

const TaskEditForm = () => {

  const url = window.location.pathname;
  const taskId = url.split("/").pop(); 
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [task, setTask] = useState({
    project: "",
    task_name: "",
    start_date: "",
    end_date: "",
    status: "",
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
      setProjects(data); // Assuming data is an array of projects with IDs and names
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Tasks/detils/${taskId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch task details");
      }
      const data = await response.json();
      console.log("Fetched task data:", data);
      setTask({
        project: data.project,
        task_name: data.task_name,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        issue_date: data.issue_date,
      });
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };
  useEffect(() => {
    fetchProjects();
    fetchTask();
  }, []);

  const sendForm = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/Tasks/update/${taskId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      window.history.back();
      // Reload data from the server after successful form submission
      fetchTask();
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <Box m="20px">
      <Header title="EDIT TASK" subtitle="Edit Task Details" />

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
                value={task.project}
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
                label="Task Name"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={task.task_name}
                name="task_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={task.start_date}
                name="start_date"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={task.end_date}
                name="end_date"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={task.status}
                name="status"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={task.issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Task
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default TaskEditForm;
