<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *      schema="PostInput",
 *      required={"ownerId", "title", "body", "date"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The post's id"
 *      ),
 *      @OA\Property(
 *          property="ownerId",
 *          type="integer",
 *          description="The id of the user who owns the post"
 *      ),
 *      @OA\Property(
 *          property="title",
 *          type="string",
 *          description="The post's title"
 *      ),
 *      @OA\Property(
 *          property="body",
 *          type="string",
 *          description="The post's body"
 *      ),
 *      @OA\Property(
 *          property="date",
 *          type="string",
 *          format="date-time",
 *          description="The date the post was created"
 *      ),
 *      @OA\Property(
 *          property="tags",
 *          type="array",
 *          description="The tags associated with the post",
 *          @OA\Items(
 *              type="integer",
 *              description="The tag's id"
 *          )
 *      )
 * )
 *
 * @OA\Schema(
 *      schema="PostOutput",
 *      required={"id", "ownerId", "title", "body", "date"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The post's id"
 *      ),
 *      @OA\Property(
 *          property="owner",
 *          type="object",
 *          description="The user who owns the post",
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
 *          property="title",
 *          type="string",
 *          description="The post's title"
 *      ),
 *      @OA\Property(
 *          property="body",
 *          type="string",
 *          description="The post's body"
 *      ),
 *      @OA\Property(
 *          property="date",
 *          type="string",
 *          format="date-time",
 *          description="The date the post was created"
 *      ),
 *      @OA\Property(
 *          property="likes",
 *          type="integer",
 *          description="The number of likes the post has received"
 *      ),
 *      @OA\Property(
 *          property="isPending",
 *          type="boolean",
 *          description="Whether the post is pending approval"
 *      ),
 *      @OA\Property(
 *          property="tags",
 *          type="array",
 *          description="The tags associated with the post",
 *          @OA\Items(ref="#/components/schemas/TagOutput")
 *      ),
 *      @OA\Property(
 *          property="comments",
 *          type="array",
 *          description="The comments on the post",
 *          @OA\Items(ref="#/components/schemas/CommentOutput")
 *      )
 * )
 *
 * @OA\Schema(
 *      schema="PostOutputWithoutComments",
 *      required={"id", "ownerId", "title", "body", "date"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The post's id"
 *      ),
 *      @OA\Property(
 *          property="owner",
 *          type="object",
 *          description="The user who owns the post",
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
 *          property="title",
 *          type="string",
 *          description="The post's title"
 *      ),
 *      @OA\Property(
 *          property="body",
 *          type="string",
 *          description="The post's body"
 *      ),
 *      @OA\Property(
 *          property="date",
 *          type="string",
 *          format="date-time",
 *          description="The date the post was created"
 *      ),
 *      @OA\Property(
 *          property="likes",
 *          type="integer",
 *          description="The number of likes the post has received"
 *      ),
 *      @OA\Property(
 *          property="isPending",
 *          type="boolean",
 *          description="Whether the post is pending approval"
 *      ),
 *      @OA\Property(
 *          property="tags",
 *          type="array",
 *          description="The tags associated with the post",
 *          @OA\Items(ref="#/components/schemas/TagOutput")
 *      )
 * )
 */
class PostModel extends Model {
    protected $table = 'posts';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['title', 'body', 'date', 'likes', 'ownerId', 'isPending'];

    public function doesPostExist($title): bool {
    $post = $this->where('title', $title)->first();
    return $post !== null;
}

    public function getPendingPosts() {
        return $this->where('isPending', true)->findAll();
    }

    public function approvePost($id) {
        return $this->update($id, ['isPending' => false]);
    }

    public function getComments($postId) {
        $commentModel = new CommentModel();
        return $commentModel->where('postId', $postId)->findAll();
    }

    public function getOwner($postId) {
        $post = $this->find($postId);
        $userModel = new UserModel();
        $owner = $userModel->find($post['ownerId']);
        return ['id' => intval($owner['id']), 'username' => $owner['username']];
    }

    public function getTags($postId) {
        $postTagModel = new PostTagModel();
        $tagModel = new TagModel();

        $postTags = $postTagModel->where('postId', $postId)->findAll();
        $tags = [];
        foreach ($postTags as $postTag) {
            $tags[] = $tagModel->find($postTag['tagId']);
        }
        return $tags;
    }
}
