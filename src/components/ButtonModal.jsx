import React from 'react';
import './scss/ButtonModal.scss'

const ButtonModal = (props) => {

    return(
        <div className={props.class} onClick={props.onclick}>
            {props.title}
        </div>
    );
}
export default ButtonModal;