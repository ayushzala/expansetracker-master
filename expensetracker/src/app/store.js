import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../feature/user/userSlice'
import userdata from '../feature/user/userdata'
export const store = configureStore({
    reducer: {
        username: userReducer,
        userdata,
    },
})