"use client";

import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '@/config/context/store';
import { useRouter } from 'next/navigation';

import Icons from '@/config/icons';

import Loading   from '@/app/loading';
import Header    from '@/app/components/Header';
import Sidebar   from '@/app/components/Sidebar';
import Dashboard from '@/app/components/Dashboard';
import Tag       from '@/app/components/Tag';
import Modal     from '@/app/components/Modal';

import Button    from '@/app/components/Button';
import Input     from '@/app/components/Input';

import Lottie     from 'lottie-react';
import LottieData from '/public/assets/lottie/desktop-person.json';

import handleUser from '@/utils/api/user/user';

import '@/app/styles/page.scss';

const Home = () => {

  const { userData, projects, selectedProject, path, setProjects, setSelectedProject, setScreenPath } = useGlobalContext();

  const [ showProjectModal, setShowProjectModal ] = useState(false);

  const changeProjectType = (type) => {

    setScreenPath({
      current:{home:false},
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

  return (
    <div className='home-page'>

      {showProjectModal && (
        <Modal.Root>

            <Modal.Header>
              <Button.Root OnClick={() => setShowProjectModal(false)} >
                <Button.Icon Icon={<Icons.Close/>} />
              </Button.Root>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={() => setShowProjectModal(false)}>
                
                <Input.Root Placeholder="Project tile"/>

                <div className='input-group'>
                  <Input.Root Placeholder="Project tile"/>
                  <Input.Root Placeholder="Project tile"/>
                </div>

                <Modal.Footer>
                  <Button.Root OnClick={() => setShowProjectModal(false)} >
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
              <Tag.Icon Icon={<Icons.User/>}/>
            </Tag.Root>
          )}

        </Header.End>
      </Header.Root>

      <section className='main-box'>

        <Sidebar.Root Type="normal">
          <Sidebar.Start>
            <Sidebar.Box>
              <Button.Root OnClick={() => changeProjectType('todo')} >
                <Button.Title Title="To-do" />
              </Button.Root>

              <Button.Root OnClick={() => changeProjectType('kanban')} >
                <Button.Title Title="Kanban" />
              </Button.Root>
            </Sidebar.Box>

              { projects[selectedProject.type] && Object.values(projects[selectedProject.type]).length > 0 && (
                <Sidebar.Box>
                  <div className='projects'>
                    {Object.entries(projects[selectedProject.type]).map(([index, project], key) => (                                    
                        <Button.Root OnClick={() => { console.log(key,project,index) }} >
                          <Button.Icon Icon={<Icons.Grid/>} />
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

        { path.current !== undefined && path.current.home && (
          <>
            <div className='greetings'>
              <div className='center-image'>
                <Lottie
                  loop={true}
                  animationData={LottieData}
                />
              </div>
              <p>Wellcome to your <u>homepage</u></p>
            </div>

            <p className='info-title'>Your tasks status</p>

            <div className='task-info'>

              <Dashboard.Root>
                <Tag.Root>
                  <Tag.Icon Icon={<Icons.Tag/>} />
                  <Tag.Title Title="Done tasks" />
                </Tag.Root>
                <Dashboard.Count Value={0}/>
              </Dashboard.Root>

              <Dashboard.Root>
                <Tag.Root>
                  <Tag.Icon Icon={<Icons.Tag/>} />
                  <Tag.Title Title="Total tasks" />
                </Tag.Root>
                <Dashboard.Count Value={0}/>
              </Dashboard.Root>

              <Dashboard.Root>
                <Tag.Root>
                  <Tag.Icon Icon={<Icons.Tag/>} />
                  <Tag.Title Title="Week dashboard" />
                </Tag.Root>
                <Dashboard.Count Value={0}/>
              </Dashboard.Root>

            </div>
          </>
        )}

        {selectedProject != null && selectedProject.id != null && !path.current.home ? (
          <></>
        ) : (
          selectedProject.type != '' && selectedProject.type != undefined && !path.current.home && (

            <div className='home-tag'>
              <Tag.Root>
                <Tag.Icon Icon={<Icons.Grid/>}/>
                <Tag.Title Title={ selectedProject.type } />
              </Tag.Root>
            </div>
          )
        )}
        </main>
      </section>
    </div>
  )
}

export default function WrappedComponent() {

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
        console.log("Error: "+error);
      } finally {
        setLoading(false);
      }
    }
    else {
      console.log('Response Error');
    }
  }

  if (loading) {

    return ( <Loading/> );
  }

  return userData ? <Home/> : null;
}