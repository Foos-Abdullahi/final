// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField } from '@mui/material';
// import { Formik } from 'formik';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Header from '../../../../components/Header';

// const ViewFileContents = ({ file }) => {
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

//   useEffect(() => {
//     if (file) {
//       readFileContents();
//     }
//   }, [file]);

//   const readFileContents = () => {
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const contents = event.target.result;
//       setFileContents(contents);
//     };

//     reader.readAsText(file);
//   };

//   return (
//     <div>
//     <h1>{client.client_name}</h1>
//     <p>Phone: {client.phone}</p>
//     <p>Issue Date: {client.issue_date}</p>
//     <h2>File Contents</h2>
//     <pre>{fileContents.name}</pre>
//   </div>
//   );
// };

// export default ViewFileContents;


