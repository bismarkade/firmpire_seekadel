import React from 'react';
import { Modal, Typography, Button, Buttongroup, Grid, Box, CircularProgress, UseMediaQuery, Rating  } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutline, Remove, ArrowBack } from '@mui/icons-material';
import { Link , useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetMovieQuery } from '../../services/TMBD';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import useStyles from './styles';
import genreIcons from '../../assets/genres';

const MovieInformation = () => {
  const classes = useStyles();
  const  { id } = useParams();
  const { data, isFetching , error } = useGetMovieQuery(id);
  const dispatch = useDispatch();

  console.log(data);

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
    <Grid container className={classes.containerSpaceAround} >
      <Grid item sm={12} lg={4} >
          <img 
             className={classes.poster}
              // src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt={data.title}
          />
      </Grid>
      <Grid item container direction='column' lg={7} >
        <Typography variant='h3' align='center' gutterButtom>
          {data.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterButtom>
          {data.tagline} 
        </Typography>
        <Grid item className={classes.containerSpaceAround} >
          <Box display='flex' align='center'>
            <Rating readOnly value={data.vote_average / 2} />  
            <Typography variant='subtitle1' gutterButtom style={{ marginLeft: '10px'}} >
            {data.vote_average} / 10
          </Typography>
          </Box>
          <Typography variant='h6' align='center'  gutterButtom >
            {data.runtime} min  {data.spoken_languages.length > 0 ? `/ ${data.spoken_languages[0].name} `: ''  }
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer} >
          {data.genres.map((genre, i) => (
            <Link  key={genre.name} className={classes.links} to='/' onClick={() => dispatch(selectGenreOrCategory(genre.id))} >
              <img src={genreIcons[genre.name.toLowerCase()]}  className={classes.genreImage} height={30}  />
              <Typography color='textPrimary' variant='subtitle1' >
                {genre.name}
               </Typography>
            </Link> 
          ))}
        </Grid>
        
      </Grid>
    </Grid>
  );
};

export default MovieInformation;