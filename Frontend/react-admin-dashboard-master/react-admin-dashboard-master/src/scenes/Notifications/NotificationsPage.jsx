// // NotificationsPage.js
// import React, { useState, useEffect } from "react";

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/contact/");
//       const data = await response.json();
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Notifications</h1>
//       <ul>
//         {notifications.map((notification, index) => (
//           <li key={index}>
//             <p>{notification.full_name}</p>
//             <p>{notification.email}</p>
//             <p>{notification.message}</p>
//             <p>{notification.issue_date}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationsPage;




// import React, { useState, useEffect } from "react";
// import { Box, IconButton, Badge, Modal, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import MailIcon from "@mui/icons-material/Mail";



// const NotificationsPage = () => {
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
//   const handleNotificationsClick = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <Box m="20px">
//       <Box display="flex" >
//         <IconButton onClick={handleNotificationsClick}>
//           <Badge badgeContent={notifications.length} color="secondary">
//             <NotificationsOutlinedIcon />
//           </Badge>
//         </IconButton>
//         <IconButton>
//         </IconButton>
//       </Box>
//       {/* Modal for Notifications */}
//       <Modal
//           open={modalOpen}
//           onClose={handleCloseModal}
//           aria-labelledby="notification-modal-title"
//           aria-describedby="notification-modal-description"
//         >
//           <Box sx={{
//             position: 'absolute',top: '30%',left: '50%',transform: 'translate(-50%, -50%)',
//             bgcolor: '#FFFFFF', // Change the background color here
//             border: 'none',boxShadow: 24,padding: 2,minWidth: 300, // Adjust the minimum width as per your requirement
//             maxWidth: 600, // Adjust the maximum width as per your requirement
//             maxHeight: '60vh', // Adjust the maximum height as per your requirement
//             overflowY: 'auto',borderRadius: 2
//           }}>
//           <Typography id="notification-modal-title" variant="h4" component="h2" textAlign="center" color= '#333' gutterBottom>
//             Notifications
//           </Typography>
//           <List>
//             {notifications.map((notification, index) => (
//               <ListItem key={index} alignItems="flex-start" sx={{ 
//                 backgroundColor: '#f1f3f4', 
//                 margin:'auto',
//                 marginBottom: 1, 
//                 borderRadius: 1, 
//                 width:'300px',
//                 '&:hover': { backgroundColor: '#e0e0e0' },
//                 borderLeft: '4px solid',
//                 borderLeftColor: notification.type === 'order' ? '#3f51b5' :
//                 notification.type === 'message' ? '#ff9800' :
//                 notification.type === 'customer' ? '#4caf50' : '#3f51b5'
//               }}>
//                 <ListItemAvatar>
//                   <Avatar sx={{ 
//                     bgcolor: notification.type === 'order' ? '#3f51b5' :
//                     notification.type === 'message' ? '#ff9800' :
//                     notification.type === 'customer' ? '#4caf50' : '#3f51b5' 
//                   }}>
//                   <MailIcon sx={{ color: '#fff' }} />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>{notification.full_name}</Typography>}
//                   secondary={
//                     <React.Fragment>
//                       <Typography variant="body2"color= '#333'>
//                         {notification.messege}
//                       </Typography>
//                       <Typography component="span" variant="body4" color= '#333'>
//                         {notification.email}
//                       </Typography>
//                       <Typography component="span" variant="body4"color= '#333'>
//                      {"  :"}{notification.issue_date}
//                       </Typography>
//                     </React.Fragment>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default NotificationsPage;













import React from "react";
import { Box, Modal, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

const NotificationsPage = ({ notifications, modalOpen, handleCloseModal }) => {
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
    <Box sx={{ 
      position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
      bgcolor: '#FFFFFF', boxShadow: 24, p: 2, minWidth: 300, maxWidth: 600, maxHeight: '60vh',
      overflowY: 'auto', borderRadius: 2 
    }}>
      <Typography variant="h4" textAlign="center" color="#333" gutterBottom>Notifications</Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index} sx={{ 
            bgcolor: '#f1f3f4', mb: 1, borderRadius: 1, width: '300px', 
            '&:hover': { bgcolor: '#e0e0e0' }, 
            borderLeft: '4px solid',
            borderLeftColor: '#3f51b5'
          }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#3f51b5' }}>
                <MailIcon sx={{ color: '#fff' }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>{notification.full_name}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" color='#333'>{notification.messege}</Typography>
                  <Typography component="span" variant="body2" color='#333'>{notification.email}</Typography>
                  <Typography component="span" variant="body2" color='#333'>{" : "}{notification.issue_date}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Modal>
  );
};

export default NotificationsPage;
