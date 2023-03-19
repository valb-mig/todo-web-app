import React from 'react';

import './scss/Task.scss';

const Task = (props) => {
    return(
        <div className='task'>
            <div className='task-header'></div>

            <div className='task-content'>
                {props.title}
    
                <div className='task-desc'>
                    {props.desc}
                </div>
            </div>

            <div className='task-desc'></div>
        </div>
    );
}
export default Task;