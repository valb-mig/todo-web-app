import React from 'react';

import './styles/Button.scss';

const Button = (props) => {

    return(
        <button id={props.id} type={props.type} className={'button '+props.class} onClick={props.onclick}>
            {props.reactIcon}{props.title}
        </button>
    );
}
export default Button;