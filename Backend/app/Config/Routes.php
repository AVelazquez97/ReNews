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

//    $routes->resource('posts', ['controller' => 'Posts']);
//    $routes->resource('comments', ['controller' => 'Comments']);

});