import React from 'react';

import './styles/Select.scss'

const Select = (props) => {
    return(
        <div className={"select-content "+props.class}>
            <lable>{props.label}</lable>
            <div className='select-group'>
                <p>{props.iconLabel}</p>
                <select className='input-select' id={props.id} onChange={props.onchange}>
                    {props.children}
                </select>
            </div>
        </div>
    );
}

export default Select;