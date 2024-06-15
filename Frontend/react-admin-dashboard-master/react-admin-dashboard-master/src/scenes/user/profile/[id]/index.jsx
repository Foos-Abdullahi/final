import React, { useState, useEffect } from "react";
import { Box, Grid, CardContent, Typography, Avatar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Header from "../../../../components/Header";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [userRole, setUserRole] = useState("");
  const userId = window.location.pathname.split("/").pop();
  const sessionUserId = window.sessionStorage.getItem("userid");

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const [userRes, rolesRes, employeesRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/user/view/${id}`),
          fetch("http://127.0.0.1:8000/Role/"),
          fetch("http://127.0.0.1:8000/Employee/"),
        ]);
        if (!userRes.ok || !rolesRes.ok || !employeesRes.ok) throw new Error("Failed to fetch data");
        const [userData, rolesData, employeesData] = await Promise.all([
          userRes.json(),
          rolesRes.json(),
          employeesRes.json(),
        ]);
        setUser(userData);
        setRoles(rolesData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const storedRole = window.sessionStorage.getItem("UserRole");
    setUserRole(storedRole);
    fetchData(storedRole === "Admin" ? userId : sessionUserId);
  }, [userId, sessionUserId]);

  const employee = employees.find(emp => emp.id === user?.employee_id);
  const role = roles.find(role => role.id === user?.role_id)?.Role_name || "Unknown";

  return (
    <Box px="50px">
      <Header subtitle="User Profiles" />
      <Box display="flex" flexDirection="column" alignItems="center" bgcolor="#ffffff" borderRadius="10px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)">
        <Box width="100%" height="250px" borderRadius="10px 10px 0 0" overflow="hidden">
          <img src="/assets/cover.jpg" alt="Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box mb={-10} sx={{ width: 800, height: 350, position: 'relative', bottom: '150px', bgcolor: '#1f2A40', borderRadius: "10px" }}>
          <CardContent sx={{ minWidth: 800, position: 'relative', top: '80px', textAlign: "center" }}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6" mb="10px" color="#ffffff">{employee?.employee_name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" mb="10px" color="#ffffff">{employee?.phone}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" mb="10px" color="#ffffff">{user?.UserName}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" mb="10px" color="#ffffff">{role}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" mb="10px" color="#ffffff">{user?.issue_date}</Typography>
              </Grid>
            </Grid>
            {userRole === "Admin" && user && (
              <Box mt={2}>
                <Button
                  component={Link}
                  to={`/user/edit/${user.id}`}
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{ background: "#00BC5D", color: "white", "&:hover": { color: "white" } }}
                >
                  Edit Profile
                </Button>
              </Box>
            )}
          </CardContent>
          <Avatar
            alt="Profile"
            src={`/assets/employee/${employee?.employee_Image || "Unknown"}`}
            sx={{ width: 120, height: 120, marginBottom: 2, position: 'relative', bottom: '280px', left: '43%' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
