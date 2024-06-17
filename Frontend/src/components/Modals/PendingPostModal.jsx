import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
export default function PostModal({post,onClose}){
    const { ownerId, id, title, body, date, tags, likes, comments } = post;

    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

    function handleApprove(){
        console.log("[PLACEHOLDER] Approving post with id: ", id);
        //postsController.approvePost(id);
    }

    function handleReject(){
        console.log("[PLACEHOLDER] Rejecting post with id: ", id);
        //postsController.rejectPost(id);
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold d-flex flex-row justify-content-between align-items-center w-100"}>
                    {`Leyendo post #${id} - pendiente de aprobación`}
                    <div className={"d-flex gap-2"}>
                        <Button className={"btn btn-primary fw-bold p-1"} onClick={() => handleApprove()}>Aprobar</Button>
                        <Button className={"btn btn-danger fw-bold p-1"} onClick={() => handleReject()}>Rechazar</Button>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                <h4 className={"fw-semibold"}> {ownerId} - {title} - {formattedDate}</h4>
                <div className={"d-flex w-100 align-items-start mb-2"}>
                    {post?.tags?.map(tag => (
                        <span key={tag.id} className="badge rounded-pill text-bg-success me-1">{tag.name}</span>
                    ))}
                </div>
                <p>{body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"btn btn-dark fw-bold"} onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>

    )
}