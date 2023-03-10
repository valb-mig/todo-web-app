import React from 'react';
import './scss/Button.scss'

const Button = (props) => {
    return(
        <div className={'button '+props.class} onClick={props.onclick}>
            <i className={'fa fa-'+props.icon}/>{props.title}
        </div>
    );
}
export default Button;