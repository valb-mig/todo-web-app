import React from 'react';

import './styles/Button.scss';

export default function Button({ Id, Type, Class, OnClick, Icon, Title }){

    return(
        <button id={Id} type={Type} className={'button '+Class} onClick={OnClick}>
            {Icon}{Title}
        </button>
    );
}