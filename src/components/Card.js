import React from 'react';

import {
    BsCheckLg,
    BsFillTrashFill
} from 'react-icons/bs';

import './styles/Card.scss';

const Card = ({Task, Class, RemoveTask, SetStatus}) => {

    return(
        <div id={Task.task_id} className={'task '+Class}>
            <div className='task-header'>
                <div className='task-bottom'>
                    <div className='task-content'>
                        {Task.task_title}
                    </div>
                </div>

                <div className='done-button' onClick={() => {SetStatus()}}>
                    <BsCheckLg/>
                </div>

                <div className='remove-button' onClick={() => {RemoveTask()}}>
                    <BsFillTrashFill/>
                </div>

            </div>
            <div className='task-desc'>
                {Task.task_desc}
            </div>
        </div>
    );
}
export default Card;