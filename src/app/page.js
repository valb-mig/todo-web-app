"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './style/page.scss';

import Sidebar   from '../components/main/Sidebar';
import InputTask from '../components/InputTask';
import Header    from '../components/main/Header';
import Button    from '../components/Button'; 
import Task      from '../components/Task';

export default function Home(){

  const [input,    setInputValue] = useState("");
  const [desc,     setDescValue]  = useState("");
  const [error,    setError]      = useState("");
  const [tasks,    setTasks]      = useState([]);
  const [projects, setProjects]   = useState([]);
  
  const [selectedProject, setSelectedProject]         = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");

  const handleTaskAdd = (event) => {
    event.preventDefault();

    if(input !== '' && desc !== '') {

      setTasks([...tasks, {
        
          project: selectedProject,
          title:   input,
          desc:    desc,
          status:  false
        
      }]);

      setError("");
      setInputValue("");
      setDescValue("");
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
    <div className="App">

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
                  {selectedProjectName}
                </div>
              </div>

              <div className='input-bar'>
                <Button
                  icon={faPlus}
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