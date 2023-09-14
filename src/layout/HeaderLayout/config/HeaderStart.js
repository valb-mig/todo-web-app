import './styles/HeaderStart.scss';

const HeaderStart = ({ children }) => {
    return(
        <div className='header-start'>

            <div className='header-logo'>
                <div className='site-title'><p>./Todo.sh</p><span className='title-cursor'>|</span></div>
            </div>

            { children }

        </div>
    );
}

export default HeaderStart;