import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import smStates from "../utils/sm_states/index"
import { addOrdersAsync, fetchAllOrdersAsync, fetchOrdersAsync } from "../api/orders";


export const getOrders = createAsyncThunk('fetchOrders', async(userId) => {

    const data = await fetchOrdersAsync(userId)

    return data
})

export const getAllOrders = createAsyncThunk('fetchAllOrders', async() => {

    const data = await fetchAllOrdersAsync()

    return data
})


export const addToMyOrders = createAsyncThunk('addToMyOrdersList', async(ordersData) => {
    const data = await addOrdersAsync(ordersData)
    return data
})

export const updateOrderStatus = createAsyncThunk('updateOrderStatus', async(orderStatus) => {

    const newstatus = {
        _id: orderStatus.itemId,
        orderStatus: orderStatus.status
    }
    debugger;
})

const initialState = {
    orders: [],
    loading: false,
    error: null,
    status: smStates.IS_IDEAL
}

export const myOrdersReducer = createReducer(initialState,(builder) => {


    

    builder
    .addCase(getOrders.pending, (state) => {
        state.loading =true,
        state.status= smStates.IS_TRIGGERED
    })

    .addCase(getOrders.fulfilled, (state,action) => {
        state.loading = false,
        state.orders= action.payload.data.data
        state.status = smStates.IS_SUCCESSFUL
        if(!action.payload) {
            state.status = smStates.IS_SUCCESS_BUT_NO_DATA
        }
    })

    .addCase(getOrders.rejected, (state,action) => {

        state.loading= false,
        state.error= action.error.message,
        state.status= smStates.IS_FAILED
    })
    
    .addCase(getAllOrders.pending, (state) => {
        state.loading =true,
        state.status= smStates.IS_TRIGGERED
    })

    .addCase(getAllOrders.fulfilled, (state,action) => {
        state.loading = false,
        state.orders= action.payload.data.data
        state.status = smStates.IS_SUCCESSFUL
        if(!action.payload) {
            state.status = smStates.IS_SUCCESS_BUT_NO_DATA
        }
    })

    .addCase(getAllOrders.rejected, (state,action) => {

        state.loading= false,
        state.error= action.error.message,
        state.status= smStates.IS_FAILED
    })

    .addCase(addToMyOrders.pending,  (state) => {
        state.loading = true;
        state.status = smStates.IS_TRIGGERED;
    })
    .addCase(addToMyOrders.fulfilled,(state,action) => {
        state.loading = false;
            state.orders = action.payload.data
            state.status = smStates.IS_SUCCESSFUL;

            if(!action.payload){
                state.status = smStates.IS_SUCCESS_BUT_NO_DATA
            }
            
    })
    .addCase(addToMyOrders.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
            state.status = smStates.IS_FAILED;
    })
})