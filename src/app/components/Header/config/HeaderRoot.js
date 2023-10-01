import './styles/HeaderRoot.scss';

const HeaderRoot = ({ children }) => {
    return(
        <header className='header-bar'>
            { children }
        </header>
    );
}

export default HeaderRoot;