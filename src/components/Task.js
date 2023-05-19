import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <i><FontAwesomeIcon icon={faCheck} /></i>
                </div>
                <div className='remove-button' onClick={props.remove}>
                    <i><FontAwesomeIcon icon={faTrash} /></i>
                </div>
            </div>
            <div className='task-desc'>
                {props.desc}
            </div>
        </div>
    );
}
export default Task;