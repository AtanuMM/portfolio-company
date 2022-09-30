import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, TextField, MenuItem } from '@mui/material';
import { LoginContext } from '../components/Context';
import { useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import jwt_decode from "jwt-decode"; 


const CategoryList = ({ list }) => {

  return <>
    {
      list
      &&
      <ul>
        {list.map((item,index)=>(
        <li key={index}>{item}</li>
        ))}
      </ul>
    }
  </>
}


const ViewProjects = () => {
  const [getuserdata, setUserData] = useState([]);
  const { logindata, setLoginData } = useContext(LoginContext);
  //console.log(getuserdata);
  const history = useNavigate("");
  const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]); 
    // useEffect(() => {
    //     refreshToken();
        
    // }, []);

  //gateway of token
  const refreshToken = async () => {
    try {
        const response = await axios.get('http://localhost:5005/token');
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
    } catch (error) {
        if (error.response) {
            history("/dashboard")
        }
    }
}

  const getdata = async () => {
    const res = await axios("http://localhost:5005/content/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    console.log(res.data.data)
    // const data = res.data.data;
    // console.log(data);
    setUserData(res.data.data)
    console.log(setUserData,`line 59`);
    // JSON.stringify
    // return <div>{JSON.stringify(data)}</div>;

    // if (!data) {
    //   console.log("error");
    // } else {
    //   setUserData(data)
    //   console.log(setUserData,`line 59`);
    // }
  }



  useEffect(() => {
    refreshToken();
    getdata();
  }, [])

  const showData = () =>{
    console.log(getuserdata,`line 82`)
  }
  const deleteuser = async (id) => {

    const resdel = await fetch(`http://localhost:5005/content/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const delData = await resdel.json();
    console.log(delData);

    if (resdel.status === 400 || !delData) {
      console.log("Error");
    } else {
      console.log("user deleted");
      getdata()
    }
  }


  return (
    <div>

      <div className='container'>
        <NavLink to='/dashboard'><button className='btn btn-info mt-5'>Go To Dashbord</button></NavLink>
      </div>
      <div className='mt-5'>
        <div className='container'>

          {/* <section className="main-banner" id="top" data-section="section1">
            <div className="video-overlay header-text">
              <div className="caption">
                <h2><em></em>Project Listing</h2>
                <div className='add_btn mt-2 mb-2'>
                  <NavLink to="/register" className='btn btn-warning'>Add User</NavLink>
                </div>
              </div>
            </div>
          </section> */}

          <table class="table table-bordered">
            <thead>
              <tr className=''>
                <th scope="col">Id</th>
                {/* <th scope="col">Author Name</th> */}
                <th scope="col">category</th>
                <th scope="col">Industry</th>
                <th scope="col">Project Name</th>
                <th scope="col">Techstack</th>
                <th scope="col">Live Date</th>
                <th scope="col">Live link</th>
                <th scope="col">Demo link</th>
                {/* <th scope="col">Tstack2</th> */}
                <th scope="col">Play store</th>
                {/* <th scope="col">Live Date</th> */}
                <th scope="col">Apple Store</th>
                {/* <th scope="col">live date</th> */}
                <th scope="col">Description</th>
                <th scope="col">Action</th>
                

              </tr>
            </thead>
            <tbody>
            {
                getuserdata ? getuserdata.map((item)=>{
                   // console.log(item.id,`line 150`)
                    return (
                        <tr>
                        <td>{item.id}</td>
                        <td>{item.category}</td>
                        <td>{item.industry}</td>
                        <td>{item.projectName}</td>
                        <td>{item.Tstack}</td>
                        <td>{item.Ldate}</td>
                        <td>{item.Llink}</td>
                        <td>{item.Dlink}</td>
                        <td>{item.psl}</td>
                        <td>{item.asl}</td>
                        <td>{item.desc}</td>
                        {/* <tr>
                        
                        <td>{item.category.map((item1)=>{
                            <ol>item1</ol>
                        })}</td>
                        </tr> */}

                        <td className='d-flex justify-content-between'>
                          <NavLink to={`views/}`}><button className='btn '><VisibilityIcon /> View</button></NavLink>
                          <NavLink to={`/edit/${item.id}`}><button className='btn '><ModeEditIcon />Edit</button></NavLink>
                          <button className='btn ' onClick={() => deleteuser(item.id)}><DeleteIcon />Delete</button>
                        </td>

                    </tr>
                    )
                }): <></>
            }
            </tbody>
          </table>


        </div>
      </div>


    </div>
  )
}

export default ViewProjects