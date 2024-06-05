import Card from "../../components/Card/Card.jsx";
import { PLACEHOLDER_TEXT_PROPS, TEXT_PROPS, IMG_PROPS } from "../../const.js";
import ImageCard from "../../components/ImageCard/ImageCard.jsx";

export default function Home({}){
    return (
        <div className={"flex-grow-1 d-flex flex-column h-100 bg-white pageContent overflow-y-scroll"}>
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
                    <p className={"fs-5 fw-bold"}> Post en tendencia </p>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description} width={"100%"}/>
                    </div>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description} width={"100%"}/>
                    </div>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description} width={"100%"}/>
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