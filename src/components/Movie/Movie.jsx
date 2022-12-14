import React from 'react';
import { Typography, Grid, Grow, Tooltip , Rating } from '@mui/material';
import { Link } from 'react-router-dom';


import useStyle from './styles';

const Movie = ({ movie, i }) => {
    console.log(movie, i);
    console.log(movie.poster_path);
    const classes = useStyle();

  return (
    <Grid 
        item 
        xs={12} // take 12 spaces of 12 in extra small devices
        sm={6} // fix 2 on small devices 6/12 for eact 
        md={4}  lg={3}   xl={2} // 6
        className={classes.movie}
       >
        <Grow in key={i} timeout={(i + 1) * 250} >  
            <Link 
                className={classes.links} 
                to={`/movie/${movie.id}`} 
              >
                <img 
                    alt={movie.title} 
                    className={classes.image} 
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://www.fillmurray.com/200/300"} 
                />
            <Typography className={classes.title} variant='h5' > {movie.title}</Typography>
            </Link>
        </Grow>
    </Grid>
  )
}

export default Movie;