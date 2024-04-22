// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField } from '@mui/material';
// import { Formik } from 'formik';
// import useMediaQuery from '@mui/material/useMediaQuery';
// // import Header from '../../../../components/Header';

// const ViewFileContents = ({ file }) => {
//     alert("fooss")
//   const [fileContents, setFileContents] = useState("");
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     const fetchClient = async () => {
//       try {
//         const path = window.location.pathname;
//         const id = path.substring(path.lastIndexOf('/') + 1);
//         const response = await fetch(`http://localhost:8000/Client/view/${id}/`);
//         if (!response.ok) {
//           console.log('No data');
//           return;
//         }
//         const data = await response.json();
//         setClient(data);
//         setFileContents(data.document); 
//         console.log('Data:', data);
//       } catch (error) {
//         console.error('Error fetching client:', error);
//       }
//     };

//     fetchClient();
//   }, []);

//   if (!client) {
//     return <div>Loading...</div>;
//   }

// //   useEffect(() => {
// //     if (file) {
// //       readFileContents();
// //     }
// //   }, [file]);

// //   const readFileContents = () => {
// //     const reader = new FileReader();

// //     reader.onload = (event) => {
// //       const contents = event.target.result;
// //       setFileContents(contents);
// //     };

// //     reader.readAsText(file);
// //   };

//   return (
//     <div>
//     <h1>{client.client_name}</h1>
//     <p>Phone: {client.phone}</p>
//     <p>Issue Date: {client.issue_date}</p>
//     <h2>File Contents</h2>
//     <pre>{fileContents}</pre>
//   </div>
//   );
// };

// export default ViewFileContents;














import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const ClientDetailsView = () => {
  const { id } = useParams();
  const [clientDetails, setClientDetails] = useState(null);
  const [fileContents, setFileContents] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const fetchClientDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Client/view/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch client details");
      }
      const data = await response.json();
      setClientDetails(data);
      // Set the file name to be used to fetch the file content
      setFileName(data.document);
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  };

  useEffect(() => {
    if (fileName) {
      fetchFileContents();
    }
  }, [fileName]);

  const fetchFileContents = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/files/${fileName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch file contents");
      }
      const fileBlob = await response.blob();
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContents(event.target.result);
      };
      reader.readAsText(fileBlob);
    } catch (error) {
      console.error("Error fetching file contents:", error);
    }
  };

  if (!clientDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Client Details
      </Typography>
      <Typography variant="h6">Name: {clientDetails.client_name}</Typography>
      <Typography variant="body1">Phone Number: {clientDetails.phone}</Typography>
      <Typography variant="body1">Issue Date: {clientDetails.issue_date}</Typography>
      <Typography variant="body1">File Contents:</Typography>
      <pre>{fileContents}</pre>
    </Box>
  );
};

export default ClientDetailsView;


