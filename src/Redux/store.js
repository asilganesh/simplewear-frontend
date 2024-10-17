import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartStore";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { myOrdersReducer } from "./myOrdersStore";
import { authReducer } from "./authReducer";


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    authReducer,
    cartReducer,
    productReducer,
    myOrdersReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({

    reducer:persistedReducer,
    middleware: (getDefaultMiddleWare) =>  getDefaultMiddleWare({
            serializableCheck: false,
          }),
})

const persistor = persistStore(store);

export { store, persistor };