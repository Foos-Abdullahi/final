import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Grid, Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useParams } from "react-router-dom";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

const MaterialDetail = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [project, setProject] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
        const materialResponse = await fetch(`http://127.0.0.1:8000/Material/getbyid/${id}/`);
        const materialData = await materialResponse.json();
        setMaterial(materialData);
        
        const projectResponse = await fetch(`http://127.0.0.1:8000/Projects/view/${id}/`);
        const projectData = await projectResponse.json();
        setProject(projectData);

    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  if (!project || !material) return <div>Loading...</div>;

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
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><Typography variant="h6">Material Name:</Typography></TableCell>
              <TableCell><Typography>{material.material_name}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Quantity:</Typography></TableCell>
              <TableCell><Typography>{material.quantity}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Unit Price:</Typography></TableCell>
              <TableCell><Typography>{material.unit_price}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Sub Total:</Typography></TableCell>
              <TableCell><Typography>{material.sub_total}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Typography variant="h6">Issue Date:</Typography></TableCell>
              <TableCell><Typography>{material.issue_date}</Typography></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default MaterialDetail;
