import './styles/InputLabel.scss';

const InputLabel = ({ Title, children }) => {
    return(
        <label>
            { children }
            <p>
                {Title}
            </p>
        </label>
    );
}

export default InputLabel;