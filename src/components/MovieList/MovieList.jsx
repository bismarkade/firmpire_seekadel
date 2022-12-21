import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const MovieList = ({ movies, numberOfMovies }) => {
    const classes = useStyles();

    // console.log('movies from actor');
    // console.log(movies.results);
    // movies.results.map((movie, id) => {
    //   console.log(movie);
    // })


  return (
    <Grid container className={classes.moviesContianer} >
        {movies.results.slice(0, numberOfMovies).map((movie, i) => (
            <Movie  key={i} movie={movie} i={i}  />
        ))}
    </Grid>
  )
};

export default MovieList;