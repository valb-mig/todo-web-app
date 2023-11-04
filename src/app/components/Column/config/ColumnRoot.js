import './styles/ColumnRoot.scss';

const ColumnRoot = ({ children }) => {
    return(
        <div className='column'>
            { children }
        </div>
    );
}

export default ColumnRoot;