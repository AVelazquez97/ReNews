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
    $routes->get('users/(:any)', 'Users::show/$1');
    $routes->post('users/login', 'Users::login');
    $routes->post('users/register', 'Users::register');
    $routes->post('users/forgotPassword', 'Users::forgotPassword');
    $routes->put('users/(:any)', 'Users::update/$1');
    $routes->delete('users/(:any)', 'Users::delete/$1');
    $routes->options('users', static function () {});
    $routes->options('users/(:any)', static function () {});
    /* End User Router */
//    $routes->resource('posts', ['controller' => 'Posts']);
//    $routes->resource('comments', ['controller' => 'Comments']);
//    $routes->resource('categories', ['controller' => 'Categories']);
//    $routes->resource('tags', ['controller' => 'Tags']);
//    $routes->resource('postTags', ['controller' => 'PostTags']);

});