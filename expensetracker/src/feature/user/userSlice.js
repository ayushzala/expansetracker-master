import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const userSlice = createSlice({
    name: 'username',
    initialState: {
        name: "",
        email: "",
        _id: "",
    },
    reducers: {
        setUser: (state, action) => {
            // console.log(action.payload);
            const { name, email, _id } = action.payload;
            state.name = name;
            state.email = email;
            state._id = _id;
        },
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;