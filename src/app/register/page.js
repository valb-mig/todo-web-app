"use client";

import { React, useState, useEffect } from 'react';
import { useRouter }       from 'next/navigation';

import sendData        from '/src/utils/api/data.js';

import darkTheme       from '/src/utils/functions/darkTheme';
import handleChangeUrl from '/src/utils/functions/handleChangeUrl';

import { faUser,
         faLock,
         faSun } from '@fortawesome/free-solid-svg-icons';

import Header  from 'src/components/main/Header'; 
import Input   from 'src/components/Input';
import Button  from 'src/components/Button'; 

import 'src/app/register/style/page.scss';

export default function Register() {

    const router = useRouter();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ error,    setError ]    = useState("");
    const [ data,     setData ]     = useState({});
    const [ submit,   setSubmit ]   = useState(false);

    const [theme, setTheme] = useState(false);
    const [icon,  setIcon]  = useState(faSun);

    const setText = (e,setValue) => {
      setValue(e.target.value);
    }

    const submitRegister = () => {

      if( username != '' && password != '' && confirmPassword != '' && password == confirmPassword){

        setError("");

        setUsername(username.replace(/[^a-zA-Z0-9,]/g, ''));
        setPassword(password.replace(/[^a-zA-Z0-9,]/g, ''));

        sendData(
          {
            "username":username,
            "password":password
          },
          "user-register",
          setData
        );

        setSubmit(true);
      }
      else {
        setError("error");
      }

    }

    useEffect(() => {

      if (data.submit) {
        handleChangeUrl(null,"/login",router)
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
                <div className='mt-[5px]'>
                  <Input
                      id='confirm-password'
                      type='password'
                      icon={faLock}
                      placeholder='Confirm Password'
                      class={error + ' rounded-[160px]'}
                      onchange={(e) => {setText(e,setConfirmPassword)}}
                  />
                </div>
              <div className='buttons mt-[10px]'>
                <Button
                  onclick={submitRegister}
                  title="Register"
                />
                <Button
                  onclick={(e) => {handleChangeUrl(e,"/login",router)}}
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