import './styles/SidebarBox.scss';

const SidebarBox = ({ Title, children }) => {
    return(
        <section className='box'>
            {Title !== undefined && (
                <p className='box-title'>{Title}</p>
            )}
            <div className='sidebar-box'> 
                { children }
            </div>
        </section>
    );
}

export default SidebarBox;