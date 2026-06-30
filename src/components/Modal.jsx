import { createPortal } from "react-dom";

let Modal = ({ header, children, onClose, btnText, size }) => {

  return createPortal(
    
    <div className={`modal fade show modal-${size}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{header || "Modal title"}</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {children || "please add some content"}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              {btnText || "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>,

    //making the modal outside of root element using create portal
    document.body
  );
};

export default Modal;
