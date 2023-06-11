import { React,  useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button   from 'src/components/Button';
import Modal    from 'src/components/main/Modal';

import sendData from '/src/utils/api/data.js';

import '../styles/Sidebar.scss';

// Icons

import { faSitemap,
         faList, 
         faPlus,
         faHouse, } from '@fortawesome/free-solid-svg-icons';

import { AiFillFolder,
         AiFillStar,
         AiFillCloud } from 'react-icons/ai';

import { FaHippo,
         FaUserAlt }  from 'react-icons/fa';

import {BsHouseFill} from 'react-icons/bs';

import { RxMagnifyingGlass }  from 'react-icons/rx';

const Sidebar = (props) => {

    const [modal,           showModal]        = useState(false);
    const [isSmallScreen,   setIsSmallScreen] = useState(false);
    const [projectType,     setProjectType]   = useState('todo');
    const [home,            setHomeSelected]  = useState('home-selected');
    const [projects,        setProjects]      = useState([]);   
    const [modalInput,      setModalInput]    = useState('');
    const [projectError,    setProjectError]  = useState('');
    const [getSelectedDays, setSelectedDays]  = useState(1);
    const [getSelectedIcon, setSelectedIcon]  = useState(AiFillFolder);
    const [createProject,   setCreateProject] = useState();
    const [todo,            setTodo]          = useState('selected');
    const [kanban,          setKanban]        = useState('');
    const [getSelectedIconText, setSelectedIconText] = useState('folder');

    const getModalInput = (event) => setModalInput(event.target.value);
    const getModalDay   = (event) => setSelectedDays(event.target.value);

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

    const getModalIcon = (event) => {

        setSelectedIconText(event.target.value);

        switch(event.target.value){

            case "folder":
                setSelectedIcon(AiFillFolder);
            break;

            case "house":
                setSelectedIcon(BsHouseFill);
            break;

            case "user":
                setSelectedIcon(FaUserAlt);
            break;

            case "star":
                setSelectedIcon(AiFillStar);
            break;

            case "cloud":
                setSelectedIcon(AiFillCloud);
            break;

            case "hippo":
                setSelectedIcon(FaHippo);
            break;

            case "magnifying":
                setSelectedIcon(RxMagnifyingGlass);
            break;

            default:
            break;
        }
    }

    const setHome = (bool) => {

        props.home(bool);
        
        if(bool)
        {
            setHomeSelected('home-selected');

            projects.map((project, index) => {
                project.select = ''
            });
        }
        else
        {
            setHomeSelected('');
        }
    }

    const submitProject = (index) => {
    
        if(modalInput != "")
        {
            setProjectError('');

            sendData(
                {
                    "id_user":JSON.parse(sessionStorage.getItem('login')).id_user,
                    "username":JSON.parse(sessionStorage.getItem('login')).username,
                    "title_project":modalInput,
                    "days_project":getSelectedDays,
                    "icon_project":getSelectedIconText,
                    "project_type":projectType === 'todo' ? 'T' : 'K',
                    "color_project":'#FF0000' // TODO
                },
                "project-set",
                setCreateProject
            );

            setProjects([...projects, 
                {
                    id:     projects.length,
                    title:  modalInput,
                    icon:   getSelectedIcon,
                    days:   getSelectedDays,
                    type:   projectType,
                    color:  '#FF0000', // TODO
                    select: ''
                }
            ]);
                
            setModalInput('');
            setSelectedDays('');
            setSelectedIcon(AiFillFolder);

            showModal(false);
        }
        else
        {
            setProjectError('error');
        }
    }

    const handleSelectProject = (id,title) => {

        setHome(false);
        setHomeSelected('');

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

    return(
        <>
            {modal &&

                <Modal
                    onChangeInput={getModalInput}
                    onChangeIcon={getModalIcon}
                    onChangeDay={getModalDay}
                    getSelectedIcon={getSelectedIcon}
                    getSelectedDays={getSelectedDays}
                    addClick={submitProject}
                    projectError={projectError}
                    cancelClick={()=>{showModal(false)}}
                />

            }

            <div className={props.sidebarClass}>

                <div className='sidebar-content'>
                        <Button
                            title={!isSmallScreen  ? 'Home' : ''}
                            icon={faHouse}
                            class={'todo-home mb-[5px] '+home}
                            onclick={() => {setHome(true)}}
                        />
                    <div className='sidebar-buttons mb-[5px]'>
                        <Button
                            title={!isSmallScreen  ? 'To-do' : ''}
                            icon={faList}
                            class={'todo-sidebar '+todo}
                            onclick={() => {checkProjectType('todo')}}
                        />
                        <Button
                            title={!isSmallScreen  ? 'Kanban' : ''}
                            icon={faSitemap}
                            class={'todo-sidebar mt-[5px] '+kanban}
                            onclick={() => {checkProjectType('kanban')}}
                        />
                    </div>
                    <div className='sidebar-projects'>

                    { !isSmallScreen  && ( <div className='projects-header'>Projects</div> ) }

                            <div className='projects-content'>

                                {projects.map((project, index) => {
                                    if (project.type === projectType) {
                                        return (
                                            <Button
                                                id={index}
                                                key={index}
                                                title={!isSmallScreen ? project.title : ''}
                                                reactIcon={project.icon}
                                                class={'todo-sidebar ' + project.select}
                                                onclick={() => {
                                                handleSelectProject(index, project.title);
                                                }}
                                            />
                                        );
                                    } else {
                                        return null;
                                    }
                                })}

                            </div>
                        </div>
                    <div className='add-button'>
                        <Button
                            icon={faPlus}
                            onclick={(e) => {showModal(true)}}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Sidebar;