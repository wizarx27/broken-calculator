import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CalcSlice from "./CalcSlice";
import QueueSlice from "./QueueSlice";

const store = configureStore({
    reducer:combineReducers({
        calculation:CalcSlice,
        queue:QueueSlice
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {store}