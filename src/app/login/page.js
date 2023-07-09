"use client";

import { React, useState } from 'react';
import { useRouter } from 'next/navigation';

import { 
    BiSolidUser,
    BiSolidLockAlt 
} from 'react-icons/bi';

import Link from 'next/link';

import Header from '@/components/home/Header'; 
import Input  from '@/components/Input';
import Button from '@/components/Button'; 

import handleLogin from '@/utils/api/login'

import './styles/page.scss';

export default function Login() {

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

        if(!response){
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

        console.log(loginFormData);
    }

    return (
    <>
        <div className='header-box'>
            <Header/>
        </div>

        <div className='main-box'>
            <div className='content'>

                <section className='box-container'>
                    <form onSubmit={(e) => {e.preventDefault() && postFormData(e)}}>
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
                            Label="Username"
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
                            Label="Password"
                            Icon={<BiSolidLockAlt/>}
                        />
                        <div className='buttons'>
                            <Button
                                Type="submit"
                                Title="Login"
                                OnClick={(e) => postFormData(e)}
                            />
                        </div>
                        <p>Don't have an account yet ? <Link href={'/register'}><b><u> Register </u></b></Link></p>
                    </form>
                </section>

            </div>
        </div>
    </>
    )
}