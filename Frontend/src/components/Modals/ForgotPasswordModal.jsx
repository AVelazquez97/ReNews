import Modal from "react-bootstrap/Modal";
import {useState} from "react";

export default function ForgotPasswordModal({onClose}){
    const [mail, setMail] = useState("");

    function handleForgot(){
        //userController.forgotPassword(mail);
        onClose();
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>Recuperar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
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
                <button className={"btn btn-dark fw-bold"} onClick={()=>handleForgot()}>Recuperar</button>
            </Modal.Footer>
        </Modal>
    )
}