import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";


const initialState:queueStateType = {
    queue:[],
    history:[],
    lastIndex:0
}

export type queueStateType = {
    queue:string[]
    history:string[]
    lastIndex:number
}

export type queuePayloadActionType = {
    value:string
}
const eqSymbol = ["+","-","*","/"]

const QueueSlice = createSlice({
    name:"queue",
    initialState,
    reducers:{
        changeLastValue:(state,action:PayloadAction<queuePayloadActionType>) => {
            const { queue } = state
            let lastIndex = state.lastIndex
            const { value } = action.payload
            const newQueue = [...queue]
            if (eqSymbol.includes(value)){
                return state
            }
            if (newQueue.length === 0 || eqSymbol.includes(newQueue[lastIndex])){
                newQueue.push(value)
                if (eqSymbol.includes(newQueue[lastIndex])){
                    lastIndex = newQueue.length -1
                }
                return{
                    ...state,
                    queue:newQueue,
                    lastIndex
                }
                
            }else{
                if ((queue[lastIndex] === "0" && queue[lastIndex] !== value) || queue[lastIndex] !== "0"){
                    queue[lastIndex]+=value
                }
            }
            
        },
        queueEquation:(state,action:PayloadAction<queuePayloadActionType>) => {
            const { queue, lastIndex } = state
            const { value } = action.payload
            const newQueue = [...queue]
            if (newQueue.length !== 0 && !eqSymbol.includes(newQueue[lastIndex])){
                newQueue.push(value)
                return{
                    ...state,
                    queue:newQueue,
                    lastIndex:newQueue.length -1
                }
                
            }
            return state
            
        },
        calculateAll:(state) =>{
            const { queue,history } = state
            let result = 0
            const newQueue = [...queue]
            const newHistory = [...history]
            while(newQueue.length){
                const i = newQueue.pop()
                if(eqSymbol.includes(i)){
                    const i2 = newQueue.pop()
                    switch(i){
                        case "+":
                            result+= parseInt(i2)
                            break
                        case "-":
                            result =  parseInt(i2) - result
                            break
                        case "*":
                            result*= parseInt(i2)
                            break
                        case "/":
                            result = parseInt(i2) / result
                            if (result.toString() === 'Infinity'){
                                result = 0
                            }
                            break
                    }
                }else{
                    result+=parseInt(i)
                }
            }
            newHistory.push(result.toString())
            return{
                ...state,
                queue:[...[result.toString()]],
                history:[...newHistory],
                lastIndex:0
            }
        }
    }
})

export default QueueSlice.reducer
export const { changeLastValue,queueEquation,calculateAll } = QueueSlice.actions
export const queueSelector = (state:RootState) => state.queue
