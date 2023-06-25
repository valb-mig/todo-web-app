import React from 'react';

import './styles/Input.scss'

const Input = (props) => {

    return(
        <div className={'input-bar '+props.class}>
            
            <label>{props.label}</label>

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