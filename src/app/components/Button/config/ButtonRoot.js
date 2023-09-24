import './styles/ButtonRoot.scss';

const ButtonRoot = ({ Id, Key, Type, OnClick, Class, children }) => {
    return(
        <button className={"button"+" "+Class} id={Id} key={Key} type={Type} onClick={OnClick}>
            { children }
        </button>
    );
}

export default ButtonRoot;