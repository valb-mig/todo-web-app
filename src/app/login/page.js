"use client";

import { React, useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import changeTheme from '@/utils/functions/changeTheme.js';

import Header from '@/components/home/Header'; 
import Input  from '@/components/Input';
import Button from '@/components/Button'; 

import './styles/page.scss';

export default function Login() {

    const [loginFormData, setLoginFormData] = useState({
        'username':'',
        'password':''
    })

    const cleanFormData = () => {
        setLoginFormData({
            'username':'',
            'password':''
        })
    }

    const router = useRouter();

    return (
    <>
        <div className='header-box'>
            <Header/>
        </div>

        <div className='main-box'>
            <div className='content'>

                <section className='box-container'>
                    <form onSubmit={(e) => {handleLogin()}}>
                        <Input/>
                        <Input/>
                        <Button/>
                    </form>
                </section>

            </div>
        </div>
    </>
    )
}