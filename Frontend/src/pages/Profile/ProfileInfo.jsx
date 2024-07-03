import {useEffect, useState} from "react";
import * as usersController from "../../controllers/usersController.js";
import {notNullNotEmptyString, userId, validateProfileInfoForm} from "../../utils.js";
import SkeletonProfileInfo from "../../components/Skeletons/SkeletonProfileInfo.jsx";
import {ALERT_INITIAL_STATE, VALIDATION_PROFILE_INFO_FORM_INITIAL_STATE} from "../../const.js";
import Spinner from "../../components/Skeletons/Spinner.jsx";
import Container from "../../components/Container/Container.jsx";

export default function ProfileInfo(){
    const [profileInfo, setProfileInfo] = useState(null);
    const [validation, setValidation] = useState(VALIDATION_PROFILE_INFO_FORM_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(ALERT_INITIAL_STATE);

    function updateProfileInfo(value, key){
        setProfileInfo({...profileInfo, [key]: value});
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            updateProfileInfo(reader.result, "profile_image");
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function handleUpdateUser(){
        setProfileInfo({...profileInfo, id: userId()});
        validateProfileInfoForm(profileInfo, setValidation);
    }

    /* check the validations and try to update the users info */
    useEffect(() => {
        setAlert(ALERT_INITIAL_STATE);
        const updateUser = async () => {
            setIsLoading(true);
            const hasValidationErrors = Object.values(validation).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                try {
                    await usersController.updateUser(userId(), profileInfo);
                    setAlert({visible: true, isError: false, message: "Información de perfil actualizada correctamente."});
                } catch (error) {
                    setAlert({visible: true, isError: true, message: "Error al actualizar la información de perfil. Intente de nuevo."});
                }
            }
            setIsLoading(false);
        }

        updateUser();
    }, [validation]);

    /* fetch the initial profile info */
    useEffect(() => {
        const getProfile = async () => {
            try {
                let data = await usersController.getUser(userId());
                setProfileInfo(data);
            } catch (error) {
                setAlert({visible: true, isError: true, message: "Error al obtener la información de perfil. Intente de nuevo."});
            }
        }

        getProfile();
    }, []);

    return (
        profileInfo === null ?
            <SkeletonProfileInfo/>
        :
            <Container width={"100"} position={"position-relative"}>
            {isLoading && <Spinner/>}
                <p className={"fs-3 fw-bold"}> Perfil </p>
                    <form className={"text-start"}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={profileInfo.name}
                                   onChange={e => updateProfileInfo(e.target.value, "name")}/>
                            {
                                notNullNotEmptyString(validation?.name?.message) &&
                                <div className={`alert mt-2 alert-danger`}>
                                    {validation?.name?.message}
                                </div>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido</label>
                            <input type="text" className="form-control" value={profileInfo.lastname}
                                   onChange={e => updateProfileInfo(e.target.value, "lastname")}/>
                            {
                                notNullNotEmptyString(validation?.lastname?.message) &&
                                <div className={`alert mt-2 alert-danger`}>
                                    {validation?.lastname?.message}
                                </div>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={profileInfo.username}
                                   onChange={e => updateProfileInfo(e.target.value, "username")}/>
                            {
                                notNullNotEmptyString(validation?.username?.message) &&
                                <div className={`alert mt-2 alert-danger`}>
                                    {validation?.username?.message}
                                </div>
                            }
                        </div>
                    </form>
                {
                    alert?.visible && alert?.isError === false &&
                    <div className={`alert mt-2 alert-success`}>
                        {alert?.message}
                    </div>
                }
                <div className={"d-flex justify-content-end w-100"}>
                    <button className="btn btn-dark fw-bold" onClick={() => handleUpdateUser()}>Guardar</button>
                </div>
            </Container>
    )
}