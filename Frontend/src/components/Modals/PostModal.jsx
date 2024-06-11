import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import Container from "../Container/Container.jsx";
import CommentCard from "../CommentCard/CommentCard.jsx";
export default function PostModal({post,onClose}){
    const { owner_id, id, title, body, date, tags, liked_amount, comments } = post;

    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>{`Leyendo post #${id}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                <h4 className={"fw-semibold"}> {owner_id} - {title} - {formattedDate}</h4>
                <div className={"d-flex w-100 align-items-start mb-2"}>
                    {post?.tags?.map(tag => (
                        <span key={tag.id} className="badge rounded-pill text-bg-success me-1">{tag.name}</span>
                    ))}
                </div>
                <p className={"fs-5 fw-bold text-success w-100 text-start"}>👍 {liked_amount}</p>
                <p>{body}</p>
                <h5 className={"fw-semibold"}>💬 Comentarios</h5>
                <Container width={"100"} height={"100"} justifyContent={"start"} gap={"2"}>
                    {comments.map(comment => {
                        const commentDate = new Date(comment.date);
                        const formattedCommentDate = `${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()}`;
                        return (
                            <CommentCard key={comment.commentOwner_id} owner={comment.commentOwner_id}
                                         commentary={comment.comment_body} date={formattedCommentDate}/>
                        );
                    })}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"btn btn-dark fw-bold"} onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>

    )
}