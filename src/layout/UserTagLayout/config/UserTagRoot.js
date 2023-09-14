import './styles/UserTagRoot.scss';

const UserTagRoot = ({ children }) => {
    return(
        <div className='user-tag'>
            { children }
        </div>
    );
}

export default UserTagRoot;