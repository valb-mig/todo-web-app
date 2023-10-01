"use client";

import React from 'react';
import { useGlobalContext } from '@/config/context/store';

import Breadcrumbs from '@/app/components/Breadcrumbs';

const Dashboards = () => {

    return(
        <div className='home-tag'>
            <Breadcrumbs/>
        </div>
    );
}

export default Dashboards;