import './styles/ButtonRoot.scss';

const ButtonRoot = ({ Id, Key, Type, OnClick, Class, Selected, children }) => {
    return(
        <button 
            className={"button"+( Selected ? ' button-selected' : '')+( Class !== '' && Class !== undefined ? (' '+Class) : '')} 
            id={Id} 
            key={Key} 
            type={Type} 
            onClick={OnClick}
        >
            { children }
        </button>
    );
}

export default ButtonRoot;