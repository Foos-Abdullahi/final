import React, { useState, useEffect } from 'react';
import { Box, Button, TextField,MenuItem } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const ProjectEdit = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [projectData, setProjectData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [editingProjectId, setEditingProjectId] = useState('');
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [nootaayo, setNootaayo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [clientOptions, setClientOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const response = await fetch(`http://localhost:8000/Projects/view/${id}/`);
        if (!response.ok) {
          console.log('No data');
          return;
        }
        const data = await response.json();
        setProjectData(data);
        setOriginalData(data);
        setEditingProjectId(id)
        setSelectedClient(data.client || "")
        console.log(data.client );
        console.log('Data view:', data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, []);

  const fetchClientOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      if (!response.ok) {
        throw new Error("Failed to fetch client options");
      }
      const data = await response.json();
      setClientOptions(data);
    } catch (error) {
      console.error("Error fetching client options:", error);
    }
  };
  useEffect(() => {
    // Fetch client options
    fetchClientOptions();
  }, []);
  
  const updateProject = async () => {
    //alert(editingProjectId)
    try {
      const response = await fetch(`http://127.0.0.1:8000/Projects/update/${editingProjectId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_name: projectName || originalData.project_name,
          client: selectedClient || originalData.client,
          status: status || originalData.status,
          Nootaayo: nootaayo || originalData.Nootaayo,
          start_date: startDate || originalData.start_date,
          end_date: endDate || originalData.end_date,
          issue_date: issueDate || originalData.issue_date,
        }),
      });
      console.log(projectName || originalData.project_name);
      console.log(selectedClient || originalData.client);
      console.log(status || originalData.status);
      console.log(nootaayo || originalData.Nootaayo);
      console.log(startDate || originalData.start_date);
      console.log(endDate || originalData.end_date);
      console.log(issueDate || originalData.issue_date);
      if (response.ok) {
        console.log('Project updated successfully');
        window.location.href = '/project';
      } else {
        console.error('Failed to update project');
        alert('Failed to update the project. Please try again.');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating the project. Please try again.');
    }
  };
  
  const handleFormSubmit = (values) => {
    setProjectData(values);
    updateProject();
  };

  return (
    <Box m="20px">
      <Header title="EDIT PROJECT" subtitle="Edit an Existing Project" />

      <Formik onSubmit={handleFormSubmit} initialValues={projectData}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                variant="filled"
                required
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName || originalData.project_name}
                name="project_name"
                error={touched.project_name && !!errors.project_name}
                helperText={touched.project_name && errors.project_name}
              />
               <TextField
                fullWidth
                select
                variant="filled"
                required
                label= "Client"
                onBlur={handleBlur}
                onChange={(e) => setSelectedClient(e.target.value)}
                value={selectedClient}
                name="client"
                sx={{ gridColumn: "span 4" }}
              >
                {clientOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id} >
                    {option.client_name}
                  </MenuItem>
                ))}
              </TextField> 
              
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Client"
                onBlur={handleBlur}
                onChange={(e) => setClient(e.target.value)}
                value={client || originalData.client}
                name="client"
                error={touched.client && !!errors.client}
                helperText={touched.client && errors.client}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                required
                label="Status"
                onBlur={handleBlur}
                onChange={(e) => setStatus(e.target.value)}
                value={status || originalData.status}
                name="status"
                error={touched.status && !!errors.status}
                helperText={touched.status&& errors.status}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nootaayo"
                required
                onBlur={handleBlur}
                onChange={(e) => setNootaayo(e.target.value)}
                value={nootaayo || originalData.Nootaayo}
                name="nootaayo"
                error={touched.nootaayo && !!errors.nootaayo}
                helperText={touched.nootaayo && errors.nootaayo}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                required
                onBlur={handleBlur}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate || originalData.start_date}
                name="start_date"
                error={touched.start_date && !!errors.start_date}
                helperText={touched.start_date && errors.start_date}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                required
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate || originalData.end_date}
                name="end_date"
                error={touched.end_date && !!errors.end_date}
                helperText={touched.end_date && errors.end_date}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                required
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate || originalData.issue_date}
                name="issue_date"
                error={touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: 'span 4' }}
              />
            </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ProjectEdit;