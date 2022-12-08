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
import { ReactHtmlParser } from 'react-html-parser'
import SearchIcon from '@mui/icons-material/Search';


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
  const [search, setSearch] = useState("");
  const [searchh, setSearchh] = useState("");
  const [searchhh, setSearchhh] = useState("");

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

  // const searchHandle = async(event) =>{
  //   console.log(event.target.value);
  //   let key = event.target.value;
  //   let result = await fetch(`http://localhost:5005/search/${key}`);
  //   result = await result.json();
  //   if(result){
  //     setUserData(result)
  //   }
  // }

  // const filterProduct = e => {
  //   const find = e.target.value.toLowerCase()
  //   const filteredProduct = namesFromDatabase.filter(Catagory => search.category.toLowerCase().includes(find))
  //   setSearch(filterProduct)
  // }

  // const handleSearch = () => {
  //   //alert('clicked')
  //   const newData =
  //     getuserdata.filter(x => x.category.toString().toLowerCase().includes(search.toLowerCase()))
  //   setUserData(newData);

  // }
 

  const handleSearch = () => {
    //alert('clicked')
    // const newData =
    //   getuserdata.filter(x => x.category.toString().toLowerCase().includes(search.toLowerCase()))
    // setUserData(newData);
   
    const newData = getuserdata.filter(x => x.category.toString().toLowerCase().includes(search.toLowerCase()))
    console.log(getuserdata,"line 114");
    if(newData == ""){
      console.log('no data found');
    }else{
      return setUserData(newData);
    }

    // const newData1 = getuserdata.filter(x => x.Tstack1.toString().toLowerCase().includes(searchh.toLowerCase()))
    // if(newData1 == ""){
    //   console.log('no data find');
    // }else{
    //   return setUserData( newData1);
    // }


    // const newData = getuserdata.filter(x =>x.category.toString().toLowerCase().includes(search.toLowerCase(),console.log(x.category,"line 129")))
    // const newData1 = getuserdata.filter(x => x.Tstack1.toString().toLowerCase().includes(searchh.toLowerCase(),console.log(x.Tstack1,"line 130")))
    // if(newData == ""){
    //   console.log('no data find');
    // }else if(newData1 == ""){
    //   console.log('no data');
    // }else{
    //   var Data = {newData,newData1}
    //   return setUserData(Data)
    // }
   
  }
 
 


  return (
    <div className='viewbox'>

      <div className=''>
        <NavLink to='/dashboard'><button className='btn btn-info mt-5'>Go To Dashbord</button></NavLink>
      </div>
      <div className='d-flex'>
        <div className='d-flex'>
          {/* <input className='d-flex' type="text"
            placeholder=' Type to search'
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <td className='mt-1'>
            <select onChange={(e) => setSearch(e.target.value)}>
              <option value='Deafult'>Deafult Category</option>
              <option value='Category 1'>Category 1</option>
              <option value='Category 2'>Category 2</option>
              <option value='Category 3'>Category 3</option>
              <option value='Category 4'>Category 4</option>
            </select>
          </td>
          
        </div>
        <div className='d-flex'>
          {/* <input className='d-flex' type="text"
            placeholder=' Type to search'
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <td className='mt-1'>
            <select onChange={(e) => setSearchh(e.target.value)}>
              <option value='Deafult'>Deafult Techstack Web</option>
              <option value='Tech Stack 1'>Tech Stack 1</option>
              <option value='Tech Stack 2'>Tech Stack 2</option>
              <option value='Tech Stack 3'>Tech Stack 3</option>
              <option value='Tech Stack 4'>Tech Stack 4</option>
             
            </select>
          </td>
         
        </div>
        <div className='d-flex'>
          {/* <input className='d-flex' type="text"
            placeholder=' Type to search'
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <td className='mt-1'>
            <select onChange={(e) => setSearchhh(e.target.value)}>
              <option value='Deafult'>Deafult Techstack APP</option>
              <option value='Tech Stack 1'>Tech Stack 1</option>
              <option value='Tech Stack 2'>Tech Stack 2</option>
              <option value='Tech Stack 3'>Tech Stack 3</option>
              <option value='Tech Stack 4'>Tech Stack 4</option>
              
            </select>
          </td>
        </div>
        <div className='justify-content searchIcon'>
            {/* <button type="submit"><SearchIcon/></button> */}
            <button onClick={() => handleSearch()}><SearchIcon /></button>
          </div>
      </div>


      {/* <div>
        <input type="search" name="category" placeholder='search category'
        onChange={searchHandle}
        />
        <input type="search" name="Tstack1" placeholder='search Tstack1'/>
        <input type="search" name="Tstack2" placeholder='search Tstack2'/>
        <input type="submit" value="Search"/>
      </div> */}


      <div className=''>

        <div className=''>
          <table className='table table-bordered '>
            <thead className=''>
              <tr className='container'>
                <th scope="col">Id</th>
                <th scope="col">category</th>
                <th scope="col">Industry</th>
                <th scope="col">Project Name</th>
                <th scope="col">Techstack1</th>
                <th scope="col">Live link</th>
                <th scope="col">Demo link</th>
                <th scope="col">Website Live Date</th>
                <th scope="col">Credential</th>
                <th scope="col">Tstack App</th>
                <th scope="col">Play store</th>
                <th scope="col">Playstore Live Date</th>
                <th scope="col">Apple Store</th>
                <th scope="col">Applestore Live Date</th>
                <th scope="col">Description</th>
                <th style={{ paddingLeft: 70 }} >Action</th>


              </tr>
            </thead>
            <tbody className='container'>
              {
                getuserdata ? getuserdata
                  // .filter((val) => {
                  //   if (search == "") {
                  //     return val
                  //   } else if (
                  //     val.projectName.toLowerCase().includes(search.toLowerCase())
                  //     || val.desc.toLowerCase().includes(search.toLowerCase())
                  //     || val.Llink.toLowerCase().includes(search.toLowerCase())
                  //     || val.Dlink.toLowerCase().includes(search.toLowerCase())
                  //     || val.psl.toLowerCase().includes(search.toLowerCase())
                  //     || val.asl.toLowerCase().includes(search.toLowerCase())
                  //     || val.category.toString().toLowerCase().includes(search.toLowerCase())
                  //     || val.industry.toString().toLowerCase().includes(search.toLowerCase())
                  //     || val.Tstack1.toString().toLowerCase().includes(search.toLowerCase())
                  //     || val.Tstack2.toString().toLowerCase().includes(search.toLowerCase())



                  //     // || val.category.includes(search.toLowerCase())
                  //   ) {
                  //     return val
                  //   }
                  // })
                  .map((item) => {
                    // console.log(item.id,`line 150`)
                    return (

                      <tr>
                        <td>{item.id}</td>
                        <td style={{ padding: 8 }}>{item.category}</td>
                        <td style={{ padding: 8 }}>{item.industry}</td>
                        <td style={{ padding: 8 }}>{item.projectName}</td>
                        <td style={{ padding: 8 }}>{item.Tstack1}</td>
                        <td style={{ padding: 8 }}>{item.Llink}</td>
                        <td style={{ padding: 8 }}>{item.Dlink}</td>
                        <td style={{ padding: 8 }}>{item.Wdate}</td>
                        <td dangerouslySetInnerHTML={{ __html: item.Credential }}></td>
                        <td style={{ padding: 8 }}>{item.Tstack2}</td>
                        <td style={{ padding: 8 }}>{item.psl}</td>
                        <td style={{ padding: 8 }}>{item.psldate}</td>
                        <td style={{ padding: 8 }}>{item.asl}</td>
                        <td style={{ padding: 8 }}>{item.asldate}</td>
                        <td dangerouslySetInnerHTML={{ __html: item.desc }}></td>


                        <td className='d-flex border border-white'>
                          <NavLink to={`/view/${item.id}`}><button className='btn btn1 '><VisibilityIcon /> View</button></NavLink>
                          <NavLink to={`/edit/${item.id}`}><button className='btn btn2 '><ModeEditIcon />Edit</button></NavLink>
                          <button className='btn btn3 ' onClick={() => deleteuser(item.id)}><DeleteIcon />Delete</button>
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