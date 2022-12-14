import React from 'react';
import { Typography, Grid, Grow, Tooltip , Rating } from '@mui/material';
import { Link } from 'react-router-dom';


import useStyle from './styles';

const Movie = ({ movie, i }) => {
    console.log(movie, i);
    const classes = useStyle();

  return (
    <Grid 
        item 
        xs={12} // take 12 spaces of 12 in extra small devices
        sm={6} // fix 2 on small devices 6/12 for eact 
        md={4}  lg={3}   xl={2} // 6
        className={classes.movie}
     >
     <Typography className={classes.title} variant='h5' > {movie.title }</Typography>

    </Grid>
  )
}

export default Movie;