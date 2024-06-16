import {LOGIN_DATA_INITIAL_STATE, SPA_PATH} from "../../const.js";
import Container from "../../components/Container/Container.jsx";
import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal.jsx";
import {useState} from "react";

export default function Login({setSpaPath}){
    const [view, setView] = useState("login");
    const [loginData, setLoginData] = useState(LOGIN_DATA_INITIAL_STATE);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    function handleLogin(debugLoginType){
        sessionStorage.setItem("isAdmin",debugLoginType);
        setSpaPath(SPA_PATH.HOME);
    }

    function handleRegister(){
        console.log("register...");
        setView("login");
    }

    function updateLoginData(value, key){
        setLoginData({...loginData, [key]: value});
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
            <Container>
                <p className={"fs-3 fw-bold"}>{view === "login" ? "Login" : "Registrarse"}</p>
                <form className={"text-start"}>
                    <div className="mb-3">
                        <label className="form-label">Dirección de correo</label>
                        <input type="email" className="form-control" value={loginData.email}
                               onChange={e => updateLoginData(e.target.value, "email")}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={loginData.password}
                               onChange={e => updateLoginData(e.target.value, "password")}/>
                    </div>
                    {view === "register" &&
                        <>
                            <div className="mb-3">
                                <label className="form-label">Repetir contraseña</label>
                                <input className="form-control" value={loginData.password_repeat}
                                       onChange={e => updateLoginData(e.target.value, "password_repeat")}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input className="form-control" value={loginData.name}
                                       onChange={e => updateLoginData(e.target.value, "name")}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input className="form-control" value={loginData.surname}
                                       onChange={e => updateLoginData(e.target.value, "surname")}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre de usuario</label>
                                <input className="form-control" value={loginData.username}
                                       onChange={e => updateLoginData(e.target.value, "username")}/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen de perfil</label>
                                <input className="form-control form-control-sm" type="file"
                                       onChange={handleFileChange}/>
                            </div>
                        </>
                    }
                </form>
                <div className={"w-100 d-flex justify-content-end gap-2"}>
                    {view === "login" ?
                        <>
                            <button className="btn btn-primary fw-bold"
                                    onClick={() => setView("register")}>Registrarse
                            </button>
                            <button className="btn btn-dark fw-bold" onClick={() => handleLogin(true)}>Iniciar sesión como
                                admin
                            </button>
                            <button className="btn btn-dark fw-bold" onClick={() => handleLogin(false)}>Iniciar sesión normal
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