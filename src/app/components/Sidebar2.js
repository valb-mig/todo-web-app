import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/config/context/store';

import addProject from '@/utils/api/project/add';
import getProject from '@/utils/api/project/get';

import { 
    AiOutlinePlus 
} from 'react-icons/ai';

import { 
    FaProjectDiagram, 
    FaHome,
    FaListUl
} from 'react-icons/fa';

import Modal  from '@/app/components/Modal';
import Button from '@/app/components/Button';

import './styles/Sidebar.scss';

export default function Sidebar({ UserInHome, SmallSidebar }){

    const { projects, setProjects, selectedProject, setSelectedProject } = useGlobalContext();

    const [modal, showModal] = useState(false);
    const [inHome, setUserInHome] = useState(true);
    const [smallSidebar, setSmallSidebar] = useState(false);

    useEffect(() => {
        handleGetProjects();
    },[])

    const clearSelectedProject = () => {
        
        setSelectedProject({
            id:    null,
            type:  null,
            title: null,
            icon:  null,
            project_id: null
        });
    }

    const changeToHome = (bool) => {

        if(bool) {
            clearSelectedProject();
        }
        setUserInHome(bool);
        UserInHome(bool);
    }

    const changeProjectType = (type) => {

        changeToHome(false);

        setSelectedProject({
            id:    null,
            type:  type,
            title: null,
            icon:  null,
            project_id: null
        });
    }

    async function handleGetProjects() {
        
        let response = await getProject();

        if( response ){
            
            setProjects(response.projects);

        } else  {

            console.log('Projects: No database');
        }
    }

    async function insertProject(data, type) {
    
        let response = await addProject(data, type);
    
        if (response && response.success != null && response.success != undefined) {

            if(response.success) {

                handleGetProjects();
            } else {

                console.log("Database error!");
            }

        } else {

            console.log('Projects: No database');

            let newProject = {

                project_title: data.title,
                project_icon: 'list',
                project_tasks:[]
            }

            let projectCount = Object.keys(projects[selectedProject.type]).length + 1;

            setProjects({

                ...projects,

                [selectedProject.type]:{
                    ...projects[selectedProject.type],
                    [projectCount]:{
                        ...newProject
                    }
                }
            });
        }
    }

    const handleSelectProject = (key,project,id) => {

        let selectedObject = {
            ...selectedProject,
            id:key,
            title:project.project_title,
            icon:project.project_icon,
            project_id:id
        }

        setSelectedProject(selectedObject);
    }

    useEffect(() => {
        const handleResize = () => {
            let smallSize = window.innerWidth < 768;

            setSmallSidebar(smallSize)
            SmallSidebar(smallSize)
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [SmallSidebar])

    return(
        <>
            {modal && (
                <Modal
                    Modal={modal}
                    ShowModal={showModal}
                    SubmitModal={(data) => {insertProject(data,selectedProject.type)}}
                />
            )}

            <div className={smallSidebar ? 'sidebar-mini' : 'sidebar'}>
                <div className='sidebar-content'>
                    {/* <Button
                        Key="home"
                        Title={!smallSidebar  ? 'Home' : ''}
                        Icon={!smallSidebar   ? '' : <FaHome/>}
                        Class={inHome ? 'todo-home home-selected' : 'todo-home'}
                        OnClick={() => {changeToHome(true)}}
                    /> */}
                    <div className='sidebar-buttons'>
                        {/* <Button
                            key="todo"
                            Title={!smallSidebar  ? 'To-do' : ''}
                            Icon={!smallSidebar   ? '' : <FaListUl/>}
                            Class={selectedProject.type == 'todo' ? 'selected' : ''}
                            OnClick={() => {changeProjectType('todo') && changeToHome(false)}}
                        />
                        <Button
                            Key="kanban"
                            Title={!smallSidebar  ? 'Kanban' : ''}
                            Icon={!smallSidebar   ? '' : <FaProjectDiagram/>}
                            Class={selectedProject.type == 'kanban' ? 'selected' : ''}
                            OnClick={() => {changeProjectType('kanban') && changeToHome(false)}}
                        /> */}
                    </div>

                    { !inHome && (
                        <>
                            { !smallSidebar  && ( <div className='projects-header'>My projects</div> ) }

                            <div className='projects-content'>

                                { !smallSidebar && !inHome ? (
                                        <span>
                                            <div className='porject-type-tag'>{selectedProject.type}</div>
                                        </span>
                                    ) : null
                                }

                                { ( projects.length < 1 || projects[selectedProject.type].length < 1 ) && !smallSidebar ? (
                                    <div className='empty-content'>
                                        <div className='not-found'>
                                            <img src='assets/img/not-found.png'/>
                                        </div>
                                        <p>Empty</p>
                                    </div>
                                    ) : null
                                }

                                { projects[selectedProject.type] && Object.values(projects[selectedProject.type]).length > 0 && (
                                    <div className='projects'>
                                        {Object.entries(projects[selectedProject.type]).map(([index, project], key) => (                                    
                                            // <Button
                                            //     Key={key}
                                            //     Title={!smallSidebar ? project.project_title : ''}
                                            //     OnClick={() => { handleSelectProject(key,project,index) }}
                                            //     Class={selectedProject.id == key ? "selected" : ""}
                                            //     Icon={<FaListUl/>}
                                            // />
                                            <></>
                                        ))}
                                    </div>
                                )}

                            </div>
                            <div className='add-button'>
                                {/* <Button
                                    Icon={<AiOutlinePlus/>}
                                    OnClick={ () => showModal(!modal) }
                                /> */}
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}