import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index"
import fetchProductsAsync from "../api/products"


export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    const response = await fetchProductsAsync()
    
    return response
})

const initialState = {
    products: [],
    loading: false,
    error: null,
    status: smStates.IS_IDEAL
}

export const productReducer = createReducer(initialState,(builder) => {

    builder.addCase(fetchProducts.pending,  (state) => {
        state.loading = true;
        state.status = smStates.IS_TRIGGERED;
    })
    .addCase(fetchProducts.fulfilled,(state,action) => {
        state.loading = false;
            state.products = action.payload.products
            state.status = smStates.IS_SUCCESSFUL;
            if(!action.payload){
                state.status = smStates.IS_SUCCESS_BUT_NO_DATA
            }
    })
    .addCase(fetchProducts.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
            state.status = smStates.IS_FAILED;
    })
})