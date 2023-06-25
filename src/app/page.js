"use client";

import { React, useState, useEffect } from 'react'

import Lottie from 'lottie-react';
import LottieData from '/public/assets/lottie/desktop-person.json';

import Header  from '@/components/home/Header'
import Sidebar from '@/components/home/Sidebar'

export default function Home() {

  const [smallSidebar, setSmallSidebar] = useState(false);
  const [inHome, setUserInHome] = useState(true);

  useEffect(() => {

      const handleResize = () => setSmallSidebar(window.innerWidth < 768);
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
  ) 
  return (
    <div className='Home'>

      <div className='header-box'>
        <Header/>
      </div>

      <div className='main-box'>

        <div className={smallSidebar ? 'sidebar-box-mini' : 'sidebar-box'}>
          <Sidebar
            userInHome={setUserInHome}
          />
        </div>

        {inHome &&(
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

      </div>

    </div>
  )
}
