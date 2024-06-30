import {
    LOGIN_DATA_INITIAL_STATE,
    SPA_PATH,
    VALIDATION_LOGIN_FORM_INITIAL_STATE,
    VALIDATION_REGISTER_FORM_INITIAL_STATE
} from "../../const.js";
import Container from "../../components/Container/Container.jsx";
import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal.jsx";
import {useEffect, useState} from "react";
import {notNullNotEmptyString, validateLoginForm, validateRegisterForm} from "../../utils.js";
import * as usersController from "../../controllers/usersController.js";
import Spinner from "../../components/Skeletons/Spinner.jsx";

export default function Login({setSpaPath}){
    const [view, setView] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(LOGIN_DATA_INITIAL_STATE);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [registerValidations,setRegisterValidations] = useState(VALIDATION_REGISTER_FORM_INITIAL_STATE);
    const [loginValidations, setLoginValidations] = useState(VALIDATION_LOGIN_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({visible: false, isError: false, message: ""});

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

    /* login logic handling */

    function handleLogin(){
        validateLoginForm(formData, setLoginValidations);
    }

    useEffect(() => {
        const loginUser = async () => {
            const hasValidationErrors = Object.values(loginValidations).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                setIsLoading(true);
                try {
                    const data = await usersController.loginUser(formData);
                    setFormData(LOGIN_DATA_INITIAL_STATE);
                    setView("login");

                    sessionStorage.setItem("isAdmin",data.isAdmin);
                    sessionStorage.setItem("userId", data.id);
                    sessionStorage.setItem("username", data.username);

                    setSpaPath(SPA_PATH.HOME);
                } catch (error) {
                    setAlert({visible: true,isError: true,message: error.message});
                }
                setIsLoading(false);
            }
        };

        loginUser();
    }, [loginValidations]);

    /* register logic handling */

    function handleRegister(){
        validateRegisterForm(formData, setRegisterValidations);
    }

    useEffect(() => {
        const registerUser = async () => {
            const hasValidationErrors = Object.values(registerValidations).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                try {
                    await usersController.registerUser(formData);
                    setFormData(LOGIN_DATA_INITIAL_STATE);
                    setView("login");
                    setAlert({visible: true,isError: false,message: "Usuario registrado correctamente."});
                } catch (error) {
                    setAlert({visible: true, isError: true, message: "Error al registrar el usuario."});
                }
            }
        };

        registerUser();
    }, [registerValidations]);

    return (
        <div className={"flex-grow-1 d-flex flex-column w-100 h-100 align-items-center pageContent overflow-y-scroll"}>
        {isLoading && <Spinner fullscreen/>}
        {isForgotPasswordModalOpen && <ForgotPasswordModal onClose={handleCloseForgotPasswordModal} isOpen={isForgotPasswordModalOpen}/>}
            <Container width={"75"}>
                <p className={"fs-3 fw-bold"}>{view === "login" ? "Login" : "Registrarse"}</p>
                { alert.visible &&
                    <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                        {alert.message}
                    </div>
                }
                <form className={"text-start"}>
                    {view === "login" &&
                        <>
                            <div className="mb-3">
                                <label className="form-label">Dirección de correo o nombre de usuario</label>
                                <input type="email" className="form-control" value={formData.usernameOrEmail}
                                       onChange={e => updateLoginData(e.target.value, "usernameOrEmail")}/>
                                {
                                    notNullNotEmptyString(loginValidations?.usernameOrEmail?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {loginValidations?.usernameOrEmail?.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" value={formData.password}
                                       onChange={e => updateLoginData(e.target.value, "password")}/>
                                {
                                    notNullNotEmptyString(loginValidations?.password?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {loginValidations?.password?.message}
                                    </div>
                                }
                            </div>
                        </>
                    }
                    {view === "register" &&
                        <>
                            <div className="mb-3">
                                <label className="form-label">Dirección de correo</label>
                                <input type="email" className="form-control" value={formData.email}
                                       onChange={e => updateLoginData(e.target.value, "email")}/>
                                {
                                    notNullNotEmptyString(registerValidations?.email?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {registerValidations?.email?.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" value={formData.password}
                                       onChange={e => updateLoginData(e.target.value, "password")}/>
                                {
                                    notNullNotEmptyString(registerValidations?.password?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {registerValidations?.password?.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Repetir contraseña</label>
                                <input type="password" className="form-control" value={formData.password_repeat}
                                       onChange={e => updateLoginData(e.target.value, "password_repeat")}/>
                                {
                                    notNullNotEmptyString(registerValidations?.password_repeat?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {registerValidations?.password_repeat?.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input className="form-control" value={formData.name}
                                       onChange={e => updateLoginData(e.target.value, "name")}/>
                                {
                                    notNullNotEmptyString(registerValidations?.name?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {registerValidations?.name?.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input className="form-control" value={formData.lastname}
                                       onChange={e => updateLoginData(e.target.value, "lastname")}/>
                                {
                                    notNullNotEmptyString(registerValidations?.lastname?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {registerValidations?.lastname?.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre de usuario</label>
                                <input className="form-control" value={formData.username}
                                       onChange={e => updateLoginData(e.target.value, "username")}/>
                                {
                                    notNullNotEmptyString(registerValidations?.username?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {registerValidations?.username?.message}
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
                            <button className="btn btn-dark fw-bold"
                                    onClick={() => setView("register")}>Registrarse
                            </button>
                            <button className="btn btn-primary fw-bold" onClick={() => handleLogin()}>
                                Iniciar sesión
                            </button>
                        </>
                        :
                        <>
                            <button className="btn btn-dark fw-bold" onClick={() => setView("login")}>Iniciar sesión</button>
                            <button className="btn btn-primary fw-bold" onClick={() => handleRegister()}>Enviar</button>
                        </>
                    }
                </div>
                <div className={"w-100 p-2"}>
                    <a href={"#"} onClick={() => handleOpenForgotPasswordModal()}>Olvidé mi contraseña</a>
                </div>
            </Container>
        </div>
    )
}
