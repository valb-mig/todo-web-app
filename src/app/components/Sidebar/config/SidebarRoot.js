import './styles/SidebarRoot.scss';

const SidebarRoot = ({ Type, children }) => {
    return(
        <aside className={"sidebar-"+Type}>
            { children }
        </aside>
    );
}

export default SidebarRoot;