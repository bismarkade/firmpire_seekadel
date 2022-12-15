import React , {useState} from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AcUnit, AccountCircle, Brightness4, Brightness7, NoBackpackSharp} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {fetchToken} from './../../utils/index';
import { Search, Sidebar} from '..';
// Import custom style
import useStyles from  './styles';

const NavBar = () => {

  // use State to track if app is used a mobile or not
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hook for custom styles 
  const classes = useStyles();

  // hook for mobile media query 
  const isMobile = useMediaQuery('(max-width:600px)');

  // Hook for usetheme--> can use to check if we are dark or white mode
  const theme = useTheme();

  const isAuthenticated = false;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
           {/* implement media Query here */}
           {/* if mobile view */}
           {isMobile && (
              <IconButton 
                color="inherit"
                edge="start"
                style={{ outline: 'none'}}
                // toggle the sidebar on when in mobile
                onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} // sets the Mobile function to a different state it was previously
                className={classes.menuButton}
              >
                <Menu />

              </IconButton>
           ) }
           <IconButton 
              color="inherit"
              sx={{ ml: 1}} // sx allows for custom mui style
              onClick={()=> {}}
           >
            {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
           </IconButton>
           {/* render a search component if its not mobile */}
           {!isMobile && <Search />}
          
          <div>
           {/* Show info if  authencated and not */}
           {!isAuthenticated ? (
                <Button 
                  color='inherit'
                  onClick={fetchToken}
                  >
                    login &nbsp; <AccountCircle />
                </Button>
              ):(
                <Button 
                  color='inherit'
                  component ={Link}
                  to={`/profile/:id`}
                  className={classes.linkButton}
                  onClick= {()=> {}}
                >
                 {/* but if not Mobile display an empty fragment with myMovies */}
                 {!isMobile && <> My Movies &nbsp; </>}
                 {/* img of a specific login person */}
                  <Avatar
                    style={{width:30, height:30}}
                    alt='profile'
                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                  />
                </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
            {/* components if mobile or otherwise (desktop) */}
           
            {isMobile ? (
                <Drawer
                  variant='temporary'
                  anchor='right'
                  open={mobileOpen} // a state which tell if its mobile open or not
                  // fire on close --> we toggle 
                  onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                  className={classes.drawerBackground}
                  classes={{paper: classes.drawerPaper}} //sepcial way of adding styles or classes from MUI components / overide exisitng components
                  ModalProps={{keepMounted:true}}
                >
                  {/* Create the sidebar component in the Drawer  and parse the setMobileOpen State there
                  -> this will ensure we are able to modify from in there */}
                  <Sidebar setMobileOpen={setMobileOpen} />
                </Drawer>
              ) : (
                <Drawer 
                  classes={{ paper: classes.drawerpaper }}
                  variant='permanent'
                  open // always set to true on desktop
                >
                  <Sidebar setMobileOpen={setMobileOpen} />
                </Drawer>

              )}
        </nav>
        
      </div>
    
    </>
  );
};

export default NavBar;

