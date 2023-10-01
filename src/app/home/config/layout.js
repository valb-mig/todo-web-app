'use client';

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/config/context/store';
import useLayout  from '@/app/home/hooks/useLayout';

import Icons from '@/config/icons';

import Header  from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import Tag     from '@/app/components/Tag';
import Modal   from '@/app/components/Modal';
import Button  from '@/app/components/Button';
import Input   from '@/app/components/Input';
import Select  from '@/app/components/Select';

import cleanObject from '@/utils/helpers/cleanObject';

import './style/layout.scss';

const Layout = ({ children }) => {

    const { handleGetProjects, changeProjectType, selectProject, submitModal } = useLayout();
    const [ showProjectModal, setShowProjectModal ] = useState(false);
    const { userData, projects, selectedProject } = useGlobalContext();
    
    const [ modalFormData, setModalFormData ] = useState({
        title: '',
        icon:  '',
        days:  '',
        error: false,
    });

    useEffect(() => {
        handleGetProjects();
    }, [])

    return (
        <div className='home-page'>
            
            { showProjectModal && (

                <Modal.Root>
                    <Modal.Header>
                        <Button.Root OnClick={() => {setShowProjectModal(false); setModalFormData(cleanObject(modalFormData))}} >
                            <Button.Icon Icon={<Icons.Close/>} />
                        </Button.Root>
                    </Modal.Header>

                    <Modal.Body>

                        <Modal.Title
                            Title={selectedProject.type}
                            Icon={<Icons.Hash/>}
                        />
                        
                        <form onSubmit={(e) => submitModal(e, setModalFormData, modalFormData)}>

                            <Input.Root>
                                <Input.Label Title="Title"/>
                                <Input.Body  
                                    Type='text' 
                                    Placeholder='Project title...' 
                                    OnChange={(e) => setModalFormData({...modalFormData, title: e.target.value})}
                                    Value={modalFormData.title}
                                    Error={modalFormData.error}
                                />
                            </Input.Root>

                            <div className='input-group'>
                                <Select.Root>
                                    <Select.Label Title="Days" />
                                    <Select.Body 
                                        Placeholder="Project days..."
                                        OnChange={(e) => setModalFormData({...modalFormData, days: e.target.value})}
                                        Options={[{key: 0, value: 1}]}
                                        Value={modalFormData.days}
                                        Error={modalFormData.error}
                                    >
                                    </Select.Body>
                                </Select.Root>

                                <Select.Root>
                                    <Select.Label Title="Icon" />
                                    <Select.Body 
                                        Placeholder="Project icon..."
                                        OnChange={(e) => setModalFormData({...modalFormData, icon: e.target.value})}
                                        Options={[{key: "foo", value: "folder"}]}
                                        Value={modalFormData.icon}
                                        Error={modalFormData.error}
                                    >
                                    </Select.Body>
                                </Select.Root>
                            </div>

                            <Modal.Footer>
                                <Button.Root OnClick={() => {setShowProjectModal(false); setModalFormData(cleanObject(modalFormData))}} >
                                    <Button.Title Title="Cancel" />
                                </Button.Root>
                                <Button.Root Type="submit">
                                    <Button.Title Title="Add" />
                                </Button.Root>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>
                </Modal.Root>
            )}    

            <Header.Root>
                <Header.Start>
                    <Header.Search/>
                </Header.Start>

                <Header.End>

                    { userData && userData.username !== '' && (
                        <Tag.Root>
                            <Tag.Title Title={ userData.username } />
                            <Tag.Icon  Icon={ <Icons.User/> } />
                        </Tag.Root>
                    )}

                </Header.End>
            </Header.Root>

            <section className='main-box'>

                <Sidebar.Root Type="normal">
                    <Sidebar.Start>
                        <Sidebar.Box>
                            <Button.Root Selected={selectedProject.type === 'todo'} OnClick={() => changeProjectType('todo')} >
                                <Button.Title Title="To-do" />
                            </Button.Root>

                            <Button.Root Selected={selectedProject.type === 'kanban'} OnClick={() => changeProjectType('kanban')} >
                                <Button.Title Title="Kanban" />
                            </Button.Root>
                        </Sidebar.Box>

                        {['todo','kanban'].includes(selectedProject.type) && (
                            <>
                                <Sidebar.Box Title='Projects' >
                                    <div className='projects'>
                                        <div className='project-tag'>
                                            <Tag.Root>
                                                <Tag.Title Title={selectedProject.type} />
                                            </Tag.Root>
                                        </div>

                                        {projects[selectedProject.type] && Object.values(projects[selectedProject.type]).length > 0 ? (
                                            <div className='button-group'>
                                                {Object.entries(projects[selectedProject.type]).map(([index, project], key) => (                                    
                                                    <Button.Root 
                                                        key={project.project_id}
                                                        Selected={selectedProject.key === key}
                                                        OnClick={() => selectProject(project, key, index)} 
                                                    >
                                                        <Button.Icon Icon={<Icons.Dot/>} />
                                                        <Button.Title Title={project.project_title} />
                                                    </Button.Root>
                                                ))}
                                            </div>
                                        ):(
                                            <div className='empty-content'>
                                                <img className='not-found' src='assets/img/not-found.png'/>
                                                <p>Empty</p>
                                            </div>
                                        )}

                                    </div>
                                </Sidebar.Box>

                                <Button.Root Class="button-add" OnClick={() => setShowProjectModal(true)}>
                                    <Button.Icon Icon={<Icons.Plus/>} />
                                </Button.Root>
                            </>
                        )}

                    </Sidebar.Start>
                </Sidebar.Root>

                <main className='content'>
                    { children }
                </main>
            </section>
        </div>
    )
}

export default Layout;