<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
//$routes->get('/', 'Home::index');

$routes->group('api', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->resource('users', ['controller' => 'Users']);
//    $routes->resource('posts', ['controller' => 'Posts']);
//    $routes->resource('comments', ['controller' => 'Comments']);
//    $routes->resource('categories', ['controller' => 'Categories']);
//    $routes->resource('tags', ['controller' => 'Tags']);
//    $routes->resource('postTags', ['controller' => 'PostTags']);
});
