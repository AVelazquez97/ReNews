<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *      schema="CommentInput",
 *      required={"body", "postId", "ownerId", "date"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The comment's id"
 *      ),
 *      @OA\Property(
 *          property="body",
 *          type="string",
 *          description="The comment's body"
 *      ),
 *      @OA\Property(
 *          property="postId",
 *          type="integer",
 *          description="The id of the post the comment is associated with"
 *      ),
 *      @OA\Property(
 *          property="ownerId",
 *          type="integer",
 *          description="The id of the user who made the comment"
 *      ),
 *      @OA\Property(
 *          property="date",
 *          type="string",
 *          format="date-time",
 *          description="The date the comment was created"
 *      )
 * )
 *
 * @OA\Schema(
 *      schema="CommentOutput",
 *      required={"id", "body", "postId", "date"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The comment's id"
 *      ),
 *      @OA\Property(
 *          property="body",
 *          type="string",
 *          description="The comment's body"
 *      ),
 *      @OA\Property(
 *          property="postId",
 *          type="integer",
 *          description="The id of the post the comment is associated with"
 *      ),
 *      @OA\Property(
 *          property="owner",
 *          type="object",
 *          description="The user who made the comment",
 *          @OA\Property(
 *              property="id",
 *              type="integer",
 *              description="The user's id"
 *          ),
 *          @OA\Property(
 *              property="username",
 *              type="string",
 *              description="The user's username"
 *          )
 *      ),
 *      @OA\Property(
 *          property="date",
 *          type="string",
 *          format="date-time",
 *          description="The date the comment was created"
 *      )
 * )
 */
class CommentModel extends Model {
    protected $table = 'comments';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['date', 'body', 'postId', 'ownerId'];

    public function getPost($commentId) {
        $postModel = new PostModel();
        $comment = $this->find($commentId);
        return $postModel->find($comment['postId']);
    }


    public function getOwner($commentId) {
        $comment = $this->find($commentId);
        $userModel = new UserModel();
        $owner = $userModel->find($comment['ownerId']);
        return ['id' => intval($owner['id']), 'username' => $owner['username']];
    }
}