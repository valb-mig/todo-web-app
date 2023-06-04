"use client";

import { React, useState, useEffect } from 'react';
import { useRouter }       from 'next/navigation';

import darkTheme         from '/src/utils/functions/darkTheme';
import handleChangeUrl   from '/src/utils/functions/handleChangeUrl';

import { faMagnifyingGlass, 
         faSun, 
         faPlus,
         faUser } from '@fortawesome/free-solid-svg-icons';

import Lottie from 'react-lottie';
import animationData from 'public/assets/lottie/58949-person-calmzen';

import Header  from 'src/components/main/Header';
import Sidebar from 'src/components/main/Sidebar';
import Input   from 'src/components/Input';
import Button  from 'src/components/Button'; 
import Task    from 'src/components/Task';
import Modal   from 'src/components/main/Modal';

import 'src/app/style/page.scss';

export default function Home() {

  const router = useRouter();

  const [input,    setInputValue] = useState("");
  const [desc,     setDescValue]  = useState("");
  const [error,    setError]      = useState("");
  const [tasks,    setTasks]      = useState([]);
  const [projects, setProjects]   = useState([]);

  const [home, setHome] = useState(true);
  const [selectedProject,     setSelectedProject]     = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  
  const [theme, setTheme] = useState(false);
  const [icon,  setIcon]  = useState(faSun);

  const handleTaskAdd = (event) => {

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

  const handleTaskRemove = (taskId,project) => {

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
      <section className='header-box'>

        <Header>
          <div className='header-start'>
              <div className='header-logo'>

                <p className='site-title'>./Todo.sh
                  <span className='title-cursor'>|</span>
                </p>
                
              </div>
              
              <Input
                id='search'
                icon={faMagnifyingGlass}
                placeholder='Search'
                class={'rounded-[160px]'}
              />

            </div>

            <div className='header-end'>
              
              <Button
                  icon={icon}
                  class="switch-color mr-[5px] rounded-[100%]"
                  onclick={() => {darkTheme(setIcon,setTheme,theme)}}
              />

              {sessionStorage.length > 0 && sessionStorage.getItem('login') != undefined &&
              
                <p className='user-name'>{JSON.parse(sessionStorage.getItem('login')).username}</p>
              
              }

              <Button
                  icon={faUser}
                  class="header-account ml-[5px] rounded-[100%]"
                  onclick={(e) => {handleChangeUrl(e,"/login",router)}}
              />
            </div>
        </Header>

      </section>

      <div className='main-box'>

        <section className='sidebar-box'>

          <Sidebar
            project={setProjects}
            selectedProject={setSelectedProject}
            selectedProjectName={setSelectedProjectName}
            home={setHome}
          />

        </section>

        <div className='content-box'>
          <div className='content'>

            {projects.length > 0 && home == false ?
              <>
                <section>
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

                    <div className={'task-inputs '+error}>

                      <Input
                        id='add-task'
                        placeholder='Task name'
                        value={input}
                        onchange={(e) => {setInputValue(e.target.value)}}
                      />
                      <Input
                        id='desc-task'
                        placeholder='Description'
                        value={desc}
                        onchange={(e) => {setDescValue(e.target.value)}}
                      />

                    </div>
                  </div>
                </section>
                <section>
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
                </section>
              </>

              :

              // No project - Login

              <div className='start-page mt-[6vh]'>
                <div className='start-content'>
                  <div className='center-image'>
                    <Lottie 
                      options={
                        {
                          loop: true,
                          autoplay: true,
                          animationData: animationData,
                          rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                          }
                        }
                      }
                      height={400}
                      width={400}
                    />
                  </div>
                  <p>Wellcome to your <u><b className='ml-[10px]'>Homepage</b></u> </p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

    </div>
  );
}