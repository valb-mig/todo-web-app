import './styles/TaskTitle.scss';

const TaskTitle = ({ Title }) => {
    return (
        <div className='task-title'>
            <p>{ Title }</p>
        </div>
    );
}

export default TaskTitle;