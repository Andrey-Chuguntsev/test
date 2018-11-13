<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts.app');
});

Route::get('/post/{any}', function () {
    return view('layouts.app');
})->where('any', '.*');

Auth::routes();

Route::group(['middleware' => 'auth'], function(){
    Route::get('/manager', 'HomeController@index')->name('home');
    Route::get('/manager/{any}', 'HomeController@index')->where('any', '.*');
    Route::get('/manager/{any}/{any1}', 'HomeController@index')->where(['any' => '.*', 'any1' => '.*']);
});
