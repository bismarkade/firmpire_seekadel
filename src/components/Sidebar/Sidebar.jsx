import React, { useEffect } from 'react';
import { Divider, List, listItem, ListItemText, ListSubheader, 
        ListItemIcon, Box, CircularProgress, ListItem} from '@mui/material';
import {Link} from 'react-router-dom';
import { useTheme } from '@mui/styles';

import useStyles from './styles';

// larger category mock data
const categories = [
  {label: 'Popular', value: 'popular'},
  {label: 'Top Rated', value: 'top_rated'},
  {label: 'Upcoming', value: 'upcoming'},
];

// Mock of all the categories
const demoCategories = [
  {label: 'Comedy', value: 'comedy'},
  {label: 'Action', value: 'action'},
  {label: 'Horror', value: 'horro'},
  {label: 'Animation', value: 'animation'},
];


// const demoCategories = ['Comedy', 'Action', 'Animation'];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';


const Sidebar = ( {setMobileOpen}) => {
    const theme = useTheme(); 
    const classes = useStyles();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img 
            className={classes.image}
            // The src depends if its dark or light theme
            src={theme.palette.mode === 'light' ?  redLogo : blueLogo }
            alt="Filmpire Logo"
        />
      </Link> 
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({label , value}) => (
          // we use () instead of {} because we want to instantly return it

          // we want to display a link for each category 
          <Link 
            key={value}
            className={classes.links}
            to="/"
           >
            <ListItem 
                onClick={() => {}}
                button // the list item should be a button
              >
                {/* <ListItemIcon>
                  <img src={redLogo}  className={classes.genreImages} height={30}  />
                </ListItemIcon> */}

                <ListItemText primary={label} />

            </ListItem>
          </Link>

        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({label , value}) => (
          // we use () instead of {} because we want to instantly return it

          // we want to display a link for each category 
          <Link 
            key={value}
            className={classes.links}
            to="/"
           >
            <ListItem 
                onClick={() => {}}
                button // the list item should be a button
              >
                {/* <ListItemIcon>
                  <img src={redLogo}  className={classes.genreImages} height={30}  />
                </ListItemIcon> */}

                <ListItemText primary={label} />

            </ListItem>
          </Link>

        ))}
      </List>

    </>
  );
};

export default Sidebar;