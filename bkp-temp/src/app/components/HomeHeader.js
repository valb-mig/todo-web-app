import { React, useState } from 'react';
import { getCookies }  from 'cookies-next';

import darkTheme from '/src/utils/functions/darkTheme';

import Header  from 'src/components/main/Header';
import Input   from 'src/components/Input';
import Button  from 'src/components/Button'; 
import Popup   from 'src/components/Popup';

const HomeHeader = () => {

    const [theme,  setTheme]  = useState(false);
    const [icon,   setIcon]   = useState("");
    const [popup,  setPopup]  = useState(false);

    return (
        <Header>
            <div className='header-start'>
                <div className='header-logo'>

                <div className='site-title'>./Todo.sh
                    <span className='title-cursor'>|</span>
                </div>
                
                </div>
                
                <Input
                    id='search'
                    icon={""}
                    placeholder='Search'
                    class={'rounded-[5px]'}
                />

            </div>

            <div className='header-end'>
                
            <Button
                icon={""}
                class="switch-color mr-[5px] rounded-[5px]"
                onclick={() => {darkTheme(setIcon,setTheme,theme)}}
            />

            <Button
                icon={""}
                class="header-account ml-[5px] rounded-[5px]"
                onclick={() => {setPopup(!popup)}}
            />

            {popup ? (
                <Popup>
                    <Button
                        title="Login"
                        onclick={(e) => {handleChangeUrl(e,"/login",router) && setPopup(!popup)}}
                    />
                    <Button
                        title="Register"
                        class="mt-[5px]"
                        onclick={(e) => {handleChangeUrl(e,"/register",router) && setPopup(!popup)}}
                    />
                </Popup>
            ):(
                <></>
            )}
                
            </div>
        </Header>
    );
}

export default HomeHeader;