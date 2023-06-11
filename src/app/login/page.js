"use client";

import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import handleLogin from '/src/utils/service/handleLogin.js';
import darkTheme from '/src/utils/functions/darkTheme';

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
    const [ token,    setToken ]    = useState("");

    const [theme, setTheme] = useState(false);
    const [icon,  setIcon]  = useState(faSun);

    const setText = (e,setValue) => setValue(e.target.value);
    
    const submitLogin = (e) => handleLogin(e,{username,password},setError,router);

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
            <form onSubmit={(e) => {submitLogin(e)}}>
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
                  <p>You don't have a account yet? <Link href="/register"><u>register</u></Link></p>
                </div>

                <div className='buttons mt-[5px]'>
                  <Button
                    type="submit"
                    onclick={(e) => {submitLogin(e)}}
                    title="Login"
                  />
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    )
}