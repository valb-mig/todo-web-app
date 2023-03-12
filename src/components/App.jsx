import React, { useState } from 'react';

import Sidebar   from './Sidebar';
import InputTask from './InputTask';
import Header    from './Header';
import Button    from './Button'; 
import Task      from './Task';

import './scss/App.scss';
import '../main.css';



const App = () => {

  const [input, setInputValue] = useState("");
  const [tasks, setTasks]      = useState([]);
  const [error, setError]      = useState('');

  const handleTaskAdd = (event) => {
    event.preventDefault();

    if(input != '')
    {
      setError('');
      setTasks([...tasks, input]);
      setInputValue("");
    }
    else{
      setError('error');
    }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App bg-dark">

      <div className='header-box'>
        <Header/>
      </div>

      <div className='main-box'>
        <div className='sidebar-box'>
          <Sidebar/>
        </div>

        <div className='content-box'>
          <div className='content'>

            <div className='input-bar'>
              <Button
                icon='plus'
                onclick={handleTaskAdd}
              />

              <InputTask
                id='add-task'
                placeholder='Task name'
                class={error}
                value={input}
                onchange={handleChange}
              />
            </div>

            <div className='task-content'>
              <div className='task-box'>
                {tasks.map((task, index) => (
                  <Task key={index} title={task}/>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
