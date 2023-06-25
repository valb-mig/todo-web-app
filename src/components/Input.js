import {React, useState } from 'react';

import './styles/Input.scss'

const Input = ({Class, Error, Label, Id, Type, Placeholder, OnChange, Value, children}) => {

    return(
        <div className={'input-bar '+Error}>
            
            <label>{Label}</label>

            <input type={Type} 
                   id={Id} 
                   className={'input'} 
                   placeholder={Placeholder} 
                   onChange={OnChange}
                   value={Value}/>

            {children}

        </div>
    );
}
export default Input;