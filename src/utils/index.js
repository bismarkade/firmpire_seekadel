/* 
    Makes a call the movie database  using axious
*/

import axios from 'axios';

const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
    },
});

// https://api.themoviedb.org/3/authentication/token/new?api_key=<<api_key>>

export const fetchToken = async () => {
    try {
        // const response = await moviesApi.get('/authentication/token/new')
        // console.log(response);
        // we want to get the data object from the response and destructure it
        const { data } = await moviesApi.get('/authentication/token/new');
        const token = data.request_token;
        if(data.success){
            // Set token to local storage
            localStorage.setItem('request_token', token);

            // redirect
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Sorry your token was not created');
    }
}