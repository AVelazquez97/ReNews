import {notNullNotEmptyString, now, userId, validateNewCommentForm} from "../../utils.js";
import {Button} from "react-bootstrap";
import Container from "../Container/Container.jsx";
import {useEffect, useState} from "react";
import {
    ALERT_INITIAL_STATE,
    COMMENT_DATA_INITIAL_STATE,
    VALIDATION_NEW_COMMENT_FORM_INITIAL_STATE
} from "../../const.js";
import * as postsController from "../../controllers/postsController.js";

export default function CreateComment({postId}){
    const [newComment, setNewComment] = useState({COMMENT_DATA_INITIAL_STATE});
    const [validations,setValidations] = useState(VALIDATION_NEW_COMMENT_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);

    /* check the validations and try to create the comment */
    useEffect(() => {
        setAlert(ALERT_INITIAL_STATE);
        const createComment = async () => {
            setIsLoading(true);
            const hasValidationErrors = Object.values(validations).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                try {
                    await postsController.createComment(postId, newComment);
                    setAlert({visible: true, isError: false, message: "Comentario creado correctamente."});
                    setNewComment(COMMENT_DATA_INITIAL_STATE);
                } catch (error) {
                    setAlert({visible: true, isError: true, message: "Error al crear el comentario. Intente de nuevo."});
                }
            }
            setIsLoading(false);
        }

        createComment();
    }, [validations]);

    function handleNewComment(){
        setNewComment((prevState) => ({
            ...prevState,
            ownerId: userId(),
            postId: postId,
            date: now()
        }));
        validateNewCommentForm(newComment, setValidations);
    }

    function updateNewCommentData(value, key){
        setNewComment({...newComment, [key]: value});
    }

    return (
        <Container width={"100"} height={"100"} justifyContent={"start"} gap={"2"}>
            <h5 className={"fw-semibold"}>💬 Agrega un comentario</h5>
            {alert?.visible && alert?.isError === false &&
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
    )
}