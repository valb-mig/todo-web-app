import React from 'react';
import Icons from '@/config/icons';

import './styles/TaskRoot.scss';

const TaskRoot = ({ Done, children }) => {
    return (
        <div className={'task' + (Done === true ? ' task-done' : '')}>
            <div className='task-drag-icon'>
                <Icons.Drag/>
            </div>
            { children }
        </div>
    );
}

export default TaskRoot;