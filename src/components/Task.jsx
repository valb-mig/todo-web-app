import React from 'react';

import './scss/Task.scss';

const Task = (props) => {
    return(
        <div className='task'>

            <div className='task-header'>
                <div className='remove-button' onClick={props.remove}>
                    <i className='fa fa-close'></i>
                </div>
            </div>

            <div className='task-bottom'>
                <div className='task-content'>
                    {props.title}
        
                    <div className='task-desc'>
                        {props.desc}
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Task;