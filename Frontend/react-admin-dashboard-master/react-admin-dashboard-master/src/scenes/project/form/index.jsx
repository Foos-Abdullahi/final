import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const CreateProject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [projectName, setProjectName] = useState("");
  const [clientOptions, setClientOptions] = useState([]);
  const [designOptions, setdesignOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selecteddesigns,setSelectedDesigns]=useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agreements, setAgreements] = useState("");
  const [budgets, setBudgets] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));

  useEffect(() => {
    // Fetch client options
    fetchClientOptions();
    fetchdesignOptions();
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

  const fetchdesignOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Design/");
      if (!response.ok) {
        throw new Error("Failed to fetch Design options");
      }
      const data = await response.json();
      setdesignOptions(data);
    } catch (error) {
      console.error("Error fetching Design options:", error);
    }
  };
  const sendForm = async () => {
    const res = await fetch("http://127.0.0.1:8000/Projects/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name: projectName,
        client: selectedClient,
        design:selecteddesigns,
        status: status,
        start_date: startDate,
        end_date: endDate,
        Agreements: agreements,
        budget: budgets,
        issue_date: issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    //  window.location.href = '/project';
     window.history.back();

  };

  const handleFormSubmit = () => {
    sendForm();
  };

  return (
    <Box m="20px">
      <Header title="CREATE PROJECT" subtitle="Create a New Project" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          project_name: "",
          client: "",
          design: "",
          status: "",
          Agreements: "",
          budget:"",
          start_date: "",
          end_date: "",
          issue_date: "",
        }}
      >
        {({
          values,
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
                required
                variant="filled"
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                name="project_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                select
                variant="filled"
                label="Client"
                onBlur={handleBlur}
                onChange={(e) => setSelectedClient(e.target.value)}
                value={selectedClient}
                name="client"
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
                required
                select
                variant="filled"
                label="design"
                onBlur={handleBlur}
                onChange={(e) => setSelectedDesigns(e.target.value)}
                value={selecteddesigns}
                name="design"
                sx={{ gridColumn: "span 4" }}
              >
                {designOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.image}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                required
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
                required
                variant="filled"
                type="text"
                label="agreements"
                onBlur={handleBlur}
                onChange={(e) => setAgreements(e.target.value)}
                value={agreements}
                name="agreements"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="number"
                label="budget"
                onBlur={handleBlur}
                onChange={(e) => setBudgets(e.target.value)}
                value={budgets}
                name="Nootaayo"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Start Date"
                onBlur={handleBlur}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                name="start_date"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                name="end_date"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
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

export default CreateProject;
