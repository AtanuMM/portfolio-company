import React, { useEffect, useState, useContext } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CategoryIcon from '@mui/icons-material/Category';
import FactoryIcon from '@mui/icons-material/Factory';
import CodeIcon from '@mui/icons-material/Code';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import ShopIcon from '@mui/icons-material/Shop';
import AppleIcon from '@mui/icons-material/Apple';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../components/Context';
 import axios from 'axios';
 import jwt_decode from "jwt-decode";



function Details() {
    const { logindata, setLoginData } = useContext(LoginContext);
    const [data, setData] = useState(false);
    const history = useNavigate("")
    const [name, setName] = useState('');
        const [token, setToken] = useState('');
        const [expire, setExpire] = useState('');
        const [users, setUsers] = useState([]);
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
        
    useEffect(() => {
        setTimeout(() => {
            refreshToken();
            setData();
            getdata();
           
        
        })

    }, [])

    const {id} = useParams("")
    console.log(id);

    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async () => {
        const res = await fetch(`http://localhost:5005/showData/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
            console.log("error");
        } else {
            setuserdata(data.data)
            console.log("get data");
        }
    }

    // useEffect(()=>{
    //     getdata();
    // },[]);



    return (
        <div className='container mt-3'>

<h1 style={{ fontWeight: 800 }}>Welcome Back: {name}</h1>      
            
            <Card sx={{ maxWidth: 600 }}>

                <CardContent>
                
                   <div className='row'>
                   <div className='left-view col-lg-6 col-md-6 col-12'>
                        <p className='mt-3'><CategoryIcon />  category: <span>{getuserdata.category}</span></p>
                        <p className='mt-3'><FactoryIcon />  Industry: <span>{getuserdata.industry}</span></p>
                        <p className='mt-3'> <WorkIcon/> Project Name: <span>{getuserdata.projectName}</span></p>
                        <p className='mt-3'><CodeIcon /> Tech stack Web: <span>{getuserdata.Tstack1}</span> </p>
                    </div>
                    <div className='right-view col-lg-6 col-md-6 col-12'>
                        <p className='mt-3'><LaunchIcon /> Live link: <span><a href={getuserdata.Llink}>{getuserdata.Llink}</a></span></p>
                        <p className='mt-5'><GitHubIcon /> Demo link: <span>{getuserdata.Dlink}</span> </p>
                        <p className='mt-5'><CalendarMonthIcon/>Website Live Date: <span>{getuserdata.Wdate}</span> </p>
                        <p className='mt-5'><DescriptionIcon /> Credential:<span dangerouslySetInnerHTML={{__html: getuserdata.Credential}}></span></p>                   
                    </div>
                    <div className='right-view col-lg-6 col-md-6 col-12'>
                    <h5 className='mt-5'><DeveloperModeIcon /> Tech stack app: <span>{getuserdata.Tstack2}</span> </h5>
                    <p className='mt-5'> <ShopIcon /> Play store link: <span>{getuserdata.psl}</span> </p>
                        <p className='mt-5'><CalendarMonthIcon /> Play Store live Date : <span>{getuserdata.psldate}</span> </p>
                        <p className='mt-5'> <AppleIcon />Apple store link: <span>{getuserdata.asl}</span> </p>
                        <p className='mt-5'><CalendarMonthIcon/>Apple Store live Date: <span>{getuserdata.asldate}</span> </p>
                        <div className='mt-5'><DescriptionIcon />Description: <span dangerouslySetInnerHTML={{__html: getuserdata.desc}}></span> </div>
                    </div>
                        
                   

                    
                   </div>
                </CardContent>



            </Card>
        </div>
    )
}

export default Details