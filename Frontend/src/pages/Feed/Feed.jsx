import Card from "../../components/Card/Card.jsx";
import {PLACEHOLDER_TEXT_PROPS} from "../../const.js";
import Container from "../../components/Container/Container.jsx";
import {useState} from "react";

export default function Feed({}) {
    const [search, setSearch] = useState("");

    return (
        <div className={"flex-grow-1 d-flex flex-column align-items-center h-100 w-100 bg-white pageContent"}>
            <div className={"w-75 d-flex flex-row justify-content-between p-2 gap-2"}>
                <input type="text" placeholder={"Buscar un post"} class="form-control w-75"
                       onChange={e => setSearch(e.target.value)}/>
                <div className={"d-flex flex-row gap-2"}>
                    <button className={"btn btn-dark h-auto"}>Buscar</button>
                    <button className={"btn btn-dark"}>Nuevo post</button>
                </div>
            </div>
            <Container width={"75"} height={"100"} justifyContent={"start"} gap={"2"}>
                <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                      description={PLACEHOLDER_TEXT_PROPS.card_description} width={"100"}/>
                <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                      description={PLACEHOLDER_TEXT_PROPS.card_description} width={"100"}/>
                <Card isPostCard={true} title={PLACEHOLDER_TEXT_PROPS.card_title}
                      description={PLACEHOLDER_TEXT_PROPS.card_description} width={"100"}/>
            </Container>
        </div>
    )
}