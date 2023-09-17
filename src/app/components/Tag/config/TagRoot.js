import './styles/TagRoot.scss';

const TagRoot = ({ children }) => {
    return(
        <div className='tag'>
            { children }
        </div>
    );
}

export default TagRoot;