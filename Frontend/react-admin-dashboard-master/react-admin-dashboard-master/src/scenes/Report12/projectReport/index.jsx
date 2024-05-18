// import React, { useState, useEffect, useRef } from "react";
// import { Box, Button, Grid, Card, CardContent, Avatar, Typography, CircularProgress } from "@mui/material";
// import { Link } from "react-router-dom";
// import Header from "../../../components/Header";

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [designs, setDesigns] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const projectsResponse = await fetch("http://127.0.0.1:8000/Projects/");
//       const projectsData = await projectsResponse.json();
//       setProjects(projectsData);

//       const designsData = {};
//       for (const project of projectsData) {
//         const designsResponse = await fetch(`http://127.0.0.1:8000/Design/view/${project.design}`);
//         const designData = await designsResponse.json();
//         designsData[project.id] = designData;
//       }
//       setDesigns(designsData);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   };
//   const printContentRef = useRef();

//   const handlePrint = () => {
//     const content = printContentRef.current.innerHTML;
//     document.body.style.backgroundColor = "#2C3744";    // Set title for printing

//     // Set title for printing
//     document.title = "Invoice";
  
//     // Replace page content with content to print
//     document.body.innerHTML = content;
  
//     // Trigger print dialog
//     window.print();
//     window.location.reload();
//   };
//   return (
//     <Box m={4}>
//       <Header title="List of Projects" subtitle="Project Profiles" />
//       <Grid container spacing={3}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//             <CircularProgress />
//           </Box>
//         ) : (
//           projects.map((project) => (
//             <Grid item xs={12} sm={6} md={3} key={project.id}>
//               <Card sx={{ height: "100%", bgcolor: '#1F2A40' }}>
//                 <CardContent>
//                   <Box display="flex" justifyContent="center" mb={2}>
//                     <Avatar alt={"no picture"} src={`/assets/design/${designs[project.id]?.architecture}`} sx={{ width: 80, height: 80, borderRadius: '20%' }} />
//                   </Box>
//                   <Typography variant="h6" align="center" gutterBottom>{project.project_name}</Typography>
//                   <Typography variant="body2" align="center" gutterBottom><strong>Issue Date:</strong> {new Date(project.issue_date).toLocaleDateString()}</Typography>
//                   <Box mt={2} display="flex" justifyContent="center">
//                     <Button component={Link} to={`/Report/prReport/${project.id}`} color="primary" sx={{ background: "#00BC5D", color: 'white', "&:hover": { color: "white" } }}>View Project</Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default ProjectList;
