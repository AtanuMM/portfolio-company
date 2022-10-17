import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ProjectRegistration from "./components/Add_Data";
import ViewProjects from "./components/View_Data";
import EditProject from "./components/EditProject";
import Details from './components/Details';
//import './App.css'





function App() {
  return (
   <>

   <Routes>
    <Route path="/" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/dashboard"  element={<Dashboard/>} /> 
    <Route path="/addData" element={<ProjectRegistration/>} />
    <Route path="/edit/:id" element={<EditProject/>} />
    <Route path="/viewData" element={<ViewProjects/>} />
    <Route path="/view/:id" element={<Details />} />


   </Routes>
   
   </>

  //  <>
  //     <Routes>
  //       <Route exact path="/login">
  //         <Login/>
  //       </Route>
  //       <Route path="/">
  //         <Register/>
  //       </Route>
        // <Route path="/dashboard">
        //   <Navbar/>
        //   <Dashboard/>
        // </Route>
  //       <Route exact path="/addData">
  //         <ProjectRegistration/>
  //       </Route>
  //       </Routes>
  //   </>
  );
}

export default App;
