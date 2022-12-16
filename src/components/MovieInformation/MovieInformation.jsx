import React from 'react';
import { Modal, Typography, Button, Buttongroup, Grid, Box, CircularProgress, UseMediaQuery, Rating  } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutline, Remove, ArrowBack } from '@mui/icons-material';
import { Link , useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetMovieQuery } from '../../services/TMBD';

const MovieInformation = () => {
  const  { id } = useParams();
  const { data, isFetching , error } = useGetMovieQuery(id);
  // console.log(data);

  if(isFetching){
    return ( 
    <Box display='flex' justifyContent='center' alignContent='center'> 
      <CircularProgress size='8rem' />
    </Box>
    )
  }
  if(error){
    return ( 
    <Box display='flex' justifyContent='center' alignContent='center'> 
      <Link to='/'>Something has gone wrong - go back</Link>
    </Box>
    )
  }



  return (
    <div>
        MovieInformation {id}
    </div>
  );
};

export default MovieInformation;