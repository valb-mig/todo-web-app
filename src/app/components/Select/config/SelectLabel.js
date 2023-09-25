import './styles/SelectLabel.scss';

const SelectLabel = ({ Title, children }) => {
    return(
        <div className='select-label-area'>
            <label className='select-label'>
                { children }<p>{ Title }</p>
            </label>
        </div>
    );
}

export default SelectLabel;