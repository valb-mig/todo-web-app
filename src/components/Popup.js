import { React }  from 'react';

import './styles/Popup.scss';

const Popup = ({Class, children}) => {

    return(
        <div className='popup-area'>
            <div className={'popup-content '+Class}>
                {children}
            </div>
        </div>
    );
}
export default Popup;