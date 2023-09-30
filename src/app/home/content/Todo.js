'use client';

import React, { useState }  from 'react';
import { useGlobalContext } from '@/config/context/store';

import Icons from '@/config/icons';

import Button      from '@/app/components/Button';
import Input       from '@/app/components/Input';
import Tag         from '@/app/components/Tag';
import Breadcrumbs from '@/app/components/Breadcrumbs';

import addTask    from '@/utils/api/task/add';
import editTask   from '@/utils/api/task/edit';
import removeTask from '@/utils/api/task/remove';

import '@/app/home/content/styles/Todo.scss';

export default function Todo() {

    const { selectedProject, projects, path, setProjects } = useGlobalContext();

    const [taskFormData, setTaskFormData] = useState({
        title: '',
        desc:  '',
        error: false
    });

    async function submitTask(event) {

        event.preventDefault();

        if(taskFormData.title != '' && taskFormData.desc != '')
        {
            let response = await addTask(selectedProject.project_id,taskFormData);

            let newTask = {};

            if(response) {

                if(response.success) {
                    newTask = response.added_task;
                } else {
                    console.log('❌ Database: error');
                }
            } else {

                newTask = {

                    task_id: projects[selectedProject.type][selectedProject.id].project_tasks.length + 1,
                    user_id:'999',
                    project_id:selectedProject.id,
                    task_title:taskFormData.title,
                    task_desc:taskFormData.desc,
                    task_type:selectedProject.type,
                    task_done:'N',
                    task_status:'A'
                }
            }
            
            setProjects({
                ...projects,
    
                [selectedProject.type]:{
    
                    ...projects[selectedProject.type],
    
                    [selectedProject.id]:{
    
                        ...projects[selectedProject.type][selectedProject.id],
                        project_tasks:[
                            ...projects[selectedProject.type][selectedProject.id].project_tasks,
                            newTask
                        ],
                    }
                }
            });

            setTaskFormData({
                title: '',
                desc:  '',
                error: false
            });
        
        } else {
            setTaskFormData({...selectedProject, error: true});
        }
    }

    async function toggleTaskStatus(task_id, key, done) {

        const action = done ? "not-done" : "done";

        const updatedTasks = projects[ProjectType][ProjectId].project_tasks.map((task, index) => {
            if (index === key) {
                return { ...task, task_done: done ? "N" : "Y" };
            }
            return task;
        });

        const updatedProject = {
            ...projects[ProjectType][ProjectId],
            project_tasks: updatedTasks,
        };

        const updatedProjectType = {
            ...projects[ProjectType],
            [ProjectId]: updatedProject,
        };

        const updatedProjects = {
            ...projects,
            [ProjectType]: updatedProjectType,
        };

        let response = await removeTask(task_id, ProjectId);
    
        if(response && response.success !== null && response.success !== undefined) {

            if (response.success) {
                setProjects(updatedProjects);
            } else {
                console.log('❌ Database: error');
            }
        } else {
            
            setProjects(updatedProjects);
        }
    }

    async function handleTaskRemove(task_id, key) {

        const tasks = projects[ProjectType][ProjectId].project_tasks;

        const updatedTasks = tasks.filter((task, index) => {
            return index !== key;
        });

        const updatedProject = {
            ...projects[ProjectType][ProjectId],
            project_tasks: updatedTasks,
        };

        const updatedProjectType = {
            ...projects[ProjectType],
            [ProjectId]: updatedProject,
        };

        const updatedProjects = {
            ...projects,
            [ProjectType]: updatedProjectType,
        };

        let response = await removeTask(task_id, ProjectId);

        if(response.success !== null && response.success !== undefined){

            if (response.success) {
                setProjects(updatedProjects);
            } else {
                console.log('❌ Database: error');
            }
        } else {
            
            setProjects(updatedProjects);
        }
    }

    return(
        <>
            <Breadcrumbs/>

            <form className='task-input-bar' onSubmit={(e) => submitTask(e)}>
                <div className={'task-inputs ' + (taskFormData.error ? 'error-task-input' : '')}>

                    <Input.Root>
                        <Input.Body 
                            Error={taskFormData.error} 
                            OnChange={(e) => setTaskFormData({...taskFormData, title:e.target.value})} 
                            Value={taskFormData.title}
                            Placeholder='Task title...'
                        />
                    </Input.Root>

                    <Input.Root>
                        <Input.Body 
                            Error={taskFormData.error} 
                            OnChange={(e) => setTaskFormData({...taskFormData, desc:e.target.value})} 
                            Value={taskFormData.desc}
                            Placeholder='Task description...'
                        />
                    </Input.Root>

                </div>

                <Button.Root Type='submit'>
                    <Button.Icon Icon={<Icons.Plus/>} />
                </Button.Root>

            </form>

            <div className='task-box-area'>
                {projects[selectedProject.type][selectedProject.id].project_tasks.length > 0 ? (

                    <div className='task-box'>
                    {projects[selectedProject.type][selectedProject.id].project_tasks.map((task, index) => (
                        <div>{task.task_title}</div>
                    ))}
                    </div>
                ) : (
                    <div className='empty-content'>
                        <div className='not-found'>
                            <img src='assets/img/not-found.png'/>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}