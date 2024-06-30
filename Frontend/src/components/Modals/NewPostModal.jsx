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
export default function NewPostModal({onClose}){
    const [postData, setPostData] = useState(POST_DATA_INITIAL_STATE);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState(null);
    const [tagsAlert,setTagsAlert] = useState({ALERT_INITIAL_STATE});

    const [validations,setValidations] = useState(VALIDATION_NEW_POST_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});

    useEffect(() => {
        if(validations?.title?.message !== "" ||
            validations?.body?.message !== "" ||
            validations?.minimumTagLimit?.message !== "" ||
            validations?.maximumTagLimit?.message !== ""){
            console.log("[PLACEHOLDER] Validation failed, please check the form for errors.");
        } else {
            console.log("[PLACEHOLDER] Creating post: ", postData);
            //postController.createPost(postData);
            setAlert({visible: true, isError: false, message: "Post creado correctamente."});
            setPostData(POST_DATA_INITIAL_STATE);
            setSelectedTags([]);
        }
    }, [validations]);

    function updatePostData(value, key){
        setPostData({...postData, [key]: value});
    }

    function handleTagSelection(tag) {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        } else{
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        }
    }

    function handleNewPost(){
        setPostData((prevState) => ({
            ...prevState,
            ownerId: userId(),
            username: userName(),
            tags: selectedTags,
            date: now()
        }));
        validateNewPostForm(postData, selectedTags, setValidations);
    }

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
                            <button className={`btn btn-sm ${selectedTags.includes(tag) ? "btn-success" : "btn-outline-success"}`} key={tag.id}
                                    onClick={() => handleTagSelection(tag)}>
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