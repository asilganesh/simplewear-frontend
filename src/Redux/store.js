import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartStore";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    cartReducer,
    productReducer
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