import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";

const PaymentMethodForm = () => {
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const [paymentMethodImage, setPaymentMethodImage] = useState(null); // New state for the image
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const sendForm = async () => {
    const formData = new FormData(); // Create FormData object
    formData.append("pay_method_image", paymentMethodImage); // Append image data
    formData.append("Py_method_name", paymentMethodName);
    formData.append("issue_date", issueDate);

    const res = await fetch("http://127.0.0.1:8000/Payment_Methode/create/", {
      method: "POST",
      body: formData, // Send FormData instead of JSON
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log(paymentMethodName);
    console.log(issueDate);
    window.location.href = "/paymentMethod";
  };

  return (
    <Box m="20px">
      <Header title="CREATE PAYMENT METHOD" subtitle="Create a New Payment Method" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          payment_method_name: "",
          issue_date: "",
        }}
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
                label="Payment Method Name"
                onBlur={handleBlur}
                onChange={(e) => setPaymentMethodName(e.target.value)}
                value={paymentMethodName}
                name="payment_method_name"
                error={!!touched.payment_method_name && !!errors.payment_method_name}
                helperText={touched.payment_method_name && errors.payment_method_name}
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
                name="issue_date"
                error={!!touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: "span 4" }}
              />
              {/* Input field for uploading image */}
              <input
                type="file"
                onChange={(e) => setPaymentMethodImage(e.target.files[0])}
                accept="image/*"
                style={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button color="primary" variant="contained" onClick={() => window.location.href = "/paymentMethod"}>
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Payment Method
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentMethodForm;
