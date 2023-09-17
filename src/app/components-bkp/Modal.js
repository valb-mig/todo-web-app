import React, { useState }  from 'react';

import { MdClose } from 'react-icons/md';

import { 
    FaFolderOpen, 
    FaListUl
} from 'react-icons/fa';

import { 
    AiFillCalendar,
    AiFillStar,
    AiFillBell 
} from 'react-icons/ai';

import Button from '@/app/components/Button';
import Input  from '@/app/components/Input';
import Select from '@/app/components/Select';

import './styles/Modal.scss';

export default function Modal({ Modal, ShowModal, SubmitModal }){

    const icons = [
        {
            'name':'Folder',
            'icon':<FaFolderOpen/>
        },
        {
            'name':'List',
            'icon':<FaListUl/>
        },
        {
            'name':'Star',
            'icon':<AiFillStar/>
        },
        {
            'name':'Bell',
            'icon':<AiFillBell/>
        },
    ];

    const days  = [1,2,3,4,5,6,7,8,9,10];
    const names = icons.map(({ name }) => name);

    const [inputError, handleInputError] = useState(
        {
            'title':{
                'id':'input-modal',
                'error':false
            }
        }
    )

    const [modalFormData, setModalFormData] = useState({
        'title':'',
        'icon_name':'Folder',
        'icon':<FaFolderOpen/>,
        'days':1
    });

    const cleanFormData = () => {
        setModalFormData({
            'title':'',
            'icon_name':'Folder',
            'icon':<FaFolderOpen/>,
            'days':1
        })
    }

    const projectAdd = (event) => {

        event.preventDefault();

        if(modalFormData.title != '') {

            SubmitModal(modalFormData);

            handleInputError({...inputError,title:{...inputError.title,error:false}});
            cleanFormData();

            ShowModal(!Modal)
        }
        else {
            handleInputError({...inputError,title:{...inputError.title,error:true}});
        }
    }

    return (
        <div className='modal'>
            <div className='modal-content'>                    
                <div className='modal-area'>
                <div className='close-modal' onClick={() => {ShowModal(!Modal) && cleanFormData()}}>{<MdClose/>}</div>
                    
                    <form className='modal-project' onSubmit={(e) => {projectAdd(e) && cleanFormData()}}>
                        <div className='title-input'>
                            <Input
                                Label={'Name'}
                                Type='text'
                                Id='input-modal'
                                Error={inputError.title.error ? 'error' : ''}
                                OnChange={(e) => {setModalFormData({...modalFormData,title:e.target.value})}}
                                Autofocus={true}
                            />
                            <div className='select-area'>
                                <Select 
                                    Class='select-icons'
                                    Id='select-icons'
                                    Label='Icon'
                                    Icon={modalFormData.icon}
                                    Options={names}
                                    OnChange={(e) => {setModalFormData({...modalFormData,icon_name:icons[e.target.value].name,icon:icons[e.target.value].icon})}}/>
                                <Select 
                                    Class='select-days'
                                    Id='select-days'
                                    Label='Days'
                                    Icon={<AiFillCalendar/>}
                                    Options={days}
                                    OnChange={(e) => {setModalFormData({...modalFormData,days:days[e.target.value]})}}/>
                            </div>
                        </div>
                        <div className='buttons'>
                            <Button 
                                Title='Add'
                                Class='button-add'
                                Type='submit'                                
                            />
                            <Button 
                                Title='Cancel'
                                Class='button-cancel'
                                OnClick={() => {ShowModal(!Modal) && cleanFormData()}}
                            />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}