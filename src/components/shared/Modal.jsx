import { useSelector } from 'react-redux';

const Modal = () => {
    const { body } = useSelector(store => store.modal);
    
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div title='Modal Body' className="modal-body">
                        {body}
                    </div>
                    <button
                        type="button"
                        className="btn btn-success fs-1 fa-solid fa-xmark position-absolute end-0 translate-middle-y"
                        style={{ top: "20%"}}
                        data-bs-dismiss="modal"
                    ></button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
