/* eslint-disable jsx-a11y/img-redundant-alt */
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableFooter,
//   Avatar,
// } from "@mui/material";
// import { Print } from "@mui/icons-material";
// import{ReactToPrint} from 'react-to-print'
// const ProjecTDetail = () => {
//   const [loading, setLoading] = useState(true);
//   const [materials, setMaterials] = useState([]);
//   const [project, setProject] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [design, setDesign] = useState({});
//   const path = window.location.pathname;
//   const id = path.substring(path.lastIndexOf('/') + 1);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     fetchProjects();
//     // fetchMaterials();
//   }, []);

//   // const fetchMaterials = async () => {
//   //   try {
//   //     const materialsResponse = await fetch(`http://127.0.0.1:8000/Material/getbyid/${id}`);
//   //     const materialsData = await materialsResponse.json();
//   //     console.log(materialsResponse);
//   //     console.log("Materials Data:", materialsData);
  
//   //     if (materialsData && materialsData.length > 0) {
//   //       const tasksPromises = materialsData.map(async (material) => {
//   //         console.log("Material ID:", material.id);
//   //         console.log("Material Name:", material.material_name);
//   //         console.log("Material Quantity:", material.quantity);
//   //         console.log("Material Sub Total:", material.sub_total);
//   //         console.log("Material Issue Date:", material.issue_date);
  
//   //         const tasksResponse = await fetch(`http://127.0.0.1:8000/Tasks/detils/${material.project}`);
//   //         return tasksResponse.json();
//   //       });
//   //       const tasksData = await Promise.all(tasksPromises);
//   //       console.log("Tasks Data:", tasksData);
  
//   //       setMaterials(materialsData);
//   //       setTasks(tasksData.flat()); 
//   //       setLoading(false);
//   //     } else {
//   //       console.log("No materials found for the given project.");
//   //       setLoading(false);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching Material:", error);
//   //     setLoading(false);
//   //   }
//   // };
  
//   const fetchProjects = async () => {
//     try {
//       const ProjectResponse = await fetch("http://127.0.0.1:8000/Projects/");
//       const projectData = await ProjectResponse.json();
//       const prId = projectData.find(project => project.id === parseInt(id));
//       console.log(prId.design);
//       setProject(prId); // Find project by id
  
//       const designResponse = await fetch(`http://127.0.0.1:8000/Design/view/${prId.design}`);
//       const designData = await designResponse.json();
//       setDesign(designData);
//       console.log(design.image);

//       const materialsResponse = await fetch(`http://127.0.0.1:8000/Material/get_projects_by_id/?prId=${prId.id}`);
//       const materialsData = await materialsResponse.json();
//       console.log(materialsResponse);
//       setMaterials(materialsData)
      
//       let totalAmount = 0;
//       for (let i = 0; i < materialsData.length; i++) {
//         totalAmount += parseFloat(materialsData[i].sub_total);
        
//       }
//       setTotal(totalAmount);

//       const tasksResponse = await fetch(`http://127.0.0.1:8000/Tasks/`);
//       const taskData = await tasksResponse.json();
//       setTasks(taskData)
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching Project:", error);
//       setLoading(false);
//     }
//   };
//   return (
//     <Box
//       style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
//       display="flex"
//       flexDirection="column"
//     >
//       {/* {showResults ? ( */}
//       <ReactToPrint
//         trigger={() => (
//           <Button variant="contained" color="primary">
//             Print Invoice
//           </Button>
//         )}
//         content={() => this.componentRef}
//         documentTitle="Project Invoice"
//         pageStyle="print"
//       />
//       <Paper elevation={3} sx={{ padding: "20px", color: "white",bgcolor:'#2C3744' }}>
//         <Box ref={el=>this.componentRef=el}>
          // {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          //   <Typography variant="h2" color="white">Project Report</Typography>
          //   <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
          //     Print Invoice
          //   </Button>
          // </Box> */}
//           <Box>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             {/* Design image at the top */}
//             <Avatar alt="Design Image" src={`/assets/design/${design.architecture}`} sx={{ width: 100, height: 100 }} />
//             {/* <Typography variant="h2" color="white">Invoice</Typography>
//             <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
//               Print Invoice
//             </Button> */}
//           </Box>
          
//            <Box display="flex" justifyContent="space-between">
//                 <Box>
//                   <Typography variant="h3" color="white">Company</Typography>
//                   <address>
//                     Street Address<br />
//                     State, City<br />
//                     Region, Postal Code<br />
//                     ltd@example.com
//                   </address>
//                 </Box>
//                 {/* Render project details */}
//           <Box>
//             <Typography variant="h3" color="white">Project Details</Typography>
//             <Typography variant="body1" color="white">Project Name: {project.project_name}</Typography>
//             <Typography variant="body1" color="white">Start Date: {project.start_date}</Typography>
//             <Typography variant="body1" color="white">End Date: {project.end_date}</Typography>
//           </Box>

//               </Box>
              
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell style={{ width: "1%" }}><Typography variant="body1" color="white">#</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">Material Name</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">Quantity</Typography></TableCell>
//                   <TableCell><Typography variant="body1" color="white">Sub Total</Typography></TableCell>
//                   <TableCell align="right"><Typography variant="body1" color="white">Date</Typography></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {materials.map((material, index) => (
//                   <TableRow key={material.id}>
//                     <TableCell><Typography variant="body1" color="white">{index + 1}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{material.material_name}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{material.quantity}</Typography></TableCell>
//                     <TableCell><Typography variant="body1" color="white">{material.sub_total}</Typography></TableCell>
//                     <TableCell align="right"><Typography variant="body1" color="white">{material.issue_date}</Typography></TableCell>
//                   </TableRow>
//                 ))}

//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Typography variant="h3" color="white" mt={3}>Tasks</Typography>
//             <Typography variant="h3" color="white" mt={3}>Tasks</Typography>
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
//               <TableFooter>
//                 <TableRow>
//                   <TableCell colSpan={2} align="right"><Typography variant="body1" color="white">Total:</Typography></TableCell>
//                   <TableCell align="center"><Typography variant="body1" color="white">{total}</Typography></TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </TableContainer>
//             <Typography variant="body2" align="center" color="white" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
//           </Box>
//         </Box>
//         </Paper>
//      </Box>
//   );
// };

// export default ProjecTDetail;















// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableFooter,
//   Avatar,
// } from "@mui/material";
// import { Print } from "@mui/icons-material";
// import { ReactToPrint } from "react-to-print";

// const ProjecTDetail = () => {
//   const [loading, setLoading] = useState(true);
//   const [materials, setMaterials] = useState([]);
//   const [project, setProject] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [design, setDesign] = useState({});
//   const [total, setTotal] = useState(0);
//   const path = window.location.pathname;
//   const id = path.substring(path.lastIndexOf("/") + 1);
//   const componentRef = useRef();

//   useEffect(() => {
//     fetchProjects();
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

//   return (
//     <Box
//       style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
//       display="flex"
//       flexDirection="column"
//     >
//       <ReactToPrint
//         trigger={() => (
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h2" color="white">Project Report</Typography>
//           <Button variant="contained" color="primary"  startIcon={<Print />}>
//               Print Invoice
//           </Button>
//           </Box>
//         )}
//         content={() => componentRef.current}
//         documentTitle="Invoice"
//       />
//       <Paper ref={componentRef} elevation={3} sx={{ padding: "20px", color: "white", bgcolor: "#2C3744" }}>
//         <Box >
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Avatar alt="Design Image" src={`/assets/design/${design.architecture}`} sx={{ width: 100, height: 100 }} />
//           </Box>
//           <Box display="flex" justifyContent="space-between">
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
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [design, setDesign] = useState({});
  const [total, setTotal] = useState(0);
  const path = window.location.pathname;
  const id = path.substring(path.lastIndexOf("/") + 1);
  useEffect(() => {
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    try {
      const projectResponse = await fetch("http://127.0.0.1:8000/Projects/");
      const projectData = await projectResponse.json();
      const prId = projectData.find((project) => project.id === parseInt(id));
      setProject(prId);

      const designResponse = await fetch(
        `http://127.0.0.1:8000/Design/view/${prId.design}`
      );
      const designData = await designResponse.json();
      setDesign(designData);

      const materialsResponse = await fetch(
        `http://127.0.0.1:8000/Material/get_projects_by_id/?prId=${prId.id}`
      );
      const materialsData = await materialsResponse.json();
      setMaterials(materialsData);

      let totalAmount = 0;
      materialsData.forEach((material) => {
        totalAmount += parseFloat(material.sub_total);
      });
      setTotal(totalAmount);

      const tasksResponse = await fetch(`http://127.0.0.1:8000/Tasks/`);
      const taskData = await tasksResponse.json();
      setTasks(taskData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const printContentRef = useRef();
  const handlePrint = () => {
    const content = printContentRef.current.innerHTML;
   document.body.innerHTML= content; 
    window.print();
    window.location.reload();
  };
  

  

  return (
    <Box
    style={{ backgroundColor: "#5F6368", minHeight: "100vh", padding: "20px" }}
    display="flex"
    flexDirection="column"
    >
          <Box display="flex"  justifyContent="space-between" alignItems="center"  mb={2}>
            <Typography variant="h2" color="white">Project Report</Typography>
            <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
              Print Invoice
            </Button>
          </Box>
      <Paper ref={printContentRef} elevation={3} sx={{ padding: "20px", color: "black", bgcolor: "#FFFFFF" }}>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box color="black">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <img alt="Design Image" src={`/assets/city logo.png`}  width= "250px" height= "100px"  />
          </Box>
            </Box>
            <Box>
              <Typography variant="h3" color="black">Project Details</Typography>
              <Typography variant="body1" color="black">Project Name: {project.project_name}</Typography>
              <Typography variant="body1" color="black">Start Date: {project.start_date}</Typography>
              <Typography variant="body1" color="black">End Date: {project.end_date}</Typography>
            </Box>
          </Box>
          <TableContainer>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <img alt="Design Image" src={`/assets/design/${design.architecture}`} width= '100%' height= '300px' />
          </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell  style={{ width: "1%",border: 'none' }}><Typography variant="body1" color="black">#</Typography></TableCell>
                  <TableCell style={{ border: 'none' }} align="right"><Typography variant="body1" color="black">Material Name</Typography></TableCell>
                  <TableCell style={{ border: 'none' }}align="right"><Typography variant="body1" color="black">Quantity</Typography></TableCell>
                  <TableCell style={{ border: 'none' }}align="right"><Typography variant="body1" color="black">Sub Total</Typography></TableCell>
                  <TableCell style={{ border: 'none' }}align="right"><Typography variant="body1" color="black">Date</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material, index) => (
                  <TableRow key={material.id}>
                    <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">{index + 1}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }} align="right"><Typography variant="body1" color="black">{material.material_name}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }}align="right"><Typography variant="body1" color="black">{material.quantity}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }} align="right"><Typography variant="body1" color="black">{material.sub_total}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }} align="right"><Typography variant="body1" color="black">{material.issue_date}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} align="right"><Typography variant="body1" color="black">Total:</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body1" color="black">{total}</Typography></TableCell>
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Typography variant="h3" color="black" mt={3}>Tasks</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">Task Name</Typography></TableCell>
                  <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">Start Date</Typography></TableCell>
                  <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">End Date</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">{task.end_date}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">{task.start_date}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">{task.task_name}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" align="center" color="black" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjecTDetail;


// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableFooter,
//   Avatar,
// } from "@mui/material";
// import { Print } from "@mui/icons-material";

// const ProjecTDetail = () => {
//   const [total, setTotal] = useState(0);
//   // Other state variables and useEffect remain the same

//   const printContentRef = useRef();

//   const handlePrint = () => {
//     const content = printContentRef.current.innerHTML;
//     const printWindow = window.open('', '_blank');
//     printWindow.document.open();
//     printWindow.document.write(`
//       <html>
//       <head>
//         <title>Print</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 1in;
//             color: #4CCEA9;
//           }
//           h2 {
//             font-size: 24px;
//             margin-bottom: 20px;
//             color: white;
//           }
//           /* Add more styles as needed */
//         </styl>
//       </head>
//       <body>
//         ${content}
//       </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.print();
//     printWindow.close();
//   };

//   return (
//     <Box
//       style={{ backgroundColor: "#1A2634", minHeight: "100vh", padding: "20px" }}
//       display="flex"
//       flexDirection="column"
//     >
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h2" color="white">Project Report</Typography>
//         <Button variant="contained" color="primary" onClick={handlePrint} startIcon={<Print />}>
//           Print Invoice
//         </Button>
//       </Box>
//       <Paper ref={printContentRef} elevation={3} sx={{ padding: "20px", color: "#4CCEA9", bgcolor: "#2C3744" }}>
//         {/* Your content remains the same */}
//       </Paper>
//     </Box>
//   );
// };

// export default ProjecTDetail;
