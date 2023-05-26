import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/Input.scss'

const Input = (props) => {
    return(
        <div className={'input-bar '+props.class}>
            
            <FontAwesomeIcon icon={props.icon} />

            <input type={props.type} 
                   id={props.id} 
                   className={'input '+props.class} 
                   placeholder={props.placeholder} 
                   onChange={props.onchange}
                   value={props.value}/>

            {props.children}

        </div>
    );
}
export default Input;