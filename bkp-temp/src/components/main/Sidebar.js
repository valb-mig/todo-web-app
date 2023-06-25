import { React } from 'react';

import '../styles/Sidebar.scss';

const Sidebar = (props) => {

    return(
        <div className={'sidebar'}>
            {props.children}
        </div>
    );
}
export default Sidebar;