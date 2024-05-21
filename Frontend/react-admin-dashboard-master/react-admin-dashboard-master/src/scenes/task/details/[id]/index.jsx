import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, CircularProgress, Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useParams } from "react-router-dom";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  const fetchTaskDetails = async () => {
    try {
      const taskResponse = await fetch(`http://127.0.0.1:8000/Tasks/detils/${id}/`);
      const taskData = await taskResponse.json();
      setTask(taskData);

      const projectResponse = await fetch(`http://127.0.0.1:8000/Projects/view/${taskData.project}/`);
      const projectData = await projectResponse.json();
      setProject(projectData);

      const userResponse = await fetch(`http://127.0.0.1:8000/user/view/${taskData.user}/`);
      const userData = await userResponse.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  if (!task || !project || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={colors.primary[700]}>
      <Box m="20px" width="100%" maxWidth="1200px">
        <Header title="Task Details" subtitle={`Details for ${task.task_name}`} />
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: colors.primary[400],
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            margin: "auto",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {project.project_name}
          </Typography>
          <Box
            component="img"
            src={`/assets/task/${task.task_image}`}
            alt="Task"
            sx={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              mb: 4,
            }}
          />
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><Typography variant="h6" color={colors.grey[100]}>Task Name:</Typography></TableCell>
                <TableCell><Typography>{task.task_name}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="h6" color={colors.grey[100]}>User:</Typography></TableCell>
                <TableCell><Typography>{user.UserName}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="h6" color={colors.grey[100]}>Start Date:</Typography></TableCell>
                <TableCell><Typography>{task.start_date}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="h6" color={colors.grey[100]}>End Date:</Typography></TableCell>
                <TableCell><Typography>{task.end_date}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="h6" color={colors.grey[100]}>Status:</Typography></TableCell>
                <TableCell><Typography>{task.status}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="h6" color={colors.grey[100]}>Issue Date:</Typography></TableCell>
                <TableCell><Typography>{task.issue_date}</Typography></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default TaskDetails;
