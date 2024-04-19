import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const DesignForm = () => {
  const [images, setimage] = useState("");
  const [statuses, setstatus] = useState("");
  const [amounts, setamount] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().substr(0, 10));
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const sendForm = async () => {
    const res = await fetch("http://127.0.0.1:8000/Design/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: images,
        status: statuses,
        amount:amounts,
        issue_date: issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    console.log(images)
    console.log(issueDate)
    window.location.href = '/design';
  };

//   const validationSchema = yup.object().shape({
//     payment_method_name: yup.string().required("Design name is required"),
//     issue_date: yup.string().required("Issue date is required"),
//   });

  return (
    <Box m="20px">
      <Header title="CREATE Design" subtitle="Create a New Design" />

      <Formik
        onSubmit={sendForm}
        initialValues={{
          Designs: "",
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
                label="Image"
                onBlur={handleBlur}
                onChange={(e) => setimage(e.target.value)}
                value={images}
                name="Designs"
                error={!!touched.Designs && !!errors.Designs}
                helperText={touched.Designs && errors.Designs}
                sx={{ gridColumn: "span 4" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={(e) => setstatus(e.target.value)}
                value={statuses}
                name="Designs"
                error={!!touched.Designs && !!errors.Designs}
                helperText={touched.Designs && errors.Designs}
                sx={{ gridColumn: "span 4" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={(e) => setamount(e.target.value)}
                value={amounts}
                name="Designs"
                error={!!touched.Designs && !!errors.Designs}
                helperText={touched.Designs && errors.Designs}
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
                Create Design
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DesignForm;