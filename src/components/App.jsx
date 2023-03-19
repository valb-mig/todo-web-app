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
  const [desc, setDescValue]   = useState("");
  const [tasks, setTasks]      = useState([]);
  const [error, setError]      = useState('');

  const handleTaskAdd = (event) => {
    event.preventDefault();

    if(input !== '' && desc !== '')
    {
      setError('');
      setTasks([...tasks, [input,desc]]);
      setInputValue("");
      setDescValue("");
    }
    else{
      setError('error');
    }
  }

  const handleChangeDesc = (event) => {
    setDescValue(event.target.value);
  };

  const handleChangeInput = (event) => {
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

              <div className='input-area'>
                <InputTask
                  id='add-task'
                  placeholder='Task name'
                  class={error}
                  value={input}
                  onchange={handleChangeInput}
                />
                <InputTask
                  id='desc-task'
                  placeholder='Description'
                  class={error}
                  value={desc}
                  onchange={handleChangeDesc}
                />
              </div>

            </div>

            <div className='task-content'>
              <div className='task-box'>
                {tasks.map((task, index) => (
                  <Task key={index} title={task[0]} desc={task[1]}/>
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
