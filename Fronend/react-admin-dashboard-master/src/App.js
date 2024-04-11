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
import Material from './scenes/material'
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
import InvoiceReciept from "./scenes/invoiceReciept";
import PaymentMethod from "./scenes/paymentMethod";
import Employee from "./scenes/employee";
import Task from "./scenes/task";
import User from "./scenes/user";
import Role from "./scenes/role";


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
              <Route path="/material" element={<Material />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/design" element={<Design />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/task" element={<Task />} />
              <Route path="/user" element={<User />} />
              <Route path="/role" element={<Role />} />
              <Route path="/paymentMethod" element={<PaymentMethod />} />
              <Route path="/invoiceReciept" element={<InvoiceReciept />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/client" element={<Client />} />
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
