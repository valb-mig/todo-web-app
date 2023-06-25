import { React, useState, useEffect } from 'react';

import HomeModal from 'src/app/components/HomeModal';
import Sidebar   from 'src/components/main/Sidebar';
import Button    from 'src/components/Button'; 

import 'src/components/styles/Sidebar.scss';

const checkProjectType = (type) => {

    projects.map((project, index) => project.select = '' );
    
    props.selectedProject('');
    props.selectedProjectName('');

    setHomeSelected('home-selected');

    if(type === 'kanban')
    {
        setKanban('selected');
        setTodo('');
        setProjectType('kanban');
        props.projectType('kanban');
    }
    else if(type === 'todo')
    {
        setKanban('');
        setTodo('selected');
        setProjectType('todo');
        props.projectType('todo');
    }
}

export default function HomeSidebar(props){

    const [modal,           showModal]        = useState(false);
    const [isSmallScreen,   setIsSmallScreen] = useState(false);
    const [home,            setHomeSelected]  = useState('home-selected');

    const setHome = (bool) => {

    }

    const submitProject = (e,index) => {
        
    }

    const handleSelectProject = (id,title,icon) => {

    }

    useEffect(() => {

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <>
            {modal &&

                <HomeModal/>

            }
            <Sidebar>
                <div className='sidebar-content'>
                    <Button
                        title={!isSmallScreen  ? 'Home' : ''}
                        class={'todo-home mb-[5px] '+home}
                        onclick={() => {setHome(true)}}
                    />
                    <div className='sidebar-buttons mb-[5px]'>
                        <Button
                            title={!isSmallScreen  ? 'To-do' : ''}
                            class={'todo-sidebar'}
                            onclick={() => {checkProjectType('todo')}}
                        />
                        <Button
                            title={!isSmallScreen  ? 'Kanban' : ''}
                            class={'todo-sidebar mt-[5px]'}
                            onclick={() => {checkProjectType('kanban')}}
                        />
                    </div>
                    <div className='sidebar-projects'>

                        { !isSmallScreen  && ( <div className='projects-header'>Projects</div> ) }

                        <div className='projects-content'>

                        </div>
                    </div>
                    <div className='add-button'>
                        <Button
                            onclick={() => {showModal(true)}}
                        />
                    </div>
                </div>
            </Sidebar>
        </>
    );
}