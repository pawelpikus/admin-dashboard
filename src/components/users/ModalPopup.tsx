import { Button, Modal } from "react-bootstrap";
import { IModalPopup } from "../../types/types";

const ModalPopup = ({
  modal,
  handleClose,
  handleConfirmDelete,
}: IModalPopup) => {
  return (
    <Modal show={modal.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete the user?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
