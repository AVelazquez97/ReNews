export default function UserCard({user}){
    return (
        <div className={"card p-2 w-100 d-flex flex-row align-items-center justify-content-between"}>
            <div className={"w-100"}>
                <div className={"d-flex flex-column justify-content-start align-items-center"}>
                    <img width={25} height={25} alt={"avatar"} src={"./default-profile-picture.jpg"}
                         className={"rounded-circle m-2"}/>
                    <h5 className={"fw-semibold"}>{user?.username}</h5>

                    <div className={"d-flex flex-column w-100 align-items-start"}>
                        <p className={"fw-medium"}>Email: {user?.email}</p>
                        <p className={"fw-medium"}>Nombre: {user?.name}</p>
                        <p className={"fw-medium"}>Apellido: {user?.lastname}</p>
                        {/*<p className={"fw-medium"}>Post hechos: {user?.postsAmount}</p>
                        <p className={"fw-medium"}>Comentarios hechos: {user?.commentsAmount}</p>
                        <p className={"fw-medium"}>Likes obtenidos: {user?.likesAmount}</p>*/}
                    </div>

                    <div className={"d-flex flex-row justify-content-center gap-2 w-100"}>
                        <button className={"btn btn-danger fw-bold w-100"}>Eliminar usuario</button>
                        <button className={"btn btn-primary fw-bold w-100"}>Convertir en admin</button>
                    </div>

                </div>
            </div>
        </div>
    )
}