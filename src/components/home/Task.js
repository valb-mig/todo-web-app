import {React, useState, useEffect} from 'react';
import { useGlobalContext } from '@/app/Context/store';

import Button from '@/components/Button';
import Input  from '@/components/Input';
import Card   from '@/components/Card';

import addTask  from '@/utils/api/task/add';
import editTask from '@/utils/api/task/edit';

import {
    FaListUl,
    FaPlus
} from 'react-icons/fa';

import './styles/Task.scss';

export default function Task() {

    const { selectedProject, setSelectedProject, projects, setProjects } = useGlobalContext();

    const [taskFormData, setTaskFormData] = useState({
        title: '',
        desc: '',
        error: false
    });

    const clearFormData = () => {
        setTaskFormData({
            title: '',
            desc: '',
            error: false 
        })
    }

    async function submitTask(event) {

        console.log(projects);

        event.preventDefault();

        let response = await addTask(selectedProject.id_project,taskFormData);

        if(response) {

            setProjects({
                ...projects,
    
                [selectedProject.type]:{
    
                    ...projects[selectedProject.type],
    
                    [selectedProject.id_project]:{
    
                        ...projects[selectedProject.type][selectedProject.id_project],
                        tasks:[
                            ...projects[selectedProject.type][selectedProject.id_project].tasks,
                            response.task
                        ],
                    }
                }
            });

            clearFormData();
        }
        else {
            setTaskFormData({...taskFormData,error:true})
        }
    }

    return(

        <div className='content'>
            <div className='project-header'>
                <div className='project-name'>
                    <div className='icon-project-name'>
                        <FaListUl/>
                    </div>
                    <p>{selectedProject.title}</p>
                </div>
            </div>
            <form onSubmit={(e) => {submitTask(e)}}>
                <div className='input-bar'>
                    <div className={'task-inputs ' + (taskFormData.error ? 'error-task-input' : '')}>
                        <Input
                            Id='add-task'
                            Placeholder='Task name'
                            OnChange={(e) => {setTaskFormData({...taskFormData,title:e.target.value})}}
                            Value={taskFormData.title}
                        />
                        <Input
                            Id='desc-task'
                            Placeholder='Description'
                            OnChange={(e) => {setTaskFormData({...taskFormData,desc:e.target.value})}}
                            Value={taskFormData.desc}
                        />
                    </div>
                    <Button
                        OnClick={(e) => {submitTask(e,selectedProject.id_project)}}
                        Type="submit"
                        Icon={<FaPlus/>}
                    />
                </div>
            </form>

            {selectedProject.type === 'todo' ? (
                <Todo/>
            ):(
                <></>
            )}

        </div>
    );
}

const Todo = () => {

    const { selectedProject, setSelectedProject, projects, setProjects } = useGlobalContext();

    const handleTaskRemove = (id_task) => {}

    async function toggleTaskStatus(id_task, key, done) {

        const project_type = selectedProject.type;
        const id_project   = selectedProject.id_project;
    
        const action = done ? "not-done" : "done";

        const updatedTasks = projects[project_type][id_project].tasks.map((task, index) => {
            if (index === key) {
                return { ...task, task_done: done ? "N" : "Y" };
            }
            return task;
        });

        const updatedProject = {
            ...projects[project_type][id_project],
            tasks: updatedTasks,
        };

        const updatedProjectType = {
            ...projects[project_type],
            [id_project]: updatedProject,
        };

        const updatedProjects = {
            ...projects,
            [project_type]: updatedProjectType,
        };

        let response = await editTask(id_task, id_project, action);
    
        if (response) {
            setProjects(updatedProjects);
        } else {
            console.log('Error');
        }
    }

    if(projects[selectedProject.type][selectedProject.id_project].tasks.length > 0){

        return (
            <div className='task-box-area'>
                <div className='task-box'>
                {projects[selectedProject.type][selectedProject.id_project].tasks.map((task, index) => (
                    <Card
                        key={index}
                        Task={task}
                        RemoveTask={() => handleTaskRemove(task.id_task, index)}
                        SetStatus={()  => toggleTaskStatus(task.id_task, index, task.task_done === "Y")}
                        Class={task.task_done === "Y" ? 'task-done' : 'not-done'} 
                    />
                ))}
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className='empty-content'>
                <div className='not-found'>
                    <img src='assets/img/not-found.png'/>
                </div>
            </div>
        );
    }
  }