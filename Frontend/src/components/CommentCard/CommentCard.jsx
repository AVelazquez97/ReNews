export default function CommentCard({owner, commentary}){
    return(
        <div className={"card p-2 w-100 d-flex flex-row align-items-center"}>
            <div>
                <h5 className={"fw-semibold"}>{owner}</h5>
                <p>{commentary}</p>
            </div>
            <div className={"d-flex flex-column justify-content-center gap-2"}>
                <button className={"btn btn-danger fw-bold w-100"}>Eliminar</button>
                <button className={"btn btn-primary fw-bold w-100"}>Placeholder</button>
            </div>
        </div>
    )
}