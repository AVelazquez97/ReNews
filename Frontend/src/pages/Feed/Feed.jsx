import Container from "../../components/Container/Container.jsx";
import {useEffect, useState} from "react";
import {FEED_GET_POSTS_PLACEHOLDER_RESPONSE} from "../../placeholderResponses.js";
import PostCard from "../../components/PostCard/PostCard.jsx";
import NewPostModal from "../../components/Modals/NewPostModal.jsx";
import {notNullNotEmptyString, validateFeedSearch} from "../../utils.js";
import {ALERT_INITIAL_STATE, VALIDATION_FEED_FORM_INITIAL_STATE} from "../../const.js";
import * as postsController from "../../controllers/postsController.js";
import Spinner from "../../components/Skeletons/Spinner.jsx";

export default function Feed({}) {
    const [search, setSearch] = useState("");
    const [posts, setPosts ] = useState([]);
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    const [searchValidations,setSearchValidations] = useState(VALIDATION_FEED_FORM_INITIAL_STATE);
    const [alert,setAlert] = useState(ALERT_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);

    function handleCloseNewPostModal() {
        setIsNewPostModalOpen(false);
    }

    function handleSearch() {
        validateFeedSearch(search, setSearchValidations);
    }

    /* check the validations and try to search a post */
    useEffect(() => {
        setAlert(ALERT_INITIAL_STATE);
        const searchPosts = async () => {
            setIsLoading(true);
            const hasValidationErrors = Object.values(searchValidations).some(
                validation => validation?.message !== ""
            );

            if (!hasValidationErrors) {
                try {
                    await postsController.searchPosts(search);
                } catch (error) {
                    setAlert({visible: true, isError: true, message: "Error al buscar los posts. Intente de nuevo."});
                }
            }
            setIsLoading(false);
        }

        searchPosts();
    }, [searchValidations]);

    /* fetch the posts */
    useEffect(() => {
        const getPosts = async () => {
            try{
                setPosts(JSON.parse(JSON.stringify(FEED_GET_POSTS_PLACEHOLDER_RESPONSE.posts)));
                //const posts = await postsController.getPosts();
                //setPosts(posts);
            } catch (error) {
                setAlert({visible: true, isError: true, message: "Error al obtener los posts. Intente de nuevo."});
            }
        }

        getPosts();
    }, []);

    return (
        <div className={"flex-grow-1 d-flex flex-column align-items-center h-100 w-100 bg-white pageContent overflow-y-scroll"}>
            { isLoading ?
                <Spinner/>
                :
                <>
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
                        notNullNotEmptyString(searchValidations?.search?.message) &&
                        <div className={`alert mt-2 alert-danger`}>
                            {searchValidations?.search?.message}
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
                </>
            }
        </div>
    )
}