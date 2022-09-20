import React, { useState } from 'react'
import "./Mix.css"
import { NavLink } from 'react-router-dom'

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setcPassShow] = useState(false);
    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    //console.log(inpval);

    //onchange method when user inputs data
    const setVal = (e) => {
        //console.log(e.target.value);
        const { name, value } = e.target;
        //storeing values in my setInp state
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async(e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval

        if (fname == "") {
            alert('please enter the name')
        } else if (email == "") {
            alert('plz entr email');
        } else if (!email.includes('@')) {
            alert('enter valid email')
        } else if (password == "") {
            alert('please enter password')
        } else if (password.length < 6) {
            alert('password shoud more than 6 charecter')
        } else if (cpassword == "") {
            alert('please enter confirm password')
        } else if (cpassword.length < 6) {
            alert('password shoud more than 6 charecter')
        } else if (password !== cpassword) {
            alert('password and confirm password not mached')
        } else {
            // console.log("registered sucessful");

            const data = await fetch('/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            console.log(res.status);
            
            if(res.status == 201){
                alert('user registration done');
                setInpval({...inpval, fname: '', email:'', password:'', cpassword:''})
            }
        }
    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}> Not an User ? Please SignUp here</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Name</label>
                            <div className="two">
                                <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                            </div>
                        </div>


                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <div className="two">
                                <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                            </div>
                        </div>


                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setcPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addUserdata} >SignUp</button>
                        <p>
                            Already have an account? <NavLink to="/">Log In</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register