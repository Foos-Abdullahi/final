import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from "@mui/material";
import { Print, Visibility } from "@mui/icons-material";

const ProjectReport = () => {
  const [companyName, setCompanyName] = useState("City Construction");
  const [companyAddress, setCompanyAddress] = useState("Somalia");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projects, setProjects] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/Projects/searchDatesBetween/?start_date=${startDate}&end_date=${endDate}`
      );
      const data = await response.json();
      setProjects(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleViewProject = (projectId) => {
    // Navigate to the project details page or perform any action
    console.log("View Project:", projectId);
  };

  return (
    <Box m="20px">
      <Paper elevation={3} sx={{ padding: "20px", maxWidth: "800px", margin: "auto", backgroundColor: "#000000", color: "#ffffff" }}>
        {showResults ? (
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Agreements</TableCell>
                    <TableCell>Budget</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.project_name}</TableCell>
                      <TableCell>{project.status}</TableCell>
                      <TableCell>{project.Agreements}</TableCell>
                      <TableCell>{project.budget}</TableCell>
                      <TableCell>{project.start_date}</TableCell>
                      <TableCell>{project.end_date}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<Visibility />}
                          onClick={() => handleViewProject(project.id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Print />}
                onClick={() => window.print()}
              >
                Print Report
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              Search Projects
            </Typography>
            <Box display="flex">
              <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ marginBottom: "20px", marginRight: "10px" }}
              />
              <TextField
                label="End Date"
                type="date"
                variant="outlined"
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ marginBottom: "20px", marginRight: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{ marginBottom: "20px" }}
              >
                Search
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body1">{companyName}</Typography>
            <Typography variant="body1">{companyAddress}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProjectReport;
