"use client";

import React from 'react';
import { useGlobalContext } from '@/config/context/store';

import Icons from '@/config/icons';
import Tag   from '@/app/components/Tag';

import Breadcrumbs from '@/app/components/Breadcrumbs';

const Project = () => {

    const { selectedProject } = useGlobalContext();

    return(
        <div className='home-tag'>
            <Breadcrumbs/>
        </div>
    );
}

export default Project;