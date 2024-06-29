import {SPA_PATH} from '../../const.js'
import {isAdmin, userName} from "../../utils.js";
export default function Header({spaPath, setSpaPath}){

    function setRoute(path){
        setSpaPath(path);
    }

    return(
        <header className={"bg-dark d-flex align-items-center justify-content-between p-2"}>
            <img src={"./logo.svg"} alt={"ReNews logo"}/>
                <div className="d-flex flex-row flex-wrap">
                    {spaPath !== SPA_PATH.LOGIN &&
                        <>
                            <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.LOGIN)}>Cerrar sesión</btn>
                            <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.HOME)}>Inicio</btn>
                            <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.FEED)}>Feed</btn>
                            <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.PROFILE)}>{userName()}</btn>
                            { isAdmin() && <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.PENDING)}>Pendientes</btn>}
                            <img width={25} height={25} alt={"avatar"} src={"./default-profile-picture.jpg"}
                                 className={"rounded-circle m-2"}/>
                        </>
                    }
                </div>
        </header>
    );
}