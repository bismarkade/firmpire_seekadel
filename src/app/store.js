// place where we configure the redux toolkit store
import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMBD";
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

export default configureStore({
    // provide the reducer objects and speci
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});

// will be access at src/index.js  --> the entry point 

