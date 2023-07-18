import { React, useState, useEffect } from 'react';

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

import Modal  from '@/components/home/Modal';
import Button from '@/components/Button';

import './styles/Sidebar.scss';

export default function Sidebar({UserInHome}){

    const [modal, showModal] = useState(false);
    const [smallSidebar, setSmallSidebar] = useState(false);
    const [inHome, setUserInHome] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    const [projects, projectManager] = useState(
        {
            'todo':{
                'projects':[
                    {
                        // 'tasks':[
        
                        // ]
                    }
                ]
            },

            'kanban':{
                'projects':[
                    {
                        // 'tasks':[
        
                        // ]
                    }
                ]
            }
        }
    );

    useEffect(() => {

        const handleResize = () => setSmallSidebar(window.innerWidth < 768);
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        handleGetProjects();
    },[])

    const changeToHome = (bool) => {

        if(bool){
            setSelectedProject(null);
        }

        setUserInHome(bool);
        UserInHome(bool);
    }

    const changeProjectType = (type) => {
        changeToHome(false);
        setSelectedProject(type);
    }

    async function handleGetProjects(){
        let projects = await getProject();

        if(projects){
            console.log(projects);
        }
    }

    async function insertProject(data,type) {

        let response = await addProject(data,type);

        if(response){
            handleGetProjects();
        }
    }

    return(
        <>
            {modal && (
                <Modal
                    Modal={modal}
                    ShowModal={showModal}
                    SubmitModal={(data) => {insertProject(data,selectedProject)}}
                />
            )}

            <div className={smallSidebar ? 'sidebar-mini' : 'sidebar'}>
                <div className='sidebar-content'>
                    <Button
                        Title={!smallSidebar  ? 'Home' : ''}
                        Icon={!smallSidebar   ? '' : <FaHome/>}
                        Class={inHome ? 'todo-home home-selected' : 'todo-home'}
                        OnClick={() => {changeToHome(true)}}
                    />
                    <div className='sidebar-buttons'>
                        <Button
                            Title={!smallSidebar  ? 'To-do' : ''}
                            Icon={!smallSidebar   ? '' : <FaListUl/>}
                            Class={selectedProject == 'todo' ? 'selected' : ''}
                            OnClick={() => {changeProjectType('todo') && changeToHome(false)}}
                        />
                        <Button
                            Title={!smallSidebar  ? 'Kanban' : ''}
                            Icon={!smallSidebar   ? '' : <FaProjectDiagram/>}
                            Class={selectedProject == 'kanban' ? 'selected' : ''}
                            OnClick={() => {changeProjectType('kanban') && changeToHome(false)}}
                        />
                    </div>

                    { !inHome && (
                        <>
                            { !smallSidebar  && ( <div className='projects-header'>My projects</div> ) }

                            <div className='projects-content'>

                                { !smallSidebar && !inHome ? (
                                        <span>
                                            <div className='porject-type-tag'>{selectedProject}</div>
                                        </span>
                                    ) : null
                                }


                                {true && !smallSidebar ? (
                                    <div className='empty-content'>
                                        <div className='not-found'>
                                            <img src='assets/img/not-found.png'/>
                                        </div>
                                        <p>Empty</p>
                                    </div>
                                    ) : null
                                }
                            </div>
                        
                        
                            <div className='add-button'>
                                <Button
                                    Icon={<AiOutlinePlus/>}
                                    OnClick={() => {showModal(!modal)}}
                                />
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}