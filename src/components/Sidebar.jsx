import React from 'react';

import Button from './Button';

import './scss/Sidebar.scss';

const Sidebar = (props) => {
    return(
        <div className='sidebar bg-gray-alt'>

            <div className='sidebar-content'>
                <div className='sidebar-buttons'>
                    <Button
                        title='Home'
                        icon='home'
                        // onclick={''}
                    />
                    <Button
                        title=''
                        icon=''
                        // onclick={''}
                    />
                    <Button
                        title=''
                        icon=''
                        // onclick={''}
                    />
                    <div className='comming-soon'>Comming soon</div>
                </div>
                <div className='sidebar-projects'>
                    Projects
                    <Button
                        title='Todo'
                        icon='list'
                        // onclick={''}
                    />
                    <div className='add-button'>
                        <Button
                            icon='plus'
                            // onclick={''}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default Sidebar;