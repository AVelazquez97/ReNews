import {LOGIN_DATA_INITIAL_STATE} from "../../const.js";
import Container from "../../components/Container/Container.jsx";
import {useState} from "react";

export default function Login(){
    const [view, setView] = useState("login");
    const [loginData, setLoginData] = useState(LOGIN_DATA_INITIAL_STATE);

    function handleLogin(){
        console.log("login...");
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

    return (
        <div className={"pageContent d-flex justify-content-center"}>
            <Container>
                <p className={"fs-1 fw-bold"}>{view === "login" ? "Login" : "Registrarse"}</p>
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
                <div className={"d-flex justify-content-end gap-2"}>
                    {view === "login" ?
                        <>
                            <button className="btn btn-primary" onClick={() => setView("register")}>Registrarse</button>
                            <button className="btn btn-success" onClick={() => handleLogin()}>Iniciar sesión</button>
                        </>
                        :
                        <button className="btn btn-success" onClick={() => handleRegister()}>Enviar</button>
                }
                </div>
            </Container>
        </div>
    )
}