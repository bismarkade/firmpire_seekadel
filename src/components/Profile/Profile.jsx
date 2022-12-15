import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { setUser, userSelector } from '../../features/auth';

const Profile = () => { 
  const { user } = useSelector(userSelector);

  const favoriteMovies = [];

  const logout = () => {
      localStorage.clear();

      window.location.href = '/';
  }

  return (
    <Box >
      <Box  display='flex' justifyContent='space-between'  >
          <Typography variant='h4' gutterBottom > My Profile </Typography>
          <Button color='inherit' onClick={logout} >
              Logout &nbsp; <ExitToApp />
          </Button>
          {!favoriteMovies.length 
            ? <Typography variant='h5' >Add favourates to see here! </Typography>
            : (<Box > 
            FAVOURITE MOVIES
              </Box>)}
      </Box>
    </Box>
  );
};

export default Profile;