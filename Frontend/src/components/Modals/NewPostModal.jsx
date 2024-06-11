import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {FEED_GET_TAGS_PLACEHOLDER_RESPONSE} from "../../placeholderResponses.js";
import {useState} from "react";
import {POST_DATA_INITIAL_STATE} from "../../const.js";
export default function NewPostModal({onClose}){
    const [postData, setPostData] = useState(POST_DATA_INITIAL_STATE);
    const [selectedTags, setSelectedTags] = useState([]);

    function updatePostData(value, key){
        setPostData({...postData, [key]: value});
    }

    function handleTagSelection(event) {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => ({value: option.value, name: option.textContent}));
        setSelectedTags(selectedOptions);
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>Nuevo post</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"d-flex flex-column justify-content-center align-items-center"}>
                <form className={"text-start w-100"}>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="email" className="form-control"
                               onChange={e => updatePostData(e.target.value, "title")}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Descripción</label>
                        <textarea type="text" className="form-control"
                                  onChange={e => updatePostData(e.target.value, "body")}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Categoria(s)</label>
                        <select className="form-select" multiple={true} onChange={handleTagSelection}>
                            {FEED_GET_TAGS_PLACEHOLDER_RESPONSE.tags.map(tag => (
                                <option key={tag.id} value={tag.id}
                                selected={postData?.tags?.findIndex(selectedTags => selectedTags.id === tag.id) > -1}>
                                    {tag.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"btn btn-dark fw-bold"} onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}