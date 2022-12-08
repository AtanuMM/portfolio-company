
import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, TextField, MenuItem } from '@mui/material';
import { LoginContext } from '../components/Context';
import { useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'react-html-parser';


// import { text } from 'express';





export default function ProjectRegistration() {
    const navigate = useNavigate("");
    const history = useNavigate("");
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        refreshToken();

    }, []);
    const { logindata, setLoginData } = useContext(LoginContext);

    const [toggle, setToggle] = useState(false)

    const changeTog = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }
    // the auth user gateway
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5005/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history("/")
            }
        }
    }




    // belowing part is for form data receving logic 

    const [inpVal, setInp] = useState({
        // Auther:logindata ? logindata.ValidUserOne.fname : "",
        category: [],
        industry: [],
        projectName: '',
        Tstack1: [],
        Llink: '',
        Dlink: '',
        Wdate: '',
        Credential: '',
        Tstack2: [],
        Isapp: '',
        psl: '',
        psldate: '',
        asl: '',
        asldate: '',
        desc: '',
    });
    const [ckEditorContent, setCkEditorContent] = useState("");
    // ckEditorContent = ckEditorContent.replace(/<(.|\n)*?>/g, '');
    // setCkEditorContent(ckEditorContent)
    const [ckEditorContent2, setCkEditorContent2] = useState("");


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

    const onCKEditorContentChange = (event, editor) => {
        const data1 = editor.getData();
        setCkEditorContent(data1);

    }
    const onCKEditorContentChange2 = (event, editor) => {
        const data2 = editor.getData();
        setCkEditorContent2(data2);

    }

    const addinpdata = async (e) => {
        e.preventDefault();
        const { category, industry, projectName, Tstack1, Llink, Dlink, Wdate, Tstack2, Isapp, psl, psldate, asl, asldate } = inpVal

        const res = await fetch("http://localhost:5005/content/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category, industry, projectName, Tstack1, Llink, Dlink, Wdate, Credential: ckEditorContent, Tstack2, Isapp, psl, psldate, asl, asldate, desc: ckEditorContent2 })
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
            alert("error");
            console.log("error");
        } else {
            alert("data added");
            history("/viewData")
        }

    }

    return (
        <div>



            <div>
                <NavLink to='/dashboard'><button className='btn btn-outline-success'>Back To Dashboard</button></NavLink>
            </div>
            <div className='container'>
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
                                    <MenuItem value='Ecomers, '>Ecomers</MenuItem>
                                    <MenuItem value='Cms, '>Cms</MenuItem>
                                    <MenuItem value='Blog, '>Blog</MenuItem>
                                    <MenuItem value='Booking, '>Booking</MenuItem>

                                </TextField>
                            </Box>
                        </div>


                        {/* Multi Check Box */}
                        <div className="mb-3 col-lg-6 col-md-6 col-12">

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
                                    <MenuItem value='IT , '>IT </MenuItem>
                                    <MenuItem value='Software , '>Software </MenuItem>
                                    <MenuItem value='Freelince, '>Freelince </MenuItem>
                                    <MenuItem value='Graphics, '>Graphics </MenuItem>
                                </TextField>
                            </Box>
                        </div>


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
                            <label for="exampleInputPassword1" className="form-label">Tstack1</label>
                            <Box width='250px'>
                                <TextField label='Select Tech Stack'
                                    select
                                    value={inpVal.Tstack1}
                                    onChange={setData}
                                    fullWidth
                                    SelectProps={{
                                        multiple: true
                                    }}
                                    name='Tstack1'
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
                        <label for="exampleInputPassword1" className="form-label">Wdate</label>
                        <input type="date" value={inpVal.Wdate} onChange={setData} name='Wdate' className="form-control" id="exampleInputPassword1" />
                    </div>


                    <div className="row">
                        <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">
                            
                            <label for="exampleInputPassword1" className="form-label">credential</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={ckEditorContent}
                                dangerouslySetInnerHTM
                                onReady={editor => {

                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={onCKEditorContentChange}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                                
                            />
                           

                            
                        </div>
                        
                        {/* <div>
                            <p>{parse(ckEditorContent)}</p>
                        </div>  */}
                      
                       
                    </div>


                    {/* <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" className="form-label">Credential</label>
                        <textarea name='Credential' value={inpVal.Credential} onChange={setData} className='form-control' id='' cols='30' rows='5'></textarea>
                    </div> */}




                   



                    <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Is app</label> <br />

                        <label className="switch">
                            <input type="checkbox" value={inpVal.Isapp} onClick={changeTog} />
                            <span className="slider round"></span>
                        </label>

                        {/* 
                        <button className="btn btn-warning mx-3" onClick={changeTog}>True</button>

                     <button className="btn btn-warning" onClick={changeTog}>False</button> */}


                    </div>

                    {
                        toggle ? <div className='container'>


                            <div className='row'>

                            </div>
                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Tstack App</label>
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

                    </div>

                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Play Store</label>
                                <input type="text" value={inpVal.psl} onChange={setData} name='psl' className="form-control" id="exampleInputPassword1" />
                            </div>

                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Playstore live date</label>
                                <input type="date" value={inpVal.psldate} onChange={setData} name='psldate' className="form-control" id="exampleInputPassword1" />
                            </div>
                            {/* <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Play Store Live date</label>
                                <input type="date" value={inpVal.psd} onChange={setData} name='psd' className="form-control" id="exampleInputPassword1" />
                            </div> */}
                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Apple Store</label>
                                <input type="text" value={inpVal.asl} onChange={setData} name='asl' className="form-control" id="exampleInputPassword1" />
                            </div>

                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Appklestore live Date</label>
                                <input type="date" value={inpVal.asldate} onChange={setData} name='asldate' className="form-control" id="exampleInputPassword1" />
                            </div>
                            {/* <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Apple Store Live date</label>
                                <input type="date" value={inpVal.asd} onChange={setData} name='asd' className="form-control" id="exampleInputPassword1" />
                            </div> */}
                        </div> : null
                    }
                    {/* <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name='desc' value={inpVal.desc} onChange={setData} className='form-control' id='' cols='30' rows='5'></textarea>
                    </div> */}


                    <div className="row">
                        <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">

                            <label for="exampleInputPassword1" className="form-label">Description</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={ckEditorContent2}
                                dangerouslySetInnerHTML
                                onReady={editor => {

                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={onCKEditorContentChange2}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" onClick={addinpdata} className="btnz btn-primary">Submit</button>

                </form>
            </div>
        </div>
    )
}


