import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const PaymentMethodForm = () => {
  const [Py_TypeName, setP_T_Name] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const sendForm = async () => {
    const res = await fetch(`http://127.0.0.1:8000/Payment_Type/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Py_Type_name: Py_TypeName,
        issue_date: issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log(Py_TypeName)
    console.log(issueDate)
    window.location.href = '/paymentType';
  };

//   const validationSchema = yup.object().shape({
//     payment_method_name: yup.string().required("Payment method name is required"),
//     issue_date: yup.string().required("Issue date is required"),
//   });

  return (
    <Box m="20px">
      <Header title="CREATE PaymentType" subtitle="Create a New PaymentType" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
            PaymentTypes: "",
          issue_date: "",
        }}
        // validationSchema={validationSchema}
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
                label="Payment_Type Name"
                onBlur={handleBlur}
                onChange={(e) => setP_T_Name(e.target.value)}
                value={Py_TypeName}
                name="Py_TypeName"
                error={!!touched.Py_TypeName && !!errors.Py_TypeName}
                helperText={touched.Py_TypeName && errors.Py_TypeName}
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Payment Type
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentMethodForm;