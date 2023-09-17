import './styles/InputRoot.scss';

const InputRoot = ({ Error, Type, Placeholder, OnChange, Value, Autofocus, children }) => {
    return(
        <div className={'input-bar '+(Error ? "error" : "")}>
            { children }
            <input type={Type} 
                placeholder={Placeholder} 
                onChange={OnChange}
                value={Value}
                {...(Autofocus ? { autoFocus: true } : {})} 
            />
        </div>
    );
}

export default InputRoot;