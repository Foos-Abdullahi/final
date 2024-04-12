import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";

const EmployeeForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/Employee/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Employee created successfully");

      } else {
        console.log("Failed to create employee");
      }
    } catch (error) {
      console.log("API call failed:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Box m="20px">
      <Header title="CREATE EMPLOYEE" subtitle="Create a New Employee Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
            
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Salary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.issueDate}
                name="issueDate"
                error={!!touched.issueDate && !!errors.issueDate}
                helperText={touched.issueDate && errors.issueDate}
                sx={{ gridColumn: "span 4" }}
              />
            
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  position: yup.string().required("Required"),
  salary: yup.string().required("Required"),
  issueDate: yup.string().required("Required"),
});

const initialValues = {
  name: "",
  phone: "",
  position: "",
  salary: "",
  issueDate: "",
};

export default EmployeeForm;