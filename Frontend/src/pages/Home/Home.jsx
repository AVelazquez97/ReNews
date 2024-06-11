import Card from "../../components/Card/Card.jsx";
import { TEXT_PROPS, IMG_PROPS } from "../../const.js";
import { HOME_GET_TRENDING_POSTS_PLACEHOLDER_RESPONSE } from "../../placeholderResponses.js";
import ImageCard from "../../components/ImageCard/ImageCard.jsx";
import PostCard from "../../components/PostCard/PostCard.jsx";
import {useEffect, useState} from "react";
import PostModal from "../../components/Modals/PostModal.jsx";

export default function Home({}){
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setTrendingPosts(JSON.parse(JSON.stringify(HOME_GET_TRENDING_POSTS_PLACEHOLDER_RESPONSE.posts)));
    }, []);

    function handlePostClick(post) {
        setSelectedPost(post);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setSelectedPost(null);
    }

    return (
        <div className={"flex-grow-1 d-flex flex-column h-100 bg-white pageContent overflow-y-scroll"}>
            { selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} isOpen={isModalOpen}/>}
            <div className="container text-center p-2">
                <div className="row d-flex flex-wrap flex-column justify-content-center align-items-center">
                    <div className="col mt-2">
                        <Card title={TEXT_PROPS.home_card_title_1} description={TEXT_PROPS.home_card_description_1}
                              imgPath={IMG_PROPS.home_card_img_1} textAlign={"center"}/>
                    </div>
                    <div className="col mt-2">
                        <Card title={TEXT_PROPS.home_card_title_2} description={TEXT_PROPS.home_card_description_2}
                              imgPath={IMG_PROPS.home_card_img_2} textAlign={"center"}/>
                    </div>
                    <div className="col mt-2">
                        <Card title={TEXT_PROPS.home_card_title_3} description={TEXT_PROPS.home_card_description_3}
                              imgPath={IMG_PROPS.home_card_img_3} textAlign={"center"}/>
                    </div>
                </div>
            </div>
            <div className="container text-center p-2">
                <div className="row mb-2">
                    <p className={"fs-5 fw-bold"}> 🚀 Posts en tendencia </p>
                    <div className="row mb-2 gap-2">
                        {trendingPosts.map(post => {
                            return (
                                <PostCard key={post.id} post={post}
                                          width={"100%"} onClick={() => handlePostClick(post)}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="container text-center p-2">
                <div className="row">
                    <p className={"fs-5 fw-bold"}> ¿Qué hay de nuevo en las ultimas actualizaciones? </p>
                    <div className="col mt-2 d-flex justify-content-center">
                        <ImageCard imgPath={IMG_PROPS.release_img} title={TEXT_PROPS.release_card_title_1}
                                   description={TEXT_PROPS.release_card_description_1}/>
                    </div>
                    <div className="col mt-2 d-flex justify-content-center">
                        <ImageCard imgPath={IMG_PROPS.release_img} title={TEXT_PROPS.release_card_title_2}
                                   description={TEXT_PROPS.release_card_description_2}/>
                    </div>
                    <div className="col mt-2 d-flex justify-content-center">
                        <ImageCard imgPath={IMG_PROPS.release_img} title={TEXT_PROPS.release_card_title_3}
                                   description={TEXT_PROPS.release_card_description_3}/>
                    </div>
                </div>
            </div>
        </div>
    )
}