<?php

namespace App\Controllers;

use App\Models\PostModel;
use App\Models\PostTagModel;
use App\Models\TagModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Posts",
 *     description="API Endpoints of Posts"
 * )
 */
class Posts extends ResourceController {
    use ResponseTrait;
    private $postModel;

    public function __construct() {
        $this->postModel = new PostModel();
    }

    public function index() {
        try {
            $data = $this->postModel->findAll();

            if (empty($data)) {
                return $this->failNotFound('No Posts Found');
            }

            foreach ($data as &$post) {
                $post['id'] = intval($post['id']);
                $post['owner'] = $this->postModel->getOwner($post['id']);
                $tags = $this->postModel->getTags($post['id']);
                $post['tags'] = $tags;

            }

            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    public function show($id = null) {
        try {
            $postData = $this->postModel->find($id);

            if (!$postData) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            $tags = $this->postModel->getTags($id);
            $postData['tags'] = $tags;

            $comments = $this->postModel->getComments($id);
            $postData['comments'] = $comments;

            // Convierte el id a entero
            $postData['id'] = intval($id);

            return $this->respond($postData);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    public function create() {
    try {
        $postData = $this->request->getJSON(true);

        if(!$postData) {
            return $this->fail('No data provided', 400);
        }

        // Validación de los campos requeridos
        $requiredFields = ['ownerId', 'title', 'body', 'date'];
        foreach ($requiredFields as $field) {
            if (!isset($postData[$field])) {
                return $this->fail('Field ' . $field . ' is required', 400);
            }
        }

        // Conversión de la fecha a formato MySQL
        $postData['date'] = convertToMySQLFormat($postData['date']);

        // Inserción del post en la base de datos
        $postData['likes'] = 0; // Inicializa los likes a 0
        $postId = $this->postModel->insert($postData);

        // Manejo de las etiquetas
        if (isset($postData['tags']) && is_array($postData['tags'])) {
            $postTagModel = new PostTagModel();
            $tagModel = new TagModel();
            foreach ($postData['tags'] as $tagName) {
                $tag = $tagModel->where('name', $tagName)->first();
                if (!$tag) {
                    $tag = ['name' => $tagName];
                    $tagId = $tagModel->insert($tag);
                } else {
                    $tagId = $tag['id'];
                }

                $postTag = ['postId' => $postId, 'tagId' => $tagId];
                $postTagModel->insert($postTag);
            }
        }

        return $this->respondCreated(['id' => $postId]);
    } catch (\Exception $e) {
        return $this->failServerError('An error occurred: ' . $e->getMessage());
    }
}
}
