import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import smStates from "../utils/sm_states"
import { fetchProductByIdAsync } from "../api/products"

export const fetchProductById = createAsyncThunk('getProductById', async(productId) => {
    const response = await fetchProductByIdAsync(productId)
    return response
})

const initialState ={
    productData : {},
    status:smStates.IS_IDEAL,
    error: null,
    loading: false
}

export const productDetailsReducer =  createReducer(initialState,(builder)=> {
    builder
    .addCase(fetchProductById.pending, (state) => {

        state.loading = true
        state.error=null
        state.status=smStates.IS_TRIGGERED
    })
    .addCase(fetchProductById.fulfilled, (state,action) => {
        state.loading = false,
        state.status = smStates.IS_SUCCESSFUL
        state.productData = action.payload.productDetails.responseData

        if(!action.payload){
            state.status = smStates.IS_SUCCESS_BUT_NO_DATA
        }
    })
    .addCase(fetchProductById.rejected, (state,action) => {
        state.loading=false,
        state.status=smStates.IS_FAILED
        state.error=action.error
    })
})