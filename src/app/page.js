"use client";

import { React, useState, useEffect } from 'react'

import Lottie from 'lottie-react';
import LottieData from '/public/assets/lottie/desktop-person.json';
import handleUser from '@/utils/api/user/user';
import getToken   from '@/utils/functions/getToken';

import Header  from '@/components/home/Header'
import Sidebar from '@/components/home/Sidebar'

export default function Home() {

  const [smallSidebar, setSmallSidebar] = useState(false);
  const [inHome, setUserInHome]   = useState(true);
  const [userData,  setUserData]  = useState({
    'username':'',
    'logged'  :false
  });

  useEffect(() => {
      getUserData(getToken(userData.logged));
  },[]);

  useEffect(() => {

      const handleResize = () => setSmallSidebar(window.innerWidth < 768);
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  },[]);

  async function getUserData(token){
        
    let response = await handleUser(token);

    if (response && response.success && (response.username !== userData.username || !userData.logged)) {
      setUserData({
        ...userData,
        username: response.username,
        logged:   true
      });
    }
  }

  return (
    <div className='Home'>

      <div className='header-box'>
        <Header
          UserData={userData}
        />
      </div>

      <div className='main-box'>

        <div className={smallSidebar ? 'sidebar-box-mini' : 'sidebar-box'}>
          <Sidebar
            UserInHome={setUserInHome}
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
