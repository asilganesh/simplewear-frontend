import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartStore";

const store = configureStore({

    reducer:{
        productReducer,
        cartReducer
    }
})

export default store