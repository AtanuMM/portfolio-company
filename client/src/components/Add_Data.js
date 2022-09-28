
import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, TextField, MenuItem } from '@mui/material';
import { LoginContext } from '../components/Context';
import { useEffect } from 'react';


export default function ProjectRegistration() {
    const navigate = useNavigate("");
    const history = useNavigate("");
    const { logindata, setLoginData } = useContext(LoginContext);

    const [toggle, setToggle] = useState(false)

    const changeTog = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }
    // the auth user gateway
    const PregdValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:5005/token", {
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
        Auther:logindata ? logindata.ValidUserOne.fname : "",
        category: [],
        projectName: '',
        Tstack: [],
        Llink: '',
        Dlink: '',
        Ldate:'',
        Isapp:'',
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

        const res = await fetch("http://localhost:5005/content/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({  category, projectName, Tstack, Llink, Dlink, Ldate, Isapp, psl, asl, desc })
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("error");
            console.log("error");
        } else {
            alert("data added");
            history("/abc")
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
                <NavLink to='/dashboard'><button className='btn btn-outline-success'>Back To Dashboard</button></NavLink>
            </div>



            <div className='container'>
                {/* {JSON.stringify(inpVal, null, 10)} */}

                {/* <div>
                    Auther <h4>:{logindata ? logindata.ValidUserOne.fname : ""}</h4>
                </div> */}


                <form className='mt-4'>
                    <div className='row'>

                        {/* Multi Check Box */}
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


                        {/* Multi Check Box */}
                        {/* <div className="mb-3 col-lg-6 col-md-6 col-12">

                            <Box width='250px'>
                                <TextField label='Select Industry'
                                    select
                                    value={inpVal.industry}
                                    onChange={setData}
                                    fullWidth
                                    SelectProps={{
                                        multiple: true
                                    }}
                                    name='industry'
                                    helperText='please select your Industry '
                                >
                                    <MenuItem value='IT , '>IT 1</MenuItem>
                                    <MenuItem value='Software , '>Software </MenuItem>
                                    <MenuItem value='Freelince, '>Freelince </MenuItem>
                                    <MenuItem value='Graphics, '>Graphics </MenuItem>
                                </TextField>
                            </Box>
                        </div> */}


                    </div>

                    {/*Project Name Text Box */}
                    <div className='row'>
                        <div className="mb-4">
                            <label for="exampleInputEmail1" className="form-label">Project Name</label>
                            <input type="text" value={inpVal.projectName} onChange={setData} name='projectName' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>




                    <div className='row'>
                        {/*Tech stack mult check box*/}
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Techstack</label>
                            <Box width='250px'>
                                <TextField label='Select Tech Stack'
                                    select
                                    value={inpVal.Tstack}
                                    onChange={setData}
                                    fullWidth
                                    SelectProps={{
                                        multiple: true
                                    }}
                                    name='Tstack'
                                    helperText='please select your Tech Stack '
                                >
                                    <MenuItem value='Tech Stack 1, '>Tech Stack</MenuItem>
                                    <MenuItem value='Tech Stack 2, '>Tech Stack 2</MenuItem>
                                    <MenuItem value='Tech Stack 3, '>Tech Stack 3</MenuItem>
                                    <MenuItem value='Tech Stack 4, '>Tech Stack 4</MenuItem>

                                </TextField>
                            </Box>

                        </div>

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Live link</label>
                            <input type="text" value={inpVal.Llink} onChange={setData} name='Llink' className="form-control" id="exampleInputPassword1" />
                        </div>
                    </div>


                    <div className='row'>
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Demo link</label>
                            <input type="text" value={inpVal.Dlink} onChange={setData} name='Dlink' className="form-control" id="exampleInputPassword1" />
                        </div>
                    </div>



                    <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Is app</label> <br />

                        <label className="switch">
                            <input type="checkbox" value={inpVal.Isapp} onClick={changeTog} />
                            <span className="slider round"></span>
                        </label>


                        {/* <button className="btn btn-warning mx-3" onClick={changeTog}>True</button> */}

                        {/* <button className="btn btn-warning" onClick={changeTog}>False</button> */}


                    </div>

                    {
                        toggle ? <div className='container'>


                            <div className='row'>
                                {/* <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                    <label for="exampleInputPassword1" className="form-label">Techstack</label>
                                    <Box width='250px'>
                                        <TextField label='Select Tech Stack'
                                            select
                                            value={inpVal.Tstack2}
                                            onChange={setData}
                                            fullWidth
                                            SelectProps={{
                                                multiple: true
                                            }}
                                            name='Tstack2'
                                            helperText='please select your Tech Stack '
                                        >
                                            <MenuItem value='Tech Stack 1, '>Tech Stack</MenuItem>
                                            <MenuItem value='Tech Stack 2, '>Tech Stack 2</MenuItem>
                                            <MenuItem value='Tech Stack 3, '>Tech Stack 3</MenuItem>
                                            <MenuItem value='Tech Stack 4, '>Tech Stack 4</MenuItem>

                                        </TextField>
                                    </Box>

                                </div> */}

                            </div>

                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Play Store</label>
                                <input type="text" value={inpVal.psl} onChange={setData} name='psl' className="form-control" id="exampleInputPassword1" />
                            </div>
                            {/* <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Play Store Live date</label>
                                <input type="date" value={inpVal.psd} onChange={setData} name='psd' className="form-control" id="exampleInputPassword1" />
                            </div> */}
                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Apple Store</label>
                                <input type="text" value={inpVal.asl} onChange={setData} name='asl' className="form-control" id="exampleInputPassword1" />
                            </div>
                            {/* <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Apple Store Live date</label>
                                <input type="date" value={inpVal.asd} onChange={setData} name='asd' className="form-control" id="exampleInputPassword1" />
                            </div> */}
                        </div> : null
                    }
                    <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name='desc' value={inpVal.desc} onChange={setData} className='form-control' id='' cols='30' rows='5'></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} className="btnz btn-primary">Submit</button>

                </form>
            </div>
        </div>
    )
}


