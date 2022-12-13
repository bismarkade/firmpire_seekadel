// will make all the calles to the TMBD API

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

const page = 1;

export const tmdbApi = createApi({
    // every create api call must have:
    reducerPath: 'tmdbApi',
    // baseQuery will be a function call to fetch base query
    baseQuery: fetchBaseQuery({
        //  url of API 
        baseUrl: 'https://api.themoviedb.org/3'
    }),
    // the callback funtion instantly returns a Object () => ({})
    endpoints: (builder) => ({
        // * Get Movies by [type]
        getMovies: builder.query({
            // get popular movies
            query: () => `movie/popular?api_key?page=${page}&api-key=${tmdbApiKey}`,
        }),
    }),
});


export const {
    //  redux tool kit automaticall create a hook for us
    useGetMoviesQuery,
} = tmdbApi;
