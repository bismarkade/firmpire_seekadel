import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography} from '@mui/material';
import { useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMBD';
import {MovieList} from '..';


const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page}); 

  // console.log('genreIdOrCategoryName:');
  // console.log(genreIdOrCategoryName);

  if(isFetching){
    return (
      <Box 
        display='flex' justifyContent='center'  
        >
        <CircularProgress size='4rem' />
      </Box>
    )
  };

  if(!data.results.length){
    return (
      <Box 
        display='flex' alignItems='center' mt='20px'
        >
        <Typography variant='h4'>
            No Movie matches that name.
            <br />
            Please Search for Something else
          </Typography>
      </Box>
    )
  };

  if(error) return 'An Error has occured.'

  return (
    <div>
    {/* parse movies as props with the data from the api */}
    <MovieList movies={data} />
    
    </div>
  );
};

export default Movies;