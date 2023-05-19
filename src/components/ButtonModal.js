import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/ButtonModal.scss'

const ButtonModal = (props) => {

    return(
        <div className={props.class} onClick={props.onclick}>
            {props.title}
        </div>
    );
}
export default ButtonModal;