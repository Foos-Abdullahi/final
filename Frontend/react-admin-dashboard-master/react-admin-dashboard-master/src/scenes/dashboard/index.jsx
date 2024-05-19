// import { Box, Button,selectClasses,useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// // import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import Header from "../../components/Header";
// // import LineChart from "../../components/LineChart";
// // import GeographyChart from "../../components/GeographyChart";
// // import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// // import ProgressCircle from "../../components/ProgressCircle";
// import { useEffect, useState } from "react";

// const Dashboard = () => {
//   const [totalClient, setTotalClient] = useState(0);
//   const [totalEmployee, setTotalEmployee] = useState(0);
//   const [userRole, setUserRole] = useState("");

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [projects, setProjects] = useState([]);
//   const [totalProjects, setTotalProjects] = useState(0);
//   const [totalBudget, setTotalBudget] = useState(0);
//   const selectClient=((totalClient/3))+((totalClient/3))
//   const ClientPercentage=((selectClient/totalClient)*100).toFixed(2)
//    const EmpPercentage=(2/totalEmployee*100).toFixed(2)
//   useEffect(() => {
//     // Fetch employee data from your backend API
//     const fetchClinet = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/Client/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch Clinet data");
//         }
//         const data = await response.json();
//         // Set the total number of employees
//         setTotalClient(data.length);
//       } catch (error) {
//         console.error("Error fetching Clinet data:", error);
//       }
//     };
//     const fetchEmployee = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/Employee/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch Clinet data");
//         }
//         const Empdata = await response.json();
//         // Set the total number of employees
//         setTotalEmployee(Empdata.length);
//       } catch (error) {
//         console.error("Error fetching Clinet data:", error);
//       }
//     };
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/Projects/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch project data");
//         }
//         const projectData = await response.json();
//         setProjects(projectData);
//         setTotalProjects(projectData.length);
  
//         // Calculate the total budget
//         const totalBudget = projectData.reduce((sum, project) => sum + project.budget, 0);
//         setTotalBudget(totalBudget);
  
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//       }
//     };
//     fetchClinet();
//     fetchEmployee();
//     fetchProjects()
//     const storedRole = window.sessionStorage.getItem("UserRole");
//     if (storedRole) {
//       setUserRole(storedRole);
//     }
//     return () => {
//       setUserRole("");
//     };
//   }, []);
//   return (<>
//     {userRole === 'Admin' &&(<>
      
//     <Box m="20px">
//       {/* HEADER */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

//         <Box>
//           <Button
//             sx={{
//               backgroundColor: colors.blueAccent[700],
//               color: colors.grey[100],
//               fontSize: "14px",
//               fontWeight: "bold",
//               padding: "10px 20px",
//             }}
//           >
//             <DownloadOutlinedIcon sx={{ mr: "10px" }} />
//             Download Reports
//           </Button>
//         </Box>
//       </Box>

//       {/* GRID & CHARTS */}
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >
//         {/* ROW 1 */}
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={totalBudget.toFixed(2)}
//             subtitle="All budgets"
//             progress="0.75"
//             increase="+14%"
//             icon={
//               <EmailIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={`${totalEmployee}`}
//             subtitle="All Employee"
//             progress={`${EmpPercentage/100}`}
//             increase={`+ ${EmpPercentage/100} %`}
//             icon={
//               <PointOfSaleIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={`${totalClient}`}
//             subtitle="New clients"
//             progress={ClientPercentage/100}
//             increase={`+ ${ClientPercentage} %`}
//             icon={
//               <PersonAddIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <StatBox
//             title={totalProjects}
//             subtitle="All Projects"
//             progress="0.80"
//             increase="+43%"
//             icon={
//               <TrafficIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>

//         {/* ROW 2 */}
//         {/* <Box
//           gridColumn="span 8"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Box
//             mt="25px"
//             p="0 30px"
//             display="flex "
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box>
//               <Typography
//                 variant="h5"
//                 fontWeight="600"
//                 color={colors.grey[100]}
//               >
//                 Revenue Generated
//               </Typography>
//               <Typography
//                 variant="h3"
//                 fontWeight="bold"
//                 color={colors.greenAccent[500]}
//               >
//                 $59,342.32
//               </Typography>
//             </Box>
//             <Box>
//               <IconButton>
//                 <DownloadOutlinedIcon
//                   sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
//                 />
//               </IconButton>
//             </Box>
//           </Box>
//           <Box height="250px" m="-20px 0 0 0">
//             <LineChart isDashboard={true} />
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           overflow="auto"
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             borderBottom={`4px solid ${colors.primary[500]}`}
//             colors={colors.grey[100]}
//             p="15px"
//           >
//             <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
//               Recent Transactions
//             </Typography>
//           </Box>
//           {mockTransactions.map((transaction, i) => (
//             <Box
//               key={`${transaction.txId}-${i}`}
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               borderBottom={`4px solid ${colors.primary[500]}`}
//               p="15px"
//             >
//               <Box>
//                 <Typography
//                   color={colors.greenAccent[500]}
//                   variant="h5"
//                   fontWeight="600"
//                 >
//                   {transaction.txId}
//                 </Typography>
//                 <Typography color={colors.grey[100]}>
//                   {transaction.user}
//                 </Typography>
//               </Box>
//               <Box color={colors.grey[100]}>{transaction.date}</Box>
//               <Box
//                 backgroundColor={colors.greenAccent[500]}
//                 p="5px 10px"
//                 borderRadius="4px"
//               >
//                 ${transaction.cost}
//               </Box>
//             </Box>
//           ))}
//         </Box> */}

//         {/* ROW 3 */}
//         {/* <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           p="30px"
//         >
//           <Typography variant="h5" fontWeight="600">
//             Campaign
//           </Typography>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             mt="25px"
//           >
//             <ProgressCircle size="125" />
//             <Typography
//               variant="h5"
//               color={colors.greenAccent[500]}
//               sx={{ mt: "15px" }}
//             >
//               $48,352 revenue generated
//             </Typography>
//             <Typography>Includes extra misc expenditures and costs</Typography>
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ padding: "30px 30px 0 30px" }}
//           >
//             Sales Quantity
//           </Typography>
//           <Box height="250px" mt="-20px">
//             <BarChart isDashboard={true} />
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           padding="30px"
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ marginBottom: "15px" }}
//           >
//             Geography Based Traffic
//           </Typography>
//           <Box height="200px">
//             <GeographyChart isDashboard={true} />
//           </Box>
//         </Box> */}
//       </Box>
//     </Box>
//       </>)}</>
//   );
// };

// export default Dashboard;














import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useEffect, useState } from "react";
import { Payments, People } from "@mui/icons-material";

const Dashboard = () => {
  const [totalClient, setTotalClient] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [userRole, setUserRole] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const calculateClientPercentage = (clients) => ((clients / 3) * 2 / clients * 100).toFixed(2);
  const calculateEmployeePercentage = (employees) => ((employees / 3) *2/ employees * 100).toFixed(2);

  const fetchData = async (url, setState, calculateTotal) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const data = await response.json();
      if (calculateTotal) {
        const totalAmount = data.reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
        setState(totalAmount);
      } else {
        setState(data.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("http://127.0.0.1:8000/Client/", setTotalClient);
    fetchData("http://127.0.0.1:8000/Employee/", setTotalEmployee);
    fetchData("http://127.0.0.1:8000/Projects/", setTotalProjects);
    fetchData("http://127.0.0.1:8000/invoice_reciept/", setTotalPayment, true);
    const storedRole = window.sessionStorage.getItem("UserRole");
    if (storedRole) setUserRole(storedRole);

    return () => setUserRole("");
  }, []);

  const clientPercentage = calculateClientPercentage(totalClient);
  const empPercentage = calculateEmployeePercentage(totalEmployee);

  return (
    <>
      {userRole === 'Admin' && (
        <Box m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Download Reports
              </Button>
            </Box>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
              <StatBox
                title={`$${totalPayment.toFixed(2)}`}
                subtitle="All Payment Amount"
                progress="0.75"
                increase="+14%"
                icon={<Payments sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>
            <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
              <StatBox
                title={`${totalEmployee}`}
                subtitle="All Employees"
                progress={empPercentage / 100}
                increase={`+${empPercentage}%`}
                icon={<People sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>
            <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
              <StatBox
                title={`${totalClient}`}
                subtitle="New clients"
                progress={clientPercentage / 100}
                increase={`+${clientPercentage}%`}
                icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>
            <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
              <StatBox
                title={totalProjects}
                subtitle="All Projects"
                progress="0.80"
                increase="+43%"
                icon={<DomainAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
