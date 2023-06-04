import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/Select.scss'

const Select = (props) => {
    return(
        <div className={"select-content "+props.class}>
            <label>{props.iconLabel}{props.label}</label>
            <select className='input-select' id={props.id} onChange={props.onchange}>
                {props.children}
            </select>
        </div>
    );
}

export default Select;