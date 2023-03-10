import React from 'react';
import './scss/Header.scss';

const Header = (props) => {
    return(
        <div className='header-bar bg-gray text-white'>
        <div className='header-item'>
          <div className='header-start'>
            <div className='header-logo bg-light-gray'><i className='fa fa-window-restore '></i></div>
            
            <div className='search-bar'>
              <i className='fa fa-search bg-foreground'></i><input type='text' id='search' className='search bg-light-gray text-white' placeholder='Search'/>
            </div>

          </div>

          <div className='header-end'>
            <div className='header-account bg-light-gray'><i className='fa fa-user'></i></div>
          </div>
        </div>
      </div>
    );
}
export default Header;