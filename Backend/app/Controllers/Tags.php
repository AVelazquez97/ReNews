<?php

namespace App\Controllers;

use App\Models\TagModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Tags",
 *     description="API Endpoints of Tags"
 * )
 */
class Tags extends ResourceController {
    use ResponseTrait;

    private $tagModel;

    public function __construct() {
        $this->tagModel = new TagModel();
    }

    /**
     * @OA\Get(
     *      path="/tags",
     *      tags={"Tags"},
     *      summary="Get all tags",
     *      @OA\Response(
     *          response=200,
     *          description="Success: Retrieved all tags",
     *          @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/TagOutput"))
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No tags found"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="An error occurred"
     *      )
     *  )
     */
    public function index() {
        try {
            $data = $this->tagModel->findAll();

            if (empty($data)) {
                return $this->failNotFound('No Tags Found');
            }

            foreach ($data as &$tag) {
                $tag['id'] = intval($tag['id']);
            }
            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Get(
     *      path="/tags/{id}",
     *      tags={"Tags"},
     *      summary="Get tag by id",
     *      @OA\Parameter(ref="#/components/parameters/id"),
     *      @OA\Response(
     *          response=200,
     *          description="Success: Retrieved tag",
     *          @OA\JsonContent(ref="#/components/schemas/TagOutput")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No tag found"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="An error occurred"
     *      )
     *  )
     */
    public function show($id = null) {
        try {
            $data = $this->tagModel->find($id);

            if (!$data) {
                return $this->failNotFound('No Data Found with id ' . $id);
            }

            $data['id'] = intval($id);
            return $this->respond($data);
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }

    /**
     * @OA\Post(
     *      path="/tags",
     *      tags={"Tags"},
     *      summary="Create a tag",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/TagInput")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Success: Created a tag",
     *          @OA\JsonContent(ref="#/components/schemas/TagOutput")
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Field name is required"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="An error occurred"
     *      )
     *  )
     */
    public function create() {
        try {
            $data = $this->request->getJSON(true);

            if (!isset($data['name'])) {
                return $this->fail('Field name is required', 400);
            }

            $insertedId = $this->tagModel->insert($data);
            $data['id'] = intval($insertedId);
            return $this->respondCreated($data, 'Tag Created');
        } catch (\Exception $e) {
            return $this->failServerError('An error occurred: ' . $e->getMessage());
        }
    }
}
