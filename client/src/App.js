import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import ProjectRegistration from "./components/AddProject/ProjectRegistration";
import ViewProjects from "./components/AddProject/ViewProjects";


function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  const history = useNavigate();

 


  return (
    <>
      
          <>
            {/* <Header /> */}

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/projectregistration" element={<ProjectRegistration />} />
              <Route path="/viewproj" element={<ViewProjects />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>

      

    </>
  );
}

export default App;
