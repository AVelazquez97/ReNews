import ConfirmationModal from "../Modals/ConfirmationModal.jsx";
import {useState} from "react";
import {ALERT_INITIAL_STATE} from "../../const.js";
import * as usersController from "../../controllers/usersController.js";

export default function UserCard({user}){
    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});

    async function handleDeleteUser(){
        try{
            await usersController.deleteUser(user?.id);
            setAlert({visible: true, isError: false, message: "Usuario eliminado correctamente."});
        } catch (error) {
            setAlert({visible: true, isError: true, message: error.message});
        }
    }

    function handleConfirmationModal(){
        setConfirmationModal({visible: true, message: "¿Seguro que desea eliminar este usuario?"});
        setConfirmationModalFunction(() => handleDeleteUser);
    }

    return (
        <>
        {confirmationModal.visible && <ConfirmationModal isOpen={confirmationModal.visible}
                                                         onClose={()=>setConfirmationModal({visible: false, value: ""})}
                                                         onConfirm={confirmationModalFunction}
                                                         message={confirmationModal.message}/>}

        {alert?.visible === true ?
            <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                {alert.message}
            </div>
            :
            <div className={"card p-2 w-100 d-flex flex-row align-items-center justify-content-between"}>
                <div className={"w-100"}>
                    <div className={"d-flex flex-column justify-content-start align-items-center"}>
                        <img width={25} height={25} alt={"avatar"} src={"./default-profile-picture.jpg"}
                             className={"rounded-circle m-2"}/>
                        <h5 className={"fw-semibold"}>{user?.username}</h5>

                        <div className={"d-flex flex-column w-100 align-items-start"}>
                            <p className={"fw-medium"}>Email: {user?.email}</p>
                            <p className={"fw-medium"}>Nombre: {user?.name}</p>
                            <p className={"fw-medium"}>Apellido: {user?.lastname}</p>
                            {/*<p className={"fw-medium"}>Post hechos: {user?.postsAmount}</p>
                    <p className={"fw-medium"}>Comentarios hechos: {user?.commentsAmount}</p>
                    <p className={"fw-medium"}>Likes obtenidos: {user?.likesAmount}</p>*/}
                        </div>

                        <div className={"d-flex flex-row justify-content-center gap-2 w-100"}>
                            <button className={"btn btn-danger fw-bold w-100"}
                                    onClick={() => handleConfirmationModal()}>Eliminar usuario
                            </button>
                            <button className={"btn btn-primary fw-bold w-100"}>Convertir en admin</button>
                        </div>

                    </div>
                </div>
            </div>
        }
        </>
    )
}