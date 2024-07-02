import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {useState} from "react";
import {ALERT_INITIAL_STATE} from "../../const.js";
import * as postController from "../../controllers/postsController.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
export default function PostModal({post,onClose, handled, setHandled, alert, setAlert}) {
    const { ownerId, id, title, body, date, tags, likes, comments } = post;

    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);

    function handleApprove(){
        try{
            postController.approvePost(id);
            setConfirmationModal({visible: false, message: ""});
            setAlert({visible: true, isError: false, message: "Post aprobado correctamente."})
            setHandled(true);
        } catch (error) {
            setAlert({visible: true, isError: true, message: "Error al aprobar el post. Intente de nuevo."});
        }
    }

    function handleReject(){
        try{
            console.log(id);
            console.log(post?.id);
            postController.deletePost(id);
            setConfirmationModal({visible: false, message: ""});
            setAlert({visible: true, isError: false, message: "Post rechazado correctamente."})
            setHandled(true);
        } catch (error) {
            setAlert({visible: true, isError: true, message: "Error al rechazar el post. Intente de nuevo."});
        }
    }

    function handleConfirmationModal(caseType){
        switch (caseType){
            case "reject":
                setConfirmationModal({visible: true, message: "¿Seguro que desea rechazar este post?"});
                setConfirmationModalFunction(() => handleReject);
                break;
            case "approve":
                setConfirmationModal({visible: true, message: "¿Seguro que desea aprobar este post?"});
                setConfirmationModalFunction(() => handleApprove);
                break;
        }
    }

    return (
        <>
        {confirmationModal.visible && <ConfirmationModal isOpen={confirmationModal.visible}
                                                         onClose={()=>setConfirmationModal({visible: false, value: ""})}
                                                         onConfirm={confirmationModalFunction}
                                                         message={confirmationModal.message}/>}
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold d-flex flex-row justify-content-between align-items-center w-100"}>
                    {`Leyendo post #${id} - pendiente de aprobación`}
                    <div className={"d-flex gap-2"}>
                        <Button disabled={handled} className={"btn btn-primary fw-bold p-1"} onClick={() => handleConfirmationModal("approve")}>Aprobar</Button>
                        <Button disabled={handled} className={"btn btn-danger fw-bold p-1"} onClick={() => handleConfirmationModal("reject")}>Rechazar</Button>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                {
                    alert.visible &&
                    <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                        {alert.message}
                    </div>
                }
                <h4 className={"fw-semibold"}> {post?.owner?.username} - {title} - {formattedDate}</h4>
                <div className={"d-flex w-100 align-items-start mb-2"}>
                    {post?.tags?.map(tag => (
                        <span key={tag.id} className="badge rounded-pill text-bg-success me-1">{tag.name}</span>
                    ))}
                </div>
                <div className={"text-break"}>
                    <p>{body}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"btn btn-dark fw-bold"} onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}