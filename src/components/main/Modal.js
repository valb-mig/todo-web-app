import { React,useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark }         from '@fortawesome/free-solid-svg-icons';

import 'src/components/styles/Modal.scss';

import Input  from 'src/components/Input';
import Button from 'src/components/Button';
import Select from 'src/components/Select';

const Modal = (props) => {

    const [icons, setIcons] = useState([

        {'name':'folder'},
        {'name':'house'},
        {'name':'user'},
        {'name':'star'},
        {'name':'cloud'},
        {'name':'hippo'},
        {'name':'magnifying'}
    ]);

    let days = [1,2,3,4,5,6,7,8,9,10];

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
                                type='text'
                                id='input-modal'
                                onchange={props.onChangeInput}
                            />

                            <div className="select-area">

                                <Select 
                                    class="select-icons mt-[5px]"
                                    onchange={props.onChangeIcon} 
                                    id="select-icons"
                                    iconLabel={props.getSelectedIcon}
                                >

                                    {icons.map((e) => (

                                        <option value={e.name}>{e.name}</option>

                                    ))}

                                </Select>

                                <Select 
                                    class="select-days mt-[5px]"
                                    onchange={props.onChangeDay} 
                                    id="select-days"
                                    label={"+"+props.getSelectedDays+" Days"}
                                >

                                    {days.map((e) => (

                                        <option value={e}>{e}</option>

                                    ))}

                                </Select>

                            </div>

                        </div>
                        <div className='buttons'>
                            <Button 
                                title='Add'
                                class='button-add'
                                onclick={props.addClick}/>
                            <Button 
                                title='Cancel'
                                class='button-cancel'
                                onclick={props.cancelClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;