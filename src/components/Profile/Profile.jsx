import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { RatedCards } from '..';
import { setUser, userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMBD';

const Profile = () => { 
  const { user } = useSelector(userSelector);
  console.log(user.id);
  console.log({user});
  const { data: favoriteMovies, refetch: refetchFavourites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1  });


  useEffect(() => {
    refetchFavourites();
    refetchWatchlisted();
  }, [])
  
  // const favoriteMovies = [];
  const logout = () => {
      localStorage.clear();

      window.location.href = '/';
  }

  return (
    <Box >
      <Box  display='flex' justifyContent='space-between' flexDirection='column' >
          <Typography variant='h4' gutterBottom > My Profile </Typography>
          <Button color='inherit' onClick={logout} >
              Logout &nbsp; <ExitToApp />
          </Button>
          { (favoriteMovies && !favoriteMovies.results.length) && (watchlistMovies && !watchlistMovies.results.length)
            ? <Typography variant='h5' >Add favourates to see here! </Typography>
            : (
              <Box> 
                <RatedCards title='Favorite Movies' data={favoriteMovies} />
                <RatedCards title='Watchlist Movies' data={watchlistMovies} />
              </Box>
              ) }
      </Box>
    </Box>
  );
};

export default Profile;