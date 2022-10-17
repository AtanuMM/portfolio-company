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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



// const CategoryList = ({ list }) => {

//   return <>
//     {
//       list
//       &&
//       <ul>
//         {list.map((item,index)=>(
//         <li key={index}>{item}</li>
//         ))}
//       </ul>
//     }
//   </>
// }


const ViewProjects = () => {
  const [getuserdata, setUserData] = useState([]);
  const { logindata, setLoginData } = useContext(LoginContext);
  const excludeColumns = ["id", "Llink", "Dlink", "psl", "asl"];
  console.log(getuserdata, "ln34");
  const history = useNavigate("");
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")


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
    console.log(res.data.data, "ln65")
    setUserData(res.data.data)
  }
  useEffect(() => {
    refreshToken();
    getdata();
  }, [])

  const showData = () => {
    console.log(getuserdata, `line 82`)
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
    <div className='viewbox'>

      <div className=''>
        <NavLink to='/dashboard'><button className='btn btn-info mt-5'>Go To Dashbord</button></NavLink>
      </div>
      <div>
        <h6 className='mt-3 mb-1 mx-4'>Search</h6>
        <input className='mt-3 mb-4 mx-4' type="text"
          placeholder=' Type to search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>





      <div className=''>

        <div className=''>
          <table className='table table-bordered '>
            <thead className=''>
              <tr className='container'>
                <th scope="col">Id</th>
                {/* <th scope="col">Author Name</th> */}
                <th scope="col">category</th>
                <th scope="col">Industry</th>
                <th scope="col">Project Name</th>
                <th scope="col">Techstack1</th>
                <th scope="col">Live link</th>
                <th scope="col">Demo link</th>
                <th scope="col">Website Live Date</th>
                <th scope="col">Credential</th>
                <th scope="col">Tstack2</th>
                <th scope="col">Play store</th>
                <th scope="col">Playstore Live Date</th>
                <th scope="col">Apple Store</th>
                <th scope="col">Applestore Live Date</th>
                <th scope="col">Description</th>
                <th className='thc'>Action</th>


              </tr>
            </thead>
            <tbody className='container'>
              {
                getuserdata ? getuserdata.filter((val) => {
                  if (search == "") {
                    return val
                  } else if (
                    val.projectName.toLowerCase().includes(search.toLowerCase())
                    || val.desc.toLowerCase().includes(search.toLowerCase())
                    || val.Llink.toLowerCase().includes(search.toLowerCase())
                    || val.Dlink.toLowerCase().includes(search.toLowerCase())
                    || val.psl.toLowerCase().includes(search.toLowerCase())
                    || val.asl.toLowerCase().includes(search.toLowerCase())
                    || val.category.toString().toLowerCase().includes(search.toLowerCase())
                    || val.industry.toString().toLowerCase().includes(search.toLowerCase())
                    || val.Tstack1.toString().toLowerCase().includes(search.toLowerCase())
                    || val.Tstack2.toString().toLowerCase().includes(search.toLowerCase())
                    


                    // || val.category.includes(search.toLowerCase())
                  ) {
                    return val
                  }
                }).map((item) => {
                  // console.log(item.id,`line 150`)
                  return (
                    
                    <tr>
                      <td>{item.id}</td>
                      <td style={{padding:8}}>{item.category}</td>
                      <td style={{padding:8}}>{item.industry}</td>
                      <td>{item.projectName}</td>
                      <td style={{padding:8}}>{item.Tstack1}</td>
                      <td>{item.Llink}</td>
                      <td>{item.Dlink}</td>
                      <td>{item.Wdate}</td>
                      <td>{item.Credential}</td>
                      <td style={{padding:8}}>{item.Tstack2}</td>
                      <td>{item.psl}</td>
                      <td>{item.psldate}</td>
                      <td>{item.asl}</td>
                      <td>{item.asldate}</td>
                      <td>{item.desc}</td>
                     

                      <td className=''>
                        <NavLink to={`/view/${item.id}`}><button className='btn '><VisibilityIcon /> View</button></NavLink>
                        <NavLink to={`/edit/${item.id}`}><button className='btn '><ModeEditIcon />Edit</button></NavLink>
                        <button className='btn ' onClick={() => deleteuser(item.id)}><DeleteIcon />Delete</button>
                      </td>
                    </tr>
                  )
                }) : <></>
              }
            </tbody>
          </table>
          {/* <div className="clearboth"></div>
          {search.length === 0 && <span>No records found to display!</span>}
 */}

        </div>
      </div>


    </div>
  )
}

export default ViewProjects