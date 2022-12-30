// will make all the calls to the TMBD API

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

        // * Get Movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {

                //' Get Movies by Search
                if(searchQuery){
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get Movies by Category (popular, top_rated, upcoming -> string)
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

        //* Get Movie (one movie)
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`  
        }),

        //* Get User Specific Lists (Favorited or watchlisted)
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
        }),

        getRecommendations: builder.query({
            query: ({movie_id, list} ) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),

        //* Get Actor Details
        getActorsDetails: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}`
        }),

        //* Get Movies by Actor id 
        getMoviesByActorId: builder.query({
            query: ({id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        }),

    }),
});


export const {
    //  redux tool kit automatically create a hook for us
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorsDetailsQuery,
    useGetMoviesByActorIdQuery,
    useGetListQuery, 
} = tmdbApi;
