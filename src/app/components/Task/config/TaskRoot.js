import './styles/TaskRoot.scss';

const TaskRoot = ({ Done, children }) => {
    return (
        <div className={'task' + (Done === true ? ' task-done' : '')}>
            { children }
        </div>
    );
}

export default TaskRoot;