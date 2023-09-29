"use client";

import React from 'react';
import { useGlobalContext } from '@/config/context/store';
import HomeLayout from '@/app/home/config/Layout';

import Greetings from '@/app/home/content/Greetings';
import Project   from '@/app/home/content/Project';
import Todo      from '@/app/home/content/Todo';
import Kanban    from '@/app/home/content/Kanban';

const Home = () => {

    const { path } = useGlobalContext();

    return(
        <HomeLayout>
            {path.current !== undefined && (
                <>
                    { path.current.home    && <Greetings />}
                    { path.current.project && <Project /> }
                    { path.current.task    && <Todo /> }
                </>
            )}
        </HomeLayout>
    );
}

export default Home;