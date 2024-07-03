import ConfirmationModal from "../Modals/ConfirmationModal.jsx";
import {useState} from "react";
import {ALERT_INITIAL_STATE} from "../../const.js";
import * as usersController from "../../controllers/usersController.js";
import Spinner from "../Skeletons/Spinner.jsx";

export default function UserCard({user}){
    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);

    //console.log(user.id, user.isAdmin, user.username);

    async function handleDeleteUser(){
        setIsLoading(true);
        try{
            await usersController.deleteUser(user?.id);
            setAlert({visible: true, isError: false, message: "Usuario eliminado correctamente."});
        } catch (error) {
            setAlert({visible: true, isError: true, message: error.message});
        }
        setIsLoading(false);
    }

    async function handleElevateUser(){
        setIsLoading(true);
        try{
            await usersController.elevateUser(user?.id);
            setAlert({visible: true, isError: false, message: "Usuario convertido en administrador correctamente."});
        } catch (error) {
            setAlert({visible: true, isError: true, message: "Error al convertir usuario en administrador. Intente de nuevo."});
        }
        setIsLoading(false);
    }

    function handleConfirmationModal(caseType){
        switch (caseType){
            case "delete":
                setConfirmationModal({visible: true, message: "¿Seguro que desea eliminar este usuario?"});
                setConfirmationModalFunction(() => handleDeleteUser);
                break;
            case "elevate":
                setConfirmationModal({visible: true, message: "¿Seguro que desea convertir este usuario en administrador?"});
                setConfirmationModalFunction(() => handleElevateUser);
                break;
        }
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
            <div className={"card w-100 d-flex flex-row align-items-center justify-content-between"}>
                {isLoading && <Spinner/>}
                <div className={"w-100 p-2"}>
                    <div className={"d-flex flex-column justify-content-start align-items-center"}>
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
                                    onClick={() => handleConfirmationModal("delete")}>Eliminar usuario
                            </button>
                            {user?.isAdmin === false &&
                                <button className={"btn btn-primary fw-bold w-100"} onClick={() => handleConfirmationModal("elevate")}>Convertir en admin</button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        }
        </>
    )
}