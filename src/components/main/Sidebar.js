import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSitemap,
         faList, 
         faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from 'src/components/Button';
import Modal  from 'src/components/main/Modal';

import '../styles/Sidebar.scss';

const Sidebar = (props) => {

    const [projects,    setProjects]    = useState([]);   
    const [modal,       showModal]      = useState(false);
    const [modalInput,  setModalInput]  = useState('');
    const [projectType, setProjectType] = useState('todo');

    const [todo,   setTodo]   = useState('selected');
    const [kanban, setKanban] = useState('');

    const checkProjectType = (type) => {

        if(type === 'kanban'){
            setKanban('selected');
            setTodo('');
            setProjectType('kanban');
        }
        else if(type === 'todo'){
            setKanban('');
            setTodo('selected');
            setProjectType('todo');
        }
    }

    const handleProjectAdd = () => {
        showModalProject();
    }
    
    const showModalProject = () => {
        showModal(true);
    }
    
    const getModalInput = (event) => {
        setModalInput(event.target.value);
    }

    const submitProject = (index) => {
    
        setProjects([...projects, 
            {
                id:     projects.length,
                title:  modalInput,
                select: '',
                type:  projectType
            }
        ]);
        
        showModal(false);
    }

    const handleSelectProject = (id,title) => {

        props.project(projects);
        props.selectedProject(id);
        props.selectedProjectName(title);

        projects.map((project, index) => {
            project.select = ''
        });

        projects.filter(project => project.id === id).map((project, index) => {
            project.select = 'selected'
        });
    }

    return(
        <div className='sidebar'>

            <div className='sidebar-content'>
                <div className='sidebar-buttons'>
                    <Button
                        title='To-do'
                        icon={faList}
                        class={'todo-sidebar '+todo}
                        onclick={() => {checkProjectType('todo')}}
                    />
                    <Button
                        title='Kanban'
                        icon={faSitemap}
                        class={'todo-sidebar mt-[5px] '+kanban}
                        onclick={() => {checkProjectType('kanban')}}
                    />
                </div>
                <div className='sidebar-projects'>
                    <div className='projects-header'>Projects</div>
                        <div className='projects-content'>

                            {projects.map((project, index) => {
                                if (project.type === projectType) {
                                    return (
                                    <Button
                                        id={index}
                                        key={index}
                                        title={project.title}
                                        icon={faList} // Todo - user select icon
                                        class={'todo-sidebar mt-[5px] ' + project.select}
                                        onclick={() => {
                                        handleSelectProject(index, project.title);
                                        }}
                                    />
                                    );
                                } else {
                                    return null;
                                }
                            })}

                            {modal &&

                                <Modal
                                    onchange={getModalInput}
                                    addClick={submitProject}
                                    cancelClick={()=>{showModal(false)}}
                                />

                            }
                            
                        </div>
                    </div>
                <div className='add-button'>
                    <Button
                        icon={faPlus}
                        onclick={handleProjectAdd}
                    />
                </div>
            </div>
            
        </div>
    );
}
export default Sidebar;