import React from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your app element (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const AlertModal = ({ text }) => {
    return (
<dialog id="my_modal_1" className="modal text-black">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Uh uh!</h3>
    <p className="py-4">{text}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    );
};

export default AlertModal;