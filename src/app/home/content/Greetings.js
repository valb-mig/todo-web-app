"use client";

import React from 'react';

import Icons     from '@/config/icons';
import Tag       from '@/app/components/Tag';
import Dashboard from '@/app/components/Dashboard';

import Lottie     from 'lottie-react';
import LottieData from '/public/assets/lottie/desktop-person.json';

import useGreetings from '@/app/home/content/hooks/useGreetings';

const Greetings = () => {

    const { countTotalTasks, countDoneTotalTasks } = useGreetings();

    return(
        <>
            <div className='greetings'>
                <div className='center-image'>
                    <Lottie
                        loop={true}
                        animationData={LottieData}
                    />
                </div>
                <p>Wellcome to your <u>homepage</u></p>
            </div>

            <p className='info-title'>Your tasks status</p>

            <div className='task-info'>

                <Dashboard.Root>
                    <Tag.Root>
                    <Tag.Icon Icon={<Icons.Tag/>} />
                    <Tag.Title Title="Done tasks" />
                    </Tag.Root>
                    <Dashboard.Count Value={countDoneTotalTasks()}/>
                </Dashboard.Root>

                <Dashboard.Root>
                    <Tag.Root>
                    <Tag.Icon Icon={<Icons.Tag/>} />
                    <Tag.Title Title="Total tasks" />
                    </Tag.Root>
                    <Dashboard.Count Value={countTotalTasks()}/>
                </Dashboard.Root>

                <Dashboard.Root>
                    <Tag.Root>
                    <Tag.Icon Icon={<Icons.Tag/>} />
                    <Tag.Title Title="Week dashboard" />
                    </Tag.Root>
                    <Dashboard.Count Value={countTotalTasks()}/>
                </Dashboard.Root>
            </div> 
        </>
    );
}

export default Greetings;