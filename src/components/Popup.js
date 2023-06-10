import { React,useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'src/components/styles/Popup.scss';

import Button from 'src/components/Button';

const Popup = (props) => {

    return(
        <div className='popup-area'>
            <div className={'popup-content '+props.class}>
                {props.children}
            </div>
        </div>
    );
}
export default Popup;