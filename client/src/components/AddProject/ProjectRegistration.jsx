import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, TextField, MenuItem } from '@mui/material';
import { LoginContext } from '../ContextProvider/Context';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function ProjectRegistration() {
    const navigate = useNavigate("");
    const history = useNavigate("");
    const { logindata, setLoginData } = useContext(LoginContext);

    // the auth user gateway
    const PregdValid = async () => {
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
            PregdValid();
            setData(true)
        })

    }, [])





    // belowing part is for form data receving logic 

    const [inpVal, setInp] = useState({
        category: [],
        projectName: '',
        Tstack: '',
        Llink: '',
        Dlink: '',
        Ldate: '',
        Isapp: '',
        psl: '',
        asl: '',
        desc: '',
    });

    //multselect comp
    const [multiple, setmultiple] = useState([]);
    //  console.log(multiple);
    const handleChange = (event) => {
        const value = event.target.value
        setData(event)
        setmultiple(typeof value === 'string' ? value.split(',') : value)
    }

    //grabing value from inputis
    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;

        setInp((preval) => ({
            ...preval,
            [name]: value
        }))
    }


    const addinpdata = async (e) => {
        e.preventDefault();
        const { category, projectName, Tstack, Llink, Dlink, Ldate, Isapp, psl, asl, desc } = inpVal
        if (category === "") {
            alert("Category is required!", { position: "top-center" });
        } else if (projectName === "") {
            alert("ProjectName is required!", { position: "top-center" });
        } else if (Tstack === "") {
            alert("Tstack is required!", { position: "top-center" });
        } else if (Llink === "") {
            alert("Llink is required!", { position: "top-center" });
        } else if (Dlink === "") {
            alert("Dlink is required!", { position: "top-center" });
        } else if (Ldate === "") {
            alert("Ldate is required!", { position: "top-center" });
        } else if (Isapp === "") {
            alert("Isapp is required!", { position: "top-center" });
        } else if (psl === "") {
            alert("psl is required!", { position: "top-center" });
        } else if (asl === "") {
            alert("asl is required!", { position: "top-center" });
        } else if (desc === "") {
            alert("desc is required!", { position: "top-center" });
        } else {
            const res = await fetch("/add-portfolio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category, projectName, Tstack, Llink, Dlink, Ldate, Isapp, psl, asl, desc })
            });
            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                alert("error");
                console.log("error");
            } else {
                alert("data added");
                history("/viewproj")
            }
        }
    }

    return (



        // <div>

        //     <div className='container'>
        //         <NavLink to='/dash'><button className='btn btn-info mt-5'>Go To Dashbord</button></NavLink>
        //     </div>


        //     <div className='container mt-5'>
        //         <form className='mt-4'>
        //             <div className='row'>
        //                 <div className="mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputEmail1" className="form-label">category</label>
        //                     <input type="text" value={inpVal.category} onChange={setData} name='category' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        //                 </div>
        //             </div>
        //             <div className='row'>
        //                 <div className="mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputEmail1" className="form-label">Project Name</label>
        //                     <input type="text" value={inpVal.projectName} onChange={setData} name='projectName' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        //                 </div>
        //                 <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">Techstack</label>
        //                     <input type="text" value={inpVal.Tstack} onChange={setData} name='Tstack' className="form-control" id="exampleInputPassword1" />
        //                 </div>

        //                 <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">Live link</label>
        //                     <input type="text" value={inpVal.Llink} onChange={setData} name='Llink' className="form-control" id="exampleInputPassword1" />
        //                 </div>

        //                 <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">Demo link</label>
        //                     <input type="text" value={inpVal.Dlink} onChange={setData} name='Dlink' className="form-control" id="exampleInputPassword1" />
        //                 </div>

        //                 <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">Isapp</label>
        //                     <input type="text" value={inpVal.Isapp} onChange={setData} name='Isapp' className="form-control" id="exampleInputPassword1" />
        //                 </div>



        //                 <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">date</label>
        //                     <input type="date" value={inpVal.Ldate} onChange={setData} name='Ldate' className="form-control" id="exampleInputPassword1" />
        //                 </div>
        //                 <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">Play Store</label>
        //                     <input type="text" value={inpVal.psl} onChange={setData} name='psl' className="form-control" id="exampleInputPassword1" />
        //                 </div>
        //                 <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">Apple Store</label>
        //                     <input type="text" value={inpVal.asl} onChange={setData} name='asl' className="form-control" id="exampleInputPassword1" />
        //                 </div>

        //                 <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">
        //                     <label for="exampleInputPassword1" className="form-label">Description</label>
        //                     <textarea name='desc' value={inpVal.desc} onChange={setData} className='form-control' id='' cols='30' rows='5'></textarea>
        //                 </div>

        //                 <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>




        <div>
            <div>
                <NavLink to='/dash'>go to dash</NavLink>
            </div>
            <div className='container mt-5'>
                {/* {JSON.stringify(inpVal, null, 10)} */}
                <form className='mt-4'>
                    <div className='row'>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">

                            <Box width='250px'>
                                <TextField label='Select category'
                                    select
                                    value={inpVal.category}
                                    onChange={setData}
                                    fullWidth
                                    SelectProps={{
                                        multiple: true
                                    }}
                                    name='category'
                                    helperText='please select your categories '
                                >
                                    <MenuItem value='Category 1, '>Category 1</MenuItem>
                                    <MenuItem value='Category 2, '>Category 2</MenuItem>
                                    <MenuItem value='Category 3, '>Category 3</MenuItem>
                                    <MenuItem value='Category 4, '>Category 4</MenuItem>

                                </TextField>
                            </Box>

                        </div>
                    </div>
                    <div className='row'>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" className="form-label">Project Name</label>
                            <input type="text" value={inpVal.projectName} onChange={setData} name='projectName' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Techstack</label>
                            <input type="text" value={inpVal.Tstack} onChange={setData} name='Tstack' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Live link</label>
                            <input type="text" value={inpVal.Llink} onChange={setData} name='Llink' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Demo link</label>
                            <input type="text" value={inpVal.Dlink} onChange={setData} name='Dlink' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Is app</label> <br />

                            <input type="radio" onChange={setData} name='Isapp' value="true" />
                            <label for="html">True</label>
                            <input type="radio" onChange={setData} name='Isapp' value="false" />
                            <label for="css">False</label>

                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">date</label>
                            <input type="date" value={inpVal.Ldate} onChange={setData} name='Ldate' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Play Store</label>
                            <input type="text" value={inpVal.psl} onChange={setData} name='psl' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Apple Store</label>
                            <input type="text" value={inpVal.asl} onChange={setData} name='asl' className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">
                            <label for="exampleInputPassword1" className="form-label">Description</label>
                            <textarea name='desc' value={inpVal.desc} onChange={setData} className='form-control' id='' cols='30' rows='5'></textarea>
                        </div>

                        <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


