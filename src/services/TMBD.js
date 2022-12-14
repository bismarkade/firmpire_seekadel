// will make all the calles to the TMBD API

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

// const page = 1;

export const tmdbApi = createApi({
    // every create api call must have:
    reducerPath: 'tmdbApi',
    // baseQuery will be a function call to fetch base query
    //  url of API 
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3' }),
    // the callback funtion instantly returns a Object () => ({})

    endpoints: (builder) => ({ 
        //* Get Genres
        getGenres: builder.query({
            query:() => `genre/movie/list?api_key=${tmdbApiKey}`
        }),

        // * Get Movies by [type]
        getMovies: builder.query({
            // get popular movies
            query: ({ genreIdOrCategoryName, page }) => {

                //* Get Movies by Cartegory (popular, top_rated, upcoming -> string)
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                //* Get Movies by Genre (12, 15 -> number)
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }

                 //* Get Popular movies
               return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            },
        }),
    }),
});


export const {
    //  redux tool kit automaticall create a hook for us
    useGetGenresQuery,
    useGetMoviesQuery,
} = tmdbApi;
