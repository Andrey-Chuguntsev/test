<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/category', 'Api\CategoryController')
    ->parameters(['category' => 'cat'])
    ->middleware('auth:api');

Route::get('/init-data', 'Api\InitStoreController@initData');
Route::get('/init-data-manager', 'Api\InitStoreController@initDataManager')
    ->middleware('auth:api');

Route::apiResource('/post', 'Api\PostController')
    ->only(['store', 'update', 'destroy'])
    ->middleware('auth:api');
