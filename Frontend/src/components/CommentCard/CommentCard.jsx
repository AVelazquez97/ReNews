import {isAdmin} from "../../utils.js";

export default function CommentCard({owner, commentary, date}){
    return(
        <div className={"card p-2 w-100 d-flex flex-row align-items-start justify-content-between"}>

            <div>
                <div className={"d-flex flex-row justify-content-start align-items-center"}>
                    <img width={25} height={25} alt={"avatar"} src={"./default-profile-picture.jpg"}
                         className={"rounded-circle m-2"}/>
                    <h5 className={"fw-semibold"}>{owner}</h5>
                </div>
                <h5 className={"fs-6"}>{date}</h5>
                <p>{commentary}</p>
            </div>
            {isAdmin() &&
                <div className={"d-flex flex-column justify-content-center gap-2"}>
                    <button className={"btn btn-danger fw-bold w-100"}>Eliminar</button>
                </div>
            }
        </div>
    )
}