import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

const RecieptEditForm = () => {

  const url = window.location.pathname;
  const RecieptId = url.split("/").pop(); 
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [project, setProject] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // New state variable
  const [amount, setAmount] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [projects, setProjects] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]); // New state variable



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

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Payment_Methode/"); // Adjust endpoint as needed
      if (!response.ok) {
        throw new Error("Failed to fetch payment methods");
      }
      const data = await response.json();
      setPaymentMethods(data); // Assuming data is an array of payment methods with IDs and names
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const fetchreciept = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/invoice_reciept/view/${RecieptId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch task details");
      }
      const data = await response.json();
      console.log("Fetched task data:", data);
      setProject(data.project);
      setPaymentMethod(data.payment_method); // Set payment method from fetched data
      setAmount(data.amount);
      setIssueDate(data.issue_date);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };
  useEffect(() => {
    fetchProjects();
    fetchPaymentMethods(); // Fetch payment methods
    fetchreciept();
  }, []);
  const sendForm = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/invoice_reciept/update/${RecieptId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project:project,
          payment_method: paymentMethod, // Include payment method in the request body
          amount: amount,
          issue_date: issueDate,
        }),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);

      // Reload data from the server after successful form submission
      fetchreciept();
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="EDIT TASK" subtitle="Edit Task Details" />

      <Formik onSubmit={sendForm} initialValues={{}}>
        {({
          handleBlur,
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
                select
                fullWidth
                variant="filled"
                label="Project"
                onBlur={handleBlur}
                onChange={(e) => setProject(e.target.value)}
                value={project}
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
                select // Use select for payment method
                fullWidth
                variant="filled"
                label="Payment Method"
                onBlur={handleBlur}
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
                name="payment_method"
                sx={{ gridColumn: "span 4" }}
              >
                {paymentMethods.map((method) => (
                  <MenuItem key={method.id} value={method.id}>
                    {method.Py_method_name} {/* Assuming payment method has a 'name' attribute */}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Task Name"
                onBlur={handleBlur}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                name="amount"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                name="start_date"
                sx={{ gridColumn: "span 4" }}
              />
              
              </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Update Task
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default RecieptEditForm;
