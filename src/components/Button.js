import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/Button.scss';

const Button = (props) => {

    return(
        <button id={props.id} type={props.type} className={'button '+props.class} onClick={props.onclick}>
            <FontAwesomeIcon icon={props.icon}/>{props.reactIcon}{props.title}
        </button>
    );
}
export default Button;