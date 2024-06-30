<?php

namespace App\Controllers;

/**
 * @OA\Info(title="ReNewsAPI", version="1.4")
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
class Home extends BaseController
{
    public function index(): string
    {
        return view('home');
    }
}
