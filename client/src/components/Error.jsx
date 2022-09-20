import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Error = () => {
  const history = useNavigate()
  return (
    <div>
       <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      
    </Stack>

    <h3>Dont have account ? <NavLink to='/register'>SignUp</NavLink> here </h3>
    <h3>Already have account ? <NavLink to='/'>Login</NavLink> here</h3>
    
    </div>
  )
}

export default Error