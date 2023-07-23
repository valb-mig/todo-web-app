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

export default function Sidebar({UserInHome, GetProjects, SelectedProject}){

    const [projects, setProjects] = useState({});

    const [modal, showModal] = useState(false);
    const [inHome, setUserInHome] = useState(true);
    const [smallSidebar, setSmallSidebar] = useState(false);

    const [selectedProject, setSelectedProject] = useState({
        id:    null,
        type:  null,
        title: null,
        icon:  null,
        id_project: null
    });

    const clearSelectedProject = () => {
        setSelectedProject({
            id:    null,
            type:  null,
            title: null,
            icon:  null,
            id_project: null
        });
        SelectedProject({
            id:    null,
            type:  null,
            title: null,
            icon:  null,
            id_project: null
        });
    }

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
        if(bool) {
            clearSelectedProject();
        }
        setUserInHome(bool);
        UserInHome(bool);
    }

    const changeProjectType = (type) => {
        changeToHome(false);

        setSelectedProject({
            id:null,
            type:type,
            title:null,
            icon:null,
            id_project:null
        });
        SelectedProject({
            id:null,
            type:type,
            title:null,
            icon:null,
            id_project:null
        });
    }

    async function handleGetProjects(){
        let response = await getProject();

        if(response){
            setProjects(response.projects);
            GetProjects(response.projects);
        }
    }

    async function insertProject(data,type) {
        let response = await addProject(data,type);

        if(response){
            handleGetProjects();
        }
    }

    const handleSelectProject = (key,title,project) => {

        setSelectedProject({
            ...selectedProject,
            id:key,
            title:title,
            icon:project.icon_name,
            id_project:project.id_project
        });
        SelectedProject({
            ...selectedProject,
            id:key,
            title:title,
            icon:project.icon_name,
            id_project:project.id_project
        });
    }

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
                            Class={selectedProject.type == 'todo' ? 'selected' : ''}
                            OnClick={() => {changeProjectType('todo') && changeToHome(false)}}
                        />
                        <Button
                            Title={!smallSidebar  ? 'Kanban' : ''}
                            Icon={!smallSidebar   ? '' : <FaProjectDiagram/>}
                            Class={selectedProject.type == 'kanban' ? 'selected' : ''}
                            OnClick={() => {changeProjectType('kanban') && changeToHome(false)}}
                        />
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

                                { projects.length < 1 && projects.filter(project => project.type === selectedProject.type).length > 0 && !smallSidebar ? (
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
                                            <Button
                                                Key={key}
                                                Title={index}
                                                OnClick={() => {handleSelectProject(key,index,project)}}
                                                Class={selectedProject.id == key ? "selected" : ""}
                                            />
                                        ))}
                                    </div>
                                )}

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