import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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


import './Header.css'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



const Dashbord = () => {


  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata);
  const history = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem('usersdatatoken')
    //console.log(token);

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      credentials: "include"
    });
    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      
      console.log("user logout");
      localStorage.removeItem('usersdatatoken')
      setLoginData(false)
      history('/')

    } else {
      console.log("error");
    }
  }

  const goDash = () => {
    history("/dash")
  };
  const goError = () => {
    history('*')
  };






    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };



    const [data, setData] = useState(false);


    const DashboardValid = async () => {
        let token = localStorage.getItem('usersdatatoken')
        //console.log(token);

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data = await res.json();
        //console.log(data);
        if (data.status == 401 || !data) {
            console.log("error page redirect");
            history('*')
        } else {
            console.log("user verified");
            setLoginData(data)
            history('/dash')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])



    return (
        <>
        <div>



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
              <NavLink to = '/preg'>add project</NavLink>
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
              <NavLink to = '/viweproj'>view project</NavLink>
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
          

          <div className='avtar'>
            {
              logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                <Avatar style={{ background: "blue" }} onClick={handleClick} />
            }

          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open2}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              logindata.ValidUserOne ? (
                <>
                  <MenuItem onClick={() => {
                    goDash()
                    handleClose()
                  }}>Profile</MenuItem>

                  <MenuItem onClick={() => {
                    logoutuser()
                    handleClose()
                  }}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => {
                    goError()
                    handleClose()
                  }}>Profile</MenuItem>
                </>
              )
            }

          </Menu>


        </nav>
      </header>




        
        </div>

            <>
                {
                    data ? <div>
                        <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
                        {/* <h1>User Email : {logindata.ValidUserOne.email} </h1> */}
                    </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        Loading... &nbsp;
                        <CircularProgress color="secondary" />
                    </Box>
                }
            </>





        </>

    )
}

export default Dashbord