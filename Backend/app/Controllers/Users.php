<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Users extends ResourceController {
    use ResponseTrait;

    // get all users
    public function index() {
        $userModel = new UserModel();
        $data = $userModel->findAll();
        return $this->respond($data, 200);
    }

    // get single user
    public function show($id = null) {
        $userModel = new UserModel();
        $data = $userModel->getWhere(['id' => $id])->getResult();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('No Data Found with id ' . $id);
        }
    }

    // create a user
    public function create() {
        $userModel = new UserModel();
        $data = [
            'email' => $this->request->getPost('email'),
            'nickname' => $this->request->getPost('nickname'),
            'password' => $this->request->getPost('password'),
            'isAdmin' => $this->request->getPost('isAdmin')
        ];
        $userModel->createUser($data);
        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data Saved'
            ]
        ];

        return $this->respondCreated($data, 201);
    }

    // update user
    public function update($id = null) {
        $userModel = new UserModel();
        $json = $this->request->getJSON();
        if ($json) {
            $data = [
                'email' => $json->email,
                'nickname' => $json->nickname,
                'password' => $json->password,
                'isAdmin' => $json->isAdmin
            ];
        } else {
            $input = $this->request->getRawInput();
            $data = [
                'email' => $input['email'],
                'nickname' => $input['nickname'],
                'password' => $input['password'],
                'isAdmin' => $input['isAdmin']
            ];
        }
        // Insert to Database
        $userModel->update($id, $data);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respond($response);
    }

    // delete user
    public function delete($id = null) {
        $userModel = new UserModel();
        $data = $userModel->find($id);
        if ($data) {
            $userModel->delete($id);
            $response = [
                'status' => 200,
                'error' => null,
                'messages' => [
                    'success' => 'Data Deleted'
                ]
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('No Data Found with id ' . $id);
        }
    }

    // login user

}