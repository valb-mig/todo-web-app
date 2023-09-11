"use client";

import { React, useState, useEffect } from 'react'
import { useGlobalContext } from '@/config/context/store';
import { useRouter } from 'next/navigation';

import Lottie     from 'lottie-react';
import LottieData from '/public/assets/lottie/desktop-person.json';
import handleUser from '@/utils/api/user/user';
import getToken   from '@/utils/functions/getToken';

import Header  from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import Task    from '@/app/components/Task';

import Loading from '@/app/loading';

import { AiFillTag } from 'react-icons/ai';

import '@/app/styles/page.scss';

function Home() {

  const { projects, selectedProject } = useGlobalContext();

  const [smallSidebar, setSmallSidebar] = useState(false);
  const [inHome, setUserInHome] = useState(true);

  const LoadTasks = () => {
    return(
      <Task/>
    );
  }

  return (
    <section className='home-page'>

      <header className='header-box'>
        <Header/>
      </header>

      <main className='main-box'>

        <aside className={smallSidebar ? 'sidebar-box-mini' : 'sidebar-box'}>
          <Sidebar
            UserInHome={setUserInHome}
            SmallSidebar={(bool) => setSmallSidebar(bool)}
          />
        </aside>

        { inHome && (

          <section className='content'>
            <div className='greetings'>
              <div className='center-image'>
                <Lottie
                  loop={true}
                  animationData={LottieData}
                />
              </div>
              <p>Wellcome to your <u>homepage</u></p>
            </div>

            <div className='info-title'>Your tasks status</div>

            <div className='task-info'>

              <section className='dashboard'>
                <p>Done tasks</p>
              </section>

              <section className='dashboard'>
                <span>
                  <div className='porject-type-tag'><AiFillTag/>Total tasks</div>
                </span>
                <p>{}</p>
                <img src='/assets/img/waves.png'></img>
              </section>

              <section className='dashboard'>
                <p>Week dashboard</p>
              </section>

            </div>
          </section>
        )}

        {selectedProject != null && selectedProject.id != null && !inHome ? (

          LoadTasks()
        ) : (

          selectedProject.type != '' && selectedProject.type != undefined ? (

            <section className='content'>
              <span>
                <div className='porject-type-tag'><AiFillTag/>{selectedProject.type}</div>
              </span>
            </section>

          ):null
        )}

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

    const response = await handleUser(getToken());

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