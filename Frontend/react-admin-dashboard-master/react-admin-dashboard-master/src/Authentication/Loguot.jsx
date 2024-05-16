import React, { useState} from "react";
import { Box, Button} from "@mui/material";
import Login from "./Login";

const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
      setIsLoggedIn(false);
      sessionStorage.removeItem("isLoggedIn");
      window.location.href='/';
    };
    if (isLoggedIn) {
      return <Login/>;
    }
  return (
    <Box minHeight="5px">
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
