import React, { useEffect, useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, UseMediaQuery, Rating  } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link , useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMBD';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { userSelector } from '../../features/auth';

import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { MovieList } from '..'

const MovieInformation = () => {
  const history = useHistory();
  const {user} = useSelector(userSelector);
  const classes = useStyles();
  const  { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  
  // console.log('user- test');
  // console.log(user.user.id);

  const { data, isFetching , error } = useGetMovieQuery(id);
  const { data: favoriteMovies, isFetching: isFavoriteFetching } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1  });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1  });
  const { data: recommendations, isFetching: isRecommendationsFetching} = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id});
  

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  // if(favoriteMovies && data ){
  //   console.log(data.id);
  //   console.log('#######');
  //   console.log(!!favoriteMovies.results.find((movie) => movie.id === data.id));
  // }



  // knowing if we have favorited or watchlisted a movie before
  // !{} -> falsy 
  // !!{} -> falsy -> true

  useEffect(() => {
    if(favoriteMovies && data ){
      setIsMovieFavorited(!!favoriteMovies.results.find((movie) => movie.id === data.id));
    }
  }, [favoriteMovies, data])
  
  useEffect(() => {
    if(watchlistMovies && data ){
      setIsMovieWatchlisted(!!watchlistMovies.results.find((movie) => movie.id === data.id));
    }
  }, [watchlistMovies, data])
  
 
  // create a direct api call here with axious instead of redux query || becoz redux tool querry allow us to fetch certain things only as hooks
  // api call to our tmdb 
  const addToFavourites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, 
            {
              media_type: 'movie',
              media_id: id,
              favorite: !isMovieFavorited,
            } );
    setIsMovieFavorited((prev) => !prev)    
  };
  // console.log(addToFavourites);

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, 
    {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    } );
    setIsMovieWatchlisted((prev) => !prev)    
  };

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
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginButton: '30px' }} >
          <img 
             className={classes.poster}
              // src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt={data.title}
          />
      </Grid>
      <Grid item container direction='column' lg={7}  >
        <Typography variant='h3' align='center' gutterBottom>
          {data.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data.tagline} 
        </Typography>
        <Grid item className={classes.containerSpaceAround} >
          <Box display='flex' align='center'>
            <Rating readOnly value={data.vote_average / 2} />  
            <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px'}} >
            {data.vote_average} / 10
          </Typography>
          </Box>
          <Typography variant='h6' align='center'  gutterBottom >
            {data.runtime} min |  Language: {data.spoken_languages[0].name }
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
        <Typography variant='h5' gutterBottom style={{ marginTop: '10px'}}> 
            Overview
        </Typography>
        <Typography style={{ marginButtom: '2rem'}} gutterBottom > 
            {data.overview}
        </Typography>
        <Typography variant='h5' gutterBottom > 
            Top Cast
        </Typography>

        <Grid item container spacing={2} > 
            {data && data.credits.cast.map((character, i) => (
              // get actors with Images only
              character.profile_path && (
                  <Grid key={i} item  xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}} > 
                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                <Typography color='textPrimary'> { character.name } </Typography>
                <Typography color='textSecondary'> { character.character.split('/')[0] } </Typography>
                </Grid>
                )
            )).slice(0 , 6) } 
        </Grid>
        <Grid  item container style={{ marginTop: '2rem'}} >
              <div className={classes.buttonsContainer}>
                  <Grid item xs={12} sm={6}  className={classes.buttonsContainer} >
                    <ButtonGroup size='small' variant='outlined'>
                      <Button target='_blank' rel='noopener noreferrer' href={data.homepage}  endIcon={<Language />} > Website </Button>
                      <Button target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data.imdb_id}`}  endIcon={<MovieIcon />} > IMDB </Button>
                      <Button onClick={() => setOpen(true)} href='#'  endIcon={<Theaters />} > Trailors </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}  className={classes.buttonsContainer} >
                    <ButtonGroup size='medium' variant='outlined'>
                      <Button onClick={addToFavourites} href='#'  endIcon={ isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite /> } > 
                          { isMovieFavorited ?  'Unfavorite' : 'Favorite'}
                       </Button>
                      <Button onClick={addToWatchlist} href='#'  endIcon={ isMovieWatchlisted ? <Remove /> : <PlusOne /> } > 
                          WatchList
                       </Button>
                      <Button   endIcon={ <ArrowBack /> } sx={{borderColor: 'primary.main'}}  onClick={() => history.goBack()}> 
                          <Typography style={{ textDecoration: 'none'}} color='inherit' variant='subtitle2'> 
                              Back
                          </Typography>
                       </Button>
                    </ButtonGroup>
                  </Grid>
              </div>
        </Grid>
        
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center' > 
                You might also like
        </Typography>
        {/* Loop through the recommended movies... */}
        {recommendations 
          ? <MovieList  movies={recommendations} numberOfMovies={12} />
          : <Box> Sorry, Nothing was Found </Box>
        }
      </Box>
      <Modal 
        closeAfterTransition 
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        >
        {data.videos.results.length > 0 && (
          <iframe 
            autoPlay
            className={classes.video}
            frameBorder='0'
            title='Trailer'
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow='autoplay'
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;