import React from 'react';

import './styles/ColumnBody.scss';

const ColumnBody = ({ children }) => {

    return(
        <section className='column-body'>
            { children }
        </section>
    );
}

export default ColumnBody;