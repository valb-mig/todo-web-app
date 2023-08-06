import {React, useState, useEffect} from 'react';

import Button from '@/components/Button';
import Input  from '@/components/Input';
import Card   from '@/components/Card';

import getTasks from '@/utils/api/task/get';
import addTask  from '@/utils/api/task/add';

import {
    FaListUl,
    FaPlus
} from 'react-icons/fa';

import './styles/Task.scss';

export default function Task({ Project, Tasks }){

    const [tasks, setTask] = useState({});

    useEffect(() => {
        setTask(Tasks);
    },[Tasks]);

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

    async function submitTask(event,id_project) {

        event.preventDefault();

        let response = await addTask(id_project,taskFormData);

        if(response) {
            setTask({...tasks,
                title: taskFormData.title,
                desc:  taskFormData.desc,
                error: false 
            })
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
                    <p>{Project.title}</p>
                </div>
            </div>
            <form onSubmit={(e) => {submitTask(e,Project.id_project)}}>
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
                        OnClick={(e) => {submitTask(e,Project.id_project)}}
                        Type="submit"
                        Icon={<FaPlus/>}
                    />
                </div>
            </form>

            {Project.type === 'todo' ? (
                <Todo Tasks={tasks} />
            ):(
                <></>
            )}

        </div>
    );
}

const Todo = ({ Tasks }) => {

    if(Tasks.length > 0){

        return (
            <div className='task-box-area'>
                <div className='task-box'>
                {Tasks.map((task, index) => (
                    <Card 
                        key={index}
                        Task={task}
                        RemoveTask={(item) => handleTaskRemove(console.log(item))}
                        SetStatus={(item) => handleTaskDone(console.log(item))}
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