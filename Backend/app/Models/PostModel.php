<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

class PostModel extends Model {
    protected $table = 'posts';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['title', 'body', 'date', 'likes', 'ownerId'];

    public function getComments($postId) {
        $commentModel = new CommentModel();
        return $commentModel->where('postId', $postId)->findAll();
    }

    public function getOwner($postId) {
        $post = $this->find($postId);
        $userModel = new UserModel();
        return $userModel->find($post['ownerId']);
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
