// will make all the calles to the TMBD API

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  tmdbApiKey = process.env.TMDB_KEY;

export const tmdbApi = createApi({
    // every create api call must have:
    reducerPath: 'tmdbApi',
    // baseQuery will be a function call to fetch base query
    baseQuery: fetchBaseQuery({
        //  url of API 
        baseUrl: ''
    }),

});
