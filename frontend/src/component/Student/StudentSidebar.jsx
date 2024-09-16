
import './StudentSidebar.css'
import { connect } from 'react-redux';
import * as React from 'react';
import axios from 'axios'
import { BACKEND_URL } from '../Redux/constrant'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import  { useEffect, useState } from 'react'


const StudentSidebar = ( student ) => {

  console.log(student);
  const [StudSidebarDetails, setStudSidebarDetails] = useState()
  const id = localStorage.getItem('userId')
  useEffect(() => {
      axios.post(`${BACKEND_URL}student/getuser`, { id })
          .then((res) => {
              setStudSidebarDetails(res.data)
          })
          .catch((e) => {
              alert(e.message)
          })
  }, [id])

  console.log(StudSidebarDetails);

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
                <ListItemIcon><img src="" className='StudentProfPic'   style={{ fontSize: '3rem' }} /></ListItemIcon>
                <p>{StudSidebarDetails?.fname} {" "} {StudSidebarDetails?.mname} {" "} {StudSidebarDetails?.lname}</p>
              </ListItemButton>
              </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/student/studentprofile" >
                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                <ListItemText primary={"Profile"}/>
              </ListItemButton>
              </ListItem>

             <ListItem disablePadding>
                <ListItemButton component={Link} to="/student/studentregister" >
                  <ListItemIcon><HowToRegIcon/></ListItemIcon>
                  <ListItemText primary={"Profile Edit"}/>
                </ListItemButton>
             </ListItem>

              <ListItem disablePadding>
                <ListItemButton  component={Link} to="/student/viewplacement">
                  <ListItemIcon><WorkIcon/></ListItemIcon>
                  <ListItemText primary={"Placements"}/>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/student/studentchat">
                  <ListItemIcon><ChatIcon/></ListItemIcon>
                  <ListItemText primary={"Chat"}/>
                </ListItemButton>
              </ListItem>

             <ListItem className='StudentLogOutButtton' disablePadding>
                <ListItemButton component={Link} to="/">
                  <ListItemIcon><LogoutIcon/></ListItemIcon>
                  <ListItemText primary={"Logout"}/>
                </ListItemButton>
             </ListItem>

           
          </List>
        </Box>
      );
    


  return (
    <div className='Student-sidebar'>
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

const mapStateToProps = (state) => ({
  student: state.userdata
});

export default connect(mapStateToProps)(StudentSidebar)