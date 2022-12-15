import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: '',
    },
    reducers:{
        selectGenreOrCategory: (state, action) => {
            // console.log(action.payload);
            state.genreIdOrCategoryName = action.payload;
            state.searchQuery = ''; // resets the search query to enable us search for a category
        },
        searchMovie: (state, action) => {
            // console.log("Here");
            // console.log(action.payload);
            state.searchQuery = action.payload;
        },
    },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;
export default genreOrCategory.reducer;