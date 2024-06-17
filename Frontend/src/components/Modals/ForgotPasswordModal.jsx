import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import ConfirmationModal from "./ConfirmationModal.jsx";
import {validateEmail} from "../../utils.js";

export default function ForgotPasswordModal({onClose}){
    const [mail, setMail] = useState("");
    const [confirmationModal, setConfirmationModal] = useState({visible: false, message: ""});
    const [confirmationModalFunction, setConfirmationModalFunction] = useState(null);
    const [alert,setAlert] = useState({visible: false, isError: false , message: ""});

    function handleConfirmationModal(){
        setConfirmationModal({visible: true, message: "¿Seguro que desea iniciar el proceso de recuperación de contraseña?"});
        setConfirmationModalFunction(() => handleForgot);
    }

    function handleForgot(){
        if(validateEmail(mail)){
            console.log("[PLACEHOLDER] Requesting password recovery for mail: ", mail);
            //userController.forgotPassword(mail);
            setAlert({visible: true, isError: false, message: "Proceso iniciado correctamente, se ha enviado un correo con instrucciones para recuperar su contraseña."});
        } else {
            console.log("[PLACEHOLDER] Invalid email format: ", mail);
            setAlert({visible: true, isError: true, message: "Por favor ingrese una dirección de correo válida."});
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
                <Modal.Title className={"fw-bold"}>
                    Recuperar contraseña
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                {
                    alert.visible &&
                    <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                        {alert.message}
                    </div>
                }
                <p>
                    Ingrese su dirección de correo y le enviaremos un enlace para avanzar con el proceso de recuperar su contraseña.
                </p>
                <p>
                    Una vez iniciado dicho proceso su contraseña actual sera remplazada por una nueva la cual es gestionada por el equipo
                    de ReNews, este proceso no puede cancelarse y debe llevarse a cabo en su completitud para poder volver a ingresar al sitio.
                </p>
                <p>
                    Si esta teniendo problemas no dude en contactarnos en <span className={"text-primary"}>soporte@re.news</span>
                </p>
                <form className={"text-start w-100"}>
                    <div className="mb-3">
                        <label className="form-label">Su dirección de correo</label>
                        <input type="email" className="form-control" value={mail} onChange={e => setMail(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className={"btn btn-dark fw-bold"} onClick={()=>handleConfirmationModal()}>Recuperar</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}