import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMoon,
         faSun, 
         faUser,
         faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Input  from 'src/components/Input';
import Button from 'src/components/Button';

import 'src/components/styles/Header.scss';

const Header = (props) => {

    return(
        <header className='header-bar'>

          <div className='header-item'>
            
            {props.children}

          </div>
          
        </header>
    );
}
export default Header;