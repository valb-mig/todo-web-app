"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { 
    BiSolidUser,
    BiSolidLockAlt 
} from 'react-icons/bi';

import Link from 'next/link';

import Header from '@/app/components/Header'; 
import Input  from '@/app/components/Input';
import Button from '@/app/components/Button'; 

import handleLogin from '@/utils/api/user/login';

import '@/app/login/styles/page.scss';

export default function Login() {

    const router = useRouter();

    const [loginFormData, setLoginFormData] = useState({
        'username':{
            'value':'',
            'error':false
        },
        'password':{
            'value':'',
            'error':false
        }
    })

    const cleanFormData = () => {
        setLoginFormData({
            'username':{
                'value':'',
                'error':false
            },
            'password':{
                'value':'',
                'error':false
            }
        })
    }

    async function postFormData(event){
        
        event.preventDefault();

        let response = await handleLogin(loginFormData);

        if (!response) {

            setLoginFormData({
                ...loginFormData,
                username: {
                    ...loginFormData.username,
                    error: true
                },
                password: {
                    ...loginFormData.password,
                    error: true
                }
            })
        }
        else {
            cleanFormData();
            router.push("/");
        }
    }

    return (
        <section className='login-page'>

            <header className='header-box'>
                <Header/>
            </header>

            <main className='main-box'>
                <div className='content'>
                    <section className='box-container'>
                        <form onSubmit={(e) => postFormData(e)}>
                            <Input
                                Type="text"
                                Error={loginFormData.username.error}
                                OnChange={(e) => setLoginFormData({
                                    ...loginFormData,
                                    username: {
                                        ...loginFormData.username,
                                        value: e.target.value,
                                        error:false
                                    }
                                })}
                                Icon={<BiSolidUser/>}
                            />
                            <Input
                                Type="password"
                                Error={loginFormData.username.error}
                                OnChange={(e) => setLoginFormData({
                                    ...loginFormData,
                                    password: {
                                        ...loginFormData.password,
                                        value: e.target.value,
                                        error:false
                                    }
                                })}
                                Icon={<BiSolidLockAlt/>}
                            />
                            <div className='buttons'>
                                <Button
                                    Type="submit"
                                    Title="Login"
                                />
                            </div>
                            <p>Don't have an account yet ? <Link href={'/register'}><b><u> Register </u></b></Link></p>
                        </form>
                    </section>
                </div>
            </main>

        </section>
    )
}