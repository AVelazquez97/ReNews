import {
    ALERT_INITIAL_STATE,
    PROFILE_DATA_INITIAL_STATE,
    SPA_PATH,
    TAG_DATA_INITIAL_STATE,
    VALIDATION_NEW_TAG_FORM_INITIAL_STATE
} from "../../const.js";
import {useEffect, useState} from "react";
import Container from "../../components/Container/Container.jsx";
import {isAdmin, notNullNotEmptyString, userId, validateNewTagForm} from "../../utils.js";
import PostCard from "../../components/PostCard/PostCard.jsx";
import {
    FEED_GET_POSTS_PLACEHOLDER_RESPONSE,
} from "../../placeholderResponses.js";
import UserCard from "../../components/Card/UserCard.jsx";
import * as usersController from "../../controllers/usersController.js";
import SkeletonUserCard from "../../components/Card/SkeletonUserCard.jsx";
import SkeletonPostCard from "../../components/PostCard/SkeletonPostCard.jsx";
import SkeletonProfileInfo from "../../components/Skeletons/SkeletonProfileInfo.jsx";
import NewTag from "./NewTag.jsx";
import ProfileInfo from "./ProfileInfo.jsx";

export default function Profile({setSpaPath}){
    const [profileData, setProfileData] = useState(null);
    const [ownedPosts, setOwnedPosts] = useState([]);
    const [users, setUsers] = useState(null);
    const [userAlert,setUserAlert] = useState({ALERT_INITIAL_STATE});

    function handleRedirect(){
        setSpaPath(SPA_PATH.FEED);
    }

    useEffect(() => {
        //postsController.getOwnedPost(userId);
        setOwnedPosts(JSON.parse(JSON.stringify(FEED_GET_POSTS_PLACEHOLDER_RESPONSE.posts)));
    }, []);

    /* fetch the users */
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

    return (
        <div className={"flex-grow-1 d-flex flex-column w-100 h-100 align-items-center pageContent overflow-y-scroll"}>
            <div className={"d-flex flex-row w-100"}>
                <ProfileInfo/>
                {isAdmin() &&
                    <NewTag/>
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
                        {users === null ?
                            <>
                                <SkeletonUserCard/>
                                <SkeletonUserCard/>
                                <SkeletonUserCard/>
                            </>
                            :
                            users?.map(user => {
                                return (
                                    <UserCard key={user.id} user={user}/>
                                )
                            })
                        }
                    </Container>
                }
            </div>
        </div>
    )
}