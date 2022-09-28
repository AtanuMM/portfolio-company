import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ProjectRegistration from "./components/Add_Data";



function App() {
  return (
   <>
      <Navbar /> 
   <Routes>
    <Route path="/" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/addData" element={<ProjectRegistration/>} />

   </Routes>
   
   </>
  );
}

export default App;
