import React from 'react';

import '../scss/utils/InputModal.scss'

const InputModal = (props) => {
    return(
        <div className='input-content'>
            <input type='text' 
                   id={props.id} 
                   className={'modal-input '+props.class} 
                   placeholder={props.placeholder} 
                   onChange={props.onchange}
                   value={props.value}/>
        </div>
    );
}
export default InputModal;