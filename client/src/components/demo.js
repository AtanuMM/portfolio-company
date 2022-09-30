import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, TextField, MenuItem } from '@mui/material';
import { LoginContext } from '../ContextProvider/Context';
import { useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [getuserdata, setuserdata] = useState([]);
  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(getuserdata);
  const navigate = useNavigate("");
  const history = useNavigate("");

  //gateway of token
  const viweValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const data = await res.json();

    if (data.status == 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data);

    }
  }

  useEffect(() => {
    setTimeout(() => {
      viweValid();

    })

  }, [])


  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setuserdata(data)
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
  }, [])

  const deleteuser = async (id) => {

    const resdel = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const delData = await resdel.json();
    console.log(delData);

    if (resdel.status === 422 || !delData) {
      console.log("Error");
    } else {
      console.log("user deleted");
      getdata()
    }
  }


  return (
    <div>

      <div className='container'>
        <NavLink to='/dash'><button className='btn btn-info mt-5'>Go To Dashbord</button></NavLink>
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
              <tr className='table-dark'>
                <th scope="col">Id</th>
                <th scope="col">Author Name</th>
                <th scope="col">category</th>
                <th scope="col">Industry</th>
                <th scope="col">Project Name</th>
                <th scope="col">Techstack</th>
                <th scope="col">Live link</th>

                <th scope="col">Tstack app</th>
                <th scope="col">Play store</th>

                <th scope="col">Apple Store</th>

                <th scope="col">Description</th>
                <th scope="col">Action</th>


              </tr>
            </thead>
            <tbody>

              {
                getuserdata.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.Auther}</td>
                        <td style={{width: '500px'}}>
                          <CategoryList
                            list={element.category}
                          />
                        </td>
                        <td style={{width: '500px'}}>
                          <CategoryList
                          list={element.industry} />
                        </td>

                        <td>{element.projectName}</td>

                        <td style={{width: '500px'}}>
                        <CategoryList
                          list={element.Tstack1} />
                          
                        </td>

                        <td>{element.Llink}</td>

                        <td>
                        <CategoryList
                          list={element.Tstack2} />
                          
                          </td>
                        <td>{element.psl}</td>

                        <td>{element.asl}</td>

                        <td>{element.desc}</td>
                        <td className='d-flex justify-content-between'>
                          <NavLink to={`/views/${element._id}`}><button className='btn '><VisibilityIcon /> View</button></NavLink>
                          <NavLink to={`/edit/${element._id}`}><button className='btn '><ModeEditIcon />Edit</button></NavLink>
                          <button className='btn ' onClick={() => deleteuser(element._id)}><DeleteIcon />Delete</button>
                        </td>
                      </tr>

                    </>
                  )
                })
              }
            </tbody>
          </table>


        </div>
      </div>


    </div>
  )
}

export default ViewProjects