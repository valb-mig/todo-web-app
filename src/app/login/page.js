"use client";

import { React, useState, useEffect } from 'react';
import { useRouter }       from 'next/navigation';

import sendData        from '/src/api/data.js';
import login           from '/src/api/login.js';

import darkTheme       from '/src/helper/darkTheme';
import handleChangeUrl from '/src/helper/handleChangeUrl';

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
      console.log(e.target.value);
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
          "verify",
          setData
        );
      }
      else {
        setError("error");
      }
    }

    useEffect(() => {

      console.log(data);

      if (data.verify) {

        let userData = {
          "username":data.value[0].username,
          "crate_date":data.value[0].crate_date,
          "last_access":data.value[0].last_access
        }

        sessionStorage.setItem('login',JSON.stringify(userData));

        fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id:  data.value[0].user_id,
            username: data.value[0].username,
          }),
        })

        handleChangeUrl(null,"/",router)
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
                    class="switch-color mr-[5px] rounded-[100%]"
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
                      class={error + ' rounded-[160px]'}
                      onchange={(e) => {setText(e,setUsername)}}
                  />
                </div>
                <div className='mt-[5px]'>
                  <Input
                      id='password'
                      type='password'
                      icon={faLock}
                      placeholder='Password'
                      class={error + ' rounded-[160px]'}
                      onchange={(e) => {setText(e,setPassword)}}
                  />
                </div>
                
              <div className='under-text'>
                <p>You don't have a account yet? <a href='/register'><u>register</u></a></p>
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