import './styles/ModalRoot.scss';

const ModalRoot = ({ OnClick, children }) => {
    return(
        <div className="modal-background" onClick={OnClick}>
            <div className="modal">
                <section className='modal-area'>
                    { children }
                </section>
            </div>
        </div>
    );
}

export default ModalRoot;