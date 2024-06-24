<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Users extends ResourceController {
    use ResponseTrait;

    // get all users
    public function index() {
        try {
            $userModel = new UserModel();
            $data = $userModel->findAll();

            if (empty($data)) {
                return $this->failNotFound('No Users Found');
            }
            // Convert data types
            foreach ($data as &$user) {
                $user['id'] = intval($user['id']);
                $user['is_admin'] = filter_var($user['is_admin'], FILTER_VALIDATE_BOOLEAN);
            }

            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    // get single user
    public function show($id = null) {
        try {
            $userModel = new UserModel();
            $data = $userModel->find($id);

            if (!$data) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            $data['id'] = intval($data['id']);
            $data['is_admin'] = filter_var($data['is_admin'], FILTER_VALIDATE_BOOLEAN);
            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    // create a user
    public function create() {
        try {
            $userModel = new UserModel();
            $data = $this->request->getJSON(true);

            $data['is_admin'] = filter_var($data['is_admin'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

            $insertedId = $userModel->insert($data);
            $data['id'] = $insertedId;
            return $this->respondCreated($data, 'Data Saved');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    // update user
    public function update($id = null) {
        try {
            $userModel = new UserModel();
            $data = $this->request->getJSON(true);

            if (!$userModel->find($id)) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            $userModel->update($id, $data);
            return $this->respond($data, 'Data Updated');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    // delete user
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
    // login user
}