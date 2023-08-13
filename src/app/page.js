"use client";

import { React, useState, useEffect } from 'react'
import { useGlobalContext } from '@/app/Context/store';

import Lottie     from 'lottie-react';
import LottieData from '/public/assets/lottie/desktop-person.json';
import handleUser from '@/utils/api/user/user';
import getToken   from '@/utils/functions/getToken';

import Header  from '@/components/home/Header';
import Sidebar from '@/components/home/Sidebar';
import Task    from '@/components/home/Task';
import { useRouter } from 'next/navigation';

function Home() {

  const { selectedProject, setSelectedProject } = useGlobalContext();

  const [smallSidebar, setSmallSidebar] = useState(false);
  const [inHome, setUserInHome] = useState(true);

  const LoadTasks = () => {
    return(
      <Task/>
    );
  }

  return (
    <div className='Home'>

      <div className='header-box'>
        <Header/>
      </div>

      <div className='main-box'>

        <div className={smallSidebar ? 'sidebar-box-mini' : 'sidebar-box'}>
          <Sidebar
            UserInHome={setUserInHome}
            SmallSidebar={(bool) => setSmallSidebar(bool)}
          />
        </div>

        { inHome && (
          <div className='content'>
            <div className='greetings'>
              <div className='center-image'>
                <Lottie
                  loop={true}
                  animationData={LottieData}
                />
              </div>
              <p>Wellcome to your <u>homepage</u></p>
            </div>

            <div className='info-title'>Your week status</div>

            <div className='task-info'>
              <section>
                <p>Empty</p>
              </section>

              <section>
                <p>Empty</p>
              </section>

              <section>
                <p>Empty</p>
              </section>

            </div>
          </div>
        )}

        {selectedProject != null && selectedProject.id != null && !inHome ? (
          LoadTasks()
        ) : null}

      </div>
    </div>
  )
}

export default function WrappedComponent() {

  const { userData, setUserData } = useGlobalContext();

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {

    const response = await handleUser(getToken());

    if(response) {

      try {
        if (response?.success) {
          setUserData({
            username: response.username,
            logged:   true
          });
        } else {
          router.push('/login');
        }
      } catch (error) {
        setUserData({
          username: 'Jhon Doe',
          logged:   false
        });

      } finally {
        setLoading(false);
      }
    }
    else {
      router.push('/login');
    }
  }

  if (loading) {

    return (

      <div className='Home'>
        <div className='header-box'>
          <header className='header-bar'>
            <div className='header-item'>
              <div className='header-start'>
                <div className='header-logo'/>
              </div>
              <div className='header-end'/>
            </div>
          </header>
        </div>
        <div className='main-box'>
          <div className='sidebar-box'>
            <div className='sidebar'>
              <div className='sidebar-content'>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return userData ? <Home/> : null;
}