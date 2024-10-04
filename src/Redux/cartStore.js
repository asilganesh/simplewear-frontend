import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index"


export const addToCart = createAsyncThunk('addToCart', async(product) => {
    // const response = await fetchProductsAsync()
    return product
})

const initialState = {
    cart: [],
    loading: false,
    error: null,
    status: smStates.IS_IDEAL
}

export const cartReducer = createReducer(initialState,(builder) => {

    builder.addCase(addToCart.pending,  (state) => {
        state.loading = true;
        state.status = smStates.IS_TRIGGERED;
    })
    .addCase(addToCart.fulfilled,(state,action) => {
        state.loading = false;
            state.cart = [...state.cart,action.payload];  
            state.status = smStates.IS_SUCCESSFUL;
            if(!action.payload){
                state.status = smStates.IS_SUCCESS_BUT_NO_DATA
            }
    })
    .addCase(addToCart.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
            state.status = smStates.IS_FAILED;
    })
})