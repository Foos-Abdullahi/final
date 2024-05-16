import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';
import App from "../Dashboard/App";

function DLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [checkingLogin, setCheckingLogin] = useState(true); // Add state to track if login status is being checked
  
    useEffect(() => {
      const loggedIn = sessionStorage.getItem("isLoggedIn");
      if (loggedIn === "true") {
        setIsLoggedIn(true);
      }
      // Set checkingLogin to false after checking login status
      setCheckingLogin(false);
    }, []);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:8000/user/");
          const rolesResponse = await fetch("http://127.0.0.1:8000/Role/");
          const roledata = await rolesResponse.json();
          console.log("roles", roledata);
          
          const employeeResponse = await fetch("http://127.0.0.1:8000/Employee/");
          const employeedata = await employeeResponse.json();
          console.log("roles", employeedata);
          const data = await response.json();
          console.log('user :', data);
    
          for (let i = 0; i < data.length; i++) {
            if (username === data[i].UserName && password === data[i].Password) {
              console.log('this is id:', data[i].id);
              const roleName = roledata.find(role => role.id === data[i].role_id)?.Role_name;
              const employeeName = employeedata.find(employee => employee.id === data[i].employee_id)?.employee_name;
              const employeeImage = employeedata.find(employee => employee.id === data[i].employee_id)?.employee_Image;
              sessionStorage.setItem('userid', data[i].id)
              sessionStorage.setItem('UserName', data[i].UserName)
              sessionStorage.setItem('UserRole', roleName)
              sessionStorage.setItem('EmployeeName', employeeName)
              sessionStorage.setItem('EmployeeImage', employeeImage)
              setIsLoggedIn(true);
              sessionStorage.setItem("isLoggedIn", "true");
              return window.history.push("/dashboard");;
            }
          }
          setError("Invalid username or password");
          setLoading(false);
        } catch (error) {
          console.error('Error during login:', error);
          setError(error.message || 'Error occurred during login');
          setLoading(false);
        }
      };
    if (checkingLogin) {
      // While checking login status, render nothing or a loading spinner
      return null;
    }
  
    if (isLoggedIn) {
      return <App/>;
    }
  
  //   if (showForgotPassword) {
  //     return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;
  //   }

  return (
    <MDBContainer fluid>
      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

      {/* <div className="p-5 bg-image" style={{backgroundImage: 'url(./assets/design/baluug.webp)', backgroundRepeat:'no-repeat', height: '700px',width:'100%'}}></div> */}
      
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', maxWidth: '700px', position:'relative', left:'22%',background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-1 text-center' style={{maxWidth:'60%' , position: 'relative',left:'20%' }}>
            <img src="./assets/employee/city logo.png" alt="city Logo Image" srcset="" />
          <h2 className="fw-bold mb-2">Welcome Back</h2>
          <h4 className="fw-bold mb-3" style={{color: '#70d8bd' }}>Best place That Can Build your Dream house</h4>
          <h2 className="fw-bold mb-5">Login Page</h2>
          <MDBInput wrapperClass='mb-4' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id='form1' type='password'/>
          {error && <p className="text-danger">{error}</p>}
          {/* <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
          </div> */}
          <MDBBtn className='w-100 mb-4' size='md' style={{ backgroundColor: '#70d8bd', color: '#fff' }} onClick={handleLogin}>{loading ? "Logging in..." : "Login"}</MDBBtn>
          {/* <div className="text-center">
            <p>or sign up with:</p>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='facebook-f' size="sm"/>
            </MDBBtn>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='twitter' size="sm"/>
            </MDBBtn>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='google' size="sm"/>
            </MDBBtn>
            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='github' size="sm"/>
            </MDBBtn>
          </div> */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default DLogin;
