import Modal from "react-bootstrap/Modal";

export default function ConfirmationModal({isOpen, onClose, onConfirm, title, body}) {
    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold d-flex flex-row justify-content-between align-items-center w-100"}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                <p>{body}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className={"btn btn-dark fw-bold"} onClick={onClose}>Cancelar</button>
                <button className={"btn btn-primary fw-bold"} onClick={onConfirm}>Confirmar</button>
            </Modal.Footer>
        </Modal>
    )
}