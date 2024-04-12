import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
// import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [emp_name,setemp_name] = useState("");
  const [position,setposition] = useState("");
  const [phone,setphone] = useState("");
  const [salary,setsalary] = useState("");
  const [issue_date,setissue_date] = useState(new Date().toISOString().substr(0, 10));

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };
    const AddEmployee = async (e) => {
        e.preventDefault();
        // fetch('http://127.0.0.1:8000/user/')
    
        const res = await fetch("http://127.0.0.1:8000/Employee/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                employee_name:emp_name,
                position:position,
                phone:phone,
                salary:salary,
                issue_date:issue_date,
            }),
        });
        if (!res.ok) {
            console.log(`Request failed with status ${res.status}`);
        }
        alert(emp_name)
        alert(position)
        alert(phone)
        alert(salary)
        alert(issue_date)
        const data = await res.json();
        alert("succesfully")
        window.location.href = "/employee";
        console.log("Response data:", data);
        
    };

  return (
    <Box m="20px">
      <Header title="CREATE Employee" subtitle="Create a New Employee Profile" />

      <Formik
        onSubmit={AddEmployee}
        // initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          // values,
          errors,
          touched,
          handleBlur,
          // handleChange,
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
                label="Employee Name"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={(e)=>{setemp_name(e.target.value)}}
                value={emp_name}
                name="emp_name"
                error={!!touched.emp_name && !!errors.emp_name}
                helperText={touched.emp_name && errors.emp_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Position"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={(e)=>{setposition(e.target.value)}}
                value={position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="phone Number"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={(e)=>{setphone(e.target.value)}}
                value={phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Salary"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={(e)=>{setsalary(e.target.value)}}
                value={salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="issue Date"
                onBlur={handleBlur}
                // onChange={handleChange}
                onChange={(e)=>{setissue_date(e.target.value)}}
                value={issue_date}
                name="issue_date"
                error={!!touched.issue_date && !!errors.issue_date}
                helperText={touched.issue_date && errors.issue_date}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Employee
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


export default Form;
