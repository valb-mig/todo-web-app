'use client';

import React, { useState }  from 'react';
import { useGlobalContext } from '@/config/context/store';

import useTodo     from './hooks/useTodo';
import useDragDrop from './hooks/dragDrop/useDragDrop';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Icons from '@/config/icons';

import Button      from '@/app/components/Button';
import Column      from '@/app/components/Column';
import Input       from '@/app/components/Input';
import Task        from '@/app/components/Task';
import Breadcrumbs from '@/app/components/Breadcrumbs';

import './styles/Todo.scss';

export default function Todo() {

    const { selectedProject, projects } = useGlobalContext();
    const { submitTask, handleEditTask, handleRemoveTask } = useTodo();

    const { handleDragEnd } = useDragDrop();
    
    const [taskFormData, setTaskFormData] = useState({
        title: '',
        desc:  '',
        error: false
    });

    const tasks = projects[selectedProject.type][selectedProject.id].project_tasks;

    return(
        <>
            <Breadcrumbs/>

            <form className='task-input-bar' onSubmit={(e) => submitTask(e, taskFormData, setTaskFormData)}>
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

            <Column.Root>
                <Column.Body Count={tasks.length}>
                    <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
                        <Droppable droppableId='ROOT' type='group'>
                        
                            {tasks.length > 0 && (

                                (provided) => (

                                    <div {...provided.droppableProps} ref={provided.innerRef}>

                                        {tasks.map((task, index) => (

                                            <Draggable 
                                                draggableId={task.task_id.toString()} 
                                                key={task.task_id} 
                                                index={index}
                                            >
                                                
                                                {(provided) => (

                                                    <div
                                                        {...provided.dragHandleProps} 
                                                        {...provided.draggableProps} 
                                                        ref={provided.innerRef}
                                                    >
                                                        <Task.Root  key={task.task_id} Done={task.task_done}>
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
                                                    </div>
                                                )}

                                            </Draggable>
                                        ))}

                                    </div>

                                )
                            )}
                        </Droppable>
                    </DragDropContext>
                </Column.Body>
            </Column.Root>
        </>
    );
}