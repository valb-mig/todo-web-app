import { React }  from 'react';

import 'src/components/styles/Modal.scss';

export default function Modal({children}){

    <div className='modal'>
        <div className='modal-content'>                    
            <div className='modal-area'>
                {children}
            </div>
        </div>
    </div>
}