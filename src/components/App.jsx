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
  const [desc,  setDescValue]  = useState("");
  const [tasks, setTasks]      = useState([]);
  const [done,  setTaskDone]   = useState(false);
  const [error, setError]      = useState("");

  const handleTaskAdd = (event) => {
    event.preventDefault();

    if(input !== '' && desc !== '') {
      setTasks([...tasks, 
        {
          title:  input,
          desc:   desc,
          status: false
        }
      ]);

      setError("");
      setInputValue("");
      setDescValue("");
      setTaskDone(false);
    }
    else {
      setError("error");
    }
  }

  const handleChangeDesc = (event) => {
    setDescValue(event.target.value);
  };

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  function handleTaskRemove(id) {
    setTasks(tasks.filter((task, i) => i !== id));
  };

  function handleTaskDone(id) {
    setTasks(
      tasks.map((task,i) => {
        if(i === id) 
        { return { ...task, status:!task.status };}
        else 
        { return task; }
      })
    );
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
                  <Task id={index}
                        key={index} 
                        title={task.title} 
                        desc={task.desc}
                        remove={()=>(handleTaskRemove(index))}
                        done={()=>{handleTaskDone(index)}}
                        class={task.status ? 'task-done' : 'not-done'}/>
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
