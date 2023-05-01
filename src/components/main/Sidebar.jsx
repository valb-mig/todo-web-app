import React, { useState } from 'react';

import Button from '../utils/Button';
import Modal  from './Modal';

import '../scss/main/Sidebar.scss';

const Sidebar = (props) => {

    const [projects,   setProjects]   = useState([]);   
    const [modal,      showModal]     = useState(false);
    const [modalInput, setModalInput] = useState('');

    let home = 'selected';

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
                select: ''
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
                        title='Home'
                        icon='home'
                        class={'todo-sidebar '+home}
                    />
                    <div className='comming-soon'>Comming soon</div>
                </div>
                <div className='sidebar-projects'>
                    <div className='projects-header'>Projects</div>
                        <div className='projects-content'>
                            {projects.map((project, index)=>(
                                <Button
                                    id={index}
                                    key={index}
                                    title={project.title}
                                    icon='list'
                                    class={'todo-sidebar '+project.select}
                                    onclick={() => {handleSelectProject(index,project.title)}}
                                />
                            ))}

                            {modal && (
                                <Modal
                                    onchange={getModalInput}
                                    addClick={submitProject}
                                    cancelClick={()=>{showModal(false)}}
                                />
                            )}
                        </div>
                    </div>
                <div className='add-button'>
                    <Button
                        icon='plus'
                        onclick={handleProjectAdd}
                    />
                </div>
            </div>
            
        </div>
    );
}
export default Sidebar;