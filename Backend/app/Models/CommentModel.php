<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

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
        return $userModel->find($comment['ownerId']);
    }
}