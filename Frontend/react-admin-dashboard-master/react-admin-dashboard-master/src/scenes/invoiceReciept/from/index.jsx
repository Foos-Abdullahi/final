import { Box, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";

const ReciptForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [clientOption, setClientOption] = useState([]);
  const [projectOption, setProjectOption] = useState([]);
  const [paymentMethodOption, setPaymentMethodOption] = useState([]);
  const [selectclient,setSelectClient]= useState("");
  const [selectpayment_method,setSelectPayment_method]= useState("");
  const [selectproject,setSelectProject]= useState("");
  const [amount,setAmount]=useState("");
  const [issue_date,setIssue_date]=useState(new Date().toISOString().substr(0, 10));
  const [userId, setUserId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUserId(user);
    }
  }, []);
  
  useEffect(() => {
    fetchClient();
    fetchProjects();
    fetchPaymentMethod();
  }, []);

  const fetchClient = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      if (!response.ok) {
        throw new Error("Failed to fetch design options");
      }
      const data = await response.json();
      setClientOption(data);
    } catch (error) {
      console.error("Error fetching design options:", error);
    }
  };

  const fetchPaymentMethod = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Payment_Methode/");
      if (!response.ok) {
        throw new Error("Failed to fetch design options");
      }
      const data = await response.json();
      setPaymentMethodOption(data);
    } catch (error) {
      console.error("Error fetching design options:", error);
    }
  };
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch design options");
      }
      const data = await response.json();
      setProjectOption(data);
    } catch (error) {
      console.error("Error fetching design options:", error);
    }
  };

  const sendForm = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/invoice_reciept/addNew/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: selectclient,
          payment_method: selectpayment_method,
          project: selectproject,
          amount: amount,
          issue_date: issue_date,
          user_id: userId,
        }),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      console.log("selectclient:",selectclient);
      console.log("selectproject:",selectproject);
      console.log("selectpayment_method:",selectpayment_method);
      console.log("amount:",amount);
      console.log("issue_date:",issue_date);
      console.log("user id:",userId);
      setSnackbarMessage("Material created successfully!");
      setSnackbarOpen(true);
      // window.history.back();
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE Invoice Reciept" subtitle="Create a New Invoice" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Formik 
      onSubmit={sendForm} 
      initialValues={{
        client: "",
        payment_method: "",
        project: "",
        amount: "",
        issue_date: "",

      }}>
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
                onChange={(e) => setSelectClient(e.target.value )}
                value={selectclient}
                name="client"
                sx={{ gridColumn: "span 4" }}
              >
                {clientOption.map((Client) => (
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
                onChange={(e) => setSelectProject(e.target.value)}
                value={selectproject}
                name="project"
                sx={{ gridColumn: "span 4" }}
              >
                {projectOption.map((Project) => (
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
                onChange={(e) => setSelectPayment_method(e.target.value)}
                value={selectpayment_method}
                name="payment_method"
                sx={{ gridColumn: "span 4" }}
              >
                {paymentMethodOption.map((py_method) => (
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
                onChange={(e) => setAmount(e.target.value )}
                value={amount}
                name="amount"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e) => setIssue_date(e.target.value )}
                value={issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
                  <input
                type="hidden"
                name="user_id"
                value={userId}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button color="primary" variant="contained" onClick={() => window.location.href = "/invoiceReciept"}>
                Back
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create Receipt
              </Button>
            </Box>
          </form>
        )}
        
      </Formik>
    </Box>
  );
};

export default ReciptForm;
