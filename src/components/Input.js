import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/Input.scss'

const Input = (props) => {
    return(
        <div className='input-bar'>
            <i><FontAwesomeIcon icon={props.icon}/></i>
            <input type='text' id={props.id} className='input text-white' placeholder={props.placeholder} onChange={props.onchange}/>
        </div>
    );
}
export default Input;