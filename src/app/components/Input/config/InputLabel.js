import './styles/InputLabel.scss';

const InputLabel = ({ Title, children }) => {
    return(
        <div className='input-label-area'>
            <label className='input-label'>
                { children }
                <p>
                    {Title}
                </p>
            </label>
        </div>
    );
}

export default InputLabel;