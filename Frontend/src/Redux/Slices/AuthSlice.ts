import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserModel from "../../Models/UserModel";
// Create Slice
const authSlice = createSlice ({
    name:"auth",
    initialState: null,
    reducers: {// Reducer for register:
        register (currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
            const registeredUser = action.payload
            const newState = registeredUser
            return newState;
        },
        
        // Reducer for login:
        login (currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
            const loggedInUser = action.payload
            const newState = loggedInUser
            return newState;
        },
        
        // Reducer for logout:
        logout (currentState: UserModel, action: PayloadAction): UserModel {
            return null;
        }}
});


export const authActionCreators = authSlice.actions;
export const authReducersContainer = authSlice.reducer;