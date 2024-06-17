import Container from "../../components/Container/Container.jsx";
import {FEED_GET_POSTS_PLACEHOLDER_RESPONSE} from "../../placeholderResponses.js";
import PendingPostCard from "../../components/PostCard/PendingPostCard.jsx";
import {useEffect, useState} from "react";

export default function Pending({}) {
    const [pendingPosts, setPendingPosts] = useState([]);

    useEffect(() => {
        //postsController.getPendingPosts();
        setPendingPosts(JSON.parse(JSON.stringify(FEED_GET_POSTS_PLACEHOLDER_RESPONSE.posts)));
    }, []);

    return (
        <div className={"flex-grow-1 d-flex flex-column w-100 h-100 align-items-center pageContent overflow-y-scroll"}>
            <div className={"p-1"}>
                <Container justifyContent={"start"} gap={"2"} width={"100"}>
                    {pendingPosts.length === 0 &&
                        <p className={"fs-3 fw-bold"}> No hay post pendientes, tomate un descanso! </p>
                    }
                    {pendingPosts.map(post => {
                        return (
                            <PendingPostCard key={post?.id} post={post}
                                      width={"100"}/>
                        )
                    })}
                </Container>
            </div>
        </div>
    )
}