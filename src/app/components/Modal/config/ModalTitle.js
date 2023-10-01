import './styles/ModalTitle.scss';

const ModalTitle = ({ Title, Icon }) => {
    return(
        <span className="moda-title">
            {Icon !== undefined && (
                <>
                    {Icon}
                </>
            )}
            {Title !== undefined && (
                <p>{Title}</p>
            )}
        </span>
    );
}

export default ModalTitle;