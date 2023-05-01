import React from 'react';

import '../scss/utils/InputTask.scss'

const InputTask = (props) => {
    return(
        <div className='input-content'>
            <input type='text' 
                   id={props.id} 
                   className={'task-input '+props.class} 
                   placeholder={props.placeholder} 
                   onChange={props.onchange}
                   value={props.value}/>

            {props.children}
        </div>
    );
}
export default InputTask;