import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const ProjRegister = () => {

    const navigate = useNavigate("");

    const [inpVal,setInp]= useState({
        name:'',
        email:'',
        age:'',
        mobile:'',
        work:'',
        add:'',
        desc:'',
    })

    const setData = (e)=>{
        console.log(e.target.value);
        const {name,value} = e.target;
        setInp((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const addinpdata = async(e)=>{
        e.preventDefault();
        const { name, email, age, mobile, work, add, desc } = inpVal
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name, email, age, mobile, work, add, desc
            })
        });
        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            alert("error");
            console.log("error");
        }else{
            alert("data added");
            navigate("/")
        }
    }
   
  return (
    <div>
    <div className='container'>

        <form className='mt-4'>
            <div className='row'>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" value={inpVal.name} onChange={setData} name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Email</label>
                    <input type="email" value={inpVal.email} onChange={setData} name='email' className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Age</label>
                    <input type="number" value={inpVal.age} onChange={setData} name='age' className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Mobile</label>
                    <input type="number" value={inpVal.mobile} onChange={setData} name='mobile' className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Work</label>
                    <input type="text" value={inpVal.work} onChange={setData} name='work' className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="mb-3 mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" value={inpVal.add} onChange={setData} name='add' className="form-control" id="exampleInputPassword1" />
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

export default ProjRegister