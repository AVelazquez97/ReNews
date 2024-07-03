import {isAdmin} from "../../utils.js";
import {useState} from "react";
import ConfirmationModal from "../Modals/ConfirmationModal.jsx";
import * as usersController from "../../controllers/usersController.js";
import * as postsController from "../../controllers/postsController.js";
import {ALERT_INITIAL_STATE} from "../../const.js";

export default function CommentCard({postId, commentId, owner, body, date}){
    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alert,setAlert] = useState(ALERT_INITIAL_STATE);

    function handleConfirmationModal(){
        setConfirmationModal({visible: true, message: "¿Seguro que desea eliminar este comentario?"});
        setConfirmationModalFunction(() => handleDeleteComment);
    }

    async function handleDeleteComment(){
        setIsLoading(true);
        try{
            await postsController.deleteComment(postId, commentId);
            setAlert({visible: true, isError: false, message: "Comentario eliminado correctamente."});
        } catch (error) {
            setAlert({visible: true, isError: true, message: "Error al eliminar el comentario. Intente de nuevo."});
        }
        setIsLoading(false);
    }

    return(
        <>
            {confirmationModal.visible && <ConfirmationModal isOpen={confirmationModal.visible}
                                                             onClose={()=>setConfirmationModal({visible: false, value: ""})}
                                                             onConfirm={confirmationModalFunction}
                                                             message={confirmationModal.message}/>}
            <div className={"card p-2 w-100 d-flex flex-row align-items-start justify-content-between"}>
                <div>
                    {
                        alert.visible &&
                        <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                            {alert.message}
                        </div>
                    }
                    <div className={"d-flex flex-row justify-content-start align-items-center"}>
                        <h5 className={"fw-semibold"}>{owner.username}</h5>
                    </div>
                    <h5 className={"fs-6"}>{date}</h5>
                    <p>{body}</p>
                </div>
                {isAdmin() &&
                    <div className={"d-flex flex-column justify-content-center gap-2"}>
                        <button className={"btn btn-danger fw-bold w-100"} onClick={() => handleConfirmationModal()}>Eliminar</button>
                    </div>
                }
            </div>
        </>
    )
}