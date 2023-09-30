'use client';

import React from 'react';
import { useGlobalContext } from '@/config/context/store';

import Layout from '@/app/home/config/validate';

import Greetings from '@/app/home/content/Greetings';
import Project   from '@/app/home/content/Project';
import Todo      from '@/app/home/content/Todo';
import Kanban    from '@/app/home/content/Kanban';

const Home = () => {

    const { path } = useGlobalContext();

    return(
        <Layout>
            {path.current !== undefined && (
                <>
                    { path.current.home    && <Greetings />}
                    { path.current.project && <Project /> }
                    { path.current.task    && <Todo /> }
                </>
            )}
        </Layout>
    );
}

export default Home;