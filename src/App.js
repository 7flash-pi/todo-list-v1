import React, { useState, useEffect} from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};


const App = () => {

  const [input,setInput]=useState('');
  const [list,setList]=useState(getLocalStorage());

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(input){
      const newInput={id:new Date().getTime().toString()
        ,data:input};
      setList([...list,newInput]);
      setInput('');
    }
  }

  const removetodo=(id)=>{
    const newList=list.filter((item)=> item.id!==id);
    setList(newList);
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <div className='todo-app'>
    <h1>What's the Plan for Today?</h1>

       <form className="todo-form" onSubmit={handleSubmit}>
        <input 
        type="text" 
        value={input}
        placeholder='Add a Todo' 
        name='text' 
        className='todo-input'  
        onChange={(e)=>setInput(e.target.value)}/>
        <button className="todo-button">Add </button>
        </form>
          {list.map((item) =>{
            const {id,data}=item;
            return  <div className="todo-row" key={id}>
              <p>{data}</p>
              
                <AiTwotoneDelete className='delete-icon'
                onClick={()=>removetodo(id)}  />
              </div>
          })}
        
    </div>
  )
}

export default App
