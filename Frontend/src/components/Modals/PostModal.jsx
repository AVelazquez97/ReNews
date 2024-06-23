import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import Container from "../Container/Container.jsx";
import CommentCard from "../CommentCard/CommentCard.jsx";
import {isAdmin, notNullNotEmptyString, userId, validateNewCommentForm} from "../../utils.js";
import {useEffect, useState} from "react";
import {ALERT_INITIAL_STATE, COMMENT_DATA_INITIAL_STATE, VALIDATION_NEW_POST_FORM_INITIAL_STATE} from "../../const.js";
export default function PostModal({post,onClose}){
    const { ownerId, id, title, body, date, tags, comments } = post;

    const [likes, setLikes] = useState(post?.likes);
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const [newComment, setNewComment] = useState({COMMENT_DATA_INITIAL_STATE});

    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

    const [validations,setValidations] = useState(VALIDATION_NEW_POST_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});

    useEffect(() => {
        if(validations?.body?.message !== ""){
            console.log("[PLACEHOLDER] Validation failed, please check the form for errors.");
        } else {
            console.log("[PLACEHOLDER] Creating comment: ", newComment);
            //postController.createPost(postData);
            setAlert({visible: true, isError: false, message: "Comentario creado correctamente."});
            setNewComment(COMMENT_DATA_INITIAL_STATE);
        }
    }, [validations]);

    function handleLike(){
        alreadyLiked ? setLikes(likes - 1) : setLikes(likes + 1);
        setAlreadyLiked(!alreadyLiked);
    }

    function updateNewCommentData(value, key){
        setNewComment({...newComment, [key]: value});
    }

    function handleNewComment(){
        setNewComment((prevState) => ({
            ...prevState,
            ownerId: userId(),
            postId: id
        }));
        validateNewCommentForm(newComment, setValidations);
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold d-flex flex-row justify-content-between align-items-center w-100"}>
                    {`Leyendo post #${id}`}
                    <div className={"d-flex gap-2"}>
                        {isAdmin() && <Button className={"btn btn-danger fw-bold p-1"} onClick={onClose}>Eliminar Post</Button>}
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                <h4 className={"fw-semibold w-100 text-start"}> {ownerId} - {title} - {formattedDate}</h4>
                <Container width={"100"} height={"100"}>
                    <div className={"d-flex w-100 align-items-start mb-2"}>
                        {post?.tags?.map(tag => (
                            <span key={tag.id} className="badge rounded-pill text-bg-success me-1">{tag.name}</span>
                        ))}
                    </div>
                    <div className={"w-100 text-start mb-1 mt-1"}>
                        <Button className={`btn fw-bold p-1 ${alreadyLiked ? "btn-primary" : "btn-dark"}`}
                                onClick={() => handleLike()}>{likes} Me gusta 👍</Button>
                    </div>
                    <p>{body}</p>
                </Container>
                <Container width={"100"} height={"100"} justifyContent={"start"} gap={"2"}>
                <h5 className={"fw-semibold"}>💬 Comentarios</h5>
                    {comments.map(comment => {
                        const commentDate = new Date(comment.date);
                        const formattedCommentDate = `${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()}`;
                        return (
                            <CommentCard key={comment.ownerId} owner={comment.ownerId}
                                         commentary={comment.comment} date={formattedCommentDate}/>
                        );
                    })}
                </Container>
                <Container width={"100"} height={"100"} justifyContent={"start"} gap={"2"}>
                    <h5 className={"fw-semibold"}>💬 Agrega un comentario</h5>
                    {alert.visible &&
                        <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                            {alert.message}
                        </div>
                    }
                    {
                        notNullNotEmptyString(validations?.body?.message) &&
                        <div className={`alert mt-2 alert-danger`}>
                            {validations?.body?.message}
                        </div>
                    }
                    <form className={"text-start w-100"}>
                        <textarea type="text" className="form-control" value={newComment?.body}
                                  onChange={e => updateNewCommentData(e.target.value, "body")}/>
                    </form>
                    <div className={"d-flex w-100 justify-content-end"}>
                        <Button className={"btn btn-primary fw-bold"} onClick={() => handleNewComment()}>Enviar comentario</Button>
                    </div>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"btn btn-dark fw-bold"} onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>

    )
}