import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '@/config/context/store';

import Icons from '@/config/icons';

import Tag from '@/app/components/Tag';

import '@/app/components/styles/Breadcrumbs.scss';

const Breadcrumbs = () => {

    const { path } = useGlobalContext();

    return(
        <div className='breadcrumbs'>
            {path.breadcrumbs.map((page, index) => (
                <>
                    {index > 0 && (
                        <span className='divider'>/</span>
                    )}
                    <Tag.Root>
                        {index === 0 && (
                            <Tag.Icon Icon={<Icons.Grid/>}/>
                        )}
                        <Tag.Title Title={ page } />
                    </Tag.Root>
                </>
            ))}
        </div>
    );
}

export default Breadcrumbs;