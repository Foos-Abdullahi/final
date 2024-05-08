import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, CircularProgress, Link, Paper, Grid, Avatar } from "@mui/material";
import { LockClockOutlined} from "@mui/icons-material";
import App from "./App";
// import ForgotPassword from "./ForgotPassword"; // Import the ForgotPassword component

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true); // Add state to track if login status is being checked

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
    // Set checkingLogin to false after checking login status
    setCheckingLogin(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/user/");
      const rolesResponse = await fetch("http://127.0.0.1:8000/Role/");
      const roledata = await rolesResponse.json();
      console.log("roles", roledata);
      
      const employeeResponse = await fetch("http://127.0.0.1:8000/Employee/");
      const employeedata = await employeeResponse.json();
      console.log("roles", employeedata);
      const data = await response.json();
      console.log('user :', data);

      for (let i = 0; i < data.length; i++) {
        if (username === data[i].UserName && password === data[i].Password) {
          console.log('this is id:', data[i].id);
          const roleName = roledata.find(role => role.id === data[i].role_id)?.Role_name;
          const employeeName = employeedata.find(employee => employee.id === data[i].employee_id)?.employee_name;
          const employeeImage = employeedata.find(employee => employee.id === data[i].employee_id)?.employee_Image;
          sessionStorage.setItem('userid', data[i].id)
          sessionStorage.setItem('UserName', data[i].UserName)
          sessionStorage.setItem('UserRole', roleName)
          sessionStorage.setItem('EmployeeName', employeeName)
          sessionStorage.setItem('EmployeeImage', employeeImage)
          setIsLoggedIn(true);
          sessionStorage.setItem("isLoggedIn", "true");
          return;
        }
      }
      setError("Invalid username or password");
      setLoading(false);
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message || 'Error occurred during login');
      setLoading(false);
    }
  };

  if (checkingLogin) {
    // While checking login status, render nothing or a loading spinner
    return null;
  }

  if (isLoggedIn) {
    return <App/>;
  }

//   if (showForgotPassword) {
//     return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;
//   }

  const avatarStyle = { backgroundColor: '#14AA5D' };
  document.body.style.overflow = 'hidden';

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#141B2D"
      paddingTop={4}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <img src={"/assets/logo192.png"} alt="Logo" style={{ width: "100px", height: "100px" }} />
      </Box>

      <Paper elevation={10} sx={{ padding: 2, width: 350, bgcolor: '#E2E2E2' }}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockClockOutlined /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="Username or Email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{ mt: 2, bgcolor: '#14AA5D' }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Box mt={1}>
              <Typography variant="body2">
                <Link href="#" color="textPrimary" onClick={() => setShowForgotPassword(true)}>
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            By logging in, you agree to our{" "}
            <Link href="#" color="textPrimary">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" color="textPrimary">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;