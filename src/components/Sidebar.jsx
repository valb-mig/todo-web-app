import React, { useState } from 'react';

import Button from './Button';
import Modal  from './Modal';

import './scss/Sidebar.scss';

const Sidebar = (props) => {

    const [projects,   setProjects]   = useState([]);   
    const [title,      setTitleInput] = useState('');
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
        <div className='sidebar bg-gray-alt'>

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
                    Projects

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
                    
                    <div className='add-button'>
                        <Button
                            icon='plus'
                            onclick={handleProjectAdd}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default Sidebar;