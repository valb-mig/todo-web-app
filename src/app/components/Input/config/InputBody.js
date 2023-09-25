import './styles/InputBody.scss';

const InputBody = ({ Error, Type, Placeholder, OnChange, Value, Autofocus, children }) => {
    return(
        <div className={"input-bar" + (Error ? " error" : "")}>

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

export default InputBody;