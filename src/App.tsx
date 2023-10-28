import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { RootState } from './Store'
import { addition, subtraction } from './CalcSlice'
import { calculateAll, changeLastValue, queueEquation, queueSelector } from './QueueSlice'

const fillNumber = (start:number,end:number):number[] => {
  const numberList:number[] = []
  for (let index = start; index < end+1; index++) {
    numberList.push(index)
  }
  return numberList
}

function App() {
  const dispatch = useDispatch()
  const calcState = useSelector((state:RootState) => state.calculation)
  const { queue,lastIndex,history } = useSelector(queueSelector)

  

  const numberList = fillNumber(0,9)
  const eqSymbol = ["+","-","*","/"]
  const notFirstItem = queue.length !== 0

  const queueEquationColl = (value:string)=>{
    if (lastIndex === 2){
      dispatch(calculateAll())
      dispatch(queueEquation({value:value}))
      return
    }
    dispatch(queueEquation({value:value}))
  }
  return (
    <div>
      <div className='outer-box'>
        <div className='inner-box-screen'>
          <div className='curr-result'>
            {parseInt(queue[lastIndex]) || (eqSymbol.includes(queue[lastIndex]) ? queue[lastIndex] : 0 )}

          </div>
          <div className='history-view'>
            <div className='history-inner'>
              {
                [...history].reverse().map((i)=>(
                  <div>{i}</div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='inner-box-button-cont'>
          <div className='number-container'>
            {
              numberList.map((i)=>(<button onClick={()=>{dispatch(changeLastValue({value:i.toString()}))}} className='number-box'>{i}</button>))
            }
          </div>
          <div className='equation-container'>
            <button className='equation-btn' onClick={()=>{notFirstItem && queueEquationColl("+")}}>+</button>
            <button className='equation-btn' onClick={()=>{notFirstItem && queueEquationColl("-")}}>-</button>
            <button className='equation-btn' onClick={()=>{notFirstItem && queueEquationColl("*")}}>*</button>
            <button className='equation-btn' onClick={()=>{notFirstItem && queueEquationColl("/")}}>/</button>
            <button className='equation-btn' onClick={()=>{notFirstItem && dispatch(calculateAll())}}>=</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
