<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Services\EmailService;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Users",
 *     description="API Endpoints of Users"
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
            $data = $this->userModel->findUser($id);

            if (!$data) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            $data['id'] = intval($data['id']);
            $data['isAdmin'] = filter_var($data['isAdmin'], FILTER_VALIDATE_BOOLEAN);
            unset($data['password']);
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
    public function login(): ResponseInterface  {
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
    public function register(): ResponseInterface {
        try {
            $data = $this->request->getJSON(true);

            // Verifica si los campos están presentes en los datos de la solicitud
            $requiredFields = ['email', 'password', 'name', 'lastname', 'username'];
            $validation = $this->validateFields($data, $requiredFields);
            if ($validation !== true) { return $validation; }

            if ($this->userModel->doesUserExist($data['username'], $data['email'])) {
                return $this->fail('Username or email already exists', 409);
            }

            $data['password'] = $this->userModel->hashPassword($data['password']);
            $data['isAdmin'] = filter_var($data['isAdmin'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;


            // TODO: Handle image upload and save the path in the database
            $insertedId = $this->userModel->insert($data);
            $data['id'] = intval($insertedId);
            $data['isAdmin'] = filter_var($data['isAdmin'], FILTER_VALIDATE_BOOLEAN);
            unset($data['password']);
            return $this->respondCreated($data, 'User Registered');
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
     *          response=400,
     *          description="Invalid user data"
     *      ),
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
    public function forgotPassword(): ResponseInterface  {
        try {
            $email = $this->request->getJSON(true);

            if (!isset($email['email'])) {
                return $this->fail('Field email is required', 400);
            }


            $user = $this->userModel->getUserByEmail($email);

            if (!$user) {
                return $this->failNotFound('No User Found with email ' . $email);
            }

            /*
             * Generating a new hashed password and sending it to the user via email
             */
            $newGeneratedPassword = $this->userModel->generateRandomPassword();
            $hashedPassword = $this->userModel->hashPassword($newGeneratedPassword);
            $this->userModel->update($user['id'], ['password' => $hashedPassword]);
            $emailService = new EmailService();
            $emailService->sendNewPasswordEmail($email, $newGeneratedPassword);

            return $this->respond('New password email sent');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Put(
     *     path="/users/makeAdmin/{id}",
     *     tags={"Users"},
     *     summary="Make a user admin",
     *     @OA\Parameter(ref="#/components/parameters/id"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: User made admin",
     *         @OA\JsonContent(ref="#/components/schemas/UserAdminOutput")
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
    public function makeAdmin($id = null): ResponseInterface {
        try {
            $user = $this->userModel->findUser($id);

            // TODO:
            //  - Verify if the user is already an admin
            //  - Verify if the user that is making the request is an admin

            if (!$user) { return $this->failNotFound('No Data Found with id ' . $id); }

            $this->userModel->makeAdmin($id);
            $response = [
                'id' => intval($user['id']),
                'username' => $user['username'],
                'email' => $user['email'],
                'isAdmin' => true
            ];
            return $this->respond($response, 200,'User made admin');
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
     *         @OA\JsonContent(ref="#/components/schemas/UserUpdateInput")
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
     *          response=409,
     *          description="Username or email already exists"
     *      ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function update($id = null) {
        try {
            $data = $this->request->getJSON(true);
            $user = $this->userModel->findUser($id);
            if (!$user) { return $this->failNotFound('No Data Found with id ' . $id); }

            $requiredFields = ['name', 'username', 'lastname'];
            $validation = $this->validateFields($data, $requiredFields);
            if ($validation !== true) { return $validation; }

            if ($data['username'] !== $user['username'] &&
                $this->userModel->doesUserExist($data['username'], null)) {
                return $this->fail('Username already exists', 409);
            }

            // TODO: Handle image upload and save the path in the database
            $this->userModel->update($id, $data);
            unset($data['password']);
            return $this->respond($data, 200,'Data Updated');
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
            if (!$this->userModel->findUser($id)) {
                return $this->failNotFound('No User Found with id ' . $id);
            }

            $this->userModel->delete($id);
            return $this->respondNoContent();
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    private function validateFields($dataFields, $requiredFields): bool | ResponseInterface {
        foreach ($requiredFields as $field) {
            if (!isset($dataFields[$field])) {
                return $this->fail('Field ' . $field . ' is required', 400);
            }
        }
        return true;
    }
}