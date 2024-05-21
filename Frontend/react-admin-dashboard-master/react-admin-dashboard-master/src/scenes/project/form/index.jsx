import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";

const CreateProject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientOptions, setClientOptions] = useState([]);
  const [designOptions, setDesignOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [status, setStatus] = useState("");
  const [agreements, setAgreements] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetRemain, setBudgetRemain] = useState("");
  const [projectNo, setProjectNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedRole = window.sessionStorage.getItem("userid");
    if (storedRole) {
      setUserId(storedRole);
    }
  }, []);
  useEffect(() => {
    // Fetch client and design options
    fetchClientOptions();
    fetchDesignOptions();
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

  const fetchDesignOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Design/");
      if (!response.ok) {
        throw new Error("Failed to fetch design options");
      }
      const data = await response.json();
      setDesignOptions(data);
    } catch (error) {
      console.error("Error fetching design options:", error);
    }
  };

  const sendForm = async () => {
    // const formData = new FormData();
    // formData.append("project_name", projectName);
    // formData.append("client", selectedClient);
    // formData.append("design", selectedDesign);
    // formData.append("status", status);
    // formData.append("start_date", startDate);
    // formData.append("end_date", endDate);
    // formData.append("Agreements", agreements);
    // formData.append("budget", budget);
    // formData.append("BudgetRemain", budgetRemain);
    // formData.append("project_No", projectNo);
    // formData.append("issue_date", issueDate);
    // formData.append("user_id", userId);
    const res = await fetch("http://127.0.0.1:8000/Projects/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name: projectName,
        client: selectedClient,
        design: selectedDesign,
        status: status,
        start_date: startDate,
        end_date: endDate,
        Agreements: agreements,
        budget: budget,
        BudgetRemain: budgetRemain,
        project_No: projectNo,
        issue_date: issueDate,
        user_id: userId,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    setSnackbarOpen(true);
    setSnackbarMessage("Project created successfully!");
    setSnackbarOpen(true);  };

  const handleFormSubmit = () => {
    sendForm();
  };

  const handleBudgetChange = (event) => {
    const { value } = event.target;
    setBudget(value);
    setBudgetRemain(value); // Set budgetRemain to the entered budget value
  };

  return (
    <Box m="20px">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Header title="CREATE PROJECT" subtitle="Create a New Project" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          project_name: "",
          client: "",
          design: "",
          status: "",
          Agreements: "",
          budget: "",
          BudgetRemain: "",
          project_No: "",
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
                label="Design"
                onBlur={handleBlur}
                onChange={(e) => setSelectedDesign(e.target.value)}
                value={selectedDesign}
                name="design"
                sx={{ gridColumn: "span 4" }}
              >
                {designOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.architecture}
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
                label="Agreements"
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
                label="Budget"
                onBlur={handleBlur}
                onChange={handleBudgetChange} // Use the custom function to handle budget change
                value={budget}
                name="budget"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="number"
                label="Budget Remain"
                onBlur={handleBlur}
                onChange={(e) => setBudgetRemain(e.target.value)}
                value={budgetRemain}
                name="budgetRemain"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Project No"
                onBlur={handleBlur}
                onChange={(e) => setProjectNo(e.target.value)}
                value={projectNo}
                name="projectNo"
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
               <input
                type="text"
                name="user_id"
                value={userId}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
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