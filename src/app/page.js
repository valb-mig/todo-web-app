"use client";

import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '@/config/context/store';
import { useRouter } from 'next/navigation';

import Icons from '@/config/icons';

import Loading from '@/app/loading';
import Header  from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import Task    from '@/app/components/Task';
import Dashboard from '@/app/components/Dashboard';
import Tag from './components/Tag';

import Lottie     from 'lottie-react';
import LottieData from '/public/assets/lottie/desktop-person.json';

import handleUser from '@/utils/api/user/user';

import '@/app/styles/page.scss';

function Home() {

  const { userData, selectedProject } = useGlobalContext();

  const [smallSidebar, setSmallSidebar] = useState(false);
  const [inHome, setUserInHome] = useState(true);

  return (
    <section className='home-page'>

      <Header.Root>
        
        <Header.Start>
          <Header.Search/>
        </Header.Start>

        <Header.End>

            { userData && userData.username != '' && userData.username != null ? (

                <Tag.Root>
                    <Tag.Title Title={ userData.username } />
                    <Tag.Icon Icon={<Icons.User/>}/>
                </Tag.Root>

            ):null }

        </Header.End>
      </Header.Root>

      <main className='main-box'>

        <aside className={smallSidebar ? 'sidebar-box-mini' : 'sidebar-box'}>
          <Sidebar
            UserInHome={setUserInHome}
            SmallSidebar={(bool) => setSmallSidebar(bool)}
          />
        </aside>

        <section className='content'>
        { inHome && (
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

        {selectedProject != null && selectedProject.id != null && !inHome ? (
          <></>
        ) : (
          selectedProject.type != '' && selectedProject.type != undefined ? (

            <Tag.Root>
              <Tag.Title Title={ selectedProject.type } />
              <Tag.Icon Icon={<Icons.Grid/>}/>
            </Tag.Root>
            
          ):null
        )}
        </section>
      </main>
    </section>
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