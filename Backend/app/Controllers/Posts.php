<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\PostModel;
use App\Models\PostTagModel;
use App\Models\TagModel;
use App\Models\CommentModel;
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
     *     path="/posts/user/{userId}",
     *     tags={"Posts"},
     *     summary="Get all posts by a user",
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         description="The id of the user",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Retrieved all posts by the user",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/PostOutput"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No posts found for the user"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function getPostsByUser($userId = null) {
        try {
            if (!$userId) {
                return $this->fail('User ID is required', 400);
            }

            if(!(new UserModel())->find($userId)) {
                return $this->failNotFound('User not found with id ' . $userId);
            }

            $posts = $this->postModel->getPostsByUserId($userId);

            if (empty($posts)) {
                return $this->respond($posts);
            }

            foreach ($posts as &$post) {
                $this->formatPostData($post);
            }

            return $this->respond($posts);
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
     * @OA\Get(
     *     path="/posts/search/{titleFragment}",
     *     tags={"Posts"},
     *     summary="Search for posts by title",
     *     @OA\Parameter(
     *         name="titleFragment",
     *         in="path",
     *         description="The title fragment to search for",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Retrieved posts",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/PostOutput"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid title fragment"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function searchByTitle($titleFragment = null) {
        try {
            if (!$titleFragment) {
                return $this->fail('Title fragment is required', 400);
            }

            $posts = $this->postModel->like('title', $titleFragment)->findAll();

            foreach ($posts as &$post) {
                $this->formatPostData($post);
            }

            return $this->respond($posts);
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
     * @OA\Post(
     *     path="/posts/{postId}/comment",
     *     tags={"Posts"},
     *     summary="Add a comment to a post",
     *     @OA\Parameter(
     *         name="postId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         description="The id of the post to add the comment to"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"ownerId", "body", "date"},
     *             @OA\Property(
     *                 property="ownerId",
     *                 type="integer",
     *                 description="The id of the user who is making the comment"
     *             ),
     *             @OA\Property(
     *                 property="body",
     *                 type="string",
     *                 description="The body of the comment"
     *             ),
     *             @OA\Property(
     *                 property="date",
     *                 type="string",
     *                 format="date-time",
     *                 description="The date and time when the comment was made"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Comment created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="id",
     *                 type="integer",
     *                 description="The id of the created comment"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid input"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Post not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function addComment($postId = null) {
        try {
            $commentData = $this->request->getJSON(true);

            $requiredFields = ['ownerId', 'body', 'date'];
            foreach ($requiredFields as $field) {
                if (!isset($commentData[$field])) {
                    return $this->fail('Field ' . $field . ' is required', 400);
                }
            }

            if (!$this->postModel->find($postId)) {
                return $this->failNotFound('Post not found with id ' . $postId);
            }

            $commentModel = new CommentModel();
            $commentId = $commentModel->insert([
                'ownerId' => $commentData['ownerId'],
                'postId' => $postId,
                'body' => $commentData['body'],
                'date' => convertToMySQLFormat($commentData['date'])
            ]);

            return $this->respondCreated(['id' => intval($commentId)]);
        } catch (\Exception $e) {
            log_message('error', $e->getMessage() . 'Trace:' . $e->getTraceAsString());
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

    /**
     * @OA\Delete(
     *     path="/posts/{postId}/comment/{commentId}",
     *     tags={"Posts"},
     *     summary="Delete a comment",
     *     @OA\Parameter(
     *         name="postId",
     *         in="path",
     *         description="The id of the post the comment is associated with",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="commentId",
     *         in="path",
     *         description="The id of the comment to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Success: Comment deleted"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Post or comment not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred"
     *     )
     * )
     */
    public function deleteComment($postId, $commentId) {
    try {
        // Verificar si el post existe
        $post = $this->postModel->find($postId);
        if (!$post) {
            return $this->failNotFound('Post not found with id ' . $postId);
        }

        $commentModel = new CommentModel();
        $comment = $commentModel->find($commentId);
        if (!$comment || $comment['postId'] != $postId) {
            return $this->failNotFound('Comment not found with id ' . $commentId . ' for the specified post');
        }

        $commentModel->delete($commentId);

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
