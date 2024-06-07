// // src/components/ForgotPassword.js
// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, CircularProgress, Paper, Grid, Avatar } from "@mui/material";
// import { LockClockOutlined } from "@mui/icons-material";

// const ForgotPassword = ({ setShowForgotPassword }) => {
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch("http://127.0.0.1:8000/user/forgot_password/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.reset_token);  // Display reset token for simplicity
//       } else {
//         setError(data.error || "Error occurred during password reset request");
//       }
//     } catch (error) {
//       setError(error.message || "Error occurred during password reset request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const avatarStyle = { backgroundColor: "#14AA5D" };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" bgcolor="#141B2D" paddingTop={4}>
//       <Paper elevation={10} sx={{ padding: 2, width: 350, bgcolor: "#E2E2E2" }}>
//         <Grid align="center">
//           <Avatar style={avatarStyle}>
//             <LockClockOutlined />
//           </Avatar>
//           <h2>Forgot Password</h2>
//         </Grid>
//         <form onSubmit={handleForgotPassword}>
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <TextField
//               label="Username"
//               variant="outlined"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               margin="normal"
//               fullWidth
//               required
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             {message && <Typography color="primary">{message}</Typography>}
//             <Button
//               variant="contained"
//               type="submit"
//               color="primary"
//               disabled={loading}
//               fullWidth
//               sx={{ mt: 2, bgcolor: "#14AA5D" }}
//             >
//               {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
//             </Button>
//             <Button
//               variant="text"
//               color="primary"
//               onClick={() => setShowForgotPassword(false)}
//               fullWidth
//               sx={{ mt: 2 }}
//             >
//               Back to Login
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default ForgotPassword;
