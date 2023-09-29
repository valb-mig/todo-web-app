import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '@/config/context/store';

const breadcrumbs = ({ Pages }) => {

    const { path, setScreenPath } = useGlobalContext();

    return(
        <div className="breadcrumbs">
            { Pages.map((page, index) => (
                <p className='path'></p>
            ))} 
        </div>
    );
}

export default breadcrumbs;