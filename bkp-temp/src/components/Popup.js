import { React }  from 'react';

import 'src/components/styles/Popup.scss';

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