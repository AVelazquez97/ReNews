<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');
$routes->get('/docs', 'Docs::index');

$routes->group('api', ['filter' => 'cors:api'], ['namespace' => 'App\Controllers'], function($routes) {
    $routes->resource('users', ['only' => ['show', 'index', 'create', 'update', 'delete']], ['controller' => 'Users']);
    $routes->options('users', static function () {});
    $routes->options('users/(:any)', static function () {});
//    $routes->resource('posts', ['controller' => 'Posts']);
//    $routes->resource('comments', ['controller' => 'Comments']);
//    $routes->resource('categories', ['controller' => 'Categories']);
//    $routes->resource('tags', ['controller' => 'Tags']);
//    $routes->resource('postTags', ['controller' => 'PostTags']);

});