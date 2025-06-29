import { useEffect, useReducer } from "react";

const reducer=(state,action)=>{
    switch(action.type){
        case 'Increment':
            return { count: state.count+1};
            case 'decrement' :
                return {count : state.count-1};
                case 'reset':
                    return {count :state.count =0   };
                    default :
                    return state;
    }
};

function Reducer(){
     const [state ,dispatch] =useReducer (reducer,{count : 0});

    useEffect(()=>{
      
    },[state]);
   

    return (
        <div>
         <h1><center>Count:{state.count}</center></h1>
       <button onClick={() => dispatch({ type: 'Increment' })}>Increment</button>
<button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    )
}
export default Reducer;