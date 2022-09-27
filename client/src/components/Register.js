import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const Signup = async (e) =>{
        e.preventDefault();

        try {
            await axios.post('http://localhost:5005/users/add',{
                name: name,
                email:email,
                password : password,
                confPassword: confPassword
                
            });
            if(name === ''){
                alert('name is require')
            }else if(email === ''){
                alert('email is require')
            }else if (!email.includes("@")) {
                alert('includes @ in your email!')
            } else if (password === ""){
                alert('please fill password')
            }else if (password.length < 6) {
                alert('password must be 6 charecter')
            } else if (confPassword === "") {
                alert('Confirm Password is require')
            }else if (password !== confPassword) {
                alert('password and confirmpassword not match')
            }

            else{
               
                navigate("/login");
            }
            

        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }
    
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Signup} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                                <div>
                                alredy have account? please<a href='/login'>Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register