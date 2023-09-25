import './styles/SelectBody.scss';

const SelectBody = ({ OnChange, Error, Placeholder, Options, Value, children }) => {

    return(
        <div className={'select-body' + ( Error ? " error" : "")}>
            { children }
            <select value={Value} onChange={OnChange} >

                { Placeholder !== undefined && Placeholder !== '' && (
                    <option value="" disabled>{Placeholder}</option>
                )}

                { Options !== undefined && Options.length > 0 && (
                    Options.map((option, index) => (
                        <option key={index} value={option.key}>{option.value}</option>
                    ))
                )}

            </select>
        </div>
    );
}

export default SelectBody;