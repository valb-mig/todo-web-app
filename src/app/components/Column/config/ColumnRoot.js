import './styles/ColumnRoot.scss';

const ColumnRoot = ({ children }) => {
    return(
        <section className='task-column'>
            { children }
        </section>
    );
}

export default ColumnRoot;