import './styles/DashboardCount.scss';

const DashboardCount = ({ Value }) => {
    return(
        <p className='dashboard-count'>
            { Value }
        </p>
    );
}

export default DashboardCount;