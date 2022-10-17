import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, MenuItem } from '@mui/material';
import { LoginContext } from '../ContextProvider/Context';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditProject() {

    // const [getuserdata, setuserdata] = useState([]);
    // console.log(getuserdata);
    const [toggle, setToggle] = useState(false)

    const changeTog = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }


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
        industry: [],
        projectName: '',
        Tstack1: [],
        Llink: '',
        Dlink: '',
        wld: '',
        credentials: '',
        Tstack2: [],
        psl: '',
        psd: '',
        asl: '',
        asd: '',
        desc: '',
    })
    const [ckEditorContent2, setCkEditorContent2] = useState("");
    const [ckEditorContent, setCkEditorContent] = useState("");
 

    //multselect comp
    const [multiple, setmultiple] = useState([]);
    //  console.log(multiple);
    const handleChange = (event) => {
        const value = event.target.value
        setData(event)
        setmultiple(typeof value === 'string' ? value.split(',') : value)
    }

    const setData = (e, editor) => {

        const { name, value } = e.target;
        setInp((preval) => ({
            ...preval,
            [name]: value
        }))
    }

    //for creden
    const onCKEditorContentChange2 = (event, editor) => {
        const data3 = editor.getData();
        setCkEditorContent2(data3);
    }

    //for desc
    const onCKEditorContentChange = (event, editor) => {
        const data = editor.getData();
        setCkEditorContent(data);
    }
    


   const getdata = async () => {
        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const pdata = await res.json();
        // console.log(pdata, "line no 118")
        const credentialData = pdata?.credentials;
        const descData = pdata?.desc;      
    //    console.log('line 120=>',credentialData);
    //     console.log('line 121=>',descData);

        if (res.status === 422 || !pdata) {
            console.log("error");
        } else {
            setInp(pdata)
            //console.log(pdata);
            setCkEditorContent2(credentialData)
            setCkEditorContent(descData)
            
            //console.log("get data 123",credentialData);
            //console.log("li no 129",descData2);
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const updateuser = async (e) => {
        e.preventDefault();

        const { Auther, category, industry, projectName, Tstack1, Llink, Dlink, wld, credentials, Tstack2, psl, psd, asl, asd, desc } = inpVal




        const res2 = await fetch(`/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Auther,
                category,
                industry,
                projectName,
                Tstack1,
                Llink,
                Dlink,
                wld,
                credentials: ckEditorContent2,
                Tstack2,
                psl,
                psd,
                asl,
                asd,
                desc: ckEditorContent
            })
        });
        const data2 = res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert('fillup the data')
        } else {
            alert('Data Updated');
            history("/viewproj")
        }
    }
    return (
        <div>
            <h2 className='mt-3 d-flex justify-content-center'>Wellcome to Edit Page</h2>
            <div>

                <NavLink to='/dash'><button className='btn btn-info mt-4 mx-4'>go to dash</button></NavLink>
                 <NavLink to='/viewproj'><button className='btn btn-info mt-5 mx-5'>Go To Project View</button></NavLink> 
                
            </div>

            <div className='container'>
           

                <form className='mt-4'>
                    <div className='row'>

                        {/ Multi Check Box /}
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Select Category</label>
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
                                    <MenuItem value='Ecommerce website'>Ecommerce website</MenuItem>
                                    <MenuItem value='Personal blog.'>Personal blog.</MenuItem>
                                    <MenuItem value='Business website.'>Business website.</MenuItem>
                                    <MenuItem value='Entertainment or media website.'>Entertainment or media website.</MenuItem>

                                </TextField>
                            </Box>
                        </div>


                        
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Select Industry</label>
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
                                    <MenuItem value='IT , '>IT</MenuItem>
                                    <MenuItem value='Software'>Software </MenuItem>
                                    <MenuItem value='Freelince'>Freelince </MenuItem>
                                    <MenuItem value='Graphics'>Graphics </MenuItem>
                                </TextField>
                            </Box>
                        </div>


                    </div>

                    
                    <div className='row'>
                        <div className="mb-4">
                            <label for="exampleInputEmail1" className="form-label">Project Name</label>
                            <input type="text" value={inpVal.projectName} onChange={setData} name='projectName' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>




                    <div className='row'>
                    
                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Techstack</label>
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
                                    <MenuItem value='MERN '>MERN</MenuItem>
                                    <MenuItem value='PHP '>PHP</MenuItem>
                                    <MenuItem value='JAVA '>JAVA</MenuItem>
                                    <MenuItem value='Dot Net '>Dot Net</MenuItem>
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

                        <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Website Live date</label>
                            <input type="date" value={inpVal.wld} onChange={setData} name='wld' className="form-control" id="exampleInputPassword1" />
                        </div>

                    </div>

                    <div className="row">
                        <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">

                            <label for="exampleInputPassword1" className="form-label">credentials</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={ckEditorContent2}
                                
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



                    <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Is app</label> <br />

                        <label className="switch">
                            <input type="checkbox" onClick={changeTog} />
                            <span className="slider round"></span>
                        </label>


                      


                    </div>

                    {
                        toggle ? <div className='container'>


                            <div className='row'>
                                <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
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
                                            <MenuItem value='React Native'>React Native</MenuItem>
                                            <MenuItem value='Android'>Android</MenuItem>
                                            <MenuItem value='IOS'>IOS</MenuItem>
                                            <MenuItem value='Flutter'>Flutter</MenuItem>

                                        </TextField>
                                    </Box>

                                </div>

                            </div>

                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Play Store Link</label>
                                <input type="text" value={inpVal.psl} onChange={setData} name='psl' className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Play Store Live date</label>
                                <input type="date" value={inpVal.psd} onChange={setData} name='psd' className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Apple Store Link</label>
                                <input type="text" value={inpVal.asl} onChange={setData} name='asl' className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                                <label for="exampleInputPassword1" className="form-label">Apple Store Live date</label>
                                <input type="date" value={inpVal.asd} onChange={setData} name='asd' className="form-control" id="exampleInputPassword1" />
                            </div>
                        </div> : null
                    }

                    <div className="mb-3 mb-3 col-lg-12 col-md-12 col-12">

                        <label for="exampleInputPassword1" className="form-label">Description</label>

                         <textarea name='desc' value={inpVal.desc} onChange={setData} className='form-control' id='' cols='30' rows='5'></textarea> 
                        <CKEditor
                            editor={ClassicEditor}
                            data={ckEditorContent}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
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

                    <button type="submit" onClick={updateuser} className="btnz btn-primary mb-5 mt-5">Submit</button>

                </form>
            </div>


        </div>
    )
}

export default EditProject