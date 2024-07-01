<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UserInput",
 *     required={"email", "password", "name", "lastname", "username"},
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
 *
 * @OA\Schema(
 *      schema="UserUpdateInput",
 *      required={"name", "lastname", "username"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The user's id"
 *      ),
 *      @OA\Property(
 *          property="name",
 *          type="string",
 *          description="The user's name"
 *      ),
 *      @OA\Property(
 *          property="lastname",
 *          type="string",
 *          description="The user's lastname"
 *      ),
 *      @OA\Property(
 *          property="username",
 *          type="string",
 *          description="The user's username"
 *      ),
 *      @OA\Property(
 *          property="profileImage",
 *          type="string",
 *          description="The user's profile image"
 *      )
 * )
 *
 * @OA\Schema(
 *      schema="UserAdminOutput",
 *      required={"id", "username", "email", "isAdmin"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="The user's id"
 *      ),
 *      @OA\Property(
 *          property="username",
 *          type="string",
 *          description="The user's username"
 *      ),
 *      @OA\Property(
 *          property="email",
 *          type="string",
 *          description="The user's email"
 *      ),
 *      @OA\Property(
 *          property="isAdmin",
 *          type="boolean",
 *          description="Whether the user is an admin"
 *      )
 *  )
 */
class UserModel extends Model {
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['email', 'password', 'name', 'lastname', 'username', 'profileImage', 'isAdmin'];

    public function makeAdmin($id) {
        return $this->update($id, ['isAdmin' => 1]);
    }

    public function doesUserExist($username, $email): bool {
        $user = $this->where('username', $username)->orWhere('email', $email)->first();
        return $user !== null;
    }

    public function findUser($id) {
        return $this->find($id);
    }

    public function getUserByEmail($email) {
        return $this->where('email', $email)->first();
    }

    public function getUserByUsername($username) {
        return $this->where('username', $username)->first();
    }

    public function getUserByUsernameOrEmail($usernameOrEmail) {
        return $this->where('username', $usernameOrEmail)->orWhere('email', $usernameOrEmail)->first();
    }

    public function hashPassword($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }

    public function generateRandomPassword() {
        return bin2hex(random_bytes(5));
    }

    public function getUserName($userId) {
        $user = $this->find($userId);
        return $user['username'];
    }

    public function getPosts($userId) {
        $postModel = new PostModel();
        return $postModel->where('ownerId', $userId)->findAll();
    }

    public function getComments($userId) {
        $commentModel = new CommentModel();
        return $commentModel->where('ownerId', $userId)->findAll();
    }

    public function getLikedPosts($userId) {
        $userLikeModel = new UserLikeModel();
        $postModel = new PostModel();

        $userLikes = $userLikeModel->where('userId', $userId)->findAll();
        $posts = [];
        foreach ($userLikes as $userLike) {
            $posts[] = $postModel->find($userLike['postId']);
        }
        return $posts;
    }
}