import { Box, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const CreatePayment = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [amount, setAmount] = useState("");
  const [paymentTypeOptions, setPaymentTypeOptions] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [projectOptions, setProjectOptions] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().substr(0, 10));
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Fetch payment type options
    fetchPaymentTypeOptions();
    // Fetch project options
    fetchProjectOptions();
  }, []);

  const fetchPaymentTypeOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Payment_Type/");
      if (!response.ok) {
        throw new Error("Failed to fetch payment type options");
      }
      const data = await response.json();
      setPaymentTypeOptions(data);
    } catch (error) {
      console.error("Error fetching payment type options:", error);
    }
  };

  const fetchProjectOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch project options");
      }
      const data = await response.json();
      setProjectOptions(data);
    } catch (error) {
      console.error("Error fetching project options:", error);
    }
  };

  const sendForm = async () => {
    const res = await fetch("http://127.0.0.1:8000/payment/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        payment_Type: selectedPaymentType,
        project: selectedProject,
        expense_date: expenseDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    setSnackbarOpen(true); // Show the snackbar
  };

  const handleFormSubmit = () => {
    sendForm();
  };

  return (
    <Box m="20px">
      <Header title="CREATE PAYMENT" subtitle="Record a New Payment" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ amount: "", payment_Type: "", project: "", expense_date: "" }}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          errors,
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
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                name="amount"
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                label="Payment Type"
                onBlur={handleBlur}
                onChange={(e) => setSelectedPaymentType(e.target.value)}
                value={selectedPaymentType}
                name="payment_Type"
                error={touched.payment_Type && Boolean(errors.payment_Type)}
                helperText={touched.payment_Type && errors.payment_Type}
                sx={{ gridColumn: "span 4" }}
              >
                {paymentTypeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.Py_Type_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                variant="filled"
                label="Project"
                onBlur={handleBlur}
                onChange={(e) => setSelectedProject(e.target.value)}
                value={selectedProject}
                name="project"
                error={touched.project && Boolean(errors.project)}
                helperText={touched.project && errors.project}
                sx={{ gridColumn: "span 4" }}
              >
                {projectOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.project_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Expense Date"
                onBlur={handleBlur}
                onChange={(e) => setExpenseDate(e.target.value)}
                value={expenseDate}
                name="expense_date"
                error={touched.expense_date && Boolean(errors.expense_date)}
                helperText={touched.expense_date && errors.expense_date}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Payment
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Payment recorded successfully!"
      />
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  amount: yup.number().required("Amount is required"),
  payment_Type: yup.string().required("Payment Type is required"),
  project: yup.string().required("Project is required"),
  expense_date: yup.string().required("Expense Date is required"),
});

export default CreatePayment;
