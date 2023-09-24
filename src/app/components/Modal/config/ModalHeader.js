import './styles/ModalHeader.scss';

const ModalHeader = ({ children }) => {
    return(
        <div className="modal-header">
            { children }
        </div>
    );
}

export default ModalHeader;