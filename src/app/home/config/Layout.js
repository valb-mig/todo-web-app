import React, { useState, useEffect } from 'react';

import { useGlobalContext } from '@/config/context/store';
import { useRouter } from 'next/navigation';
import Icons from '@/config/icons';

import Loading   from '@/app/loading';

import Header    from '@/app/components/Header';
import Sidebar   from '@/app/components/Sidebar';
import Tag       from '@/app/components/Tag';
import Modal     from '@/app/components/Modal';
import Button    from '@/app/components/Button';
import Input     from '@/app/components/Input';
import Select    from '@/app/components/Select';

import handleUser      from '@/utils/api/user/user';
import getProject      from '@/utils/api/project/get';
import cleanObject     from '@/utils/helpers/cleanObject';
import modalValidation from '@/utils/validators/home/modalValidation';

import '@/app/styles/page.scss';

const HomeLayout = ({ children }) => {

    const { userData, projects, selectedProject, path, setProjects, setSelectedProject, setScreenPath } = useGlobalContext();

    const [ showProjectModal, setShowProjectModal ] = useState(false);
    const [ modalFormData, setModalFormData ] = useState({
        title: '',
        icon:  '',
        days:  '',
        error: false,
    });

    useEffect(() => {
        handleGetProjects();
    },[])

    const changeProjectType = (type) => {

        setScreenPath({
            current:{project:true},
            breadcrumbs: [type]
        });

        setSelectedProject({
            id:    null,
            key:   null,
            type:  type,
            title: null,
            icon:  null
        });
    }

    const selectProject = (project, key, id) => {

        setScreenPath({
            current:{task:true},
            breadcrumbs: [project.project_title]
        });

        setSelectedProject({
            id:    id,
            key:   key,
            type:  project.project_type,
            title: project.project_title,
            icon:  project.project_icon
        });

        console.log(selectedProject);
        console.log(key);
    }

    async function handleGetProjects() {
            
        let response = await getProject();

        if( response ){
            setProjects(response.projects);
        } else  {
            console.warn('[Projects]: No database');
        }
    }

    async function submitModal() {

        let response = await modalValidation(modalFormData, setModalFormData, selectedProject);

        if(typeof response == "object") {

            let projectCount = Object.keys(projects[selectedProject.type]).length + 1;
            
            setProjects({

                ...projects,

                [selectedProject.type]:{
                ...projects[selectedProject.type],
                [projectCount]:{
                    ...response
                }
                }
            });

        } else if(typeof response == "boolean") {

            if(response) {
                handleGetProjects();
            } else {
                console.warn('[Projects]: Database error');
            }
        }
    }

    return (
        <div className='home-page'>
            
            {showProjectModal && (

                <Modal.Root>
                    <Modal.Header>
                        <Button.Root OnClick={() => {setShowProjectModal(false); setModalFormData(cleanObject(modalFormData))}} >
                            <Button.Icon Icon={<Icons.Close/>} />
                        </Button.Root>
                    </Modal.Header>

                    <Tag.Root>
                        <Tag.Title Title={selectedProject.type}/>
                    </Tag.Root>

                    <Modal.Body>
                        <form onSubmit={() => { setShowProjectModal(false); submitModal()}}>

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
                                        Options={[
                                            {
                                            key: 0,
                                            value: 1
                                            }
                                        ]}
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
                                        Options={[
                                            {
                                            key: "foo",
                                            value: "bar"
                                            }
                                        ]}
                                        Value={modalFormData.icon}
                                        Error={modalFormData.error}
                                    >
                                    </Select.Body>
                                </Select.Root>
                            </div>

                            <Modal.Footer>
                                <Button.Root OnClick={() => setModalFormData(cleanObject(modalFormData))} >
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

                    { userData && userData.username !== '' && userData.username !== null && (
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

                        { projects[selectedProject.type] && Object.values(projects[selectedProject.type]).length > 0 && (
                            <Sidebar.Box>
                                <div className='projects'>
                                    {Object.entries(projects[selectedProject.type]).map(([index, project], key) => (                                    
                                        <Button.Root 
                                            Selected={selectedProject.key === key}
                                            OnClick={() => selectProject(project, key, index)} 
                                        >
                                            <Button.Icon Icon={<Icons.Dot/>} />
                                            <Button.Title Title={project.project_title} />
                                        </Button.Root>
                                    ))}
                                </div>
                            </Sidebar.Box>
                        )}

                        <Button.Root Class="button-add" OnClick={() => setShowProjectModal(true)}>
                            <Button.Icon Icon={<Icons.Plus/>} />
                        </Button.Root>

                    </Sidebar.Start>
                </Sidebar.Root>

                <main className='content'>
                    { children }
                </main>
            </section>
        </div>
    )
}

export default function WrappedComponent({ children }) {

  const { userData, setUserData } = useGlobalContext();
  const [ loading, setLoading ]   = useState(true);

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {

    const response = await handleUser();

    if(response) {

      try {

        if(response.success !== null && response.success !== undefined) {

          if (response?.success) {

            setUserData({
              username: response.user.name,
              logged:   true
            });
          } else {
            router.push('/login');
          }

        } else {

          setUserData({
            username: "Fake Name",
            logged:   false
          });
        }
      } catch (error) {
        console.error("Error: "+error);
      } finally {
        setLoading(false);
      }
    }
    else {
      console.error('[Api]: Response Error');
    }
  }

  if (loading) <Loading/>

  return userData ? (
    <HomeLayout>
      { children }
    </HomeLayout>
  ) : null;
}