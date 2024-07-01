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
        helper('date');
    }

    /**
     * @OA\Get(
     *     path="/posts",
     *     tags={"Posts"},
     *     summary="Get all posts",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Retrieved all posts",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/PostOutput"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No posts found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function index() {
        try {
            $data = $this->postModel->findAll();

            if (empty($data)) {
                return $this->failNotFound('No Posts Found');
            }

            foreach ($data as &$post) {
                $this->formatPostData($post);
            }

            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Get(
     *     path="/posts/pending",
     *     tags={"Posts"},
     *     summary="Get all pending posts",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Retrieved all pending posts",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/PostOutput"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No pending posts found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function pendingPosts() {
        try {
            $data = $this->postModel->getPendingPosts();

            if (empty($data)) {
                return $this->failNotFound('No Pending Posts Found');
            }

            foreach ($data as &$post) {
                $this->formatPostData($post);
            }

            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Get(
     *     path="/posts/{id}",
     *     tags={"Posts"},
     *     summary="Get a post by id",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="The id of the post",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Post found",
     *         @OA\JsonContent(ref="#/components/schemas/PostOutput")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Post not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function show($id = null) {
        try {
            $postData = $this->postModel->find($id);

            if (!$postData) {
                return $this->failNotFound('No Post Found with id ' . $id);
            }

            $this->formatPostData($postData);
            return $this->respond($postData);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Post(
     *     path="/posts",
     *     tags={"Posts"},
     *     summary="Create a new post",
     *     @OA\RequestBody(
     *         @OA\JsonContent(ref="#/components/schemas/PostInput")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Success: Post created",
     *         @OA\JsonContent(ref="#/components/schemas/PostOutputWithoutComments")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid post data"
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="A post with this title already exists"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function create() {
        try {
            $postData = $this->request->getJSON(true);

            if(!$postData) {
                return $this->fail('No data provided', 400);
            }

            $requiredFields = ['ownerId', 'title', 'body', 'date'];
            foreach ($requiredFields as $field) {
                if (!isset($postData[$field])) {
                    return $this->fail('Field ' . $field . ' is required');
                }
            }

            if ($this->postModel->doesPostExist($postData['title'])) {
                return $this->fail('A post with this title already exists', 409);
            }

            $postData['date'] = convertToMySQLFormat($postData['date']);

            $postData['likes'] = 0;
            $postData['isPending'] = true;
            $postId = $this->postModel->insert($postData);

            if (isset($postData['tags']) && is_array($postData['tags'])) {
                $postTagModel = new PostTagModel();
                $tagModel = new TagModel();
                foreach ($postData['tags'] as $tagId) {
                    $tag = $tagModel->find($tagId);
                    if (!$tag) {
                        return $this->fail('Tag with id ' . $tagId . ' not found', 400);
                    }

                    $postTag = ['postId' => $postId, 'tagId' => $tagId];
                    $postTagModel->insert($postTag);
                }
            }

            $newPost = $this->postModel->find($postId);
            $tags = $this->postModel->getTags($postId);
            $newPost['tags'] = $tags;
            $newPost['owner'] = $this->postModel->getOwner($postId);
            unset($newPost['ownerId']);

            $newPost['id'] = intval($newPost['id']);
            $newPost['likes'] = intval($newPost['likes']);
            foreach ($newPost['tags'] as &$tag) {
                $tag['id'] = intval($tag['id']);
            }
            $newPost['date'] = convertToISO8601Format($newPost['date']);
            $post['isPending'] = filter_var($newPost['isPending'], FILTER_VALIDATE_BOOLEAN);

            return $this->respondCreated($newPost);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Put(
     *     path="/posts/approve/{id}",
     *     tags={"Posts"},
     *     summary="Approve a pending post",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="The id of the post to approve",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Post approved",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="id",
     *                 type="integer",
     *                 description="The approved post's id"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Post is already approved"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Post not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function approvePost($id = null) {
        try {
            $postData = $this->postModel->find($id);

            if (!$postData) {
                return $this->failNotFound('No Post Found with id ' . $id);
            }

            if (!$postData['isPending']) {
                return $this->fail('Post is already approved', 400);
            }

            // TODO:
            //  - Verify if the user that is making the request is an admin
            $this->postModel->approvePost($id);
            $this->postModel->find($id);
            return $this->respond(['id' => intval($id)]);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Delete(
     *     path="/posts/{id}",
     *     tags={"Posts"},
     *     summary="Delete a post",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="The id of the post to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success: Post deleted"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Post not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function delete($id = null) {
        try {
            $postData = $this->postModel->find($id);

            if (!$postData) {
                return $this->failNotFound('No Post Found with id ' . $id);
            }

            $this->postModel->delete($id);

            return $this->respondNoContent();
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    private function formatPostData(&$post) {
        $post['id'] = intval($post['id']);
        $post['likes'] = intval($post['likes']);
        $post['owner'] = $this->postModel->getOwner($post['id']);
        unset($post['ownerId']);
        $tags = $this->postModel->getTags($post['id']);
        $post['tags'] = $tags;

        $comments = $this->postModel->getComments($post['id']);
        $post['comments'] = $comments;
        $post['date'] = convertToISO8601Format($post['date']);
        $post['isPending'] = filter_var($post['isPending'], FILTER_VALIDATE_BOOLEAN);
    }
}
