/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import { tokens } from "../../../../theme";
const ProjecTDetail = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [project, setProject] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [TotalInvoice, setTotalInvoice] = useState([]);
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
      const projectNo = projectData[0]['project_No'];
      const invoiceResponse = await fetch(`http://127.0.0.1:8000/invoice_reciept/get_invoices_by_ProjectNO/?prNo=${projectNo}`);
      const invoiceData = await invoiceResponse.json();
      setInvoices(invoiceData);
      let totalInvoice = 0;
      invoiceData.forEach((invoice) => {
        totalInvoice += parseFloat(invoice.amount);
      });
      setTotalInvoice(totalInvoice);
      console.log("lllllllllllllll:",projectData[0]['project_No']);
      console.log("invoice:",invoiceData);
      console.log("invoice:",totalInvoice);
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

  const getBudgetColor = (budgetRemain) => {
    return budgetRemain <= 0 ? 'red' : 'black';
  };

  const printContentRef = useRef();
  const handlePrint = () => {
    const content = printContentRef.current.innerHTML;
   document.body.innerHTML= content; 
    window.print();
    window.location.reload();
  };
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


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
              <Typography variant="body1" color="black">End Date: {project.end_date}</Typography>
              <Typography variant="body1" color="black">budget: ${project.budget}</Typography>
              <Typography variant="body1" color={getBudgetColor(project.BudgetRemain)}>Budget Remain: ${project.BudgetRemain}</Typography>
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
                    <TableCell style={{ border: 'none' }} align="right"><Typography variant="body1" color="black">${material.sub_total}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }} align="right"><Typography variant="body1" color="black">{material.issue_date}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} align="right"><Typography variant="body1" color="black">Total:</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body1" color="black">${total}</Typography></TableCell>
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
                    <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">{task.task_name}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">{task.start_date}</Typography></TableCell>
                    <TableCell style={{ border: 'none' }}><Typography variant="body1" color="black">{task.end_date}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography align="center" fontSize="20px" fontWeight="bold" color={colors.greenAccent[500]}>Total invoice :${TotalInvoice}</Typography>
          </TableContainer>
          <Typography variant="body2" align="center" color="black" mt={5}>Thank you very much for doing business with us. We look forward to working with you again!</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjecTDetail;