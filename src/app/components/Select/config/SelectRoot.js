import './styles/SelectRoot.scss';

const SelectRoot = ({ children }) => {
    return(
        <div className='select'>
            { children }
        </div>
    );
}

export default SelectRoot;