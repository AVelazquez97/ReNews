<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\EmailService;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(title="ReNewsAPI", version="1.0.0")
 * @OA\Server(
 *      url="https://api.renews.alexisvelazquez.tech/api",
 *      description="Production Server"
 *  )
 * @OA\Server(
 *     url="http://localhost:8080/api",
 *     description="Development Server"
 * )
 * @OA\Parameter(
 *     parameter="id",
 *     in="path",
 *     name="id",
 *     required=true,
 *     @OA\Schema(
 *         type="integer"
 *     ),
 *     description="The id of the user"
 * )
 */
class Users extends ResourceController {
    use ResponseTrait;

    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    /**
     * @OA\Get(
     *     path="/users",
     *     tags={"Users"},
     *     summary="Get all users",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Retrieved all users",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/UserOutput"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No users found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function index() {
        try {
            $data = $this->userModel->findAll();

            if (empty($data)) {
                return $this->failNotFound('No Users Found');
            }

            foreach ($data as &$user) {
                $user['id'] = intval($user['id']);
                $user['isAdmin'] = filter_var($user['isAdmin'], FILTER_VALIDATE_BOOLEAN);
                unset($user['password']);
            }

            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Get(
     *     path="/users/{id}",
     *     tags={"Users"},
     *     summary="Get a user by id",
     *     @OA\Parameter(ref="#/components/parameters/id"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Retrieved user",
     *         @OA\JsonContent(ref="#/components/schemas/UserOutput")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function show($id = null) {
        try {
            $data = $this->findUser($id);

            if (!$data) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            $data['id'] = intval($data['id']);
            $data['isAdmin'] = filter_var($data['isAdmin'], FILTER_VALIDATE_BOOLEAN);
            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Post(
     *     path="/users/login",
     *     tags={"Users"},
     *     summary="Log in a user",
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             type="object",
     *             required={"usernameOrEmail", "password"},
     *             @OA\Property(
     *                 property="usernameOrEmail",
     *                 type="string",
     *                 description="The user's username or email"
     *             ),
     *             @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 description="The user's password"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: User logged in",
     *         @OA\JsonContent(ref="#/components/schemas/UserOutput")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Invalid Username or Password"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function login() {
        try {
            $data = $this->request->getJSON(true);
            $user = $this->userModel->getUserByUsernameOrEmail($data['usernameOrEmail']);

            if (!$user || !$this->userModel->verifyPassword($data['password'], $user['password'])) {
                return $this->failUnauthorized('Invalid Username or Password');
            }

            unset($user['password']);
            $user['id'] = intval($user['id']);
            $user['isAdmin'] = filter_var($user['isAdmin'], FILTER_VALIDATE_BOOLEAN);
            return $this->respond($user);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Post(
     *     path="/users/register",
     *     tags={"Users"},
     *     summary="Register a user",
     *     @OA\RequestBody(
     *         @OA\JsonContent(ref="#/components/schemas/UserInput")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success: User registered",
     *         @OA\JsonContent(ref="#/components/schemas/UserOutput")
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="Username or email already exists"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function register() {
        try {
            $data = $this->request->getJSON(true);

            if ($this->doesUserExist($data['username'], $data['email'])) {
                return $this->fail('Username or email already exists', 409);
            }

            $data['password'] = $this->userModel->hashPassword($data['password']);
            $data['isAdmin'] = filter_var($data['isAdmin'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

            $insertedId = $this->userModel->insert($data);
            $data['id'] = $insertedId;
            unset($data['password']);
            return $this->respondCreated($data, 'User Created');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Post(
     *     path="/users/forgotPassword",
     *     tags={"Users"},
     *     summary="Forgot password",
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             type="object",
     *             required={"email"},
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 description="The user's email"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: New password email sent"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function forgotPassword() {
        try {
            $email = $this->request->getJSON(true)['email'];
            $user = $this->userModel->getUserByEmail($email);

            if (!$user) {
                return $this->failNotFound('No User Found with email ' . $email);
            }

            /* 1. Genera una contraseña aleatoria
             * 2. La hashea
             * 3. La guarda en la base de datos
            */
            $newGeneratedPassword = bin2hex(random_bytes(5));
            $hashedPassword = $this->userModel->hashPassword($newGeneratedPassword);
            $this->userModel->update($user['id'], ['password' => $hashedPassword]);

            // log_message('info', 'New password generated: ' . $newGeneratedPassword);

            $emailService = new EmailService();
            $emailService->sendNewPasswordEmail($email, $newGeneratedPassword);

            return $this->respond('New password email sent');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Put(
     *     path="/users/{id}",
     *     tags={"Users"},
     *     summary="Update a user",
     *     @OA\Parameter(ref="#/components/parameters/id"),
     *     @OA\RequestBody(
     *         @OA\JsonContent(ref="#/components/schemas/UserInput")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: User updated",
     *         @OA\JsonContent(ref="#/components/schemas/UserOutput")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid user data"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function update($id = null) {
        try {
            $data = $this->request->getJSON(true);

            if (!$this->findUser($id)) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            if (isset($data['password'])) {
                $data['password'] = $this->userModel->hashPassword($data['password']);
            }

            $this->userModel->update($id, $data);
            unset($data['password']);
            return $this->respond($data, 'Data Updated');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Delete(
     *     path="/users/{id}",
     *     tags={"Users"},
     *     summary="Delete a user",
     *     @OA\Parameter(ref="#/components/parameters/id"),
     *     @OA\Response(
     *         response=204,
     *         description="Success: User deleted"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function delete($id = null) {
        try {
            if (!$data = $this->findUser($id)) {
                return $this->failNotFound('No User Found with id ' . $id);
            }

            $this->userModel->delete($id);
            return $this->respondNoContent();
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    private function doesUserExist($username, $email): bool {
        return $this->userModel->doesUserExist($username, $email);
    }

    private function findUser($id) {
        return $this->userModel->findUser($id);
    }
    // login user
}