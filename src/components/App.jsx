import React, { useState } from 'react';

import Sidebar   from './Sidebar';
import InputTask from './InputTask';
import Header    from './Header';
import Button    from './Button'; 
import Task      from './Task';

import './scss/App.scss';
import '../main.css';

const App = () => {

  const [input,    setInputValue] = useState("");
  const [desc,     setDescValue]  = useState("");
  const [error,    setError]      = useState("");
  const [tasks,    setTasks]      = useState([]);
  const [done,     setTaskDone]   = useState(false);
  const [projects, setProjects]   = useState([]);
  
  const [selectedProject, setSelectedProject]         = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [taskBox, showTaskBox]                        = useState(false);

  const handleTaskAdd = (event) => {
    event.preventDefault();

    if(input !== '' && desc !== '') {

      showTaskBox(true);

      setTasks([...tasks, 
        {
          project: selectedProject,
          title:   input,
          desc:    desc,
          status:  false
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

  function handleTaskRemove(taskId,project) {

    const projectTasks = tasks.filter(task => task.project === project);
    const currentTask  = projectTasks.filter((task,index) => index !== taskId);

    setTasks([...tasks.filter(task => task.project !== project), ...currentTask]);
  };

  function handleTaskDone(taskId, project) {
    
    const projectTasks = tasks.filter(task => task.project === project);
    const updatedTasks = projectTasks.map((task, index) => {
      if (index === taskId) {
        return { ...task, status: !task.status };
      } else {
        return task;
      }
    });
    setTasks([...tasks.filter(task => task.project !== project), ...updatedTasks]);
  }

  return (
    <div className="App bg-dark">

      <div className='header-box'>
        <Header/>
      </div>

      <div className='main-box'>
        <div className='sidebar-box'>
          <Sidebar
            project={setProjects}
            selectedProject={setSelectedProject}
            selectedProjectName={setSelectedProjectName}
          />
        </div>

        <div className='content-box'>
          <div className='content'>

          {projects.length > 0 &&(
            <>
              <div className='project-header'>
                <div className='project-name'>
                  <i className='fa fa-list'></i> {selectedProjectName}
                </div>
              </div>

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

                {tasks.filter(task => task.project === selectedProject).length > 0 &&(
                  <div className='task-content'>
                    <div className='task-box'>

                      {tasks.filter(task => task.project === selectedProject).map((task, index) => (
                        <Task key={index} 
                              title={task.title} 
                              desc={task.desc}
                              remove={()=>(handleTaskRemove(index,task.project))}
                              done={()=>{handleTaskDone(index,task.project)}}
                              class={task.status ? 'task-done' : 'not-done'}/>
                      ))}
                      
                    </div>
                  </div>
                )}
                
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;