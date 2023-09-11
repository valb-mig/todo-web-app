import { React, useState } from 'react';
import { useGlobalContext } from '@/config/context/store';

import Button from '@/components/Button';
import Input  from '@/components/Input';
import Card   from '@/components/Card';

import addTask    from '@/utils/api/task/add';
import editTask   from '@/utils/api/task/edit';
import removeTask from '@/utils/api/task/remove';

import {
    FaListUl,
    FaPlus
} from 'react-icons/fa';

import './styles/Task.scss';

export default function Task() {

    const { selectedProject, projects, setProjects } = useGlobalContext();

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

                    task_id: projects[selectedProject.type][selectedProject.project_id].project_tasks.length + 1,
                    user_id:'999',
                    project_id:selectedProject.project_id,
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
    
                    [selectedProject.project_id]:{
    
                        ...projects[selectedProject.type][selectedProject.project_id],
                        project_tasks:[
                            ...projects[selectedProject.type][selectedProject.project_id].project_tasks,
                            newTask
                        ],
                    }
                }
            });

            clearFormData();
        
        } else {
            setTaskFormData({...selectedProject, error: true});
        }
    }

    return(

        <section className='content'>
            <div className='project-header'>
                <div className='project-name'>
                    <div className='icon-project-name'>
                        <FaListUl/>
                    </div>
                    <p>{selectedProject.title}</p>
                </div>
            </div>
            <form onSubmit={ (e) => submitTask(e) } className='input-bar'>
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
                    Type="submit"
                    Icon={<FaPlus/>}
                />
            </form>

            {selectedProject.type === 'todo' ? (
                <Todo
                    ProjectId={selectedProject.project_id}
                    ProjectType={selectedProject.type}
                />
            ):(
                <Kanban
                    ProjectId={selectedProject.project_id}
                    ProjectType={selectedProject.type}
                />
            )}

        </section>
    );
}

function Todo({ ProjectId, ProjectType }) {

    const { projects, setProjects } = useGlobalContext();
    
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

    if(projects[ProjectType][ProjectId].project_tasks.length > 0) {

        return (
            <div className='task-box-area'>
                <div className='task-box'>
                {projects[ProjectType][ProjectId].project_tasks.map((task, index) => (
                    <Card
                        key={index}
                        Task={task}
                        RemoveTask={() => handleTaskRemove(task.task_id, index)}
                        SetStatus={()  => toggleTaskStatus(task.task_id, index, task.task_done === "Y")}
                        Class={task.task_done === "Y" ? 'task-done' : 'not-done'} 
                    />
                ))}
                </div>
            </div>
        )
    } else {

        return (
            <div className='empty-content'>
                <div className='not-found'>
                    <img src='assets/img/not-found.png'/>
                </div>
            </div>
        );
    }
}

function Kanban({ ProjectId, ProjectType }) {
    const { projects, setProjects } = useGlobalContext();

    return(
        <div>🚧 Under construction</div>
    );
}