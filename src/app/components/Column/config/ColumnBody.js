import React from 'react';

import './styles/ColumnBody.scss';

const ColumnBody = ({ Count, children }) => {

    return(
        <section className='column-body'>
                { Count > 0 ? (
                    children
                ):(
                    <div className='empty-content'>
                        <div className='not-found'>
                            <img src='assets/img/not-found.png'/>
                        </div>
                    </div>
                )}
        </section>
    );
}

export default ColumnBody;