import React from 'react';
import './scss/Modal.scss'

import InputModal  from './InputModal';
import Button from './Button';

const Modal = (props) => {
    return(
        <div className='modal'>
            <div className='modal-content'>
                    <div class='close-modal'>
                        <i className='fa fa-close' onClick={props.cancelClick}></i>
                    </div>
                <div className='modal-project'>
                    <div className='title-input'>
                        <InputModal
                            id='input-modal'
                            onchange={props.onchange}
                        />
                    </div>
                    <div className='buttons'>
                        <Button 
                            title='Cancel'
                            class='button-cancel'
                            onclick={props.cancelClick}
                        />
                        <Button 
                            title='Add'
                            class='button-add'
                            onclick={props.addClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;