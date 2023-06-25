import { React, useState, useEffect } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';

import { 
    FaProjectDiagram, 
    FaHome,
    FaListUl
} from 'react-icons/fa';

import Modal  from '@/components/home/Modal';
import Button from '@/components/Button';

import './styles/Sidebar.scss';

export default function Sidebar({userInHome}){

    const [modal, showModal] = useState(false);
    const [smallSidebar, setSmallSidebar] = useState(false);
    const [inHome, setUserInHome] = useState(true);

    const [projects, projectManager] = useState(
        {
            'todo':{
                'selected':false,
                'tasks':[
    
                ]
            },

            'kanban':{
                'selected':false,
                'tasks':[
                    
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

    const changeToHome = (bool) => {

        if(bool){
            projectManager({...projects,todo:{...projects.todo,selected:false},kanban:{...projects.kanban,selected:false}});
        }

        setUserInHome(bool);
        userInHome(bool);
    }

    const changeProjectType = (type) => {

        changeToHome(false);

        switch(type){

            case 'todo':
                projectManager({...projects,todo:{...projects.todo,selected:true},kanban:{...projects.kanban,selected:false}});
            break;

            case 'kanban':
                projectManager({...projects,todo:{...projects.todo,selected:false},kanban:{...projects.kanban,selected:true}});
            break;
        }
    }

    return(
        <>
            {modal && (
                <Modal
                    Modal={modal}
                    ShowModal={showModal}
                    SubmitModal={() => {console.log(projects)}}
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
                            Class={projects.todo.selected ? 'selected' : ''}
                            OnClick={() => {changeProjectType('todo') && changeToHome(false)}}
                        />
                        <Button
                            Title={!smallSidebar  ? 'Kanban' : ''}
                            Icon={!smallSidebar   ? '' : <FaProjectDiagram/>}
                            Class={projects.kanban.selected ? 'selected' : ''}
                            OnClick={() => {changeProjectType('kanban') && changeToHome(false)}}
                        />
                    </div>

                    { !inHome && (
                        <>
                            { !smallSidebar  && ( <div className='projects-header'>My projects</div> ) }

                            <div className='projects-content'>

                                { !smallSidebar && !inHome ? (
                                        <span>
                                            <div className='porject-type-tag'>{projects.todo.selected ? 'to-do' : 'kanban'}</div>
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