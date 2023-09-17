import React from 'react';

import './styles/Select.scss'

const Select = ({Class, Label, Icon, Id, OnChange, Options}) => {
    return(
        <div className={"select-content "+Class}>
            <label><p>{Label}</p></label>
            <div className='select-group'>
                <p>{Icon}</p>
                <select className='input-select' id={Id} onChange={OnChange}>

                    {Options.map((index,value) => (<option key={value} value={value}>{index}</option>) )}

                </select>
            </div>
        </div>
    );
}

export default Select;