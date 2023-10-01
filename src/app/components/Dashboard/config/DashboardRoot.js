import './styles/DashboardRoot.scss';

const DashboardRoot = ({ children }) => {
    return(
        <section className='dashboard'>
            { children }
        </section>
    );
}

export default DashboardRoot;