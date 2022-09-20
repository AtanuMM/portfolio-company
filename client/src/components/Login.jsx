import React from 'react'
import { useState } from 'react'
import './Mix.css'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const history = useNavigate()
    const [passShow, setPassShow]= useState(false)

    const [inpval, setInpval] = useState({       
        email: "",
        password: "",
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

    //login validation controller
    const loginuser = async(e)=>{
        e.preventDefault();

        const {email, password} = inpval

        if (email == "") {
            alert('plz entr email');
        } else if (!email.includes('@')) {
            alert('enter valid email')
        } else if (password == "") {
            alert('please enter password')
        } else if (password.length < 6) {
            alert('password shoud more than 6 charecter')
        } else {
           // console.log("Login sucessful");

           const data = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 email, password
            })
        });
        const res = await data.json();
        //console.log(res.status);
        console.log(res);
        
        if(res.status === 201){
            localStorage.setItem("usersdatatoken",res.result.token);
            history("/dash")
            setInpval({...inpval,  email:'', password:''})
        }
        }
    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                    <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <div className="two">
                            <input type="email" name="email" value={inpval.email} onChange={setVal} id="email" placeholder='Enter Your Email Address' />
                            </div>
                            
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                            <input type={!passShow ? "password" : "text"} name="password" value={inpval.password} onChange={setVal} id="password" placeholder='Enter Your password' />
                            <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                            
                        </div>
                        <button className='btn' onClick={loginuser} >Login</button>
                        <p>
                            Dont have account? : <NavLink to='/register'>SignUp</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login