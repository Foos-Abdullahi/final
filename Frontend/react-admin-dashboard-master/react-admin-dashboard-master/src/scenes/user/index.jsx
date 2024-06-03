// import { Box, Button , useTheme,IconButton} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { Link } from "react-router-dom";
// // import { mockDataInvoices } from "../../data/mockData";
// import Header from "../../components/Header";
// import React, { useState, useEffect } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetchUsers();
//     fetchEmployees();
//     fetchRoles();
//     fetchSearch();
//   }, [searchQuery]);

//   const fetchRoles = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Role/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch roles");
//       }
//       const data = await response.json();
//       setRoles(data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Employee/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch employees");
//       }
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/user/'); 
//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }
//       const data = await response.json();
//       // setUsers(data.map(user => ({
//       //   ...user,
//       //   employee_name: employees.find(employee => employee.id === user.employee_id)?.employee_name || '',
//       //   Role_name: roles.find(role => role.id === user.role_id)?.Role_name || '',
//       // })));
//       setUsers(data)

//       console.log(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };
//   const fetchSearch = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/user/search?query=${searchQuery}`);
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error('Error fetching Clients:', error);
//     }
//   };
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const columns = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "employee_name",
//       headerName: "Employee",
//       flex: 1,
//       cellClassName: "name-column--cell",
//       valueGetter: (params) => {
//         const employe = employees.find(Employee => Employee.id === params.row.employee_id);
//         return employe ? employe.employee_name : '';
//       },
//     },
//     {
//       field: "UserName",
//       headerName: "UserName",
//       flex: 1,
//     },
//     {
//       field: "Password",
//       headerName: "Password",
//       flex: 1,
//     },
//     {
//       field: "Role_name",
//       headerName: "Role",
//       flex: 1,
//       valueGetter: (params) => {
//         const role = roles.find(Role => Role.id === params.row.role_id);
//         return role ? role.Role_name : '';
//       },
//     },
//     {
//       field: "issue_date",
//       headerName: "Date",
//       flex: 1,
//     },
//     {
//       field: "Edit",
//       headerName: "Action",
//       width: 100,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="secondary"
//           component={Link}
//           to={`/user/edit/${params.row.id}`}
//         >
//           Update User
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="Client" subtitle="List of Client Balances" />
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb="20px"
//       >
//         <Box
//           backgroundColor={colors.primary[400]}
//           borderRadius="3px"
//           display="flex"
//           alignItems="center"
//           pl={1}
//         >
//           <InputBase
//             sx={{ ml: 2, flex: 1 }}
//             placeholder="Search"
//             type="date"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <IconButton type="button" sx={{ p: 1 }}>
//             <SearchIcon />
//           </IconButton>
//         </Box>
//         <Button
//           type="submit"
//           color="secondary"
//           variant="contained"
//           component={Link}
//           to="/user/create"
//           >
//             Create New User
//         </Button>
//       </Box>
  
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid checkboxSelection rows={users} columns={columns} />
//       </Box>
//     </Box>
//   );
  
// };

// export default User;
// import React, { useState, useEffect } from "react";
// import { Box, Grid, Card, CardContent, Typography, Avatar, Button } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [roles, setRoles] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const url = window.location.pathname;
//   const userlId = url.split("/").pop();

//   useEffect(() => {
//     fetchUser();
//     fetchEmployee();
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Role/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch roles");
//       }
//       const data = await response.json();
//       setRoles(data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//     }
//   };

//   const fetchEmployee = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Employee/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch roles");
//       }
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/user/view/${userlId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch user");
//       }
//       const data = await response.json();
//       setUser(data); // Assuming there is only one user for simplicity
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   return (
//     <Box px="40px" py="20px" mb="20px">
//       <Typography variant="h2" mb="10px">
//         Account Settings
//       </Typography>
//       <Grid container spacing={0}>
//         {/* Main Content */}
//         <Grid item xs={12} md={10}>
//           <Card style={{ height: "100%", backgroundColor: "#1f2A40", borderLeft: "1px solid #CCCCCC", borderTopLeftRadius: "0" }}>
//             <CardContent style={{ border: "1px solid #CCCCCB" }}>
//               <Box mb="20px">
//                 <Typography variant="h3" color="#ffffff">
//                   User
//                 </Typography>
//                 <Typography variant="subtitle1" color="#43AA6D" mb="20px">
//                   Profile Details
//                 </Typography>

//                 {/* Profile Image Section */}
//                 <Box display="flex" alignItems="center" mb="20px">
//                   <Avatar src={"/assets/profil.jpg"} sx={{ width: 120, height: 120, marginRight: "10px" }}></Avatar>
//                 </Box>

//                 {/* User Information Section */}
//                 <Typography variant="h4" mb="20px" color="#ffffff">
//                   User Information
//                 </Typography>
//                 <Grid container spacing={2} mb="20px">
//                   <Grid item xs={12} md={2}>
//                     <Typography variant="h6" mb="10px" color="#14AA6D">
//                       <div className="form-label">User Name</div>
//                       <span style={{ width: "28%", color: "#ffffff" }}>{user?.UserName}</span>
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <Typography variant="h6" mb="10px" color="#14AA6D">
//                       <div className="form-label">User Role</div>
//                       <span style={{ width: "28%", color: "#ffffff" }}>{roles.find((role) => role.id === user?.role_id)?.Role_name || "Unknown"}</span>
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <Typography variant="h6" mb="20px" color="#14AA6D">
//                       <div className="form-label">Full Name</div>
//                       <span style={{ width: "28%", color: "#ffffff" }}>{employees.find((emp) => emp.id === user?.employee_id)?.employee_name}</span>
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <Typography variant="h6" mb="10px" color="#14AA6D">
//                       <div className="form-label">Join Date</div>
//                       <span style={{ width: "28%", color: "#ffffff" }}>{user?.issue_date}</span>
//                     </Typography>
//                   </Grid>
//                   <Box mt={3}>
//                     {user && (
//                       <Button
//                         component={Link}
//                         to={`/user/edit/${user.id}`}
//                         color="primary"
//                         startIcon={<EditIcon />}
//                         sx={{ background: "#00BC5D", color: "white", "&:hover": { color: "white" } }}
//                       >
//                         Edit Profile
//                       </Button>
//                     )}
//                   </Box>
//                 </Grid>
//                 <input type="hidden" value={user?.Password} style={{ width: "100%" }} />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Card, CardContent, Avatar, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import { RemoveRedEyeRounded } from "@mui/icons-material";

const User = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await fetch("http://127.0.0.1:8000/user/");
      const rolesResponse = await fetch("http://127.0.0.1:8000/Role/");
      const EmployeeResponse = await fetch("http://127.0.0.1:8000/Employee/");

      if (!usersResponse.ok || !rolesResponse.ok || !EmployeeResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const usersData = await usersResponse.json();
      const rolesData = await rolesResponse.json();
      const empData = await EmployeeResponse.json();

      setUsers(usersData);
      setRoles(rolesData);
      setEmployees(empData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <Box m={4}>
      <Header title="List of Users" subtitle="User Profiles" />
      <Button
        component={Link}
        to="/user/create/"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ background: "#00BC5D", position: "relative", left: "90%", top: "-60px", color: "white", "&:hover": { color: "white" } }}
      >
        Create User
      </Button>
      <Grid container spacing={1} position="relative" top="-40px">
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          users.map((user) => (
            <Grid item xs={12} sm={6} md={3} key={user.id}>
              <Card sx={{ height: "100%", bgcolor: '#1F2A40' }}>
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar alt="Employee Image" src={`/assets/employee/${employees.find((emp) => emp.id === user.employee_id)?.employee_Image || "Unknown"}`} sx={{ width: 80, height: 80 }} />
                  </Box>
                  <Typography variant="body2" align="center"><strong>{employees.find((emp) => emp.id === user.employee_id)?.employee_name || "Unknown"}</strong> </Typography>
                  {/* <Typography variant="h6" align="center" gutterBottom>{user.UserName}</Typography> */}
                  {/* <Typography variant="body2" align="center" gutterBottom><strong>Password:</strong> {user.password}</Typography> */}
                  <Typography variant="body2" align="center"><strong>{roles.find((role) => role.id === user.role_id)?.Role_name || "Unknown"}</strong> </Typography>
                  {/* <Typography variant="body2" align="center" gutterBottom><strong>Issue Date:</strong> {new Date(user.issue_date).toLocaleDateString()}</Typography> */}
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button component={Link} to={`/user/profile/${user.id}`} color="primary" sx={{ background: "#00BC5D", color: 'white', "&:hover": { color: "white" } }}>
                      <RemoveRedEyeRounded />
                      <Typography variant="button" sx={{ ml: 1 }}>
                        View Profile
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default User;

