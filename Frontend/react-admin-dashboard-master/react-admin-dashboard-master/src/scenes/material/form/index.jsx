import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const MaterialForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [material, setMaterial] = useState({
    project: 0, // Default project ID
    payment_method: "", // Default payment method
    amount: 0,
    issue_date: "",
  });

  const [projects, setProjects] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const fetchProjectsAndPaymentMethods = async () => {
    try {
      const projectResponse = await fetch("http://127.0.0.1:8000/Projects/");
      if (!projectResponse.ok) {
        throw new Error("Failed to fetch projects");
      }
      const projectData = await projectResponse.json();
      setProjects(projectData);

      const paymentMethodResponse = await fetch("http://127.0.0.1:8000/PaymentMethods/");
      if (!paymentMethodResponse.ok) {
        throw new Error("Failed to fetch payment methods");
      }
      const paymentMethodData = await paymentMethodResponse.json();
      setPaymentMethods(paymentMethodData);
    } catch (error) {
      console.error("Error fetching projects and payment methods:", error);
    }
  };

  useEffect(() => {
    fetchProjectsAndPaymentMethods();
  }, []);

  const sendForm = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Material/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(material),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE MATERIAL" subtitle="Create a New Material" />

      <Formik onSubmit={sendForm} initialValues={material}>
        {({
          values,
          errors,
          touched,
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
                onChange={(e) => setMaterial({ ...material, project: e.target.value })}
                value={material.project}
                name="project"
                error={!!touched.project && !!errors.project}
                helperText={touched.project && errors.project}
                sx={{ gridColumn: "span 4" }}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.project_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Payment Method"
                onBlur={handleBlur}
                onChange={(e) => setMaterial({ ...material, payment_method: e.target.value })}
                value={material.payment_method}
                name="payment_method"
                error={!!touched.payment_method && !!errors.payment_method}
                helperText={touched.payment_method && errors.payment_method}
                sx={{ gridColumn: "span 4" }}
              >
                {paymentMethods.map((method) => (
                  <MenuItem key={method.id} value={method.id}>
                    {method.payment_method_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={(e) => setMaterial({ ...material, amount: e.target.value })}
                value={material.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setMaterial({ ...material, issue_date: e.target.value })}
                value={material.issue_date}
                name="issue_date"
                error={!!touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Material
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MaterialForm;
