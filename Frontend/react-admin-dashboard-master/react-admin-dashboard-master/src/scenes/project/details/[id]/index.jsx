import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Grid, Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useParams } from "react-router-dom";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

const DetailProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [design, setDesign] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const projectResponse = await fetch(`http://127.0.0.1:8000/Projects/view/${id}/`);
      const projectData = await projectResponse.json();
      setProject(projectData);

      const clientResponse = await fetch(`http://127.0.0.1:8000/Client/view/${projectData.client}/`);
      const clientData = await clientResponse.json();
      setClient(clientData);

      const designResponse = await fetch(`http://127.0.0.1:8000/Design/view/${projectData.design}/`);
      const designData = await designResponse.json();
      setDesign(designData);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  if (!project || !client || !design) return <div>Loading...</div>;

  return (
    <Box m="20px">
      <Header title="Project Details" subtitle={`Details for ${project.project_name}`} />
      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: colors.primary[400],
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {project.project_name}
        </Typography>
        <img
          src={`/assets/design/${design.architecture}`}
          alt="Design"
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "20px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><Typography variant="h6">Client:</Typography></TableCell>
              <TableCell><Typography>{client.client_name}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Status:</Typography></TableCell>
              <TableCell><Typography>{project.status}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Agreements:</Typography></TableCell>
              <TableCell><Typography>{project.Agreements}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Budget:</Typography></TableCell>
              <TableCell><Typography>{project.budget}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Budget Remain:</Typography></TableCell>
              <TableCell><Typography>{project.BudgetRemain}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Start Date:</Typography></TableCell>
              <TableCell><Typography>{project.start_date}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">End Date:</Typography></TableCell>
              <TableCell><Typography>{project.end_date}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Issue Date:</Typography></TableCell>
              <TableCell><Typography>{project.issue_date}</Typography></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default DetailProject;
