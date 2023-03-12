import React from 'react';

import './scss/InputTask.scss'

const InputTask = (props) => {
    return(
        <div className='input-task'>
            <input type='text' 
                   id={props.id} 
                   className={'input text-white '+props.class} 
                   placeholder={props.placeholder} 
                   onChange={props.onchange}
                   value={props.value}/>
        </div>
    );
}
export default InputTask;