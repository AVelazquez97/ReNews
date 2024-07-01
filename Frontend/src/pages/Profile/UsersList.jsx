import SkeletonUserCard from "../../components/Card/SkeletonUserCard.jsx";
import UserCard from "../../components/Card/UserCard.jsx";
import Container from "../../components/Container/Container.jsx";
import {useEffect, useState} from "react";
import {ALERT_INITIAL_STATE} from "../../const.js";
import {isAdmin} from "../../utils.js";
import * as usersController from "../../controllers/usersController.js";

export default function UsersList(){
    const [users, setUsers] = useState(null);
    const [userAlert,setUserAlert] = useState({ALERT_INITIAL_STATE});

    /* fetch the users */
    useEffect(() => {
        const getUsers = async () => {
            if(isAdmin()){
                try {
                    let data = await usersController.getUsers();
                    setUsers(data);
                } catch (error) {
                    setUserAlert({visible: true, isError: true, message: "Error al obtener los usuarios."});
                }
            }
        }

        getUsers();
    }, []);

    return (
        <Container justifyContent={"start"} gap={"2"} width={"100"}>
            {
                userAlert?.visible && userAlert?.isError === false &&
                <div className={`alert mt-2 alert-success`}>
                    {userAlert?.message}
                </div>
            }
            {users === null ?
                <>
                    <SkeletonUserCard/>
                    <SkeletonUserCard/>
                    <SkeletonUserCard/>
                </>
                :
                users?.map(user => {
                    return (
                        <UserCard key={user.id} user={user}/>
                    )
                })
            }
        </Container>
    )
}