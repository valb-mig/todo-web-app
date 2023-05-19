import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMoon,
         faSun, 
         faUser,
         faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Input  from '../Input';
import Button from '../Button';

import '../styles/Header.scss';

const Header = (props) => {

    const [theme, setTheme] = useState(false);
    const [icon,  setIcon]  = useState(faSun);

    const darkTheme = () => {
      setTheme(!theme)

      if(theme){
        document.body.classList.remove('light')
        document.body.classList.toggle('dark')

        setIcon(faSun);
      }else{
        document.body.classList.remove('dark')
        document.body.classList.toggle('light')

        setIcon(faMoon);
      }
    }
    return(
        <div className='header-bar'>
        <div className='header-item'>
          <div className='header-start'>
            <img src='./assets/logo-todo-sh.png' width='25px'/>
            <div className='header-logo'>
              <p className='site-title'>./Todo.sh<span className='title-cursor'>|</span></p>
            </div>
            
            <Input
              id='search'
              icon={faMagnifyingGlass}
              placeholder='Search'
            />

          </div>

          <div className='header-end'>
            <Button
                icon={icon}
                class={'switch-color'}
                onclick={() => {darkTheme()}}
              />
            <div className='header-account'><i><FontAwesomeIcon icon={faUser} /></i></div>
          </div>
        </div>
      </div>
    );
}
export default Header;