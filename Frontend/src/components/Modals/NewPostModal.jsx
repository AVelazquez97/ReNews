import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {FEED_GET_TAGS_PLACEHOLDER_RESPONSE} from "../../placeholderResponses.js";
import {useEffect, useState} from "react";
import {
    ALERT_INITIAL_STATE,
    POST_DATA_INITIAL_STATE,
    VALIDATION_NEW_POST_FORM_INITIAL_STATE
} from "../../const.js";
import {notNullNotEmptyString, now, userId, userName, validateNewPostForm} from "../../utils.js";
import SkeletonTags from "../Skeletons/SkeletonTags.jsx";
import * as tagsController from "../../controllers/tagsController.js";
import * as postController from "../../controllers/postsController.js";
import Spinner from "../Skeletons/Spinner.jsx";
export default function NewPostModal({onClose}){
    const [postData, setPostData] = useState(POST_DATA_INITIAL_STATE);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState(null);
    const [tagsAlert,setTagsAlert] = useState({ALERT_INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);

    const [validations,setValidations] = useState(VALIDATION_NEW_POST_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});

    function updatePostData(value, key){
        setPostData({...postData, [key]: value});
    }

    function handleTagSelection(tagId) {
        if (!selectedTags.includes(tagId)) {
            setSelectedTags([...selectedTags, tagId]);
        } else{
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tagId));
        }
    }

    function handleNewPost(){
        setPostData((prevState) => ({
            ...prevState,
            ownerId: userId(),
            username: userName(),
            tags: selectedTags,
            date: now(),
            isPending: true,
        }));
        validateNewPostForm(postData, selectedTags, setValidations);
    }

    /* check the validations and try to create the post*/
    useEffect(() => {
        setAlert(ALERT_INITIAL_STATE);
        const createPost = async () => {
            setIsLoading(true);
            const hasValidationErrors = Object.values(validations).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                try {
                    await postController.createPost(postData);
                    setAlert({visible: true, isError: false, message: "Post creado correctamente."});
                    setPostData(POST_DATA_INITIAL_STATE);
                    setSelectedTags([]);
                } catch (error) {
                    setAlert({visible: true, isError: true, message: "Error al crear el post. Intente de nuevo."});
                }
            }
            setIsLoading(false);
        }

        createPost();
    }, [validations]);

    /* fetch the tags */
    useEffect(() => {
        const getTags = async () => {
            try{
                const tags = await tagsController.getTags();
                setTags(tags);
            } catch (error) {
                setTagsAlert({visible: true, isError: true, message: error.message});
            }
        }

        getTags();
    }, []);

    return (
        <Modal show onHide={onClose}>
            {isLoading && <Spinner/>}
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>Nuevo post</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                {alert.visible &&
                    <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                        {alert.message}
                    </div>
                }
                <form className={"text-start w-100"}>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" className="form-control" value={postData?.title}
                               onChange={e => updatePostData(e.target.value, "title")}/>
                        {
                            notNullNotEmptyString(validations?.title?.message) &&
                            <div className={`alert mt-2 alert-danger`}>
                                {validations?.title?.message}
                            </div>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Descripción</label>
                        <textarea type="text" className="form-control" value={postData?.body}
                                  onChange={e => updatePostData(e.target.value, "body")}/>
                        {
                            notNullNotEmptyString(validations?.body?.message) &&
                            <div className={`alert mt-2 alert-danger`}>
                                {validations?.body?.message}
                            </div>
                        }
                    </div>
                </form>
                <div className={"w-100 d-flex flex-row flex-wrap gap-2"}>
                    <label htmlFor="exampleInputPassword1" className="form-label w-100">Categoria(s)</label>
                    {tags === null ?
                        <SkeletonTags/>
                        :
                        tags.map(tag => (
                            <button className={`btn btn-sm ${selectedTags.includes(tag.id) ? "btn-success" : "btn-outline-success"}`} key={tag.id}
                                    onClick={() => handleTagSelection(tag.id)}>
                                {tag.name}
                            </button>
                        ))
                    }
                </div>
                {
                    notNullNotEmptyString(validations?.minimumTagLimit?.message) &&
                    <div className={`alert mt-2 alert-danger`}>
                        {validations?.minimumTagLimit?.message}
                    </div>
                }
                {
                    notNullNotEmptyString(validations?.maximumTagLimit?.message) &&
                    <div className={`alert mt-2 alert-danger`}>
                        {validations?.maximumTagLimit?.message}
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button className={"btn btn-dark fw-bold"} onClick={() => handleNewPost()}>Publicar</Button>
            </Modal.Footer>
        </Modal>
    )
}