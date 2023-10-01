'use client';

import React, { useState }  from 'react';
import { useGlobalContext } from '@/config/context/store';

import Icons from '@/config/icons';

import Button      from '@/app/components/Button';
import Column      from '@/app/components/Column';
import Input       from '@/app/components/Input';
import Task        from '@/app/components/Task';
import Breadcrumbs from '@/app/components/Breadcrumbs';

import taskAdd    from '@/utils/validators/home/task/add';
import taskEdit   from '@/utils/validators/home/task/edit';
import taskRemove from '@/utils/validators/home/task/remove';

import cleanObject from '@/utils/helpers/cleanObject';

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

        let response = await taskAdd(selectedProject, taskFormData, projects);

        if(typeof response == "object") {

            setProjects(response);      
            setTaskFormData(cleanObject(taskFormData));

        } else if(typeof response == "boolean") {
           
            setTaskFormData({...taskFormData, error: true});
            console.error('[Database]: error');
        }
    } 

    async function handleEditTask(task_id, task_key, status) {

        let response = await taskEdit(selectedProject, projects, task_id, task_key, status);
        
        if(typeof response == 'object') {
            setProjects(response);
        } else if (typeof response == 'boolean') {
            console.error('[Database]: Change task error');
        }
    }

    async function handleRemoveTask(task_id, task_key) {

        let response = await taskRemove(selectedProject, projects, task_id, task_key);
        
        if(typeof response == 'object') {
            setProjects(response);
        }
        else if(typeof response == 'boolean') {
            console.error('[Database]: Change task error');
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
                    <Column.Root>
                        {projects[selectedProject.type][selectedProject.id].project_tasks.map((task, index) => (
                            <Task.Root key={index} Done={task.task_done}>

                                <Task.Info>
                                    <Task.Title Title={task.task_title} />
                                    <Task.Desc Desc={task.task_desc} />
                                </Task.Info>

                                <Task.Option>
                                    <Button.Root Class="done" OnClick={() => handleEditTask(task.task_id, index, !task.task_done)}>
                                        <Button.Icon Icon={<Icons.Check/>} />
                                    </Button.Root>
                                    <Button.Root Class="remove" OnClick={() => handleRemoveTask(task.task_id, index)} >
                                        <Button.Icon Icon={<Icons.Trash/>} />
                                    </Button.Root>
                                </Task.Option>
                            </Task.Root>
                        ))}
                    </Column.Root>
                ) : (
                    <div className='empty-content' key='empty'>
                        <div className='not-found'>
                            <img src='assets/img/not-found.png'/>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}