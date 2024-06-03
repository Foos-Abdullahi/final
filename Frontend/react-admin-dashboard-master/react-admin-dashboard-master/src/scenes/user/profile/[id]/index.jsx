// import React, { useState, useEffect } from "react";
// import { Box, Grid, Card, CardContent, Typography, Avatar, Button } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { Link } from "react-router-dom";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [roles, setRoles] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const url = window.location.pathname;
//     const userlId = url.split("/").pop();
  
//     useEffect(() => {
//       fetchUser();
//       fetchEmployee();
//       fetchRoles();
//     }, []);
  
//     const fetchRoles = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/Role/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch roles");
//         }
//         const data = await response.json();
//         setRoles(data);
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//       }
//     };
  
//     const fetchEmployee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/Employee/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch roles");
//         }
//         const data = await response.json();
//         setEmployees(data);
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//       }
//     };
  
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/user/view/${userlId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user");
//         }
//         const data = await response.json();
//         setUser(data); // Assuming there is only one user for simplicity
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
  
//     return (
//       <Box px="40px" py="20px" mb="20px">
//         <Typography variant="h2" mb="10px">
//           Account Settings
//         </Typography>
//         <Grid container spacing={0}>
//           {/* Main Content */}
//           <Grid item xs={12} md={10}>
//             <Card style={{ height: "100%", backgroundColor: "#1f2A40", borderLeft: "1px solid #CCCCCC", borderTopLeftRadius: "0" }}>
//               <CardContent style={{ border: "1px solid #CCCCCB" }}>
//                 <Box mb="20px">
//                   <Typography variant="h3" color="#ffffff">
//                     User
//                   </Typography>
//                   <Typography variant="subtitle1" color="#43AA6D" mb="20px">
//                     Profile Details
//                   </Typography>
  
//                   {/* Profile Image Section */}
//                   <Box display="flex" alignItems="center" mb="20px">
//                     <Avatar src={"/assets/employee/foos.jpg"} sx={{ width: 120, height: 120, marginRight: "10px" }}></Avatar>
//                   </Box>
  
//                   {/* User Information Section */}
//                   <Typography variant="h4" mb="20px" color="#ffffff">
//                     User Information
//                   </Typography>
//                   <Grid container spacing={2} mb="20px">
//                     <Grid item xs={12} md={2}>
//                       <Typography variant="h6" mb="10px" color="#14AA6D">
//                         <div className="form-label">User Name</div>
//                         <span style={{ width: "28%", color: "#ffffff" }}>{user?.UserName}</span>
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} md={2}>
//                       <Typography variant="h6" mb="10px" color="#14AA6D">
//                         <div className="form-label">User Role</div>
//                         <span style={{ width: "28%", color: "#ffffff" }}>{roles.find((role) => role.id === user?.role_id)?.Role_name || "Unknown"}</span>
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} md={2}>
//                       <Typography variant="h6" mb="20px" color="#14AA6D">
//                         <div className="form-label">Full Name</div>
//                         <span style={{ width: "28%", color: "#ffffff" }}>{employees.find((emp) => emp.id === user?.employee_id)?.employee_name}</span>
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} md={2}>
//                       <Typography variant="h6" mb="10px" color="#14AA6D">
//                         <div className="form-label">Join Date</div>
//                         <span style={{ width: "28%", color: "#ffffff" }}>{user?.issue_date}</span>
//                       </Typography>
//                     </Grid>
//                     <Box mt={3}>
//                       {user && (
//                         <Button
//                           component={Link}
//                           to={`/user/edit/${user.id}`}
//                           color="primary"
//                           startIcon={<EditIcon />}
//                           sx={{ background: "#00BC5D", color: "white", "&:hover": { color: "white" } }}
//                         >
//                           Edit Profile
//                         </Button>
//                       )}
//                     </Box>
//                   </Grid>
//                   <input type="hidden" value={user?.Password} style={{ width: "100%" }} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     );
//   };
  
//   export default Profile;


import React, { useState, useEffect } from "react";
import { Box, Grid,CardContent, Typography, Avatar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Header from "../../../../components/Header";
// import Header from "../../../components/Header";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const userId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, rolesRes, employeesRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/user/view/${userId}`),
          fetch("http://127.0.0.1:8000/Role/"),
          fetch("http://127.0.0.1:8000/Employee/")
        ]);
        if (!userRes.ok || !rolesRes.ok || !employeesRes.ok) throw new Error("Failed to fetch data");
        const [userData, rolesData, employeesData] = await Promise.all([
          userRes.json(),
          rolesRes.json(),
          employeesRes.json()
        ]);
        setUser(userData);
        setRoles(rolesData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Box px="50px">
      <Header subtitle="User Profiles" />
      <Box display="flex" flexDirection="column" alignItems="center" bgcolor="#ffffff" borderRadius="10px" elevation={10}  boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'>
        <Box width="100%" height="250px" borderRadius="10px 10px 0 0" overflow="hidden">
          <img src="/assets/cover.jpg" alt="Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box mb={-10} sx={{ width: 800, height: 350, position: 'relative', bottom: '150px', bgcolor: '#1f2A40', borderRadius:"10px" }}>
            <CardContent sx={{ minWidth: 800, position: 'relative', top: '80px',textAlign:"center" }}>
              <Grid container direction="column" >
                <Grid item>
                  <Typography variant="h6" mb="10px" color="#ffffff">
                  {employees.find(emp => emp.id === user?.employee_id)?.employee_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" mb="10px" color="#ffffff">
                  {employees.find(emp => emp.id === user?.employee_id)?.phone}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" mb="10px" color="#ffffff">
                    {user?.UserName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" mb="10px" color="#ffffff">
                    {roles.find(role => role.id === user?.role_id)?.Role_name || "Unknown"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" mb="10px" color="#ffffff">
                    {user?.issue_date}
                    </Typography>
                </Grid>
              </Grid>
              <Box ml={2} sx={{position:'relative', top:'50px'}}>
                {user && (
                  <Button component={Link} to={`/user/edit/${user.id}`} color="primary" startIcon={<EditIcon />} sx={{ background: "#00BC5D", color: "white", "&:hover": { color: "white" } }}>
                    Edit Profile
                  </Button>
                )}
              </Box>
            </CardContent>
          <Avatar alt="Profile" src={`/assets/employee/${employees.find((emp) => emp.id === user.employee_id)?.employee_Image || "Unknown"}`} sx={{ width: 120, height: 120, marginBottom: 2, position: 'relative', bottom: '280px', left: '43%' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
