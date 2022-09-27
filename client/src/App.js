import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/dashboard" element={<Dashboard/>} />

   </Routes>
   
   </>
  );
}

export default App;
