import './styles/ModalFooter.scss';

const ModalFooter = ({ children }) => {
    return(
        <div className="modal-footer">
            { children }
        </div>
    );
}

export default ModalFooter;