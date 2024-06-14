import {PROFILE_DATA_INITIAL_STATE} from "../../const.js";
import {useState} from "react";
import Container from "../../components/Container/Container.jsx";

export default function Profile({}){
    const [profileData, setProfileData] = useState(PROFILE_DATA_INITIAL_STATE);

    function updateProfileData(value, key){
        setProfileData({...profileData, [key]: value});
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            updateProfileData(reader.result, "profile_image");
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className={"pageContent"}>
            <div className={"d-flex flex-row"}>
                <Container alignItems={"start"} width={"75"}>
                    <p className={"fs-3 fw-bold"}> Perfil </p>
                    <form className={"text-start"}>
                        <div className="mb-3">
                            <label className="form-label">Imagen de perfil</label>
                            <input className="form-control form-control-sm" type="file"
                                   onChange={handleFileChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="email" className="form-control" value={profileData.name}
                                   onChange={e => updateProfileData(e.target.value, "email")}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido</label>
                            <input type="email" className="form-control" value={profileData.surname}
                                   onChange={e => updateProfileData(e.target.value, "surname}")}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="email" className="form-control" value={profileData.username}
                                   onChange={e => updateProfileData(e.target.value, "username")}/>
                        </div>
                    </form>
                </Container>
                <Container width={"25"}>
                    <p className={"fs-3 fw-bold"}> Crear nuevo tag </p>
                    <form className={"h-100"}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="email" className="form-control" value={profileData.name}
                                   onChange={e => updateProfileData(e.target.value, "email")}/>
                        </div>
                    </form>
                    <div className={"d-flex justify-content-end w-100"}>
                        <button className="btn btn-dark fw-bold">Guardar</button>
                    </div>
                </Container>
            </div>
        </div>
    )
}