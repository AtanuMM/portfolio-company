import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode"; 
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]); 
    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);
 

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };


    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open2 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
 
    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5005/token');
            config.headers.Authorization = ` ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
 
    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5005/get/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

   
    
        const Logout = async () => {
            try {
                await axios.delete('http://localhost:5005/logout');
                history("/");
            } catch (error) {
                console.log(error);
            }
        }
 
    
    return (
        <div className="container mt-5">

            <h1>Welcome Back: {name}</h1>
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">


                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/login" className="navbar-item">
                            Home
                        </a>
                        <a href="/" className="navbar-item">
                            Register
                        </a>
                        <a href="/dashboard" className="navbar-item">
                        Dashboard
                        </a>
                       
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    


            <header>
                <nav>

                    <Box sx={{ display: 'flex' }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>

                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="persistent"
                            anchor="left"
                            open={open}
                        >
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <List>
                                {[''].map((text, index) => (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton>
                                            <NavLink to='/addData'> <button className="btn btn-secondary">Add Data</button></NavLink>
                                            {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                {[''].map((text, index) => (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton>
                                            <NavLink to='/viewData'> <button className="btn btn-secondary">view Data</button></NavLink>
                                            {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                        </Drawer>

                    </Box>

                    <NavLink to="/"><h1></h1></NavLink>
                   

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open2}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                       

                    </Menu>
                </nav>
            </header>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
 
                </tbody>
            </table>
            
        </div>
    )
}
 
export default Dashboard