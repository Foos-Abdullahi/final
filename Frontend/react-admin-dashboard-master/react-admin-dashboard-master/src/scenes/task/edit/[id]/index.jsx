import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

const TaskEditForm = () => {

  const url = window.location.pathname;
  const taskId = url.split("/").pop(); 
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [projects, setProjects] = useState([]);
  const [selectproject, setSelectProject] = useState("");
  const [taskname, setTaskname] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus]= useState("");
  const [issueDate, setIssueDate]= useState("");
  const [users, setUsers] = useState("");
  const [image,setImage] = useState([false])

  useEffect(() => {
    const user = window.sessionStorage.getItem("userid");
    if (user) {
      setUsers(user);
    }
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data); // Assuming data is an array of projects with IDs and names
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };


    // useEffect(() => {
  //   const fetchTask = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:8000/Tasks/detils/${taskId}/`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch task details");
  //       }
  //       const data = await response.json();
  //       console.log("Fetched task data:", data);
  //       setSelectProject(data.project);
  //       setTaskname(data.task_name);
  //       setStartDate(data.start_date);
  //       setEndDate(data.end_date);
  //       setStatus(data.status);
  //       setUserId(data.user);
  //       setIssueDate(data.issue_date);
  //       setImage(data.task_image)
  //     } catch (error) {
  //       console.error("Error fetching task details:", error);
  //     }
  //   };
  //   fetchProjects();
  //   fetchTask();
  // }, []);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/Tasks/detils/${taskId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch task details");
        }
        const data = await response.json();
        console.log("Fetched task data:", data);
        setSelectProject(data.project);
        setTaskname(data.task_name);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setStatus(data.status);
        setUsers(data.user)
        setIssueDate(data.issue_date)
        setImage(data.task_image)
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    fetchProjects();
    fetchTask();
  }, []);

  const sendForm = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/Tasks/update/${taskId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_name: taskname,
          project: selectproject,
          start_date: startDate,
          end_date: endDate,
          status: status,
          user: users,
          issue_date: issueDate,
          task_image: image,
        }),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      window.location.href="/task"
      // window.history.back();
      // Reload data from the server after successful form submission
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <Box m="20px">
      <Header title="EDIT TASK" subtitle="Edit Task Details" />

      <Formik onSubmit={sendForm} initialValues={{}}>
        {({ handleBlur, handleSubmit }) => (
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
                select
                fullWidth
                variant="filled"
                label="Project"
                onBlur={handleBlur}
                onChange={(e)=>setSelectProject(e.target.value)}
                value={selectproject}
                name="project"
                sx={{ gridColumn: "span 4" }}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.project_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Task Name"
                onBlur={handleBlur}
                onChange={(e)=>setTaskname(e.target.value)}
                value={taskname}
                name="task_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
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
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={(e)=>setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
                 <input
                type="number"
                name="user_id"
                value={users}
              />
              <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Image"
                  onBlur={handleBlur}
                  onChange={handleImageChange}
                  value={image}
                  name="image"
                  sx={{ gridColumn: "span 4" }}
                />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Task
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default TaskEditForm;





// import React, { useState, useEffect } from "react";
// import { Box, Button, TextField, MenuItem } from "@mui/material";
// import { Formik } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../../../components/Header";

// const TaskEditForm = () => {

//   const url = window.location.pathname;
//   const taskId = url.split("/").pop(); 
  
//   const isNonMobile = useMediaQuery("(min-width:600px)");
  
//   const [projects, setProjects] = useState([]);
//   const [selectproject, setSelectProject] = useState([]);
//   const [taskname, setTaskname] = useState([]);
//   const [startDate, setStartDate] = useState([]);
//   const [endDate, setEndDate] = useState([]);
//   const [status, setStatus]=useState("");
//   const [issueDate, setIssueDate]=useState("");
//   const [userId, setUserId] = useState("");
//   const [image, setImage] = useState(false); // Added image state

//   useEffect(() => {
//     const user = window.sessionStorage.getItem("userid");
//     if (user) {
//       setUserId(user);
//     }
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/Projects/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch projects");
//       }
//       const data = await response.json();
//       setProjects(data); // Assuming data is an array of projects with IDs and names
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

  // useEffect(() => {
  //   const fetchTask = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:8000/Tasks/detils/${taskId}/`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch task details");
  //       }
  //       const data = await response.json();
  //       console.log("Fetched task data:", data);
  //       setSelectProject(data.project);
  //       setTaskname(data.task_name);
  //       setStartDate(data.start_date);
  //       setEndDate(data.end_date);
  //       setStatus(data.status);
  //       setUserId(data.user);
  //       setIssueDate(data.issue_date);
  //       setImage(data.task_image)
  //     } catch (error) {
  //       console.error("Error fetching task details:", error);
  //     }
  //   };
  //   fetchProjects();
  //   fetchTask();
  // }, []);

//   const sendForm = async () => {
//     try {
//       const res = await fetch(`http://127.0.0.1:8000/Tasks/update/${taskId}/`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           task_name: taskname,
//           project: selectproject,
//           start_date: startDate,
//           end_date: endDate,
//           status: status,
//           user_id: userId,
//           issue_date: issueDate,
//           image: image // Include image in the request body
//         }),
//       });

//       if (!res.ok) {
//         console.log(`Request failed with status ${res.status}`);
//         return;
//       }

//       const data = await res.json();
//       console.log("Response data:", data);
//       window.history.back();
//       // Reload data from the server after successful form submission
//     } catch (error) {
//       console.error("Error sending form:", error);
//     }
//   };
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };
//   return (
//     <Box m="20px">
//       <Header title="EDIT TASK" subtitle="Edit Task Details" />

//       <Formik onSubmit={sendForm} initialValues={{}}>
//         {({ handleBlur, handleSubmit }) => (
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
//                 select
//                 fullWidth
//                 variant="filled"
//                 label="Project"
//                 onBlur={handleBlur}
//                 onChange={(e)=>setSelectProject(e.target.value)}
//                 value={selectproject}
//                 name="project"
//                 sx={{ gridColumn: "span 4" }}
//               >
//                 {projects.map((project) => (
//                   <MenuItem key={project.id} value={project.id}>
//                     {project.project_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Task Name"
//                 onBlur={handleBlur}
//                 onChange={(e)=>setTaskname(e.target.value)}
//                 value={taskname}
//                 name="task_name"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Start Date"
//                 onBlur={handleBlur}
//                 onChange={(e)=>setStartDate(e.target.value)}
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
//                 onChange={(e)=>setEndDate(e.target.value)}
//                 value={endDate}
//                 name="end_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Status"
//                 onBlur={handleBlur}
//                 onChange={(e)=>setStatus(e.target.value)}
//                 value={status}
//                 name="status"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Issue Date"
//                 onBlur={handleBlur}
//                 onChange={(e)=>setIssueDate(e.target.value)}
//                 value={issueDate}
//                 name="issue_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="number"
//                 label="User ID"
//                 onBlur={handleBlur}
//                 onChange={(e)=>setUserId(e.target.value)}
//                 value={userId}
//                 name="user_id"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
              //   fullWidth
              //   variant="filled"
              //   type="text"
              //   label="Image"
              //   onBlur={handleBlur}
              //   onChange={handleImageChange}
              //   value={image}
              //   name="image"
              //   sx={{ gridColumn: "span 4" }}
              // />
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Update Task
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };
// export default TaskEditForm;
