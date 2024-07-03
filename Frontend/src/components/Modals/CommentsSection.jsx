import CommentCard from "../CommentCard/CommentCard.jsx";
import Container from "../Container/Container.jsx";
import {post} from "axios";

export default function CommentsSection({postId, comments}){
    return(
        <Container width={"100"} height={"100"} justifyContent={"start"} gap={"2"}>
            <h5 className={"fw-semibold"}>💬 Comentarios</h5>
            {comments.map(comment => {
                const commentDate = new Date(comment.date);
                const formattedCommentDate = `${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()}`;
                return (
                    <CommentCard key={comment.id}
                                 postId={postId}
                                 commentId={comment.id}
                                 owner={comment.ownerId}
                                 body={comment.body}
                                 date={formattedCommentDate}/>
                );
            })}
        </Container>
    )
}