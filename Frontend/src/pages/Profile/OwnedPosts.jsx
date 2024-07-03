import PostCard from "../../components/PostCard/PostCard.jsx";
import Container from "../../components/Container/Container.jsx";
import React, {useEffect, useState} from "react";
import {ALERT_INITIAL_STATE, SPA_PATH} from "../../const.js";
import * as postsController from "../../controllers/postsController.js";
import {userId} from "../../utils.js";
import SkeletonPostCard from "../../components/PostCard/SkeletonPostCard.jsx";
import {FEED_GET_POSTS_PLACEHOLDER_RESPONSE} from "../../placeholderResponses.js";

export default function OwnedPosts({setSpaPath}){
    const [ownedPosts, setOwnedPosts] = useState(null);
    const [alert,setAlert] = useState({ALERT_INITIAL_STATE});

    function handleRedirect(){
        setSpaPath(SPA_PATH.FEED);
    }

    /* fetch the posts owned by the user */
    useEffect(() => {
        const getOwnedPosts = async () => {
            try{
                const posts = await postsController.getOwnedPosts(userId());
                setOwnedPosts(posts);
            } catch (error) {
                setAlert({visible: true, isError: true, message: "Error al obtener los posts. Intente de nuevo."});
            }
        }

        getOwnedPosts();
    }, []);

    return(
        ownedPosts === null ?
            <Container justifyContent={"start"} gap={"2"} width={"100"}>
                <SkeletonPostCard/>
                <SkeletonPostCard/>
                <SkeletonPostCard/>
            </Container>
        :
            <Container justifyContent={"start"} gap={"2"} width={"100"}>
                {
                    alert?.visible && alert?.isError === false &&
                    <div className={`alert mt-2 alert-success`}>
                        {alert?.message}
                    </div>
                }
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
    )
}