import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark }         from '@fortawesome/free-solid-svg-icons';

import '../styles/Modal.scss'

import InputModal  from '../InputModal';
import ButtonModal from '../ButtonModal';

const Modal = (props) => {

    return(
        <div className='modal'>
            <div className='modal-content'>                    
                <div className='modal-area'>
                    <div className='close-modal' onClick={props.cancelClick}>
                        <i><FontAwesomeIcon icon={faXmark}/></i>
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
        </div>
    );
}
export default Modal;