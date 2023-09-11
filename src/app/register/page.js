"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { 
    BiSolidUser,
    BiSolidLockAlt 
} from 'react-icons/bi';

import Link from 'next/link';

import Header from '@/app/components/Header'; 
import Input  from '@/components/Input';
import Button from '@/components/Button'; 

import '@/app/register/styles/page.scss';

export default function Register() {

    const router = useRouter();

    const [registerFormData, setRegisterFormData] = useState({
        'username':{
            'value':'',
            'error':false
        },
        'password':{
            'value':'',
            'error':false
        },
        'confirm_password':{
            'value':'',
            'error':false
        }
    })

    const cleanFormData = () => {
        setRegisterFormData({
            'username':{
                'value':'',
                'error':false
            },
            'password':{
                'value':'',
                'error':false
            },
            'confirm_password':{
                'value':'',
                'error':false
            }
        })
    }

    async function postFormData(event){
        
        event.preventDefault();

        /* [TODO] Insert user function */
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
                                Error={registerFormData.username.error}
                                OnChange={(e) => setRegisterFormData({
                                    ...registerFormData,
                                    username: {
                                        ...registerFormData.username,
                                        value: e.target.value,
                                        error:false
                                    }
                                })}
                                Icon={<BiSolidUser/>}
                            />
                            <Input
                                Type="password"
                                Error={registerFormData.username.error}
                                OnChange={(e) => setRegisterFormData({
                                    ...registerFormData,
                                    password: {
                                        ...registerFormData.password,
                                        value: e.target.value,
                                        error:false
                                    }
                                })}
                                Icon={<BiSolidLockAlt/>}
                            />
                            <Input
                                Type="password"
                                Error={registerFormData.username.error}
                                OnChange={(e) => setRegisterFormData({
                                    ...registerFormData,
                                    confirm_password: {
                                        ...registerFormData.confirm_password,
                                        value: e.target.value,
                                        error:false
                                    }
                                })}
                                Icon={<BiSolidLockAlt/>}
                            />
                            <div className='buttons'>
                                <Button
                                    Type="submit"
                                    Title="Register"
                                />
                            </div>
                            <p>You have a account <Link href={'/login'}><b><u> Login </u></b></Link></p>
                        </form>
                    </section>
                </div>
            </main>

        </section>
    )
}