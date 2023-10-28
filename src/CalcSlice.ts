import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type calculationStateType = {
    value:number;
    status: "success" | "error"
}

export type payloaActionType = {val:number,msg:string}
const initialState:calculationStateType = {
    value:0,
    status:"success"
}

const calcSlice = createSlice({
    name:"calculation",
    initialState,
    reducers:{
        addition:(state,action:PayloadAction<payloaActionType>) =>{
            return{
                ...state,
                value:state.value+action.payload.val
            }
        },
        subtraction:(state,action:PayloadAction<payloaActionType>) =>{
            let { value } = state
            value -= action.payload.val
            return{
                ...state,value
            }
        }
    }
})

export default calcSlice.reducer
export const { addition, subtraction} = calcSlice.actions