import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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