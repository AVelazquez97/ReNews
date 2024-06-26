<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="User",
 *     required={"email", "nickname", "password", "is_admin"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="The user's id"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         description="The user's email"
 *     ),
 *     @OA\Property(
 *         property="nickname",
 *         type="string",
 *         description="The user's nickname"
 *     ),
 *     @OA\Property(
 *         property="password",
 *         type="string",
 *         description="The user's password"
 *     ),
 *     @OA\Property(
 *         property="is_admin",
 *         type="boolean",
 *         description="Whether the user is an admin"
 *     )
 * )
 */
class UserModel extends Model {
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $allowedFields = ['email', 'nickname', 'password', 'is_admin'];

    public function getUserByEmail($email) {
        return $this->where('email', $email)->first();
    }

    public function getUserById($id) {
        return $this->where('id', $id)->first();
    }

    public function getUserByEmailAndPassword($email, $password) {
        return $this->where('email', $email)->where('password', $password)->first();
    }

    public function getUserByEmailAndNickname($email, $nickname) {
        return $this->where('email', $email)->where('nickname', $nickname)->first();
    }

//    // One-to-many relationship with Comment
//    public function getComments()
//    {
//        return $this->hasMany('Comment', 'userID');
//    }
//
//    // One-to-many relationship with Post
//    public function getPosts()
//    {
//        return $this->hasMany('Post', 'userID);
//    }
}