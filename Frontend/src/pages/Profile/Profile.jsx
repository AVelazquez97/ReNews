import {
    ALERT_INITIAL_STATE,
    PROFILE_DATA_INITIAL_STATE,
    SPA_PATH,
    TAG_DATA_INITIAL_STATE,
    VALIDATION_NEW_TAG_FORM_INITIAL_STATE
} from "../../const.js";
import {useEffect, useState} from "react";
import Container from "../../components/Container/Container.jsx";
import {isAdmin, notNullNotEmptyString, validateNewTagForm} from "../../utils.js";
import PostCard from "../../components/PostCard/PostCard.jsx";
import {
    FEED_GET_POSTS_PLACEHOLDER_RESPONSE,
} from "../../placeholderResponses.js";
import UserCard from "../../components/Card/UserCard.jsx";
import * as usersController from "../../controllers/usersController.js";
import SkeletonUserCard from "../../components/Card/SkeletonUserCard.jsx";

export default function Profile({setSpaPath}){
    const [profileData, setProfileData] = useState(PROFILE_DATA_INITIAL_STATE);
    const [tagName, setTagName] = useState(TAG_DATA_INITIAL_STATE);
    const [ownedPosts, setOwnedPosts] = useState([]);
    const [users, setUsers] = useState(null);
    const [userAlert,setUserAlert] = useState({ALERT_INITIAL_STATE});
    const [tagValidations,setTagValidations] = useState(VALIDATION_NEW_TAG_FORM_INITIAL_STATE);
    const [tagAlert,setTagAlert] = useState({ALERT_INITIAL_STATE});

    useEffect(() => {
        if (tagValidations?.name?.message !== ""){
            console.log("[PLACEHOLDER] Validation failed, please check the form for errors.");
            setTagAlert(ALERT_INITIAL_STATE);
        } else {
            console.log("[PLACEHOLDER] Creating tag: ", tagName);
            //tagController.createTag(tagData);
            setTagAlert({visible: true, isError: false, message: "Tag creado correctamente."});
            setTagName(TAG_DATA_INITIAL_STATE);
        }
    }, [tagValidations]);

    useEffect(() => {
        const getUsers = async () => {
            if(isAdmin()){
                try {
                    let data = await usersController.getUsers();
                    setUsers(data);
                } catch (error) {
                    setUserAlert({visible: true, isError: true, message: "Error al obtener los usuarios."});
                }
            }
        }

        getUsers();
    }, []);

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

    function handleRedirect(){
        setSpaPath(SPA_PATH.FEED);
    }

    useEffect(() => {
        //postsController.getOwnedPost(userId);
        setOwnedPosts(JSON.parse(JSON.stringify(FEED_GET_POSTS_PLACEHOLDER_RESPONSE.posts)));
    }, []);

    function handleNewTag(){
        validateNewTagForm(tagName, setTagValidations);
    }

    function handleTagChange(value){
        setTagName({name: value});
    }

    return (
        <div className={"flex-grow-1 d-flex flex-column w-100 h-100 align-items-center pageContent overflow-y-scroll"}>
            <div className={"d-flex flex-row w-100"}>
                <Container alignItems={"start"} width={"100"}>
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
                    <div className={"d-flex justify-content-end w-100"}>
                        <button className="btn btn-dark fw-bold">Guardar</button>
                    </div>
                </Container>
                {isAdmin() &&
                    <Container width={"25"}>
                        <p className={"fs-3 fw-bold"}> Crear nuevo tag </p>
                        <form className={"h-100"}>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" value={tagName?.name}
                                       onChange={e => handleTagChange(e.target.value)}/>
                                {
                                    notNullNotEmptyString(tagValidations?.name?.message) &&
                                    <div className={`alert mt-2 alert-danger`}>
                                        {tagValidations?.name?.message}
                                    </div>
                                }
                                {
                                    tagAlert?.visible && tagAlert?.isError === false &&
                                    <div className={`alert mt-2 alert-success`}>
                                        {tagAlert?.message}
                                    </div>
                                }
                            </div>
                        </form>
                        <div className={"d-flex justify-content-end w-100"}>
                            <button className="btn btn-dark fw-bold" onClick={() => handleNewTag()}>Guardar</button>
                        </div>
                    </Container>
                }
            </div>
            <div className={"d-flex flex-row w-100"}>
                <Container justifyContent={"start"} gap={"2"} width={"100"}>
                    {ownedPosts.length === 0 &&
                        <>
                        <p className={"fs-3 fw-bold"}> Aún no has creado posts, viaja a tu feed para obtener algo de inspiración! </p>
                            <button className={"btn btn-primary fw-bold"} onClick={() => handleRedirect()}>Ir al Feed</button>
                        </>
                    }
                    {ownedPosts.map(post => {
                        return (
                            <PostCard key={post?.id} post={post}
                                      width={"100"}/>
                        )
                    })}
                </Container>
                {isAdmin() &&
                    <Container justifyContent={"start"} gap={"2"} width={"100"}>
                        {
                            userAlert?.visible && userAlert?.isError === false &&
                            <div className={`alert mt-2 alert-success`}>
                                {userAlert?.message}
                            </div>
                        }
                        {users === null &&
                            <>
                                <SkeletonUserCard/>
                                <SkeletonUserCard/>
                                <SkeletonUserCard/>
                            </>
                        }
                        {users?.map(user => {
                            return (
                                <UserCard key={user.id} user={user}/>
                            )
                        })}
                    </Container>
                }
            </div>
        </div>
    )
}