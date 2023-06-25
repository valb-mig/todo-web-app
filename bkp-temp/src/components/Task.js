import React from 'react';

import { faCheck,
         faTrash } from '@fortawesome/free-solid-svg-icons';
    
import './styles/Task.scss';

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
                </div>
                <div className='remove-button' onClick={props.remove}>
                </div>
            </div>
            <div className='task-desc'>
                {props.desc}
            </div>
        </div>
    );
}
export default Task;