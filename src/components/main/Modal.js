import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark }         from '@fortawesome/free-solid-svg-icons';

import 'src/components/styles/Modal.scss'

import Input  from 'src/components/Input';
import Button from 'src/components/Button';

const Modal = (props) => {

    return(
        <div className='modal'>
            <div className='modal-content'>                    
                <div className='modal-area'>
                    <div className='close-modal rounded-[100%]' onClick={props.cancelClick}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <div className='modal-project'>
                        <div className='title-input'>
                            <Input
                                id='input-modal'
                                onchange={props.onchange}
                            />
                            <Input
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
        </div>
    );
}
export default Modal;