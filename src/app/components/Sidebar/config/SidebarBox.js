import './styles/SidebarBox.scss';

const SidebarBox = ({ children }) => {
    return(
        <div className='sidebar-box'> 
            { children }
        </div>
    );
}

export default SidebarBox;