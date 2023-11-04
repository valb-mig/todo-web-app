"use client";

import React from 'react';
import { useGlobalContext } from '@/config/context/store';

import Breadcrumbs from '@/app/components/Breadcrumbs';

import './styles/Dashboards.scss';

const Dashboards = () => {

    return(
        <div className='home-tag'>
            <Breadcrumbs/>
        </div>
    );
}

export default Dashboards;