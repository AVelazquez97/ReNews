import {isAdmin} from "../../utils.js";
import {useState} from "react";
import ConfirmationModal from "../Modals/ConfirmationModal.jsx";

export default function CommentCard({id, owner, body, date}){
    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);

    function handleConfirmationModal(){
        setConfirmationModal({visible: true, message: "¿Seguro que desea eliminar este comentario?"});
        setConfirmationModalFunction(() => handleDeleteComment);
    }

    function handleDeleteComment(){
        console.log("[PLACEHOLDER] Deleting comment: ", id);
        //postController.deleteComment(postId, comment.id);
    }

    return(
        <>
            {confirmationModal.visible && <ConfirmationModal isOpen={confirmationModal.visible}
                                                             onClose={()=>setConfirmationModal({visible: false, value: ""})}
                                                             onConfirm={confirmationModalFunction}
                                                             message={confirmationModal.message}/>}
            <div className={"card p-2 w-100 d-flex flex-row align-items-start justify-content-between"}>

                <div>
                    <div className={"d-flex flex-row justify-content-start align-items-center"}>
                        <img width={25} height={25} alt={"avatar"} src={"./default-profile-picture.jpg"}
                             className={"rounded-circle m-2"}/>
                        <h5 className={"fw-semibold"}>{owner}</h5>
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