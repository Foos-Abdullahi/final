import { Box, Button,useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useEffect, useState } from "react";

const Dashboard = () => {
 const [totalClient, setTotalClient] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [totalFinishedProjects, setTotalFinishedProjects] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const selectClient=((totalClient/3))+((totalClient/3))
  const ClientPercentage=((selectClient/totalClient)*100).toFixed(2)
   const EmpPercentage=(2/totalEmployee*100).toFixed(2)
  useEffect(() => {
    // Fetch client data from your backend API
    const fetchClinet = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/Client/");
        if (!response.ok) {
          throw new Error("Failed to fetch Clinet data");
        }
        const data = await response.json();
        // Set the total number of client
        setTotalClient(data.length);
      } catch (error) {
        console.error("Error fetching Clinet data:", error);
      }
    };
        // Fetch employee data from your backend API
    const fetchEmployee = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/Employee/");
        if (!response.ok) {
          throw new Error("Failed to fetch Clinet data");
        }
        const Empdata = await response.json();
        // Set the total number of employees
        setTotalEmployee(Empdata.length);
      } catch (error) {
        console.error("Error fetching Clinet data:", error);
      }
    };
    const fetchPaymentMethod = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/invoice_reciept/");
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        // Calculate the total Amout
        const invoiceData = await response.json();
            const totalAmount = invoiceData
              .reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
            setTotalPayment(totalAmount);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
        // Fetch project data from your backend API
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/Projects/");
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        const finishedProjects = data.filter(project => project.status === "finish");
                // Set the total number of project finished
        setTotalFinishedProjects(finishedProjects.length);
        // const finishedProjectIds = finishedProjects.map(project => project.id);
    // Fetch invoice reciept data from your backend API
        // const fetchPaymentMethod = async () => {
        //   try {
        //     const response = await fetch("http://127.0.0.1:8000/invoice_reciept/");
        //     if (!response.ok) {
        //       throw new Error("Failed to fetch payment data");
        //     }
        //     const invoiceData = await response.json();
        //             // Set the total amount of invoice reciept
        //     const totalAmount = invoiceData.filter(invoice => finishedProjectIds.includes(invoice.project))
        //       .reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
        //     setTotalPayment(totalAmount);
        //   } catch (error) {
        //     console.error("Error fetching payment data:", error);
        //   }
        // };
        // fetchPaymentMethod();
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchClinet();
    fetchEmployee();
    fetchPaymentMethod();
    fetchProjects()
    const storedRole = window.sessionStorage.getItem("UserRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
    return () => {
      setUserRole("");
    };
  }, []);
  return (<>
    {userRole === 'Admin' &&(<>
      
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
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
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPayment.toFixed(2)}
            subtitle="All Amounts"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalEmployee}`}
            subtitle="All Employee"
            progress={`${EmpPercentage/100}`}
            increase={`+ ${EmpPercentage} %`}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalClient}`}
            subtitle="New clients"
            progress={ClientPercentage/100}
            increase={`+ ${ClientPercentage} %`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalFinishedProjects}
            subtitle="All Projects"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
      </>)}</>
  );
};

export default Dashboard;








    // const fetchPaymentMethod = async () => {
    //   try {
    //     const response = await fetch("http://127.0.0.1:8000/invoice_reciept/");
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch project data");
    //     }
    //     // Calculate the total Amout
    //     const invoiceData = await response.json();
    //         const totalAmount = invoiceData
    //           .reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
    //         setTotalPayment(totalAmount);
    //   } catch (error) {
    //     console.error("Error fetching project data:", error);
    //   }
    // };