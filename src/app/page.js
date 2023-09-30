"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/app/components/Button';

import '@/app/styles/page.scss';

const StartPage = () => {

  const router = useRouter();

  return (
    <div className='start-page'>

      <section className='center-box'>

        <span className='greetings'>
          <div className='logo'>
            <p>Wellcome to</p>
            <div className='site-title'><p>./Todo.sh</p><span className='title-cursor'>|</span></div>
          </div>
        </span>

        <Button.Root OnClick={() => router.push('/home')} >
          <Button.Title Title="Start to doing" />
        </Button.Root>

      </section>

    </div>
  )
}

export default StartPage;