'use client';

import React from 'react';
import { useGlobalContext } from '@/config/context/store';

import Layout from '@/app/home/config/validate';

import Greetings  from '@/app/home/content/Greetings';
import Dashboards from '@/app/home/content/Dashboards';

import Todo   from '@/app/home/content/tasks/Todo';
import Kanban from '@/app/home/content/tasks/Kanban';

/*--------------------------------------------------*/
/* [Note]: Render specific content screen on /home  */
/*--------------------------------------------------*/

const Home = () => {

    const { path } = useGlobalContext();

    return(
        <Layout>
            { path.current !== undefined && (
                <>
                    { path.current.home    && <Greetings />}
                    { path.current.project && <Dashboards /> }
                    { path.current.task && (
                        <>
                            { path.type.todo   && <Todo/> }
                            { path.type.kanban && <Kanban/> }
                        </>
                    )}
                </>
            )}
        </Layout>
    );
}

export default Home;