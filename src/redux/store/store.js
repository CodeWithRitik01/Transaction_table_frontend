import { configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "../reducers/transactions";

export const store = configureStore({
    reducer:{
        transactionReducer
    }
})