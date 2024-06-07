import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReportIcon from "@mui/icons-material/Report";
import DesignServicesOutlined from "@mui/icons-material/DesignServicesOutlined";
import ProjectIcon from "@mui/icons-material/Engineering";
import MaterialIcon from "@mui/icons-material/WorkOutline";
import ClientIcon from "@mui/icons-material/PeopleAltOutlined";
import InvoiceReceiptIcon from "@mui/icons-material/ReceiptOutlined";
import PaymentIcon from "@mui/icons-material/MonetizationOnOutlined";
import PaymentMethodIcon from "@mui/icons-material/PaymentOutlined";
import PaymentTypeIcon from "@mui/icons-material/LocalAtmOutlined";
import DesignIcon from "@mui/icons-material/DesignServicesOutlined";
import TaskIcon from "@mui/icons-material/AssignmentOutlined";
import EmployeeIcon from "@mui/icons-material/PersonOutline";
import UserIcon from "@mui/icons-material/PersonOutline";
import RoleIcon from "@mui/icons-material/SupervisedUserCircleOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const [employees, setEmployees] = useState("");
  const [Username, setUsername] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  useEffect(() => {
    // Retrieve user role from session storage
    const storedRole = window.sessionStorage.getItem("UserRole");
    const EmpImage=window.sessionStorage.getItem('EmployeeImage')
    const username=window.sessionStorage.getItem('UserName')
    setUsername(username);
    setUserRole(storedRole);
    setEmployees(EmpImage);
  }, []);
  return (
    <Box
    sx={{
      "& .pro-sidebar-inner": {
          position:'fixed',
          width:'270px',
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  // src={`../../assets/user.png`}
                  src={`../../assets/employee/${employees}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* Ed Roh */}
                  {Username} 
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {/* VP Fancy Admin */}
                  {userRole}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
        {userRole === "Admin" && (
          <>
          <Item
            title="Dashboard"
            to="/Dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {/* <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
             {/* Add icons for other titles */}
             <Item
              title="Service"
              to="/service/form"
              icon={<DesignServicesOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Project"
              to="/project"
              icon={<ProjectIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Material"
              to="/material"
              icon={<MaterialIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Client"
              to="/client"
              icon={<ClientIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Invoice Receipt"
              to="/invoiceReciept"
              icon={<InvoiceReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             {/* <Item
              title="Invoice"
              to="/invoice"
              icon={<InvoiceIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
             <Item
              title="Expense"
              to="/payment"
              icon={<PaymentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Payment Method"
              to="/paymentMethod"
              icon={<PaymentMethodIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Payment Type"
              to="/paymentType"
              icon={<PaymentTypeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Design"
              to="/design"
              icon={<DesignIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Task"
              to="/task"
              icon={<TaskIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Employee"
              to="/employee"
              icon={<EmployeeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="User"
              to="/user"
              icon={<UserIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Role"
              to="/role"
              icon={<RoleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Create a submenu for Report */}
            <SubMenu
              title="Report"
              icon={<ReportIcon />}
            >
              <MenuItem>
                <Typography>Client Report</Typography>
                <Link to="/Report/clientReport" />
              </MenuItem>
              <MenuItem>
                <Typography>Project Report</Typography>
                <Link to="/Report/projectReport" />
              </MenuItem>
              {/* <MenuItem>
                <Typography>Project by Date</Typography>
                <Link to="/Report/projectByDate" />
              </MenuItem> */}
            </SubMenu>
            </>
            )}
             {userRole === 'project_manager' &&(<>
              <Item
              title="Project"
              to="/project"
              icon={<ProjectIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Material"
              to="/material"
              icon={<MaterialIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                         <Item
              title="Task"
              to="/task"
              icon={<TaskIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Project Report"
              to="/Report/projectReport"
              icon={<ReportIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             </>)}
            {userRole === 'Cashier' &&(
              <>
                  <Item
                  title="Invoice Receipt"
                  to="/invoiceReciept"
                  icon={<InvoiceReceiptIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* <Item
                  title="Invoice"
                  to="/invoice"
                  icon={<InvoiceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
                <Item
                  title="Expense"
                  to="/payment"
                  icon={<PaymentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Payment Method"
                  to="/paymentMethod"
                  icon={<PaymentMethodIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Payment Type"
                  to="/paymentType"
                  icon={<PaymentTypeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
