import React from 'react';
import './OfficerSidebar.css';
import { connect } from 'react-redux';
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DownloadingIcon from '@mui/icons-material/Downloading';
import DashboardIcon from '@mui/icons-material/Dashboard';


const OfficerSidebar = (props , Officer) => {

  const [SideBarDetails, setSideBarDetails] = useState()
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem('userId'))
    useEffect(() => {
        // console.log({userId});
        axios.post(`${BACKEND_URL}placement/profile`, {userId})
            .then((res) => {
                if (res.data) {
                    setSideBarDetails(res.data)
                }
                else {
                    alert("fetching error")
                }
            })
            .catch((err) => {
                alert(err)
            })
    }, [])
    console.log(SideBarDetails);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><img  src='' className='Officer-pic'   style={{ fontSize: '3rem' }} /></ListItemIcon>
            <p>{SideBarDetails?.name}</p>
          </ListItemButton>
          </ListItem>

         
             <ListItem disablePadding >
                  <ListItemButton component={Link} to="/officer/officerprofile">
                    <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                    <ListItemText primary={"Profile"}/>
                  </ListItemButton>
             </ListItem>
             

              
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/officer/createplacement">
                    <ListItemIcon><AddCircleOutlineIcon/></ListItemIcon>
                    <ListItemText primary={"Create placement"}/>
                  </ListItemButton>
                </ListItem>
              

             
                <ListItem disablePadding >
                  <ListItemButton component={Link} to="/officer/manageplacement">
                    <ListItemIcon><ManageHistoryIcon/></ListItemIcon>
                    <ListItemText primary={"Manage placement"}/>
                  </ListItemButton>
                </ListItem>
            

            
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/officer/officerchat">
                    <ListItemIcon><ChatIcon/></ListItemIcon>
                    <ListItemText primary={"Officer chat"}/>
                  </ListItemButton>
                </ListItem>


                
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/officer/dashboard">
                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                    <ListItemText primary={"Dashboard"}/>
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/officer/getdetails">
                    <ListItemIcon><DownloadingIcon/></ListItemIcon>
                    <ListItemText primary={"Download data"}/>
                  </ListItemButton>
                </ListItem>
           
        

         <ListItem className='OfficerLogOutButtton' disablePadding>
            <ListItemButton component={Link} to='/'>
              <ListItemIcon><LogoutIcon/></ListItemIcon>
              <ListItemText primary={"Logout"}/>
            </ListItemButton>
         </ListItem>

       
      </List>
    </Box>
  );



return (
<div className='Officer-sidebar'>
  {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
    <React.Fragment key={anchor}>
      <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  ))} */}


  <React.Fragment >
    <MenuIcon onClick={
        toggleDrawer("left",true)
    }/>

<Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
  </React.Fragment>
</div>
)
}
export default (OfficerSidebar)


