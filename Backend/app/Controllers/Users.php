<?php

namespace App\Controllers;

use App\Models\UserModel;
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
            $userModel = new UserModel();
            $data = $userModel->findAll();

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
            $userModel = new UserModel();
            $data = $userModel->find($id);

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
     *     path="/users",
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
     *         response=400,
     *         description="Invalid user data or user already exists"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function register() {
        try {
            $userModel = new UserModel();
            $data = $this->request->getJSON(true);

            if ($this->doesUserExist($data['username'], $data['email'])) {
                return $this->fail('Username or email already exists');
            }

            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
            $data['isAdmin'] = filter_var($data['isAdmin'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

            $insertedId = $userModel->insert($data);
            $data['id'] = $insertedId;
            unset($data['password']);
            return $this->respondCreated($data, 'Data Saved');
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
            $userModel = new UserModel();
            $data = $this->request->getJSON(true);

            if (!$userModel->find($id)) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            if (isset($data['password'])) {
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
            }

            $userModel->update($id, $data);
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
     *         response=200,
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
            $userModel = new UserModel();

            if (!$userModel->find($id)) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            $userModel->delete($id);
            return $this->respondDeleted('Data Deleted');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    private function doesUserExist($username, $email) {
        $userModel = new UserModel();
        return $userModel->doesUserExist($username, $email);
    }

    // login user
}