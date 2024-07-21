import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    },
    reducers:{
        login: (state,action)=>{
            localStorage.setItem('user',JSON.stringify(action.payload.user));
            localStorage.setItem('token',action.payload.token);
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        
        register:(state,action)=>{
            localStorage.setItem('user',JSON.stringify(action.payload.user));
            localStorage.setItem('token',action.payload.token);
            state.token = action.payload.token;
            state.user = action.payload.user;
        },

        logout:(state)=>{
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
        }

    }
})

export const { login,register,logout } = authSlice.actions;

export default authSlice.reducer;