import Container from "../../components/Container/Container.jsx";
import {useEffect, useState} from "react";
import {FEED_GET_POSTS_PLACEHOLDER_RESPONSE} from "../../placeholderResponses.js";
import PostCard from "../../components/PostCard/PostCard.jsx";
import NewPostModal from "../../components/Modals/NewPostModal.jsx";
import {notNullNotEmptyString, validateFeedSearch} from "../../utils.js";
import {VALIDATION_FEED_FORM_INITIAL_STATE} from "../../const.js";

export default function Feed({}) {
    const [search, setSearch] = useState("");
    const [posts, setPosts ] = useState([]);
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    const [validations,setValidations] = useState(VALIDATION_FEED_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState({visible: false, isError: false, message: ""});

    useEffect(() => {
        getPosts(search);
    }, []);

    useEffect(() => {
        if(validations?.search?.message === ""){
            console.log("[PLACEHOLDER] Searching posts with query: ", search);
            //postController.search(search);
        }
    }, [validations]);

    function getPosts(search) {
        setPosts(JSON.parse(JSON.stringify(FEED_GET_POSTS_PLACEHOLDER_RESPONSE.posts)));
    }

    function handleCloseNewPostModal() {
        setIsNewPostModalOpen(false);
    }

    function handleSearch() {
        validateFeedSearch(search, setValidations);
    }
    return (
        <div className={"flex-grow-1 d-flex flex-column align-items-center h-100 w-100 bg-white pageContent overflow-y-scroll"}>
        {isNewPostModalOpen && <NewPostModal onClose={handleCloseNewPostModal} isOpen={isNewPostModalOpen}/>}
            <div className={"w-75 d-flex flex-row justify-content-between p-2 gap-2"}>
                <input type="text" placeholder={"Buscar un post"} class="form-control w-75"
                       onChange={e => setSearch(e.target.value)}/>
                <div className={"d-flex flex-row gap-2"}>
                    <button className={"btn btn-dark h-auto fw-bold"} onClick={() => handleSearch()}>Buscar</button>
                    <button className={"btn btn-dark fw-bold"} onClick={() => setIsNewPostModalOpen(true)}>Nuevo post</button>
                </div>
            </div>
            {
                notNullNotEmptyString(validations?.search?.message) &&
                <div className={`alert mt-2 alert-danger`}>
                    {validations?.search?.message}
                </div>
            }
            <Container width={"75"} justifyContent={"start"} gap={"2"}>
                {posts.map(post => {
                    return (
                        <PostCard key={posts?.id} post={post}
                                  width={"100"}/>
                    )
                })}
            </Container>
        </div>
    )
}