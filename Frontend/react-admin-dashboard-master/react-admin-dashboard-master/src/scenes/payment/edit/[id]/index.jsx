import { Box, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import React, { useState, useEffect } from "react";

const EditPayment = () => {
  const url = window.location.pathname;
  const paymentId = url.split("/").pop();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [amount, setAmount] = useState("");
  const [paymentTypeOptions, setPaymentTypeOptions] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [expensedescription, setExpense_description] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().substr(0, 10));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);

  useEffect(() => {
    // Fetch payment type options
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

    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/payment/view/${paymentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        setSelectedPaymentType(data.payment_Type);
        setExpense_description(data.expense_description);
        setAmount(data.amount);
        setExpenseDate(data.expense_date);
        setUserId(data.user_id);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentTypeOptions();
    fetchPaymentDetails();
  }, [paymentId]);

  const sendForm = async () => {
    const res = await fetch(`http://127.0.0.1:8000/payment/update/${paymentId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_Type: selectedPaymentType,
        expense_description: expensedescription,
        amount: amount,
        expense_date: expenseDate,
        user_id: userId,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
      return;
    }

    const data = await res.json();
    console.log("Response data:", data);
    setSnackbarOpen(true); // Show the snackbar
    window.location.href = "/payment";
  };

  return (
    <Box m="20px">
      <Header title="EDIT PAYMENT" subtitle="Edit Existing Payment" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          payment_Type: selectedPaymentType,
          expense_description: expensedescription,
          amount: amount,
          expense_date: expenseDate,
        }}
        enableReinitialize
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
                variant="filled"
                type="text"
                label="Expense Description"
                onBlur={handleBlur}
                onChange={(e) => setExpense_description(e.target.value)}
                value={expensedescription}
                name="expense_description"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Expense Date"
                onBlur={handleBlur}
                onChange={(e) => setExpenseDate(e.target.value)}
                value={expenseDate}
                name="expense_date"
                sx={{ gridColumn: "span 4" }}
              />
              <input
                type="hidden"
                name="user_id"
                value={userId}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => window.history.back()} color="primary" variant="contained">
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Update Payment
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Payment updated successfully!"
      />
    </Box>
  );
};

export default EditPayment;
