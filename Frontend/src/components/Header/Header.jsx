import {SPA_PATH} from '../../const.js'
import {isAdmin, userName} from "../../utils.js";
export default function Header({spaPath, setSpaPath}){

    function setRoute(path){
        setSpaPath(path);
    }

    return(
        <header className={"bg-dark d-flex align-items-center justify-content-between p-2"}>
            <img src={"./logo.svg"} alt={"ReNews logo"}/>
                <div className="d-flex flex-row flex-wrap gap-2">
                    {spaPath !== SPA_PATH.LOGIN &&
                        <>
                            <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.HOME)}>Inicio</btn>
                            <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.FEED)}>Feed</btn>
                            { isAdmin() && <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.PENDING)}>Pendientes</btn>}
                            <btn className="btn btn-dark fw-bold" onClick={() => setRoute(SPA_PATH.PROFILE)}>{userName()}</btn>
                            <btn className="btn btn-danger fw-bold" onClick={() => setRoute(SPA_PATH.LOGIN)}>Cerrar sesión</btn>
                        </>
                    }
                </div>
        </header>
    );
}