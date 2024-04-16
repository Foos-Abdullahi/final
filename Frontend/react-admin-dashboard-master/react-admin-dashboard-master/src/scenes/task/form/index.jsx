import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const TaskForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [task, setTask] = useState({
    project: "", // Default project ID
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const sendForm = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Tasks/addnew/", {
        method: "POST",
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
      window.history.back();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE Task" subtitle="Create a New Task" />

      <Formik onSubmit={sendForm} initialValues={task}>
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
              gap="20px"
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
                onChange={(e) => setTask({ ...task, project: e.target.value })}
                value={task.project}
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
                label="Task Name"
                onBlur={handleBlur}
                onChange={(e) => setTask({ ...task, task_name: e.target.value })}
                value={task.task_name}
                name="task_name"
                error={!!touched.task_name && !!errors.task_name}
                helperText={touched.task_name && errors.task_name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                onBlur={handleBlur}
                onChange={(e) => setTask({ ...task, start_date: e.target.value })}
                value={task.start_date}
                name="start_date"
                error={!!touched.start_date && !!errors.start_date}
                helperText={touched.start_date && errors.start_date}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                onChange={(e) => setTask({ ...task, end_date: e.target.value })}
                value={task.end_date}
                name="end_date"
                error={!!touched.end_date && !!errors.end_date}
                helperText={touched.end_date && errors.end_date}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                value={task.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setTask({ ...task, issue_date: e.target.value })}
                value={setTask.issue_date}
                name="issue_date"
                error={!!touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="5px">
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

export default TaskForm;
