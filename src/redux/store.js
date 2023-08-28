import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import productSlice from "./apiSlice/productSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key : "root",
//     version : 1,
//     storage,
// }

// const reducer = combineReducers({
//     cart: cartSlice,
//     products: productSlice,
// })

// const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
    // reducer:persistedReducer
    reducer:{
        cart:cartSlice,
        products: productSlice,
    }
});

export default store;