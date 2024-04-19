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
<<<<<<< HEAD
import EmployeeEdit from "./scenes/employee/edit/[id]";
import ClientEdit from "./scenes/client/edit/[id]";
import ProjectEdit from "./scenes/project/edit/[id]";
import PaymentMethodForm from "./scenes/paymentMethod/create";
import PayMethodEdit from "./scenes/paymentMethod/eidt/[id]";


// ...

=======
<<<<<<< HEAD
=======
import EditUser from "./scenes/user/edit/[id]";
import EditInvoice from "./scenes/invoice/edit/[id]";
// import EditUser from "./scenes/user/edit/[id]";
import MaterialForm from "./scenes/material/form";
import MaterialEditForm from "./scenes/material/edit/[id]";
import AllTask from "./scenes/task";
import TaskEditForm from "./scenes/task/edit/[id]";
import AllMaterail from "./scenes/material";
import TaskForm from "./scenes/task/form";
import AllinvoicerReciept from "./scenes/invoiceReciept";
import ReciptForm from "./scenes/invoiceReciept/from";
import RecieptEditForm from "./scenes/invoiceReciept/edit/[id]";
>>>>>>> c8f65bf1d4347f06bfb23ee0c06da6653a8c0399
>>>>>>> f43842c53a36c8531c9d3781693b6f82ded91fc0



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
<<<<<<< HEAD
              <Route path="/project/edit/:id" element={<ProjectEdit />} />
              <Route path="/material" element={<Material />} />
=======
              <Route path="/material" element={<AllMaterail />} />
              <Route path="/material/form" element={<MaterialForm/>} />
              <Route path="/material/edit/:id" element={<MaterialEditForm/>} />
>>>>>>> f43842c53a36c8531c9d3781693b6f82ded91fc0
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/create" element={<CreatePayment />} />
              <Route path="/design" element={<Design />} />
              <Route path="/design/form" element={<DesignForm />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/form"  element={<EmployeeForm />} />
<<<<<<< HEAD
              <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
              <Route path="/task" element={<Task />} />
=======
              <Route path="/task" element={<AllTask />} />
              <Route path="/task/form" element={<TaskForm />} />
              <Route path="/task/edit/:id" element={<TaskEditForm />} />
>>>>>>> f43842c53a36c8531c9d3781693b6f82ded91fc0
              <Route path="/user" element={<User />} />
              <Route path="/user/create" element={<CreateUser />} />
<<<<<<< HEAD
              <Route path="/paymentMethod/form" element={<CreatepaymentMethode />} />
              <Route path="/paymentMethod/update/:id" element={<UpdatepaymentMethode />} />
              <Route path="/role/create" element={<CreateRole />} />
              <Route path="/role/update/:id" element={<UpdateRole />} />
              <Route path="/paymentType/create" element={<Createpy_type />} />
              <Route path="/design/form" element={<CreateDesign />} />
              <Route path="/design/update/:id" element={<UpdateDesign />} />
              <Route path="/paymentType/update/:id" element={<Updatepy_type />} />
=======
              <Route path="/user/edit/:id" element={<EditUser/>}/>
              {/* <Route path="/user/edit/:id" element={<EditUser />} /> */}
>>>>>>> c8f65bf1d4347f06bfb23ee0c06da6653a8c0399
              <Route path="/role" element={<Role />} />
              <Route path="/paymentMethod" element={<PaymentMethod />} />
<<<<<<< HEAD
              <Route path="/paymentMethod/create" element={<PaymentMethodForm />} />
              <Route path="/paymentMethod/edit/:id" element={<PayMethodEdit />} />
              <Route path="/invoiceReciept" element={<InvoiceReciept />} />
=======
              <Route path="/invoiceReciept" element={< AllinvoicerReciept/>} />
              <Route path="/invoiceReciept/from" element={< ReciptForm/>} />
              <Route path="/invoiceReciept/edit/:id" element={< RecieptEditForm/>} />
>>>>>>> f43842c53a36c8531c9d3781693b6f82ded91fc0
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/invoice/form" element={<InvoiceForm />} />
              <Route path="/invoice/edit/:id" element={<EditInvoice />} />
              <Route path="/client" element={<Client />} />
              <Route path="/client/form" element={<ClientForm />} />
              <Route path="/client/edit/:id" element={<ClientEdit />} />
              <Route path="/paymentType" element={<PaymentType />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
