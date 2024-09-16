import './AdminSidebar.css'
import { connect } from 'react-redux';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
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
                <ListItemIcon><AdminPanelSettingsIcon className='AdminIconMUI'   style={{ fontSize: '3rem' }} /></ListItemIcon>
                <h4>Admin</h4>
              </ListItemButton>
              </ListItem>

             
                 <ListItem disablePadding >
                      <ListItemButton component={Link} to="/admin/createstudent">
                        <ListItemIcon><PersonAddAltIcon/></ListItemIcon>
                        <ListItemText primary={"Create Student"}/>
                      </ListItemButton>
                 </ListItem>
                 
    
                  
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/admin/createofficer">
                        <ListItemIcon><AccessibilityIcon/></ListItemIcon>
                        <ListItemText primary={"Create Officer"}/>
                      </ListItemButton>
                    </ListItem>
                  
    
                 
                    <ListItem disablePadding >
                      <ListItemButton component={Link} to="/admin/managestudents">
                        <ListItemIcon><ManageAccountsIcon/></ListItemIcon>
                        <ListItemText primary={"Manage students"}/>
                      </ListItemButton>
                    </ListItem>
                

                
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/admin/manageofficer">
                        <ListItemIcon><ManageHistoryIcon/></ListItemIcon>
                        <ListItemText primary={"Manage Officers"}/>
                      </ListItemButton>
                    </ListItem>
               
            

             <ListItem className='AdminLogOutButtton' disablePadding>
                <ListItemButton component={Link} to='/'>
                  <ListItemIcon><LogoutIcon/></ListItemIcon>
                  <ListItemText primary={"Logout"}/>
                </ListItemButton>
             </ListItem>

           
          </List>
        </Box>
      );
    


  return (
    <div className='Admin-sidebar'>
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

export default AdminSidebar