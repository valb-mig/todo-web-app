import React, { useState } from 'react';

import Input  from '../utils/Input';
import Button from '../utils/Button';

import '../scss/main/Header.scss';

const Header = (props) => {

    const [theme, setTheme] = useState(false);
    const [icon,  setIcon]  = useState("sun");

    const darkTheme = () => {
      setTheme(!theme)

      if(theme){
        document.body.classList.remove('light')
        document.body.classList.toggle('dark')

        setIcon('sun');
      }else{
        document.body.classList.remove('dark')
        document.body.classList.toggle('light')

        setIcon('moon');
      }
    }

    return(
        <div className='header-bar'>
        <div className='header-item'>
          <div className='header-start'>
            <div className='header-logo'>
              <img src='./assets/logo-todo-sh.png' width='25px'/>
              <p className='site-title'>./Todo.sh<span className='title-cursor'>|</span></p>
            </div>
            
            <Input
              id='search'
              icon='search'
              placeholder='Search'
            />

          </div>

          <div className='header-end'>
            <Button
                icon={icon}
                class={'switch-color'}
                onclick={() => {darkTheme()}}
              />
            <div className='header-account'><i className='fa fa-user'></i></div>
          </div>
        </div>
      </div>
    );
}
export default Header;