import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './styles/Button.scss';

const Button = (props) => {

    return(
        <div id={props.id} className={'button '+props.class} onClick={props.onclick}>
            <FontAwesomeIcon icon={props.icon}/>{props.reactIcon}{props.title}
        </div>
    );
}
export default Button;