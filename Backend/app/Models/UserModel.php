<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UserInput",
 *     required={"email", "password", "name", "lastname", "username", "isAdmin"},
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
 *         property="password",
 *         type="string",
 *         description="The user's password"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The user's name"
 *     ),
 *     @OA\Property(
 *         property="lastname",
 *         type="string",
 *         description="The user's lastname"
 *     ),
 *     @OA\Property(
 *         property="username",
 *         type="string",
 *         description="The user's username"
 *     ),
 *     @OA\Property(
 *         property="profileImage",
 *         type="string",
 *         description="The user's profile image"
 *     ),
 *     @OA\Property(
 *         property="isAdmin",
 *         type="boolean",
 *         description="Whether the user is an admin"
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="UserOutput",
 *     required={"email", "name", "lastname", "username", "isAdmin"},
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
 *         property="name",
 *         type="string",
 *         description="The user's name"
 *     ),
 *     @OA\Property(
 *         property="lastname",
 *         type="string",
 *         description="The user's lastname"
 *     ),
 *     @OA\Property(
 *         property="username",
 *         type="string",
 *         description="The user's username"
 *     ),
 *     @OA\Property(
 *         property="profileImage",
 *         type="string",
 *         description="The user's profile image"
 *     ),
 *     @OA\Property(
 *         property="isAdmin",
 *         type="boolean",
 *         description="Whether the user is an admin"
 *     )
 * )
 */
class UserModel extends Model {
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $allowedFields = ['email', 'password', 'name', 'lastname', 'username', 'profileImage', 'isAdmin'];

    public function doesUserExist($username, $email) {
        $user = $this->where('username', $username)->orWhere('email', $email)->first();
        return $user !== null;
    }

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