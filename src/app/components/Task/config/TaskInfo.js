import './styles/TaskInfo.scss';

const TaskInfo = ({ children }) => {
    return(
        <div className='task-data-info'>
            { children }
        </div>
    );
}

export default TaskInfo;