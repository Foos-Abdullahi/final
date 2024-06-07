// import React, { useState } from "react";
// import { Box, IconButton, Popover} from "@mui/material";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// // import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import Logout from "../../Authentication/Loguot";
// // import Logout from "./Authentication/Loguot";// Update the path to your Logout component

// const Topbar = () => {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleOpenPopover = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClosePopover = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);

//   return (
//     <Box display="flex" justifyContent="space-between" p={2}>
//       {/* ICONS */}
//       <Box display="flex">
//         {/* <IconButton>
//           <LightModeOutlinedIcon />
//         </IconButton>
//         <IconButton>
//           <NotificationsOutlinedIcon />
//         </IconButton>
//         <IconButton>
//           <SettingsOutlinedIcon />
//         </IconButton> */}
        // <IconButton onClick={handleOpenPopover}>
        //   <PersonOutlinedIcon />
        // </IconButton>
        // <Popover
        //   open={open}
        //   anchorEl={anchorEl}
        //   onClose={handleClosePopover}
        //   anchorOrigin={{
        //     vertical: 'bottom',
        //     horizontal: 'center',
        //   }}
        //   transformOrigin={{
        //     vertical: 'top',
        //     horizontal: 'center',
        //   }}
        // >
        //   <Box p={-2}>
        //     <Logout />
        //   </Box>
        // </Popover>
//       </Box>
//     </Box>
//   );
// };

// export default Topbar;





import React, { useState, useEffect } from "react";
import { Box, IconButton, Popover, Badge,Typography, Avatar,Switch, Link } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Logout from "../../Authentication/Loguot";
import NotificationsPage from "../Notifications/NotificationsPage";
const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [employees, setEmployees] = useState("");
  const [empname, setEmpname] = useState("");
  const [Username, setUsername] = useState("");
  const user = window.sessionStorage.getItem("userid");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/contact/")
      .then(response => response.json())
      .then(data => setNotifications(data))
      .catch(error => console.error("Error fetching contacts:", error));
  }, []);
  useEffect(() => {
    // Retrieve user role from session storage
    const storedRole = window.sessionStorage.getItem("UserRole");
    const EmpImage=window.sessionStorage.getItem('EmployeeImage')
    const EmpName=window.sessionStorage.getItem('EmployeeName')
    const username=window.sessionStorage.getItem('UserName')
    setUsername(username);
    setUserRole(storedRole);
    setEmployees(EmpImage);
    setEmpname(EmpName);
  }, []);
  const handleOpenPopover = (event) => setAnchorEl(event.currentTarget);
  const handleClosePopover = () => setAnchorEl(null);
  const handleNotificationsClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
        <IconButton onClick={handleNotificationsClick}>
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton  onClick={handleOpenPopover}>
          <Avatar sx={{width:30,height:30}} src={`../../assets/employee/${employees}`} alt="User Avatar" />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Box p={2} sx={{ width: 200  }} bgcolor='#1F2A40' borderRadius="4">
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar component="span"sx={{ width: 30, height: 30, mr: 2 }}src={`../../assets/employee/${employees}`}alt="User Avatar"/>
              <Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FFF' }}>{empname}</Typography>
              </Box>
            <Box display="flex" alignItems="center" mt={2} mb={1}>
              <Typography variant="body2" color='#FFF' sx={{ flexGrow: 1 }}>{userRole}</Typography>
            </Box>
            <Link href={`../user/profile/${user}`} variant="body2" color='#FFF' gutterBottom sx={{fontSize: '0.875rem'} }>Profile</Link>
            <Typography variant="body2" display="block" mt={1}><Logout /></Typography>
          </Box>
        </Popover>
      </Box>
      <NotificationsPage
        notifications={notifications}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
      />

    </Box>
  );
};

export default Topbar;
























// import React, { useState, useEffect } from "react";
// import { Box, IconButton, Popover, Badge } from "@mui/material";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import Logout from "../../Authentication/Loguot";
// import NotificationsPage from "../Notifications/NotificationsPage";

// const Topbar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     fetchContact();
//   }, []);

//   const fetchContact = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/contact/");
//       const data = await response.json();
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };
//   const handleOpenPopover = (event) => setAnchorEl(event.currentTarget);
//   const handleClosePopover = () => setAnchorEl(null);
//   const handleNotificationsClick = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);

//   return (
//     <Box display="flex" justifyContent="space-between" p={2}>
//       <Box display="flex">
//         <IconButton onClick={handleNotificationsClick}>
//           <Badge badgeContent={notifications.length} color="secondary">
//             <NotificationsOutlinedIcon />
//           </Badge>
//         </IconButton>
//         <IconButton onClick={handleOpenPopover}>
//           <PersonOutlinedIcon />
//         </IconButton>
//         <Popover
//           open={Boolean(anchorEl)}
//           anchorEl={anchorEl}
//           onClose={handleClosePopover}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//           transformOrigin={{ vertical: 'top', horizontal: 'center' }}
//         >
//           <Box p={-2}><Logout /></Box>
//         </Popover>
//       </Box>
      // <NotificationsPage
      //   notifications={notifications}
      //   modalOpen={modalOpen}
      //   handleCloseModal={handleCloseModal}
      // />
//     </Box>
//   );
// };

// export default Topbar;
