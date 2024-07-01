<?php

namespace App\Models;

use CodeIgniter\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="TagInput",
 *     required={"name"},
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The tag's name"
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="TagOutput",
 *     required={"name"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="The tag's id"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The tag's name"
 *     )
 * )
 */
class TagModel extends Model {
    protected $table = 'tags';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields = ['name'];

    public function doesTagExist($tagName) {
        return $this->where('name', $tagName)->first() !== null;
    }
}
