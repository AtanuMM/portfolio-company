import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const ViweProj = () => {
    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async (e) => {
        const res = await fetch("/getda", {
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
    <div className='mt-5'>
            <div className='container'>




                <section className="main-banner" id="top" data-section="section1">


                    <div className="video-overlay header-text">
                        <div className="caption">
                            <h3></h3><hr/>
                            <h2><em></em>User Listing</h2>
                            <div className='add_btn mt-2 mb-2'>
                                <NavLink to="/register" className='btn btn-warning'>Add User</NavLink>
                            </div>
                        </div>
                    </div>
                </section>

                <table class="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Id</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Job</th>
                            <th scope="col">Number</th>
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
                                            <td>{element.name}</td>
                                            <td>{element.email}</td>
                                            <td>{element.work}</td>
                                            <td>{element.mobile}</td>
                                            <td className='d-flex justify-content-between'>
                                                <NavLink to={`views/${element._id}`}><button className='btn btn-success'><VisibilityIcon /> View</button></NavLink>
                                                <NavLink to={`edit/${element._id}`}><button className='btn btn-primary'><ModeEditIcon />Edit</button></NavLink>
                                                <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteIcon />Delete</button>
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
  )
}

export default ViweProj