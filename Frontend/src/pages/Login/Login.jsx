import {LOGIN_DATA_INITIAL_STATE, SPA_PATH, VALIDATION_REGISTER_FORM_INITIAL_STATE} from "../../const.js";
import Container from "../../components/Container/Container.jsx";
import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal.jsx";
import {useEffect, useState} from "react";
import {notNullNotEmptyString, validateRegisterForm} from "../../utils.js";
import * as usersController from "../../controllers/usersController.js";

export default function Login({setSpaPath}){
    const [view, setView] = useState("login");
    const [formData, setFormData] = useState(LOGIN_DATA_INITIAL_STATE);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [validations,setValidations] = useState(VALIDATION_REGISTER_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({visible: false, isError: false, message: ""});

    function handleLogin(debugLoginType){
        sessionStorage.setItem("isAdmin",debugLoginType);
        sessionStorage.setItem("userId", "1");
        sessionStorage.setItem("username", "testUserName");
        setSpaPath(SPA_PATH.HOME);
    }

    function handleRegister(){
        validateRegisterForm(formData, setValidations);
    }

    useEffect(() => {
        const registerUser = async () => {
            const hasValidationErrors = Object.values(validations).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                try {
                    await usersController.registerUser(formData);
                    setFormData(LOGIN_DATA_INITIAL_STATE);
                    setView("login");
                    setAlert({visible: true,isError: false,message: "Usuario registrado correctamente."});
                } catch (error) {
                    setAlert({visible: true,isError: true,message: "Error al registrar el usuario."});
                }
            }
        };

        registerUser();
    }, [validations, formData]);

    function updateLoginData(value, key){
        setFormData({...formData, [key]: value});
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            updateLoginData(reader.result, "profile_image");
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function handleOpenForgotPasswordModal(){
        setIsForgotPasswordModalOpen(true);
    }

    function handleCloseForgotPasswordModal(){
        setIsForgotPasswordModalOpen(false);
    }

    return (
        <div className={"flex-grow-1 d-flex flex-column w-100 h-100 align-items-center pageContent overflow-y-scroll"}>
        {isForgotPasswordModalOpen && <ForgotPasswordModal onClose={handleCloseForgotPasswordModal} isOpen={isForgotPasswordModalOpen}/>}
            <Container width={"75"}>
                <p className={"fs-3 fw-bold"}>{view === "login" ? "Login" : "Registrarse"}</p>
                { alert.visible &&
                    <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                        {alert.message}
                    </div>
                }
                <form className={"text-start"}>
                    <div className="mb-3">
                        <label className="form-label">Dirección de correo</label>
                        <input type="email" className="form-control" value={formData.email}
                               onChange={e => updateLoginData(e.target.value, "email")}/>
                        {
                            notNullNotEmptyString(validations?.email?.message) &&
                            <div className={`alert mt-2 alert-danger`}>
                                {validations?.email?.message}
                            </div>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={formData.password}
                               onChange={e => updateLoginData(e.target.value, "password")}/>
                        {
                            notNullNotEmptyString(validations?.password?.message) &&
                            <div className={`alert mt-2 alert-danger`}>
                                {validations?.password?.message}
                            </div>
                        }
                    </div>
                    {view === "register" &&
                        <>
                            <div className="mb-3">
                                <label className="form-label">Repetir contraseña</label>
                                <input type="password" className="form-control" value={formData.password_repeat}
                                       onChange={e => updateLoginData(e.target.value, "password_repeat")}/>
                                {
                                    notNullNotEmptyString(validations?.password_repeat?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {validations?.password_repeat?.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input className="form-control" value={formData.name}
                                       onChange={e => updateLoginData(e.target.value, "name")}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input className="form-control" value={formData.surname}
                                       onChange={e => updateLoginData(e.target.value, "surname")}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre de usuario</label>
                                <input className="form-control" value={formData.username}
                                       onChange={e => updateLoginData(e.target.value, "username")}/>
                                {
                                    notNullNotEmptyString(validations?.username?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {validations?.username?.message}
                                    </div>
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen de perfil</label>
                                <input className="form-control form-control-sm" type="file"
                                       onChange={handleFileChange}/>
                            </div>
                        </>
                    }
                </form>
                <div className={"w-100 d-flex justify-content-center gap-2"}>
                    {view === "login" ?
                        <>
                            <button className="btn btn-danger fw-bold" onClick={() => testConsume()}>test consume</button>
                            <button className="btn btn-primary fw-bold"
                                    onClick={() => setView("register")}>Registrarse
                            </button>
                            <button className="btn btn-dark fw-bold" onClick={() => handleLogin(true)}>Iniciar sesión
                                como
                                admin
                            </button>
                            <button className="btn btn-dark fw-bold" onClick={() => handleLogin(false)}>Iniciar sesión
                                normal
                            </button>
                        </>
                        :
                        <button className="btn btn-primary fw-bold" onClick={() => handleRegister()}>Enviar</button>
                    }
                </div>
                <div className={"w-100 p-2"}>
                    <a href={"#"} onClick={() => handleOpenForgotPasswordModal()}>Olvidé mi contraseña</a>
                </div>
            </Container>
        </div>
    )
}
