import Container from "../../components/Container/Container.jsx";
import {notNullNotEmptyString, validateNewTagForm} from "../../utils.js";
import React, {useEffect, useState} from "react";
import {
    ALERT_INITIAL_STATE,
    TAG_DATA_INITIAL_STATE,
    VALIDATION_NEW_TAG_FORM_INITIAL_STATE
} from "../../const.js";
import * as tagsController from "../../controllers/tagsController.js";
import Spinner from "../../components/Skeletons/Spinner.jsx";

export default function NewTag(){
    const [newTag, setNewTag] = useState(TAG_DATA_INITIAL_STATE);
    const [validations,setValidations] = useState(VALIDATION_NEW_TAG_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);

    function handleTagChange(value){
        setNewTag({name: value});
    }

    function handleNewTag(){
        validateNewTagForm(newTag, setValidations);
    }

    /* check the validations and try to create the tag */
    useEffect(() => {
        setAlert(ALERT_INITIAL_STATE);
        const createTag = async () => {
            setIsLoading(true);
            const hasValidationErrors = Object.values(validations).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                try {
                    await tagsController.createTag(newTag);
                    setAlert({visible: true, isError: false, message: "Tag creado correctamente."});
                    setNewTag(TAG_DATA_INITIAL_STATE);
                } catch (error) {
                    setAlert({visible: true, isError: true, message: error.message});
                }
            }
            setIsLoading(false);
        }

        createTag();
    }, [validations]);

    return(
        <Container width={"25"} position={"position-relative"}>
            {isLoading && <Spinner/>}
            <p className={"fs-3 fw-bold"}> Crear nuevo tag </p>
            <form className={"h-100"}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={newTag?.name}
                           onChange={e => handleTagChange(e.target.value)}/>
                    {
                        notNullNotEmptyString(validations?.name?.message) &&
                        <div className={`alert mt-2 alert-danger`}>
                            {validations?.name?.message}
                        </div>
                    }
                    {
                        alert?.visible && alert?.isError === false &&
                        <div className={`alert mt-2 alert-success`}>
                            {alert?.message}
                        </div>
                    }
                </div>
            </form>
            <div className={"d-flex justify-content-end w-100"}>
                <button className="btn btn-dark fw-bold" onClick={() => handleNewTag()}>Guardar</button>
            </div>
        </Container>
    )
}