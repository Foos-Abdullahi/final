import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Avatar,
} from "@mui/material";
import { Print } from "@mui/icons-material";

const ProjecTDetail = () => {
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [design, setDesign] = useState({});
  const path = window.location.pathname;
  const id = path.substring(path.lastIndexOf('/') + 1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProjects();
    // fetchMaterials();
  }, []);

  // const fetchMaterials = async () => {
  //   try {
  //     const materialsResponse = await fetch(`http://127.0.0.1:8000/Material/getbyid/${id}`);
  //     const materialsData = await materialsResponse.json();
  //     console.log(materialsResponse);
  //     console.log("Materials Data:", materialsData);
  
  //     if (materialsData && materialsData.length > 0) {
  //       const tasksPromises = materialsData.map(async (material) => {
  //         console.log("Material ID:", material.id);
  //         console.log("Material Name:", material.material_name);
  //         console.log("Material Quantity:", material.quantity);
  //         console.log("Material Sub Total:", material.sub_total);
  //         console.log("Material Issue Date:", material.issue_date);
  
  //         const tasksResponse = await fetch(`http://127.0.0.1:8000/Tasks/detils/${material.project}`);
  //         return tasksResponse.json();
  //       });
  //       const tasksData = await Promise.all(tasksPromises);
  //       console.log("Tasks Data:", tasksData);
  
  //       setMaterials(materialsData);
  //       setTasks(tasksData.flat()); 
  //       setLoading(false);
  //     } else {
  //       console.log("No materials found for the given project.");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Material:", error);
  //     setLoading(false);
  //   }
  // };
  
  const fetchProjects = async () => {
    try {
      const ProjectResponse = await fetch("http://127.0.0.1:8000/Projects/");
      const projectData = await ProjectResponse.json();
      const prId = projectData.find(project => project.id === parseInt(id));
      console.log(prId.design);
      setProject(prId); // Find project by id
  
      const designResponse = await fetch(`http://127.0.0.1:8000/Design/view/${prId.design}`);
      const designData = await designResponse.json();
      setDesign(designData);
      console.log(design.image);

      const materialsResponse = await fetch(`http://127.0.0.1:8000/Material/get_projects_by_id/?prId=${prId.id}`);
      const materialsData = await materialsResponse.json();
      console.log(materialsResponse);
      setMaterials(materialsData)
      
      let totalAmount = 0;
      for (let i = 0; i < materialsData.length; i++) {
        totalAmount += parseFloat(materialsData[i].sub_total);
        
      }
      setTotal(totalAmount);

      const tasksResponse = await fetch(`http://127.0.0.1:8000/Tasks/`);
      const taskData = await tasksResponse.json();
      setTasks(taskData)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Project:", error);
      setLoading(false);
    }
  };

  const printContentRef = useRef();

  const handlePrint = () => {
    const content = printContentRef.current.innerHTML;
    document.body.style.backgroundColor=''
    // const originalContent = document.body.innerHTML;
    // const originalTitle = document.title;
  
    // Set title for printing
    document.title = "Invoice";
  
    // Replace page content with content to print
    document.body.innerHTML = content;
  
    // Trigger print dialog
    window.print();
  
    // Restore original content and title after printing
    // document.body.innerHTML = originalContent;
    // document.title = originalTitle;
    window.location.reload();
  };

  return (
    <Box
      style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
      display="flex"
      flexDirection="column"
    >
      {/* {showResults ? ( */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h2" color="white">Project Report</Typography>
            <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
              Print Invoice
            </Button>
          </Box>
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            {/* Design image at the top */}
            <Avatar alt="Design Image" src={`/assets/design/${design.architecture}`} sx={{ width: 100, height: 100 }} />
            {/* <Typography variant="h2" color="white">Invoice</Typography>
            <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
              Print Invoice
            </Button> */}
          </Box>
          
           <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h3" color="white">Company</Typography>
                  <address>
                    Street Address<br />
                    State, City<br />
                    Region, Postal Code<br />
                    ltd@example.com
                  </address>
                </Box>
                {/* Render project details */}
          <Box>
            <Typography variant="h3" color="white">Project Details</Typography>
            <Typography variant="body1" color="white">Project Name: {project.project_name}</Typography>
            <Typography variant="body1" color="white">Start Date: {project.start_date}</Typography>
            <Typography variant="body1" color="white">End Date: {project.end_date}</Typography>
          </Box>

              </Box>
              
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "1%" }}><Typography variant="body1" color="white">#</Typography></TableCell>
                  <TableCell><Typography variant="body1" color="white">Material Name</Typography></TableCell>
                  <TableCell><Typography variant="body1" color="white">Quantity</Typography></TableCell>
                  <TableCell><Typography variant="body1" color="white">Sub Total</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body1" color="white">Date</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials.map((material, index) => (
                  <TableRow key={material.id}>
                    <TableCell><Typography variant="body1" color="white">{index + 1}</Typography></TableCell>
                    <TableCell><Typography variant="body1" color="white">{material.material_name}</Typography></TableCell>
                    <TableCell><Typography variant="body1" color="white">{material.quantity}</Typography></TableCell>
                    <TableCell><Typography variant="body1" color="white">{material.sub_total}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body1" color="white">{material.issue_date}</Typography></TableCell>
                  </TableRow>
                ))}

                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h3" color="white" mt={3}>Tasks</Typography>
            <Typography variant="h3" color="white" mt={3}>Tasks</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="body1" color="white">Task Name</Typography></TableCell>
                  <TableCell><Typography variant="body1" color="white">Start Date</Typography></TableCell>
                  <TableCell><Typography variant="body1" color="white">End Date</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell><Typography variant="body1" color="white">{task.task_name}</Typography></TableCell>
                    <TableCell><Typography variant="body1" color="white">{task.start_date}</Typography></TableCell>
                    <TableCell><Typography variant="body1" color="white">{task.end_date}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} align="right"><Typography variant="body1" color="white">Total:</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body1" color="white">{total}</Typography></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
            <Typography variant="body2" align="center" color="white" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
          </Box>
        </Box>
     </Box>
  );
};

export default ProjecTDetail;














// import React, { useState, useEffect, useRef } from "react";
// import {Box,Button,Typography,Paper,TableContainer,Table,TableHead,TableBody,TableRow,TableCell,TableFooter,Avatar,
// } from "@mui/material";
// import { Print } from "@mui/icons-material";

// const ProjecTDetail = () => {
//   // eslint-disable-next-line no-unused-vars
//   const [loading, setLoading] = useState(true);
//   const [materials, setMaterials] = useState([]);
//   const [project, setProject] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [design, setDesign] = useState({});
//   const [total, setTotal] = useState(0);
//   const path = window.location.pathname;
//   const id = path.substring(path.lastIndexOf("/") + 1);
//   useEffect(() => {
//     fetchProjects();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const projectResponse = await fetch("http://127.0.0.1:8000/Projects/");
//       const projectData = await projectResponse.json();
//       const prId = projectData.find((project) => project.id === parseInt(id));
//       setProject(prId);

//       const designResponse = await fetch(
//         `http://127.0.0.1:8000/Design/view/${prId.design}`
//       );
//       const designData = await designResponse.json();
//       setDesign(designData);

//       const materialsResponse = await fetch(
//         `http://127.0.0.1:8000/Material/get_projects_by_id/?prId=${prId.id}`
//       );
//       const materialsData = await materialsResponse.json();
//       setMaterials(materialsData);

//       let totalAmount = 0;
//       materialsData.forEach((material) => {
//         totalAmount += parseFloat(material.sub_total);
//       });
//       setTotal(totalAmount);

//       const tasksResponse = await fetch(`http://127.0.0.1:8000/Tasks/`);
//       const taskData = await tasksResponse.json();
//       setTasks(taskData);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   };
//   const printContentRef = useRef();

//   const handlePrint = () => {
//     const content = printContentRef.current.innerHTML;
//     // Set title for printing
//     document.title = "Invoice";
//     // Replace page content with content to print
//     document.body.innerHTML = content;
//     // Trigger print dialog
//     window.print();
//     window.location.reload();
//   };
  
  

//   return (
//     <Box
//     style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
//     display="flex"
//     flexDirection="column"
//     >
//           <Box display="flex" justifyContent="space-between" alignItems="center"  mb={2}>
//             <Typography variant="h2" color="white">Project Report</Typography>
//             <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
//               Print Invoice
//             </Button>
//           </Box>
//       <Paper ref={printContentRef} elevation={3} sx={{ padding: "20px", color: "white", bgcolor: "#2C3744" }}>
//         <Box>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Avatar alt="Design Image" src={`/assets/design/${design.architecture}`} sx={{ width: 100, height: 100 }} />
//           </Box>
//           <Box display="flex" justifyContent="space-between" alignItems="flex-start">
//             <Box>
//               <Typography variant="h3" color="white">Company</Typography>
//               <address>
//                 Street Address<br />
//                 State, City<br />
//                 Region, Postal Code<br />
//                 ltd@example.com
//               </address>
//             </Box>
//             <Box>
//               <Typography variant="h3" color="white">Project Details</Typography>
//               <Typography variant="body1" color="white">Project Name: {project.project_name}</Typography>
//               <Typography variant="body1" color="white">Start Date: {project.start_date}</Typography>
//               <Typography variant="body1" color="white">End Date: {project.end_date}</Typography>
//             </Box>
//           </Box>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell style={{ width: "1%" }}><Typography variant="body1" color="white">#</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">Material Name</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">Quantity</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">Sub Total</Typography></TableCell>
//                   <TableCell align="right"><Typography variant="body1" color="white">Date</Typography></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {materials.map((material, index) => (
//                   <TableRow key={material.id}>
//                     <TableCell><Typography variant="body1" color="white">{index + 1}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{material.material_name}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{material.quantity}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{material.sub_total}</Typography></TableCell>
//                     <TableCell align="right"><Typography variant="body1" color="white">{material.issue_date}</Typography></TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//               <TableFooter>
//                 <TableRow>
//                   <TableCell colSpan={2} align="right"><Typography variant="body1" color="white">Total:</Typography></TableCell>
//                   <TableCell align="center"><Typography variant="body1" color="white">{total}</Typography></TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </TableContainer>
//           <Typography variant="h3" color="white" mt={3}>Tasks</Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><Typography variant="body1" color="white">Task Name</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">Start Date</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">End Date</Typography></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tasks.map((task) => (
//                   <TableRow key={task.id}>
//                     <TableCell><Typography variant="body1" color="white">{task.task_name}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{task.start_date}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{task.end_date}</Typography></TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Typography variant="body2" align="center" color="white" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ProjecTDetail;