import styles from "./PostCard.module.css";
import {isAdmin} from "../../utils.js";
import PostModal from "../Modals/PostModal.jsx";
import * as postsController from "../../controllers/postsController.js";
import {useEffect, useState} from "react";
import ConfirmationModal from "../Modals/ConfirmationModal.jsx";
import {ALERT_INITIAL_STATE} from "../../const.js";
import Spinner from "../Skeletons/Spinner.jsx";
export default function PostCard ({ post, onClick = () => {}, date,
                                  textAlign = "start", height = "auto", width = "auto"}) {

    const dateObj = new Date(post?.date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);
    const [alreadyDeleted, setAlreadyDeleted] = useState(false);

    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);

    function handleModalClose() {
        setIsModalOpen(false);
    }

    function handleDeletePost(){
        setIsLoading(true);
        try{
            postsController.deletePost(post.id);
            setAlert({visible: true, isError: false, message: "Post eliminado correctamente."});
            setAlreadyDeleted(true);
        } catch (error) {
            setAlert({visible: true, isError: true, message: "Error al eliminar post. Intente de nuevo."});
        }
        setIsLoading(false);
        setConfirmationModal({visible: false, message: ""});
        setIsModalOpen(false);
    }

    function handleConfirmationModal(id){
        setConfirmationModal({visible: true, message: "¿Seguro que desea eliminar este post?"});
        setConfirmationModalFunction(() => handleDeletePost);
    }

    return (
        <>
            {confirmationModal.visible && <ConfirmationModal isOpen={confirmationModal.visible}
                                                             onClose={()=>setConfirmationModal({visible: false, value: ""})}
                                                             onConfirm={confirmationModalFunction}
                                                             message={confirmationModal.message}/>}
            <div className={"d-flex w-100 justify-content-between position-relative"}>
                {isLoading && <Spinner/>}
                {isModalOpen && <PostModal post={post} onClose={handleModalClose} isOpen={isModalOpen} handleDeletePost={handleDeletePost}/>}
                <div className={`card d-flex flex-row w-${width} h-${height} ${styles['postCard-custom']} text-${textAlign}`}
                     onClick={alreadyDeleted ? null : () => setIsModalOpen(true)}>
                    <div className="card-body overflow-hidden">
                        <div className={"w-100 d-flex flex-row justify-content-between align-items-center"}>
                            <h5 className={"text-dark fw-bold p-0"}>{post?.title}</h5>
                            <p className={"text-dark-emphasis p-0"}>{formattedDate}</p>
                        </div>
                        <div className={"d-flex align-items-center mb-2"}>
                            {post?.tags?.map(tag => (
                                <span key={tag.id} className="badge rounded-pill text-bg-success me-1">{tag.name}</span>
                            ))}
                        </div>
                        <p className="card-text">{`${post?.body.slice(0, 150 - 3)}...`}</p>
                    </div>
                </div>
                {isAdmin() &&
                    <div className={"d-flex align-items-center p-2"}>
                        <button className={"btn btn-danger fw-bold"} disabled={alreadyDeleted} onClick={() => handleConfirmationModal(post?.id)}>Eliminar</button>
                    </div>
                }
            </div>
            <div className={"d-flex w-100"}>
                {alert.visible &&
                    <div className={`alert m-0 w-100 alert-${alert.isError ? "danger" : "success"}`}>
                        {alert.message}
                    </div>
                }
            </div>
        </>
    )
}