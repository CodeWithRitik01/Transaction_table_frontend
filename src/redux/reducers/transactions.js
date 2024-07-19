import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const server = "http://localhost:4000"

const INITIALSTATE = {
   transactions:[],
 
}

//asyncThunk for getting all watchlist on every rendering
export const getInitialStateAsync = createAsyncThunk("api/trans",
    () => {
        const data = axios.get(`${server}/api/v1/transaction/get`)
        console.log(data)
        return data;
    }
)



const transactionSlice = createSlice({
    name:"Transactions",
    initialState:INITIALSTATE,
    reducers:{


    },

    extraReducers:(builder)=>{
        builder.addCase(getInitialStateAsync.fulfilled,(state, action)=>{
            console.log(action.payload.data)
            state.transactions = [...action.payload.data,]
            console.log(state.transactions)
        })

       
    }
})



export const transactionReducer = transactionSlice.reducer;
export const actions = transactionSlice.actions;

export const transactionSelector = (state)=>state.transactionReducer;