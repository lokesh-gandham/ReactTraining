
import React, {useReducer, useState } from "react";

const initialstate=[];
   function reducer(state,action){
    switch(action.type){
      case 'ADD-TODO':
        return [...state,{id: Date.now(),text:action.search,completed:false}];
        case 'Toggle-todo':
          return state.map(todo=>
            todo.id === action.id ? {...todo,completed : !todo.completed}:todo
          );
          case 'REMOVE_TODO':
            return state.filter(todo=>todo.id !==action.id);
            default:
              return state;
    }
   }
function Practice(){
  const [search,setSearch]=useState("");
  const [state,dispatch]=useReducer(useReducer,initialstate);
  const handleAddtodo=()=>{
    if(search.trim()){
      dispatch({type:'ADD-TODO',search});
      setSearch()
    }
  }
   return(
    <div>
      <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <button onClick={handleAddtodo}>Addtodo</button>
    </div>
   )
}
export default Practice;