import Container from "../../components/Container/Container.jsx";
import PendingPostCard from "../../components/PostCard/PendingPostCard.jsx";
import {useEffect, useState} from "react";
import * as postsController from "../../controllers/postsController.js";
import SkeletonPostCard from "../../components/PostCard/SkeletonPostCard.jsx";
import {ALERT_INITIAL_STATE} from "../../const.js";

export default function Pending({}) {
    const [pendingPosts, setPendingPosts] = useState(null);
    const [alert, setAlert] = useState({ALERT_INITIAL_STATE});

    /* fetch the pending posts */
    useEffect(() => {
        const getPendingPosts = async () => {
            try{
                const posts = await postsController.getPendingPosts();
                setPendingPosts(posts.reverse());
            } catch (error) {
                setAlert({visible: true, isError: true, message: "Error al obtener los posts pendientes. Intente de nuevo."});
            }
        }

        getPendingPosts();
    }, []);

    return (
        <div className={"flex-grow-1 d-flex flex-column w-100 h-100 align-items-center pageContent overflow-y-scroll"}>
            <div className={"w-100 d-flex justify-content-center p-2"}>
                <Container justifyContent={"start"} gap={"2"} width={"100"}>
                    {pendingPosts === null ?
                        <div className={"d-flex flex-column w-100"}>
                            <SkeletonPostCard/>
                            <SkeletonPostCard/>
                            <SkeletonPostCard/>
                            <SkeletonPostCard/>
                            <SkeletonPostCard/>
                        </div>
                    :
                        <>
                            {
                                alert.visible &&
                                <div className={`alert mt-2 alert-${alert.isError ? "danger" : "success"}`}>
                                    {alert.message}
                                </div>
                            }
                            {pendingPosts.length === 0 &&
                                <p className={"fs-3 fw-bold"}> No hay post pendientes, tomate un descanso! </p>
                            }
                            {pendingPosts.map(post => {
                                return (
                                    <PendingPostCard key={post?.id} post={post}
                                                        width={"100"}/>
                                )
                            })}
                        </>
                    }
                </Container>
            </div>
        </div>
    )
}