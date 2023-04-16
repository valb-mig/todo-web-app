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

        let selected = 'selected';

        let project_title;
        let project_select;

        if(projects.length === 0)
        {
            project_title = 'Todo';
            project_select = selected;

            setProjects ([...projects,
                {
                    title:  project_title,
                    select: project_select
                }
            ]);
        }
        else
        {
            showModalProject();
        }
    }
    
    const showModalProject = () => {
        showModal(true);
    }
    
    const getModalInput = (event) => {
        setModalInput(event.target.value);
    }

    const submitProject = () => {
    
        setProjects([...projects, 
            {
                title:   modalInput,
                select: 'selected'
            }
        ]);
    
        showModal(false);
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