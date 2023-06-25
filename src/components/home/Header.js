import { React, useState } from 'react';

import { 
  MdClose 
} from 'react-icons/md';

import { 
  AiOutlineMenu
} from 'react-icons/ai';

import { 
  BsFillSunFill,
  BsFillMoonFill
} from 'react-icons/bs';

import Input   from '@/components/Input';
import Button  from '@/components/Button'; 
import Popup   from '@/components/Popup';

import changeTheme from '@/utils/functions/changeTheme.js';

import './styles/Header.scss';

export default function Header() {

  const [popup,     setPopup]     = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <header className='header-bar'>
      <div className='header-item'>

        <div className='header-start'>

          <div className='header-logo'>
            <div className='site-title'><p>./Todo.sh</p><span className='title-cursor'>|</span>
            </div>
          </div>

          <Input
              Id='search'
              Placeholder='Search'
          />

        </div>

        <div className='header-end'>
          <Button
              Class="switch-color"
              Icon={ darkTheme ? <BsFillSunFill/> : <BsFillMoonFill/> }
              OnClick={() => {changeTheme(setDarkTheme,darkTheme)}}
          />
          <Button
              Class="header-account"
              Icon={popup ? <MdClose/> : <AiOutlineMenu/>}
              OnClick={() => {setPopup(!popup)}}
          />
          {popup ? (
              <Popup>
                  <Button
                      Title="Login"
                      OnClick={(e) => {handleChangeUrl(e,"/login",router) && setPopup(!popup)}}
                  />
                  <Button
                      Title="Register"
                      OnClick={(e) => {handleChangeUrl(e,"/register",router) && setPopup(!popup)}}
                  />
              </Popup>
          ):(
              <></>
          )}
        </div>
      </div>
    </header>
  );
}