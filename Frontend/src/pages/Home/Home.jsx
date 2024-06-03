import Card from "../../components/Card/Card.jsx";
import { PLACEHOLDER_TEXT_PROPS, TEXT_PROPS, IMG_PROPS } from "../../const.js";

export default function Home({}){
    return (
        <div className={"d-flex flex-column h-100 bg-white pageContent"} >
            <div className="container text-center p-2">
                <div className="row">
                    <div className="col">
                        <Card title={TEXT_PROPS.home_card_title_1} description={TEXT_PROPS.home_card_description_1}
                              imgPath={IMG_PROPS.home_card_img_1} textAlign={"center"}/>
                    </div>
                    <div className="col">
                        <Card title={TEXT_PROPS.home_card_title_2} description={TEXT_PROPS.home_card_description_2}
                              imgPath={IMG_PROPS.home_card_img_2} textAlign={"center"}/>
                    </div>
                    <div className="col">
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
                              description={PLACEHOLDER_TEXT_PROPS.card_description}/>
                    </div>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description}/>
                    </div>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description}/>
                    </div>
                </div>
                <div className="row mb-2">
                    <p className={"fs-5 fw-bold"}> ¿Qué hay de nuevo últimas versiones? </p>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description}/>
                    </div>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description}/>
                    </div>
                    <div className="row mb-2">
                        <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                              description={PLACEHOLDER_TEXT_PROPS.card_description}/>
                    </div>
                </div>
            </div>
        </div>
    )
}