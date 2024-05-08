import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Project from "./scenes/project";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Payment from "./scenes/payment";
import Design from "./scenes/design";
import PaymentType from "./scenes/paymentType";
import Client from "./scenes/client";
import Invoice from "./scenes/invoice";
import PaymentMethod from "./scenes/paymentMethod";
import Employee from "./scenes/employee";
import User from "./scenes/user";
import Role from "./scenes/role";
import EmployeeForm from "./scenes/employee/form";
import DesignForm from "./scenes/design/form";
import ClientForm from "./scenes/client/form";
import CreateUser from "./scenes/user/create";
import CreatepaymentMethode from "./scenes/paymentMethod/create";
import UpdatepaymentMethode from "./scenes/paymentMethod/update/[id]";
 import CreateDesign from "./scenes/design/form";
import UpdateDesign from "./scenes/design/update/[id]";
import CreateRole from "./scenes/role/create";
import Createpy_type from "./scenes/paymentType/create";
import Updatepy_type from "./scenes/paymentType/update/[id]";
import UpdateRole from "./scenes/role/update/[id]";
import InvoiceForm from "./scenes/invoice/form";
import CreateProjects from "./scenes/project/form";
import CreatePayment from "./scenes/payment/create";

import EmployeeEdit from "./scenes/employee/edit/[id]";
import ClientEdit from "./scenes/client/edit/[id]";
import ProjectEdit from "./scenes/project/edit/[id]";
import PaymentMethodForm from "./scenes/paymentMethod/create";
import PayMethodEdit from "./scenes/paymentMethod/eidt/[id]";

import EditUser from "./scenes/user/edit/[id]";
import EditInvoice from "./scenes/invoice/edit/[id]";
// foof ciro tables================================;
import AllMaterail from "./scenes/material";
import MaterialForm from "./scenes/material/form";
import MaterialEditForm from "./scenes/material/edit/[id]";
import AllTask from "./scenes/task";
import TaskForm from "./scenes/task/form";
import TaskEditForm from "./scenes/task/edit/[id]";
import AllinvoicerReciept from "./scenes/invoiceReciept";
import ReciptForm from "./scenes/invoiceReciept/from";
import RecieptEditForm from "./scenes/invoiceReciept/edit/[id]";
import ClientDetailsView from "./scenes/client/details/[id]";
import ReceiptPage from "./scenes/invoiceReciept/reciept/[id]";
import ClientReport from "./scenes/Report/clientReport";
// import ProjectReport from "./scenes/Report/prReport";
// import ProjectReportByDate from "./scenes/Report/projectByDate";
import ProjectList from "./scenes/Report/projectReport";
import ProjecTDetail from "./scenes/Report/prReport/[id]";
import Profile from "./scenes/user/profile/[id]";
// import DetailProject from "./scenes/project/details/[id]";
// foof ciro tables================================;




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/project" element={<Project />} />
              <Route path="/project/form" element={<CreateProjects />} />
              <Route path="/project/edit/:id" element={<ProjectEdit />} />
              {/* <Route path="/project/details/:id" element={<DetailProject />} /> */}
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/create" element={<CreatePayment />} />
              <Route path="/design" element={<Design />} />
              <Route path="/design/form" element={<DesignForm />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/form"  element={<EmployeeForm />} />
              <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
              {/* <Route path="/task" element={<Task />} /> */}
              <Route path="/user" element={<User />} />
              <Route path="/user/create" element={<CreateUser />} />
              <Route path="/user/profile/:id" element={<Profile />} />
              <Route path="/paymentMethod/form" element={<CreatepaymentMethode />} />
              <Route path="/paymentMethod/update/:id" element={<UpdatepaymentMethode />} />
              <Route path="/role/create" element={<CreateRole />} />
              <Route path="/role/update/:id" element={<UpdateRole />} />
              <Route path="/paymentType/create" element={<Createpy_type />} />
              <Route path="/design/form" element={<CreateDesign />} />
              <Route path="/design/update/:id" element={<UpdateDesign />} />
              <Route path="/paymentType/update/:id" element={<Updatepy_type />} />
              <Route path="/user/edit/:id" element={<EditUser/>}/>
              {/* <Route path="/user/edit/:id" element={<EditUser />} /> */}
              <Route path="/role" element={<Role />} />
              <Route path="/Report" element={<ClientReport />} />
              <Route path="/Report/prReport/:id" element={<ProjecTDetail />} />
              <Route path="/Report/clientReport" element={<ClientReport />} />
              {/* <Route path="/Report/projectReport" element={<ProjectReportByDate />} /> */}
              <Route path="/Report/projectReport" element={<ProjectList />} />
              <Route path="/paymentMethod" element={<PaymentMethod />} />
              <Route path="/paymentMethod/create" element={<PaymentMethodForm />} />
              <Route path="/paymentMethod/edit/:id" element={<PayMethodEdit />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/invoice/form" element={<InvoiceForm />} />
              <Route path="/invoice/edit/:id" element={<EditInvoice />} />
              <Route path="/client" element={<Client />} />
              <Route path="/client/form" element={<ClientForm />} />
              <Route path="/client/edit/:id" element={<ClientEdit />} />
              <Route path="/client/details/:id" element={<ClientDetailsView />} />
              {/* <Route path="/client/view/:id" element={<ViewFileContents />} /> */}
              <Route path="/paymentType" element={<PaymentType />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
               {/* foof ciro tables================================; */}
              <Route path="/material" element={<AllMaterail />} />
              <Route path="/material/form" element={<MaterialForm/>} />
              <Route path="/material/edit/:id" element={<MaterialEditForm/>} />
              <Route path="/task" element={<AllTask />} />
              <Route path="/task/form" element={<TaskForm />} />
              <Route path="/task/edit/:id" element={<TaskEditForm />} />
              <Route path="/invoiceReciept" element={< AllinvoicerReciept/>} />
              <Route path="/invoiceReciept/from" element={< ReciptForm/>} />
              <Route path="/invoiceReciept/edit/:id" element={< RecieptEditForm/>} />
              <Route path="/invoiceReciept/reciept/:id" element={< ReceiptPage/>} />
              {/* foof ciro tables================================; */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
