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
  const [image, setImage] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/Tasks/detils/${taskId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch task details");
        }
        const data = await response.json();
        setSelectProject(data.project);
        setTaskname(data.task_name);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setStatus(data.status);
        setIssueDate(data.issue_date);
        setImage(data.task_image);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchProjects();
    fetchTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendForm = async () => {
    try {
      const formData = new FormData();
      formData.append('task_name', taskname);
      formData.append('project', selectproject);
      formData.append('task_image', image);
      formData.append('start_date', startDate);
      formData.append('end_date', endDate);
      formData.append('status', status);
      formData.append('issue_date', issueDate);
      // if (image) {
      //   formData.append('task_image', image);
      // }

      const res = await fetch(`http://127.0.0.1:8000/Tasks/update/${taskId}/`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      window.location.href = "/task";
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file.name);
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
                onChange={(e) => setSelectProject(e.target.value)}
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
                onChange={(e) => setTaskname(e.target.value)}
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
                onChange={(e) => setStartDate(e.target.value)}
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
                onChange={(e) => setEndDate(e.target.value)}
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
                onChange={(e) => setStatus(e.target.value)}
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
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Employee Image"
                accept="image/*"
                onBlur={handleBlur}
                onChange={handleImageChange}
                name="task_image"
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
//   const [task, setTask] = useState({
//     project: "",
//     task_name: "",
//     start_date: "",
//     end_date: "",
//     status: "",
//     issue_date: "",
//     task_image: null,
//   });
//   const [projects, setProjects] = useState([]);
//   const [imageFile, setImageFile] = useState(null); // State to hold the image file

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

//   const fetchTask = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/Tasks/detils/${taskId}/`);
//       if (response.ok) {
//         const data = await response.json();
//         setTask(data);
//       }
//     } catch (error) {
//       console.error("Error fetching task details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTask();
//     fetchProjects();
//   }, []);


//   const sendForm = async () => {
//     try {
//       const formData = new FormData();
//       for (const key in task) {
//         formData.append(key, task[key]);
//       }
//       // Append the image file if it exists
//       if (imageFile) {
//         formData.append("task_image", imageFile);
//       }

//       const res = await fetch(`http://127.0.0.1:8000/Tasks/update/${taskId}/`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (!res.ok) {
//         console.log(`Request failed with status ${res.status}`);
//         return;
//       }

//       console.log("Task updated successfully!");
//       window.location.href = "/task";
//     } catch (error) {
//       console.error("Error sending form:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTask({ ...task, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file); // Set the image file in the state
//     setTask({ ...task, task_image: file }); // Update the task with the image file
//   };

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
//                 onChange={handleInputChange}
//                 value={task.project}
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
//                 onChange={handleInputChange}
//                 value={task.task_name}
//                 name="task_name"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Start Date"
//                 onBlur={handleBlur}
//                 onChange={handleInputChange}
//                 value={task.start_date}
//                 name="start_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="End Date"
//                 onBlur={handleBlur}
//                 onChange={handleInputChange}
//                 value={task.end_date}
//                 name="end_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Status"
//                 onBlur={handleBlur}
//                 onChange={handleInputChange}
//                 value={task.status}
//                 name="status"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Issue Date"
//                 onBlur={handleBlur}
//                 onChange={handleInputChange}
//                 value={task.issue_date}
//                 name="issue_date"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Image"
//                 accept="image/*"
//                 onBlur={handleBlur}
//                 onChange={handleImageChange}
//                 value={task.task_image} 
//                 sx={{ gridColumn: "span 4" }}
//               />
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
