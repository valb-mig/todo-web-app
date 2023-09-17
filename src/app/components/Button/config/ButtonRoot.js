const ButtonRoot = ({ Id, Key, Type, OnClick, children }) => {
    return(
        <button className="button" id={Id} key={Key} type={Type} onClick={OnClick}>
            { children }
        </button>
    );
}

export default ButtonRoot;