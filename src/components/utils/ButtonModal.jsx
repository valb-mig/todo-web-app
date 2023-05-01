import React from 'react';
import '../scss/utils/ButtonModal.scss'

const ButtonModal = (props) => {

    return(
        <div className={props.class} onClick={props.onclick}>
            {props.title}
        </div>
    );
}
export default ButtonModal;