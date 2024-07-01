<?php

namespace App\Models;

use CodeIgniter\Model;

class PostTagModel extends Model {
    protected $table = 'post_tags';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['postId', 'tagId'];
}
