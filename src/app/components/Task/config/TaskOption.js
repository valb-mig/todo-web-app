import './styles/TaskOption.scss';

const TaskOption = ({ children }) => {
    return (
        <div className='task-option'>
            { children }
        </div>
    );
}

export default TaskOption;