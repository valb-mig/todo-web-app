import './styles/ColumnTitle.scss';

const ColumnTitle = ({ Title, Icon }) => {
    return(
        <div className='column-title'>
            {Icon !== undefined && (
                <>
                    { Icon }
                </>
            )}
            <p>{ Title }</p>
        </div>
    );
}

export default ColumnTitle;