import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index"
import fetchProductsAsync from "../api/products"


export const fetchProducts = createAsyncThunk('products/fetchProducts', async(search,categories=null,) => {
    console.log(categories)
 


    const categoryFilters = [];
    const subCategoryFilters = [];
    const {sortOrder} = categories

    if(categories){
    const { men, women, kids, topWear, bottomWear, winterWear } = categories;

    if (men) categoryFilters.push('Men');
    if (women) categoryFilters.push('Women');
    if (kids) categoryFilters.push('Kids');
    if (topWear) subCategoryFilters.push('Topwear');
    if (bottomWear) subCategoryFilters.push('Bottomwear');
    if (winterWear) subCategoryFilters.push('Winterwear');
    }

    const searchQuery = {
        filter: {
            category: {
                $in: categoryFilters, 
            },
            subCategory: {
                $in: subCategoryFilters,
            },
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { subCategory: { $regex: search, $options: 'i' } },
              ]
        },
        sort:{
            $eq:sortOrder
        }
    };
    const response = await fetchProductsAsync({queryParams : searchQuery})
    
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