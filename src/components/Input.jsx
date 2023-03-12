import React from 'react';

import './scss/Input.scss'

const Input = (props) => {
    return(
        <div className='input-bar'>
            <i className={'fa fa-'+props.icon} onClick={props.onclick} ></i>
            <input type='text' id={props.id} className='input text-white' placeholder={props.placeholder} onChange={props.onchange}/>
        </div>
    );
}
export default Input;