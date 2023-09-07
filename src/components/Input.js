import {React, useState } from 'react';

import './styles/Input.scss'

const Input = ({Class, Error, Label, Id, Type, Placeholder, OnChange, Value, Icon, children}) => {

    return(
        <div className={'input-bar '+(Error ? "error" : "")}>
            
            <label><p>{Label}</p></label>

            <div className='inner-input'>
                {Icon}
            <input type={Type} 
                   id={Id} 
                   className={'input '+Class} 
                   placeholder={Placeholder} 
                   onChange={OnChange}
                   value={Value}/>
            </div>

            {children}

        </div>
    );
}
export default Input;