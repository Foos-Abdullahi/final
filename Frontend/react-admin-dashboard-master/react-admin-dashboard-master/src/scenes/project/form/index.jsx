import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const CreateProjects = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [clientOptions, setClientOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nootaayo, setNootaayo] = useState("");
  const [issueDate, setIssueDate] = useState("");

  useEffect(() => {
    // Fetch client options
    fetchClientOptions();
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

  const sendForm = async () => {
    alert("Submitting Form");

    const res = await fetch("http://127.0.0.1:8000/Projects/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name: projectName,
        status: status,
        client_id: selectedClient,
        start_date: startDate,
        end_date: endDate,
        nootaayo: nootaayo,
        issue_date: issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    // Call the sendForm function here
    sendForm();
  };

  return (
    <Box m="20px">
      <Header title="CREATE PROJECT" subtitle="Create a New Project" />

      <Formik
        onSubmit={sendForm}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
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
                fullWidth
                variant="filled"
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                name="projectName"
                error={!!touched.projectName && !!errors.projectName}
                helperText={touched.projectName && errors.projectName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Client ID"
                onBlur={handleBlur}
                onChange={(e) => setSelectedClient(e.target.value)}
                value={selectedClient}
                name="selectedClient"
                error={!!touched.selectedClient && !!errors.selectedClient}
                helperText={touched.selectedClient && errors.selectedClient}
                sx={{ gridColumn: "span 4" }}
              >
                {clientOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.client_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                onBlur={handleBlur}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                name="startDate"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nootaayo"
                onBlur={handleBlur}
                onChange={(e) => setNootaayo(e.target.value)}
                value={nootaayo}
                name="nootaayo"
                error={!!touched.nootaayo && !!errors.nootaayo}
                helperText={touched.nootaayo && errors.nootaayo}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                name="issueDate"
                error={!!touched.issueDate && !!errors.issueDate}
                helperText={touched.issueDate && errors.issueDate}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  projectName: "",
  status: "",
  selectedClient: "",
  startDate: "",
  endDate: "",
  nootaayo: "",
  issueDate: "",
};

export default CreateProjects;
