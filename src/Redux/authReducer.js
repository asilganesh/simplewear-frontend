import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states";
import { userLoginAsync, userRegistrationAsync } from "../api/auth";

export const registerUser = createAsyncThunk('registerUser',async(userData) => {

    const response =await userRegistrationAsync(userData)

    return response
})

export const loginUser = createAsyncThunk('loginUser',async(userData) => {

    const response = await userLoginAsync(userData)

    return response
})

export const logoutUser = createAsyncThunk('logoutUser',() => {
    return
} )

const initialState = {
    user: null,
    loading: false,
    status: smStates.IS_IDEAL,
    error: null
}

export const authReducer = createReducer(initialState,(builder) => {

    builder
    .addCase(registerUser.pending, (state) =>{
        state.loading = true;
        state.status = smStates.IS_TRIGGERED
    })

    .addCase(registerUser.fulfilled, (state,action) => {
        state.loading = false;
        state.user = action.payload
        state.status = smStates.IS_SUCCESSFUL

        if(!action.payload) {
            state.status = smStates.IS_SUCCESS_BUT_NO_DATA
        }
    })

    .addCase(registerUser.rejected, (state,action) => {
        state.loading = false,
        state.error = action.error.message;
        state.status = smStates.IS_FAILED
    })

    .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.status = smStates.IS_TRIGGERED
    })

    .addCase(loginUser.fulfilled, (state,action) => {
        state.loading =false;
        state.user = action.payload;
        state.status = smStates.IS_SUCCESSFUL

        if(!action.payload) {
            state.status =smStates.IS_SUCCESS_BUT_NO_DATA
        }
    })

    .addCase(loginUser.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status =smStates.IS_FAILED

    })

    .addCase('loginSuccess', (state, action) => {
        state.user = action.payload; 
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; 
      });
})