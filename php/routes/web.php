<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', 'WebController@home');
$router->post('/api/access-tokens', 'ApiController@accessTokens');
$router->get('/api/payments/{id}', 'ApiController@payments');
$router->post('/api/cross-reference-payments/{id}', 'ApiController@crossReferencePayments');
$router->get('/collection', 'WebController@collection');
$router->get('/pre-auth', 'WebController@preAuth');
$router->get('/refund', 'WebController@refund');
$router->get('/sale', 'WebController@sale');
$router->get('/subscription', 'WebController@subscription');
$router->get('/void', 'WebController@void');
$router->get('/wallet', 'WebController@wallet');
