import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../../../components/Header';

const DesignEdit = () => {
  const url = window.location.pathname;
  const designId = url.split("/").pop();
  
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const fetchDesign = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Design/view/${designId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch design details");
      }
      const data = await response.json();
      setImage(data.architecture);
      setStatus(data.status);
      setAmount(data.amount);
      setIssueDate(data.issue_date);
      
    } catch (error) {
      console.error("Error fetching design details:", error);
    }
  };

  useEffect(() => {
    fetchDesign();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDesign = async () => {
    try {
      const formData = new FormData();
      formData.append('architecture', image);
      formData.append('status', status);
      formData.append('amount', amount);
      formData.append('issue_date', issueDate);

      const res = await fetch(`http://127.0.0.1:8000/Design/update/${designId}/`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      // window.location.href = "/design";
    } catch (error) {
      console.error("Error updating design:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file.name);
  };

  return (
    <Box m="20px">
      <Header title="EDIT DESIGN" subtitle="Edit Design Details" />

      <Formik initialValues={
        { 
          image: "",
          status: "", 
          amount: "", 
          issue_date: "" 
        }}
        onSubmit={updateDesign}>
        {({ handleBlur, handleSubmit }) => (
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
                required
                variant="filled"
                type="file"
                label="Image"
                onBlur={handleBlur}
                onChange={handleImageChange}
                name="architecture"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={e => setStatus(e.target.value)}
                value={status}
                name="status"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={e => setAmount(e.target.value)}
                value={amount}
                name="amount"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                required
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={e => setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Design
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DesignEdit;
