"use client";

import React from 'react';
import { useGlobalContext } from '@/config/context/store';

import Icons from '@/config/icons';
import Tag   from '@/app/components/Tag';

const Project = () => {

    const { selectedProject } = useGlobalContext();

    return(
        <div className='home-tag'>
            <Tag.Root>
                <Tag.Icon Icon={<Icons.Grid/>}/>
                <Tag.Title Title={ selectedProject.type } />
            </Tag.Root>
        </div>
    );
}

export default Project;