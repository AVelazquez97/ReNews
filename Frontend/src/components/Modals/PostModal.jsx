import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import Container from "../Container/Container.jsx";
import {isAdmin} from "../../utils.js";
import {useState} from "react";
import ConfirmationModal from "./ConfirmationModal.jsx";
import CommentsSection from "./CommentsSection.jsx";
import CreateComment from "./CreateComment.jsx";
export default function PostModal({post,onClose, handleDeletePost}){
    const { id, title, body, date, comments } = post;
    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);

    function handleConfirmationModal(id){
        setConfirmationModal({visible: true, message: "¿Seguro que desea eliminar este post?"});
        setConfirmationModalFunction(() => handleDeletePost);
    }

    console.log(post);
    return (
        <>
            {confirmationModal.visible && <ConfirmationModal isOpen={confirmationModal.visible}
                                                             onClose={()=>setConfirmationModal({visible: false, value: ""})}
                                                             onConfirm={confirmationModalFunction}
                                                             message={confirmationModal.message}/>}
            <Modal show onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={"fw-bold d-flex flex-row justify-content-between align-items-center w-100"}>
                        {`Leyendo post #${id}`}
                        <div className={"d-flex gap-2"}>
                            {isAdmin() && <Button className={"btn btn-danger fw-bold p-1"} onClick={() => handleConfirmationModal()}>Eliminar Post</Button>}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                    <h4 className={"fw-semibold w-100 text-start"}> {post?.owner?.username} - {title} - {formattedDate}</h4>
                    <Container width={"100"} height={"100"}>
                        <div className={"d-flex w-100 align-items-start mb-2"}>
                            {post?.tags?.map(tag => (
                                <span key={tag.id} className="badge rounded-pill text-bg-success me-1">{tag.name}</span>
                            ))}
                        </div>
                        <div>
                            <p className={"text-break"}>{body}</p>
                        </div>
                    </Container>
                    <CommentsSection comments={comments}/>
                    <CreateComment postId={post?.id}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"btn btn-dark fw-bold"} onClick={onClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}