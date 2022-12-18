import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: ''
};

const authSlice = createSlice({
    name: 'user', 
    initialState, 
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // console.log("inside auth js");
            // console.log(action.payload);
            state.isAuthenticated = true; 
            state.sessionId = localStorage.getItem('session_id');

            localStorage.setItem('accountId', action.payload.id)
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer; 

// gets the entire state and pulls only the user from it
export const userSelector = (state) => state.user;
