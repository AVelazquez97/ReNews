import {isAdmin} from "../../utils.js";
import NewTag from "./NewTag.jsx";
import ProfileInfo from "./ProfileInfo.jsx";
import OwnedPosts from "./OwnedPosts.jsx";
import UsersList from "./UsersList.jsx";

export default function Profile({setSpaPath}){
    return (
        <div className={"flex-grow-1 d-flex flex-column w-100 h-100 align-items-center pageContent overflow-y-scroll"}>
            <div className={"d-flex flex-row w-100"}>
                <ProfileInfo/>
                {isAdmin() &&
                    <NewTag/>
                }
            </div>
            <div className={"d-flex flex-row w-100"}>
                <OwnedPosts setSpaPath={setSpaPath}/>
                {isAdmin() &&
                    <UsersList/>
                }
            </div>
        </div>
    )
}