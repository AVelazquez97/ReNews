<?php

namespace App\Models;

use CodeIgniter\Model;

class UserLikeModel extends Model {
    protected $table = 'user_likes';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['userId', 'postId'];
}
