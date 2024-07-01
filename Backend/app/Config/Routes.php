<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');
$routes->get('/docs', 'Docs::index');

$routes->group('api', ['filter' => 'cors:api'], ['namespace' => 'App\Controllers'], function($routes) {
    /* User Router */
    $routes->get('users', 'Users::index');
    $routes->get('users/(:num)', 'Users::show/$1');
    $routes->post('users/login', 'Users::login');
    $routes->post('users/register', 'Users::register');
    $routes->post('users/forgotPassword', 'Users::forgotPassword');
    $routes->put('users/makeAdmin/(:num)', 'Users::makeAdmin/$1');
    $routes->put('users/(:num)', 'Users::update/$1');
    $routes->delete('users/(:num)', 'Users::delete/$1');
    $routes->options('users', static function () {});
    $routes->options('users/(:any)', static function () {});
    /* End User Router */

    /* Tag Router */
    $routes->get('tags', 'Tags::index');
    $routes->get('tags/(:num)', 'Tags::show/$1');
    $routes->post('tags', 'Tags::create');
    $routes->options('tags', static function () {});
    $routes->options('tags/(:any)', static function () {});
    /* End Tag Router */

    /* Post Router */
    $routes->get('posts', 'Posts::index'); // Get all posts
    $routes->get('posts/pending', 'Posts::pendingPosts'); // Get all pending posts
    $routes->get('posts/(:num)', 'Posts::show/$1'); // Get a post by id
    $routes->post('posts', 'Posts::create'); // Create a post
    $routes->put('posts/approve/(:num)', 'Posts::approvePost/$1'); // Approve a post
    $routes->delete('posts/(:num)', 'Posts::delete/$1'); // Delete a post
    $routes->options('posts', static function () {});
    $routes->options('posts/(:any)', static function () {});
    /* End Post Router */
});