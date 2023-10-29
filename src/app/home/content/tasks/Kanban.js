'use client';

import React, { useState }  from 'react';
import { useGlobalContext } from '@/config/context/store';

import useKanban   from './hooks/useKanban';
import useDragDrop from './hooks/dragDrop/useDragDrop';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Icons from '@/config/icons';

import Button      from '@/app/components/Button';
import Column      from '@/app/components/Column';
import Input       from '@/app/components/Input';
import Task        from '@/app/components/Task';
import Breadcrumbs from '@/app/components/Breadcrumbs';

import './styles/Kanban.scss';

export default function Kanban() {

    const { selectedProject, projects } = useGlobalContext();
    const { submitTask, handleEditTask, handleRemoveTask } = useKanban();

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

            <section className='kanban-section-area'>
                <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
                    <>
                        {['todo', 'doing', 'done'].map((phase, columnId) => (
                            <Column.Root key={columnId}>
                                <Column.Title Title={phase}/>
                                <Column.Body>
                                    <Droppable droppableId={columnId.toString()} key={columnId}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className='drop-column'
                                            >
                                                {Object.values(tasks).filter(task => task.task_column === columnId).map((task, index) => (
                                                    <Draggable
                                                        key={task.task_id}
                                                        draggableId={task.task_id.toString()}
                                                        index={task.task_order_key}
                                                    >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Task.Root key={task.task_id} Done={task.task_done === "Y"}>
                                                                <Task.Info>
                                                                    <Task.Title Title={task.task_title} />
                                                                    <Task.Desc Desc={task.task_desc} />
                                                                </Task.Info>
                                                                <Task.Option>
                                                                    <Button.Root Class="done" OnClick={() => handleEditTask(task.task_id, index, task.task_column, { action: 'status', value: !(task.task_done === "Y") })}>
                                                                        <Button.Icon Icon={<Icons.Check />} />
                                                                    </Button.Root>
                                                                    <Button.Root Class="remove" OnClick={() => handleRemoveTask(task.task_id, index)}>
                                                                        <Button.Icon Icon={<Icons.Trash />} />
                                                                    </Button.Root>
                                                                </Task.Option>
                                                            </Task.Root>
                                                        </div>
                                                    )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Column.Body>
                            </Column.Root>
                        ))}
                    </>
                </DragDropContext>
            </section>
        </>
    );
}