import Select from 'src/components/Select';
import Input  from 'src/components/Select';
import Button from 'src/components/Button';
import Modal  from 'src/components/main/Modal';

import 'src/components/styles/Modal.scss';

export default function HomeModal(props){
    <Modal>
        <div className='close-modal rounded-[100%]' onClick={props.cancelClick}>
        </div>
        <div className='modal-project'>
            <div className='title-input'>

                <Input
                    label='Name'
                    type='text'
                    id='input-modal'
                />

                <div className="select-area mt-[5px]">

                    <Select 
                        class="select-icons"
                        id="select-icons"
                    >

                    </Select>

                    <Select 
                        class="select-days ml-[5px]"
                        id="select-days"
                        label={"Days"}
                    >

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
    </Modal>
}