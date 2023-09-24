import './styles/ModalBody.scss';

const ModalBody = ({ children }) => {
    return(
        <div className="modal-body">
            { children }
        </div>
    );
}

export default ModalBody;