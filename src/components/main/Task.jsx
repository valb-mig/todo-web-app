import React from 'react';

import '../scss/main/Task.scss';

const Task = (props) => {
    return(
        <div id={props.id} className={'task '+props.class}>
            <div className='task-header'>
                <div className='task-bottom'>
                    <div className='task-content'>
                        {props.title}
                    </div>
                </div>
                <div className='done-button' onClick={props.done}>
                    <i className='fa fa-check'></i>
                </div>
                <div className='remove-button' onClick={props.remove}>
                    <i className='fa fa-trash'></i>
                </div>
            </div>
            <div className='task-desc'>
                {props.desc}
            </div>
        </div>
    );
}
export default Task;