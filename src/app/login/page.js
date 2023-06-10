"use client";

import { React, useState, useEffect } from 'react';
import { useRouter }       from 'next/navigation';

import sendData from '/src/utils/api/data.js';
import login    from '/src/utils/api/login.js';

import darkTheme       from '/src/utils/functions/darkTheme';
import handleChangeUrl from '/src/utils/functions/handleChangeUrl';

import { faUser,
         faLock,
         faSun } from '@fortawesome/free-solid-svg-icons';

import Header  from 'src/components/main/Header'; 
import Input   from 'src/components/Input';
import Button  from 'src/components/Button'; 

import 'src/app/login/style/page.scss';

export default function Login() {

    const router = useRouter();

    const [ userId,   setUserId ]   = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error,    setError ]    = useState("");
    const [ data,     setData ]     = useState({});

    const [theme, setTheme] = useState(false);
    const [icon,  setIcon]  = useState(faSun);

    const setText = (e,setValue) => {

      setValue(e.target.value);
    }

    const submitLogin = async () => {

      if( username != '' && password != '' ){

        setError("");

        setUsername(username.replace(/[^a-zA-Z0-9,]/g, ''));
        setPassword(password.replace(/[^a-zA-Z0-9,]/g, ''));

        sendData(
          {
            "username":username,
            "password":password
          },
          "user-verify",
          setData
        );
      }
      else {
        setError("error");
      }
    }

    useEffect(() => {

      if (data.verify) {

        let userData = {
          "id_user":data.value.id_user,
          "username":data.value.username,
          "crate_date":data.value.crate_date,
          "last_access":data.value.last_access
        }

        sessionStorage.setItem('login',JSON.stringify(userData));

        console.log(true);

        fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id:  data.value.user_id,
            username: data.value.username,
          }),
        })

        handleChangeUrl(null,"/",router)
      }
      else
      {
        console.log(false);
      }
    }, [data]);

    return (
      <div className='content'>

          <Header>
            <div className='header-start'>
                <div className='header-logo'>
                  <p className='site-title'>./Todo.sh
                    <span className='title-cursor'>|</span>
                  </p>
                </div>
              </div>

              <div className='header-end'>
                
                <Button
                    icon={icon}
                    class="switch-color mr-[5px] rounded-[5px]"
                    onclick={() => {darkTheme(setIcon,setTheme,theme)}}
                />
              </div>
          </Header>

        <div className='login-content'>
          <section className='login-box'>
              <div className='box'>

                <div>
                  <Input
                      id='username'
                      icon={faUser}
                      placeholder='Username'
                      class={error + ' rounded-[5px]'}
                      onchange={(e) => {setText(e,setUsername)}}
                  />
                </div>
                <div className='mt-[5px]'>
                  <Input
                      id='password'
                      type='password'
                      icon={faLock}
                      placeholder='Password'
                      class={error + ' rounded-[5px]'}
                      onchange={(e) => {setText(e,setPassword)}}
                  />
                </div>
                
              <div className='under-text'>
                <p>You don't have a account yet? <a onClick={(e) => {handleChangeUrl(e,"/register",router)}}><u>register</u></a></p>
              </div>

              <div className='buttons mt-[5px]'>
                
                <Button
                  onclick={submitLogin}
                  title="Login"
                />
                <Button
                  onclick={(e) => {handleChangeUrl(e,"/",router)}}
                  class="button-back"
                  title="Back"
                />
              </div>
              
            </div>
          </section>
        </div>
      </div>
    )
  }