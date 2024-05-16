// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField } from '@mui/material';
// import { Formik } from 'formik';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Header from '../../../../components/Header';

// const RoleEdit = () => {
//   const isNonMobile = useMediaQuery('(min-width:600px)');

//   const [RoleData, setRoleData] = useState({});
//   const [originalData, setOriginalData] = useState({});
//   const [editRoleId, seteditRoleId] = useState('');
//   const [RoleName, setRole_name] = useState("");
//   const [issueDate, setIssueDate] = useState("");

//   useEffect(() => {
//     const fetchPaymentType = async () => {
//       try {
//         const path = window.location.pathname;
//         const id = path.substring(path.lastIndexOf('/') + 1);
//         const response = await fetch(`http://127.0.0.1:8000/Role/view/${id}/`);
//         if (!response.ok) {
//           console.log('No data');
//           return;
//         }
//         const data = await response.json();
//         setRoleData(data);
//         setOriginalData(data);
//         seteditRoleId(id)
//         console.log('Data:', data);
//       } catch (error) {
//         console.error('Error fetching payment type:', error);
//       }
//     };

//     fetchPaymentType();
//   }, []);
  
//   const updatePaymentType = async () => {
//     alert(editRoleId)
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/Role/update/${editRoleId}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           Role_name: RoleName || originalData.Role_name,
//           issue_date: issueDate || originalData.issue_date,
//         }),
//       });
//       console.log(RoleName || originalData.Role_name);
//       console.log(issueDate || originalData.issue_date);
//       if (response.ok) {
//         console.log('Payment type updated successfully');
//         window.history.back();
//       } else {
//         console.error('Failed to update payment type');
//         alert('Failed to update the payment type. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error updating payment type:', error);
//       alert('Error updating the payment type. Please try again.');
//     }
//   };

//   const handleFormSubmit = (values) => {
//     setRoleData(values);
//     updatePaymentType();
//   };

//   return (
//     <Box m="20px">
//       <Header title="EDIT ROLE" subtitle="Edit an Existing Role" />

//       <Formik onSubmit={handleFormSubmit} initialValues={RoleData}>
//         {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
//           <form onSubmit={handleSubmit}>
//             <div>
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Role"
//                 onBlur={handleBlur}
//                 onChange={(e) => setRole_name(e.target.value)}
//                 value={RoleName || originalData.Role_name}
//                 name="Role_name"
//                 error={touched.Role_name && !!errors.Role_name}
//                 helperText={touched.Role_name && errors.Role_name}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="date"
//                 label="Issue Date"
//                 onBlur={handleBlur}
//                 onChange={(e) => setIssueDate(e.target.value)}
//                 value={issueDate || originalData.issue_date}
//                 name="issue_date"
//                 error={touched.issue_date && !!errors.issue_date}
//                 helperText={touched.issue_date && errors.issue_date}
//               />
//             </div>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Update Payment_type
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default RoleEdit;





import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

const RoleEdit = () => {

  const url = window.location.pathname;
  const roleId = url.split("/").pop(); 
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [roles, setRoles] = useState({
    Role_name:"",
    issue_date: ""
  });

  const fetchRole = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Role/view/${roleId}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch task details");
      }
      const data = await response.json();
      console.log("Fetched task data:", data);
      setRoles({
        Role_name:data.Role_name,
        issue_date: data.issue_date,
      });
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };
  useEffect(() => {
    fetchRole();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendForm = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/Role/update/${roleId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roles),
      });

      if (!res.ok) {
        console.log(`Request failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      window.history.back();
      // Reload data from the server after successful form submission
      fetchRole();
    } catch (error) {
      console.error("Error sending form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoles({ ...roles, [name]: value });
  };

  return (
    <Box m="20px">
      <Header title="EDIT Role" subtitle="Edit Role Details" />

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
                fullWidth
                variant="filled"
                type="text"
                label="Role Name"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={roles.Role_name}
                name="Role_name"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Issue Date"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={roles.issue_date}
                name="issue_date"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update role
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default RoleEdit;
