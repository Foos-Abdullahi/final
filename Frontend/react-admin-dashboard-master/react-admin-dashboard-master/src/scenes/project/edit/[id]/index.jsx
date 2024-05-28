// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField,MenuItem } from '@mui/material';
// import { Formik } from 'formik';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Header from '../../../../components/Header';

// const ProjectEdit = () => {
//   const isNonMobile = useMediaQuery('(min-width:600px)');

//   const [projectData, setProjectData] = useState({});
//   const [originalData, setOriginalData] = useState({});
//   const [editingProjectId, setEditingProjectId] = useState('');
//   const [projectName, setProjectName] = useState("");
//   const [status, setStatus] = useState("");
//   const [agreements, setAgreements] = useState("");
//   const [budgets, setBudgets] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [issueDate, setIssueDate] = useState("");
//   const [clientOptions, setClientOptions] = useState([]);
//   const [selectedClient, setSelectedClient] = useState("");
//   const [designOptions, setDesignOptions] = useState([]);
//   const [selecteddesign, setSelectedDesign] = useState("");

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const path = window.location.pathname;
//         const id = path.substring(path.lastIndexOf('/') + 1);
//         const response = await fetch(`http://localhost:8000/Projects/view/${id}/`);
//         if (!response.ok) {
//           console.log('No data');
//           return;
//         }
//         const data = await response.json();
//         setProjectData(data);
//         setOriginalData(data);
//         setEditingProjectId(id)
//         setSelectedClient(data.client || "")
//         setSelectedDesign(data.design || "");
//         console.log(data.client );
//         console.log('Data view:', data);
//       } catch (error) {
//         console.error('Error fetching project:', error);
//       }
//     };

//     fetchProject();
//   }, []);

//   const fetchClientOptions = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Client/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch client options");
//       }
//       const data = await response.json();
//       setClientOptions(data);
//     } catch (error) {
//       console.error("Error fetching client options:", error);
//     }
//   };
//   const fetchdesignOptions = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Design/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch design options");
//       }
//       const data = await response.json();
//       setDesignOptions(data);
//       console.log("wakaas", data);
//     } catch (error) {
//       console.error("Error fetching design options:", error);
//     }
//   };
//   useEffect(() => {
//     // Fetch client options
//     fetchClientOptions();
//     fetchdesignOptions();
//   }, []);
  
//   const updateProject = async () => {
//     //alert(editingProjectId)
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/Projects/update/${editingProjectId}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           project_name: projectName || originalData.project_name,
//           client: selectedClient || originalData.client,
//           design:selecteddesign ||  originalData.design,
//           status: status || originalData.status,
//           Agreements: agreements || originalData.Agreements,
//           budget: budgets || originalData.budget,
//           start_date: startDate || originalData.start_date,
//           end_date: endDate || originalData.end_date,
//           issue_date: issueDate || originalData.issue_date,
//         }),
//       });
//       console.log(projectName || originalData.project_name);
//       console.log(selectedClient || originalData.client);
//       console.log(status || originalData.status);
//       console.log(agreements || originalData.Nootaayo);
//       console.log(startDate || originalData.start_date);
//       console.log(endDate || originalData.end_date);
//       console.log(issueDate || originalData.issue_date);
//       if (response.ok) {
//         console.log('Project updated successfully');
//         // window.location.href = '/project';
//         window.history.back();
//       } else {
//         console.error('Failed to update project');
//         alert('Failed to update the project. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error updating project:', error);
//       alert('Error updating the project. Please try again.');
//     }
//   };
  
//   const handleFormSubmit = (values) => {
//     setProjectData(values);
//     updateProject();
//   };

//   return (
//     <Box m="20px">
//       <Header title="EDIT PROJECT" subtitle="Edit an Existing Project" />

//       <Formik onSubmit={handleFormSubmit} initialValues={projectData}>
//         {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
//           <form onSubmit={handleSubmit}>
//             <div>
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 required
//                 type="text"
//                 label="Project Name"
//                 onBlur={handleBlur}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 value={projectName || originalData.project_name}
//                 name="project_name"
//                 error={touched.project_name && !!errors.project_name}
//                 helperText={touched.project_name && errors.project_name}
//               />
//                <TextField
//                 fullWidth
//                 select
//                 variant="filled"
//                 required
//                 label= "Client"
//                 onBlur={handleBlur}
//                 onChange={(e) => setSelectedClient(e.target.value)}
//                 value={selectedClient}
//                 name="client"
//                 sx={{ gridColumn: "span 4" }}
//               >
//                 {clientOptions.map((option) => (
//                   <MenuItem key={option.id} value={option.id} >
//                     {option.client_name}
//                   </MenuItem>
//                 ))}
//               </TextField> 
              
//               <TextField
//                 fullWidth
//                 select
//                 variant="filled"
//                 required
//                 label= "design"
//                 onBlur={handleBlur}
//                 onChange={(e) => setSelectedDesign(e.target.value)}
//                 value={selecteddesign}
//                 name="design"
//                 sx={{ gridColumn: "span 4" }}
//               >
//                 {designOptions.map((options) => (
//                   <MenuItem key={options.id} value={options.id} >
//                     {options.image}
//                   </MenuItem>
//                 ))}
//               </TextField> 
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 required
//                 label="Status"
//                 onBlur={handleBlur}
//                 onChange={(e) => setStatus(e.target.value)}
//                 value={status || originalData.status}
//                 name="status"
//                 error={touched.status && !!errors.status}
//                 helperText={touched.status&& errors.status}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Agreements"
//                 required
//                 onBlur={handleBlur}
//                 onChange={(e) => setAgreements(e.target.value)}
//                 value={agreements || originalData.Agreements}
//                 name="Agreements"
//                 error={touched.Agreements && !!errors.Agreements}
//                 helperText={touched.Agreements && errors.Agreements}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="number"
//                 label="budget"
//                 required
//                 onBlur={handleBlur}
//                 onChange={(e) => setBudgets(e.target.value)}
//                 value={budgets || originalData.budget}
//                 name="budgets"
//                 error={touched.budget && !!errors.budget}
//                 helperText={touched.budget && errors.budget}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Start Date"
//                 required
//                 onBlur={handleBlur}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 value={startDate || originalData.start_date}
//                 name="start_date"
//                 error={touched.start_date && !!errors.start_date}
//                 helperText={touched.start_date && errors.start_date}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="End Date"
//                 onBlur={handleBlur}
//                 required
//                 onChange={(e) => setEndDate(e.target.value)}
//                 value={endDate || originalData.end_date}
//                 name="end_date"
//                 error={touched.end_date && !!errors.end_date}
//                 helperText={touched.end_date && errors.end_date}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 required
//                 label="Issue Date"
//                 onBlur={handleBlur}
//                 onChange={(e) => setIssueDate(e.target.value)}
//                 value={issueDate || originalData.issue_date}
//                 name="issue_date"
//                 error={touched.issue_date && !!errors.issue_date}
//                 helperText={touched.issue_date && errors.issue_date}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//             </div>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Update Project
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default ProjectEdit;




// import React, { useState, useEffect } from "react";
// import { Box, Button, MenuItem, TextField } from "@mui/material";
// import { Formik } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../../../components/Header";

// const ProjectEditForm = () => {
//   const url = window.location.pathname;
//   const projectId = url.split("/").pop();
  
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const [projectNo, setProjectNo] = useState({});
//   const [projectName, setProjectName] = useState("");
//   const [status, setStatus] = useState("");
//   const [clientOptions,setClientOptions]=useState([]);
//   const [Client, setClient] = useState("");
//   const [DesignOptions,setDesignOptions]=useState([]);
//   const [Design, setDesign] = useState("");
//   const [agreements, setAgreements] = useState("");
//   const [budgets, setBudgets] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [issueDate, setIssueDate] = useState("");

//   useEffect(() => {
//     const fetchClientOptions = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/Client/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch client options");
//         }
//         const data = await response.json();
//         setClientOptions(data);
//       } catch (error) {
//         console.error("Error fetching client options:", error);
//       }
//     };
  
//     const fetchDesignOptions = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/Design/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch design options");
//         }
//         const data = await response.json();
//         setDesignOptions(data);
//       } catch (error) {
//         console.error("Error fetching design options:", error);
//       }
//     };
//     const fetchProject = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/Projects/view/${projectId}/`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch project details");
//         }
//         const data = await response.json();
//         setProjectName(data.project_name);
//         setStatus(data.status);
//         setAgreements(data.Agreements);
//         setClient(data.client);
//         setDesign(data.design)
//         setProjectNo(data.project_No)
//         setBudgets(data.budget);
//         setStartDate(data.start_date);
//         setEndDate(data.end_date);
//         setIssueDate(data.issue_date);
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       }
//     };

//     fetchProject();
//     fetchDesignOptions();
//     fetchClientOptions();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const sendForm = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/Projects/update/${projectId}/`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           project_name: projectName,
//           status: status,
//           client: Client,
//           design: Design,
//           projectNo: projectNo,
//           Agreements: agreements,
//           budget: budgets,
//           start_date: startDate,
//           end_date: endDate,
//           issue_date: issueDate,
//         }),
//       });

//       if (!response.ok) {
//         console.log(`Request failed with status ${response.status}`);
//         return;
//       }

//       const data = await response.json();
//       console.log("Response data:", data);
//       // window.location.href = "/client";
//     } catch (error) {
//       console.error("Error sending form:", error);
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="EDIT PROJECT" subtitle="Edit Project Details" />

//       <Formik initialValues={{ project_name: "", status: "", 
//         Agreements: "", budget: "", start_date: "", 
//         client:"", design: "", projectNo: "",
//         end_date: "", issue_date: "" }} onSubmit={sendForm}>
//         {({ handleBlur, handleSubmit, values }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="text"
//                 label="Project No"
//                 onBlur={handleBlur}
//                 onChange={(e) => setProjectNo(e.target.value)}
//                 value={projectNo}
//                 name="project_No"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="text"
//                 label="Project Name"
//                 onBlur={handleBlur}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 value={projectName}
//                 name="project_name"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 required
//                 variant="filled"
//                 type="text"
//                 label="Status"
//                 onBlur={handleBlur}
//                 onChange={(e) => setStatus(e.target.value)}
//                 value={status}
//                 name="status"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 select
//                 required
//                 variant="filled"
//                 label="Client"
//                 onBlur={handleBlur}
//                 onChange={(e) => setClient(e.target.value)}
//                 value={Client}
//                 name="client"
//                 sx={{ gridColumn: "span 4" }}
//               >
//                 {clientOptions.map((client) => (
//                   <MenuItem key={client.id} value={client.id}>
//                     {client.client_name}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <TextField
//                 fullWidth
//                 select
//                 required
//                 variant="filled"
//                 label="Design"
//                 onBlur={handleBlur}
//                 onChange={(e) => setDesign(e.target.value)}
//                 value={Design}
//                 name="design"
//                 sx={{ gridColumn: "span 4" }}
//               >
//                 {DesignOptions.map((design) => (
//                   <MenuItem key={design.id} value={design.id}>
//                     {design.architecture}
//                   </MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Agreements"
//                 onBlur={handleBlur}
//                 onChange={(e) => setAgreements(e.target.value)}
//                 value={agreements}
//                 name="agreements"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="number"
//                 label="Budget"
//                 onBlur={handleBlur}
//                 onChange={(e) => setBudgets(e.target.value)}
//                 value={budgets}
//                 name="budget"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Start Date"
//                 onBlur={handleBlur}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 value={startDate}
//                 name="start_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="End Date"
//                 onBlur={handleBlur}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 value={endDate}
//                 name="end_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Issue Date"
//                 onBlur={handleBlur}
//                 onChange={(e) => setIssueDate(e.target.value)}
//                 value={issueDate}
//                 name="issue_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Update Project
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default ProjectEditForm;















import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

const UpdateProject = () => {
  const url = window.location.pathname;
    const projectId = url.split("/").pop();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [clientOptions, setClientOptions] = useState([]);
  const [designOptions, setDesignOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [projectNo, setProjectNo] = useState({});
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [agreements, setAgreements] = useState("");
  const [budgets, setBudgets] = useState("");
  const [BudgetRemains, setBudgetRemains] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [issueDate, setIssueDate] = useState("");
  useEffect(() => {
    fetchClientOptions();
    fetchDesignOptions();
    fetchProjectDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClientOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Client/");
      if (!response.ok) {
        throw new Error("Failed to fetch client options");
      }
      const data = await response.json();
      setClientOptions(data);
    } catch (error) {
      console.error("Error fetching client options:", error);
    }
  };

  const fetchDesignOptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Design/");
      if (!response.ok) {
        throw new Error("Failed to fetch design options");
      }
      const data = await response.json();
      setDesignOptions(data);
    } catch (error) {
      console.error("Error fetching design options:", error);
    }
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Projects/view/${projectId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }
      const data = await response.json();
      setProjectNo(data.project_No)
      setProjectName(data.project_name);
      setSelectedClient(data.client);
      setSelectedDesign(data.design);
      setStatus(data.status);
      setAgreements(data.Agreements);
      setBudgets(data.budget);
      setBudgetRemains(data.BudgetRemain);
      setStartDate(data.start_date);
      setEndDate(data.end_date);
      setIssueDate(data.issue_date);
      console.log("project_No:",data.project_No);
      console.log("project_name:",data.project_name);
      console.log("client:",data.client);
      console.log("design:",data.design);
      console.log("status:",data.status);
      console.log("Agreements:",data.Agreements);
      console.log("budget:",data.budget);
      console.log("BudgetRemain:",data.BudgetRemain);
      console.log("start_date:",data.start_date);
      console.log("end_date:",data.end_date);
      console.log("issue_date:",data.issue_date);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const sendForm = async () => {
    const res = await fetch(`http://127.0.0.1:8000/Projects/update/${projectId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name:projectName,
        client: selectedClient,
        design: selectedDesign,
        status:status,
        start_date:startDate,
        end_date: endDate,
        Agreements: agreements,
        budget:budgets,
        BudgetRemain:BudgetRemains,
        project_No:projectNo,
        issue_date:issueDate,
      }),
    });

    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
     window.history.back()
  };

  return (
    <Box m="20px">
      <Header title="UPDATE PROJECT" subtitle="Update Project Details" />
        <Formik
          initialValues={{
            project_name: "",
            client: "",
            design: "",
            status: "",
            Agreements: "",
            budget: "",
            BudgetRemain: "",
            project_No: "",
            start_date: "",
            end_date: "",
            issue_date: "",
          }}
          onSubmit={sendForm}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="text"
                  label="Project No"
                  onBlur={handleBlur}
                  onChange={(e)=>setProjectNo(e.target.value)}
                  value={projectNo}
                  name="project_No"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="text"
                  label="Project Name"
                  onBlur={handleBlur}
                  onChange={(e)=>setProjectName(e.target.value)}
                  value={projectName}
                  name="project_name"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  select
                  variant="filled"
                  label="Client"
                  onBlur={handleBlur}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  value={selectedClient}
                  name="client"
                  sx={{ gridColumn: "span 4" }}
                >
                  {clientOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.client_name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  required
                  select
                  variant="filled"
                  label="Design"
                  onBlur={handleBlur}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                  value={selectedDesign}
                  name="design"
                  sx={{ gridColumn: "span 4" }}
                >
                  {designOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.architecture}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="text"
                  label="Status"
                  onBlur={handleBlur}
                  onChange={(e)=>setStatus(e.target.value)}
                  value={status}
                  name="status"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="text"
                  label="Agreements"
                  onBlur={handleBlur}
                  onChange={(e)=>setAgreements(e.target.value)}
                  value={agreements}
                  name="Agreements"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="number"
                  label="Budget"
                  onBlur={handleBlur}
                  onChange={(e)=>setBudgets(e.target.value)}
                  value={budgets}
                  name="budget"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="number"
                  label="Budget Remain"
                  onBlur={handleBlur}
                  onChange={(e)=>setBudgetRemains(e.target.value)}
                  value={BudgetRemains}
                  name="BudgetRemain"
                  sx={{ gridColumn: "span 4" }}
               />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="date"
                  label="Start Date"
                  onBlur={handleBlur}
                  onChange={(e)=>setStartDate(e.target.value)}
                  value={startDate}
                  name="start_date"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="date"
                  label="End Date"
                  onBlur={handleBlur}
                  onChange={(e)=>setEndDate(e.target.value)}
                  value={endDate}
                  name="end_date"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="date"
                  label="Issue Date"
                  onBlur={handleBlur}
                  onChange={(e)=>setIssueDate(e.target.value)}
                  value={issueDate}
                  name="issue_date"
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update Project
                </Button>
              </Box>
            </form>
          )}
        </Formik>
    </Box>
  );
};

export default UpdateProject;
