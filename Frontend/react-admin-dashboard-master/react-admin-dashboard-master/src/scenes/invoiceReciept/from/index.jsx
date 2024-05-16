import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const ReciptForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [reciept, setReciept] = useState({
    client: 0, // Default client ID
    payment_method: "", // Default payment method
    project: 0, // Default payment method
    amount: 0,
    issue_date: new Date().toISOString().substr(0, 10),
  });

  const [clients, setClients] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchclientsAndPaymentMethods = async () => {
    try {
      const ClientResponse = await fetch("http://127.0.0.1:8000/Client/");
      if (!ClientResponse.ok) {
        throw new Error("Failed to fetch clients");
      }
      const ClientData = await ClientResponse.json();
      setClients(ClientData);

      const paymentMethodResponse = await fetch("http://127.0.0.1:8000/Payment_Methode/");
      if (!paymentMethodResponse.ok) {
        throw new Error("Failed to fetch payment methods");
      }
      const paymentMethodData = await paymentMethodResponse.json();
      setPaymentMethods(paymentMethodData);

      const projectResponse = await fetch("http://127.0.0.1:8000/Projects/");
      if (!projectResponse.ok) {
        throw new Error("Failed to fetch Projects");
      }
      const projectData = await projectResponse.json();
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching clients and payment methods:", error);
    }
  };

  useEffect(() => {
    fetchclientsAndPaymentMethods();
  }, []);

  const sendForm = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/invoice_reciept/addNew/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reciept),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      window.history.back();
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE Invoice Reciept" subtitle="Create a New Invoice" />

      <Formik onSubmit={sendForm} initialValues={reciept}>
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
                label="Client"
                onBlur={handleBlur}
                onChange={(e) => setReciept({ ...reciept, client: e.target.value })}
                value={reciept.client}
                name="client"
                error={!!touched.client && !!errors.client}
                helperText={touched.client && errors.client}
                sx={{ gridColumn: "span 4" }}
              >
                {clients.map((Client) => (
                  <MenuItem key={Client.id} value={Client.id}>
                    {Client.client_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Project"
                onBlur={handleBlur}
                onChange={(e) => setReciept({ ...reciept, project: e.target.value })}
                value={reciept.project}
                name="project"
                error={!!touched.project && !!errors.project}
                helperText={touched.project && errors.project}
                sx={{ gridColumn: "span 4" }}
              >
                {projects.map((Project) => (
                  <MenuItem key={Project.id} value={Project.id}>
                    {Project.project_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Payment Method"
                onBlur={handleBlur}
                onChange={(e) => setReciept({ ...reciept, payment_method: e.target.value })}
                value={reciept.payment_method}
                name="payment_method"
                error={!!touched.payment_method && !!errors.payment_method}
                helperText={touched.payment_method && errors.payment_method}
                sx={{ gridColumn: "span 4" }}
              >
                {paymentMethods.map((py_method) => (
                  <MenuItem key={py_method.id} value={py_method.id}>
                    {py_method.Py_method_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={(e) => setReciept({ ...reciept, amount: e.target.value })}
                value={reciept.amount}
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
                onChange={(e) => setReciept({ ...reciept, issue_date: e.target.value })}
                value={reciept.issue_date}
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

export default ReciptForm;
