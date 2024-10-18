import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../Slices/AuthSlice'
import { userSlice } from '../Slices/UserSlice'

let state = {}

export const store = configureStore({
    preloadedState: state,
    reducer: combineReducers({
        auth: authSlice.reducer,
        user: userSlice.reducer
    })
})