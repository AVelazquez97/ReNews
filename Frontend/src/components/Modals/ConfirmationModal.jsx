import Modal from "react-bootstrap/Modal";

export default function ConfirmationModal({isOpen, onClose, onConfirm, message}) {

    function handleConfirm() {
        onConfirm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold d-flex flex-row justify-content-between align-items-center w-100"}>
                    Confirmar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className={"btn btn-dark fw-bold"} onClick={onClose}>Cancelar</button>
                <button className={"btn btn-primary fw-bold"} onClick={handleConfirm}>Confirmar</button>
            </Modal.Footer>
        </Modal>
    )
}