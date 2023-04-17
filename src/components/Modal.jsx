import React from 'react';
import './scss/Modal.scss'

import InputModal  from './InputModal';
import ButtonModal from './ButtonModal';

const Modal = (props) => {
    return(
        <div className='modal'>
            <div className='modal-content'>
                    <div class='close-modal' onClick={props.cancelClick}>
                        <i className='fa fa-close'></i>
                    </div>
                <div className='modal-project'>
                    <div className='title-input'>
                        <InputModal
                            id='input-modal'
                            onchange={props.onchange}
                        />
                    </div>
                    <div className='buttons'>
                        <ButtonModal 
                            title='Cancel'
                            class='button-cancel'
                            onclick={props.cancelClick}
                        />
                        <ButtonModal 
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