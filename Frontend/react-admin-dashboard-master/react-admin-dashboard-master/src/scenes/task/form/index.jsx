import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const TaskForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [projects, setProjects] = useState([]);
  const [selectproject,setSelectProject]=useState("");
  const [taskname,setTask_name]=useState("");
  const [startdate,setStart_date]=useState("");
  const [end_date,setEnd_date]=useState("");
  const [status,setStatus]=useState("");
  const [issue_date,setIssue_date]=useState(new Date().toISOString().substr(0, 10));
  const [task_image,setTask_image]=useState([null]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);
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
      const formData = new FormData();
      formData.append("project", selectproject);
      formData.append("task_name", taskname);
      formData.append("start_date", startdate);
      formData.append("end_date", end_date);
      formData.append("status", status);
      formData.append("issue_date", issue_date);
      formData.append("user_id",userId); 
      if (task_image) {
        formData.append("task_image", task_image);
      }
      const res = await fetch("http://127.0.0.1:8000/Tasks/addnew/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      // window.history.back();
      console.log("Response data:", data);
      console.log("userId: ",userId);
      console.log("project: ",selectproject);
      console.log("taskname: ",taskname);
      console.log("issue_date: ",issue_date);
      console.log("task_image: ",task_image);
      console.log("end_date: ",end_date);

    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE Task" subtitle="Create a New Task" />

      <Formik onSubmit={sendForm} initialValues={{
        project: "",
        task_name: "",
        start_date: "",
        end_date: "",
        status: "",
        issue_date: "",
        task_image: ""
      }}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          setFieldValue, // Added setFieldValue for handling file upload
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
                onChange={(e) => setSelectProject(e.target.value)}
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
                label="Task Name"
                onBlur={handleBlur}
                onChange={(e) => setTask_name(e.target.value)}
                value={taskname}
                name="task_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                onBlur={handleBlur}
                onChange={(e) => setStart_date(e.target.value)}
                value={startdate}
                name="start_date"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                onChange={(e) => setEnd_date(e.target.value)}
                value={end_date}
                name="end_date"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                name="status"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssue_date(e.target.value)}
                value={issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
              <input
                fullWidth
                variant="filled"
                type="file"
                label="Task Image"
                onBlur={handleBlur}
                onChange={(e) => setTask_image(e.target.files[0])}
                sx={{ gridColumn: "span 4" }}
              />
                    <input
                type="hidden"
                name="user_id"
                value={userId}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button color="primary" variant="contained" onClick={() => window.location.href = "/task"}>
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Task
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TaskForm;