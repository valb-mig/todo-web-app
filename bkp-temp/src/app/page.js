"use client";

import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookies } from 'cookies-next';

import Lottie from 'react-lottie';
import animationData from 'public/assets/lottie/58949-person-calmzen';

import HomeHeader from 'src/app/components/HomeHeader';
import HomeSidebar from 'src/app/components/HomeSidebar';
import LoadingPage from 'src/components/main/LoadingPage';

import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Task from 'src/components/Task';

import 'src/app/style/page.scss';

export default function Home() {
  
  const router = useRouter();
  const cookies = getCookies();
  const token = cookies.authorization;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return <LoadingPage />;
  }

  const [taskFormData, setTaskFormData] = useState({
    title: "",
    desc: "",
    status: ""
  });

  const [projectFormData, setProjectFormData] = useState({
    title: "",
    desc: "",
    icon: "",
    type: "",
    selected: false
  });

  const [sidebar, setSidebarData] = useState({
    class: "sidebar",
    small: false,
  });

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [home, setHome] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleTaskAdd = (event) => {
  }

  const handleTaskRemove = (taskId, project) => {
  }

  const handleTaskDone = (taskId, project) => {
  }

  const handleSidebar = (state) => {
  }

  useEffect(() => {
    const handleResize = () => handleSidebar(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <div className='header-box'>
        <HomeHeader/>
      </div>

      <div className='main-box'>
        <div className={sidebar.small ? 'sidebar-box-mini' : 'sidebar-box'}>
          <HomeSidebar
            setHome={setHome}
            sidebarClass={sidebar.class}
          />
        </div>

        <div className='content-box'>
          <div className='content'>
            {projects.length > 0 && home === false ? (
              <>
                  <div className='project-header'>
                    <div className='project-name'>
                      <div className='icon-project-name'></div>
                      <p className='ml-[5px]'>Nome</p>
                    </div>
                  </div>
                  <form onSubmit={handleTaskAdd}>
                    <div className='input-bar'>
                      <div className={'task-inputs ' + error}>
                        <Input
                          id='add-task'
                          placeholder='Task name'
                          value={input}
                          onchange={(e) => { setInputValue(e.target.value) }}
                        />
                        <Input
                          id='desc-task'
                          placeholder='Description'
                          value={desc}
                          onchange={(e) => { setDescValue(e.target.value) }}
                        />
                      </div>
                      <Button
                        onclick={handleTaskAdd}
                        class="ml-[5px]"
                        type="submit"
                      />
                    </div>
                  </form>
                {projectType === 'todo' ? (<Todo tasks={tasks} />) : (<Kanban tasks={tasks} />)}
              </>
            ) : (<Homepage />)}
          </div>
        </div>
      </div>
    </div>
  );
}

const Todo = ({ tasks }) => {
  return (
    <div className='task-content'>
      {tasks.filter(task => task.project === selectedProject).length > 0 && (
        <div className='task-box'>
          {tasks.filter(task => task.project === selectedProject).map((task, index) => (
            <Task key={index}
              title={task.title}
              desc={task.desc}
              remove={() => handleTaskRemove(index, task.project)}
              done={() => handleTaskDone(index, task.project)}
              class={task.status ? 'task-done' : 'not-done'} />
          ))}
        </div>
      )}
    </div>
  )
}

const Kanban = ({ tasks }) => {
  return (
    <div className='kanban mt-[5px]'>
      <div className='task-content'>
        <section className='kanban-area'>
          <div className="kanban-box">
            <div className='kanban-title'>To Do</div>
            <div className='task-box'>
              {tasks.filter(task => task.project === selectedProject).map((task, index) => (
                <Task key={index}
                  title={task.title}
                  desc={task.desc}
                  remove={() => handleTaskRemove(index, task.project)}
                  done={() => handleTaskDone(index, task.project)}
                  class={task.status ? 'task-done' : 'not-done'} />
              ))}
            </div>
          </div>
          <div className="kanban-box">
            <div className='kanban-title'>Doing</div>
            <div className='task-box'>
              {tasks.filter(task => task.project === selectedProject).map((task, index) => (
                <Task key={index}
                  title={task.title}
                  desc={task.desc}
                  remove={() => handleTaskRemove(index, task.project)}
                  done={() => handleTaskDone(index, task.project)}
                  class={task.status ? 'task-done' : 'not-done'} />
              ))}
            </div>
          </div>
          <div className="kanban-box">
            <div className='kanban-title'>Done</div>
            <div className='task-box'>
              {tasks.filter(task => task.project === selectedProject).map((task, index) => (
                <Task key={index}
                  title={task.title}
                  desc={task.desc}
                  remove={() => handleTaskRemove(index, task.project)}
                  done={() => handleTaskDone(index, task.project)}
                  class={task.status ? 'task-done' : 'not-done'} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const Homepage = () => {
  return (
    <div className='start-page mt-[6vh]'>
      <div className='start-content'>
        <div className='center-image'>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
              }
            }}
            height={210}
            width={210}
          />
        </div>
        <p>Welcome to your <u><b className='ml-[10px]'>Homepage</b></u> </p>
      </div>
    </div>
  );
}