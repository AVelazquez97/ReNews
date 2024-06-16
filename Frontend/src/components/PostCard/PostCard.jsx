import styles from "./PostCard.module.css";
import {isAdmin} from "../../utils.js";
import PostModal from "../Modals/PostModal.jsx";
import {useEffect, useState} from "react";
export default function PostCard ({ post, onClick = () => {}, date,
                                  textAlign = "start", height = "auto", width = "auto"}) {

    const dateObj = new Date(post?.date);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalClose() {
        setIsModalOpen(false);
    }

    return (
        <>
            {isModalOpen && <PostModal post={post} onClose={handleModalClose} isOpen={isModalOpen}/>}
            <div className={`card d-flex flex-row w-${width} h-${height} ${styles['postCard-custom']} text-${textAlign}`}
                 onClick={() => setIsModalOpen(true)}>
                <div className="card-body">
                    <div className={"w-100 d-flex flex-row justify-content-between align-items-center"}>
                        <h5 className={"text-dark fw-bold p-0"}>{post?.title}</h5>
                        <p className={"text-dark-emphasis p-0"}>{formattedDate}</p>
                    </div>
                    <div className={"d-flex align-items-center mb-2"}>
                        {post?.tags?.map(tag => (
                            <span key={tag.id} className="badge rounded-pill text-bg-success me-1">{tag.name}</span>
                        ))}
                    </div>
                    <p className="card-text">{`${post?.body.slice(0, 150 - 3)}...`}</p>
                </div>
                {isAdmin() &&
                <div className={"d-flex align-items-center p-2"}>
                    <button className={"btn btn-danger fw-bold"}>Eliminar</button>
                </div>
                }
            </div>
        </>
    )
}