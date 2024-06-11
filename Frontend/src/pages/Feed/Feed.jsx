import Container from "../../components/Container/Container.jsx";
import {useEffect, useState} from "react";
import {FEED_GET_POSTS_PLACEHOLDER_RESPONSE} from "../../placeholderResponses.js";
import PostCard from "../../components/PostCard/PostCard.jsx";
import PostModal from "../../components/Modals/PostModal.jsx";

export default function Feed({}) {
    const [search, setSearch] = useState("");
    const [posts, setPosts ] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getPosts(search);
    }, []);

    function getPosts(search) {
        setPosts(JSON.parse(JSON.stringify(FEED_GET_POSTS_PLACEHOLDER_RESPONSE.posts)));
    }

    function handlePostClick(post) {
        setSelectedPost(post);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setSelectedPost(null);
    }

    return (
        <div className={"flex-grow-1 d-flex flex-column align-items-center h-100 w-100 bg-white pageContent overflow-y-scroll"}>
        { selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} isOpen={isModalOpen}/>}
            <div className={"w-75 d-flex flex-row justify-content-between p-2 gap-2"}>
                <input type="text" placeholder={"Buscar un post"} class="form-control w-75"
                       onChange={e => setSearch(e.target.value)}/>
                <div className={"d-flex flex-row gap-2"}>
                    <button className={"btn btn-dark h-auto fw-bold"}>Buscar</button>
                    <button className={"btn btn-dark fw-bold"}>Nuevo post</button>
                </div>
            </div>
            <Container width={"75"} justifyContent={"start"} gap={"2"}>
                {posts.map(post => {
                    return (
                        <PostCard key={posts?.id} post={post} onClick={() => handlePostClick(post)}
                                  width={"100"}/>
                    )
                })}
            </Container>
        </div>
    )
}