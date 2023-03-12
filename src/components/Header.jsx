import React from 'react';
import Input from './Input';

import './scss/Header.scss';


const Header = (props) => {
    return(
        <div className='header-bar bg-gray text-white'>
        <div className='header-item'>
          <div className='header-start'>
            <div className='header-logo bg-light-gray'><i className='fa fa-window-restore '></i></div>
            
            <Input
              id='search'
              icon='search'
              placeholder='Search'
            />

          </div>

          <div className='header-end'>
            <div className='header-account bg-light-gray'><i className='fa fa-user'></i></div>
          </div>
        </div>
      </div>
    );
}
export default Header;