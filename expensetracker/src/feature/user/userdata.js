import { createSlice } from "@reduxjs/toolkit";

export const userdata = createSlice({
        name: "userdata",
        initialState: [],
        reducers: {
            //adddata 1st time
            addData: (userdata, action) => {
                return userdata.concat(action.payload);
            },
            deleteData: (userdata, action) => {
                // Find the index of the item to delete
                const index = userdata.findIndex((entry) => entry._id === action.payload);
                console.log(action.payload);
                // Check if the item exists (index not -1)
                if (index !== -1) {
                    // Remove the item at the correct index using splice
                    userdata.splice(index, 1);
                }

                // Return the modified userdata array
                return userdata;
            },

            updateData: (userdata, action) => {
                return userdata.map((entry) =>
                    entry._id === action.payload._id ? action.payload : entry
                )
            }
        }
    })
    //Action creators are generated for each case
export const { addData, deleteData, updateData } = userdata.actions;

//Selectors get the data from the
export default userdata.reducer;