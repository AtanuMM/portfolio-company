import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, MenuItem } from '@mui/material';
import { LoginContext } from '../components/Context';

function EditProject() {

    // const [getuserdata, setuserdata] = useState([]);
    // console.log(getuserdata);


    // the auth user gateway
    const { logindata, setLoginData } = useContext(LoginContext);
    const PregeditValid = async () => {
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
            PregeditValid();
            setData(true)
        })

    }, [])



    const history = useNavigate("");

    const { id } = useParams("")
    console.log(id);

    const [inpVal, setInp] = useState({
        category: [],
        industry:[],
        projectName: '',
        Tstack: '',
        Llink: '',
        Dlink: '',
        Ldate: '',
        psl: '',
        asl: '',
        desc: '',
    })

    //multselect comp
    const [multiple, setmultiple] = useState([]);
    //  console.log(multiple);
    const handleChange = (event) => {
        const value = event.target.value
        setData(event)
        setmultiple(typeof value === 'string' ? value.split(',') : value)
    }

    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setInp((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }



    const getdata = async () => {
        const res = await fetch(`/getuser/${id}`, {
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
            setInp(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const updateuser = async (e) => {
        e.preventDefault();

        const { category, projectName, Tstack, Llink, Dlink, Ldate, Isapp, psl, asl, desc } = inpVal

        


        const res2 = await fetch(`http://localhost:5005/content/add/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category, projectName, Tstack, Llink, Dlink, Ldate, Isapp, psl, asl, desc 
            })
        });
        const data2 = res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert('fillup the data')
        }else{
            alert('Data Updated');
            history("/viewdata  ")

        }

    
    }





    return (
        <div>
        <div>
            <NavLink to='/viewData'><button className='btn btn-info mt-5 mx-2'>go to view page</button></NavLink>
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
               
                    <div className="mb-3 col-lg-6 col-md-6 col-12">

                        <Box width='250px'>
                            <TextField label='Select industry'
                                select
                                value={inpVal.industry}
                                onChange={setData}
                                fullWidth
                                SelectProps={{
                                    multiple: true
                                }}
                                name='category'
                                helperText='please select your categories '
                            >
                                <MenuItem value='IT, '>IT</MenuItem>
                                <MenuItem value='Software, '>Software </MenuItem>
                                <MenuItem value='Freelince, '>Freelince </MenuItem>
                                <MenuItem value='Graphics, '>Graphics</MenuItem>

                            </TextField>
                        </Box>

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

                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default EditProject