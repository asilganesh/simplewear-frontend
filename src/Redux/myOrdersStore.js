import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index"



export const addToMyOrders = createAsyncThunk('addToMyOrdersList', async(data) => {
    
    debugger;
    return data
})

const initialState = {
    myOrders: [],
    loading: false,
    error: null,
    status: smStates.IS_IDEAL
}

export const myOrdersReducer = createReducer(initialState,(builder) => {

    builder.addCase(addToMyOrders.pending,  (state) => {
        state.loading = true;
        state.status = smStates.IS_TRIGGERED;
    })
    .addCase(addToMyOrders.fulfilled,(state,action) => {
        state.loading = false;
            state.myOrders = action.payload
            state.status = smStates.IS_SUCCESSFUL;
            
    })
    .addCase(addToMyOrders.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
            state.status = smStates.IS_FAILED;
    })
})