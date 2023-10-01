import './styles/TaskDesc.scss';

const TaskDesc = ({ Desc }) => {
    return (
        <div className='task-desc'>
            <p>{ Desc }</p>
        </div>
    );
}

export default TaskDesc;